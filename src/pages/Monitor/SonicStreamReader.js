import React, { useState, useEffect, useRef } from "react";
import Card from "react-bootstrap/Card";
import {
  MuiThemeProvider,
  withStyles,
  makeStyles,
} from "@material-ui/core/styles";
import moment from "moment";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import cogoToast from "cogo-toast";
import InfoIcon from "@material-ui/icons/Info";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import MusicOffIcon from "@material-ui/icons/MusicOff";
import CancelIcon from "@material-ui/icons/Cancel";
import CloseIcon from "@material-ui/icons/Close";
import StorageIcon from "@material-ui/icons/Storage";
import ReorderIcon from "@material-ui/icons/Reorder";
import MUIDataTable from "mui-datatables";
import { Badge } from "react-bootstrap";
import { cloneDeep } from "lodash";
import axios from "axios";
import { Auth } from "aws-amplify";
import ErrorModal from "./Components/ErrorModal";
import CustomButton from "./Components/CustomButton";
import Grid from "@material-ui/core/Grid";
import Constant from "../../assets/Constant";
import LoadingSpinner from "./Components/LoadingSpinner";
import InfoCard from "./Components/InfoCard";
import Graph from "./Components/Graph";
import GraphCard from "./Components/GraphCard";
import Hits from "./Components/Hits";
import * as actionCreators from "../../stores/actions/index";
import {
  getAccessToken,
  getUserId,
  getAdmin,
} from "../../services/https/AuthHelper";
import httpUrl from "../../services/https/httpUrl";
import {
  errorCount,
  getAllRadioStations,
  unauthorizedRedirection,
  hitsDataArray,
  listeningCount,
  notListeningCount,
  todayRange,
  weekRange,
  monthRange,
} from "../../utils/HelperMethods";
import { log } from "../../utils/app.debug";
import ButtonSpinner from "./Components/ButtonSpinner";
import {
  Box,
  Button,
  Container,
  createMuiTheme,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@material-ui/core";
import BackgoundCard from "./Components/BackgoundCard";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import CreateIcon from "@material-ui/icons/Create";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import Pagination from "@material-ui/lab/Pagination";
import PlayCircleOutlineRoundedIcon from "@material-ui/icons/PlayCircleOutlineRounded";
import StopOutlinedIcon from "@material-ui/icons/StopOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import { tableStyle } from "../../globalStyle";

const useStyles = makeStyles((theme) => ({
  tableRow: {
    "&:hover": {
      boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 1px 5px rgba(0,0,0,0.22)",
      cursor: "pointer",
    },
  },
}));

function SonicStreamReader(props) {
  let hitsArray = [];
  // let radiostations = [];
  let componentRef = useRef(null);
  const classes = useStyles();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [startLoading, setStartLoading] = useState(false);
  const [stopLoading, setStopLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selected, setSelected] = useState([]);

  //for search logic
  const [searchValue, setSearchValue] = useState("");

  const useStyleClasses = useStyles();
  // log("RRRRRRRRradiostations",radiostations)
  let radiostations = cloneDeep(props.radiostations);

  const columns = [
    "ID",
    "LOGO",
    "RADIO NAME",
    "RADIO URL",
    "ADDED DATE",
    "HITS",
    "STATUS",
    "ACTION",
  ];
  useEffect(() => {
    if (props.radiostations.length <= 0) {
      props.fetchRadioStations(0, 5);
    }
  }, []);

  
  // ================================FUNCTIONS=====================================================

  const handlePageChange = async (event, value) => {
    const limit = 5;
    const page = value;
    props.fetchRadioStations(limit * value, limit);
    props.setRadiostationPageNum(page);
    setSelectedRows([]);
    setSelected([]);
  };

  const onHide = () => {
    setShow(false);
  };

  const onDelete = () => {};

  const onStart = () => {};

  const onStop = () => {};

  const isSelected = (name) => {
    return selected.includes(name);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props.radiostations.docs.map((data) => data._id);
      setSelectedRows([...selectedRows, newSelecteds]);
      setSelected(newSelecteds);
      return;
    }
    setSelectedRows([]);
    setSelected([]);
  };

  const pagination = (event, _id) => {
    if (event.target.checked) {
      setSelectedRows([...selectedRows, _id]);
      setSelected([...selected, _id]);
    } else {
      const index = selectedRows.indexOf(_id);
      selectedRows.splice(index, 1);
      setSelectedRows([...selectedRows]);
      const index2 = selected.indexOf(_id);
      selected.splice(index2, 1);
      setSelected([...selected]);
    }
  };
  return (
    <>
      <Paper
        style={{
          outline: 0,
          display: "flex",
          flexDirection: "column",
        }}
        elevation={8}
      >
        <BackgoundCard
          header="Sonic StreamReader"
          subheader="List 4 radio stations"
        />
        <Paper
          maxWidth="lg"
          style={{
            marginTop: 15,
            padding: 10,
            margin: 20,
            display: "flex",
            flexGrow: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div style={{ margin: 10 }}>
            {/* <CustomButton 
                            className={useStyleClasses.homeTableDelete} 
                            buttonText="Delete"
                            disabled={selectedRows.length > 0 ? false :true}
                            onClick={ () => {
                                setShow(true)
                                //   onClick function goes here
                            }}
                            style={{ backgroundColor:Constant.color.deleteButtonColor, marginRight: 10 }}
                        /> */}
            <button
              disabled={selectedRows.length > 0 ? false : true}
              //    className={[useStyleClasses.homeTableDelete, 'customButton'].join(' ')}
              onClick={() => {
                onStart();
              }}
              style={{ ...styles.submitButton, marginRight: 10 }}
            >
              {startLoading ? (
                <ButtonSpinner grow={true} />
              ) : (
                <div style={{ justifyContent: "center", display: "flex" }}>
                  <PlayCircleOutlineRoundedIcon
                    style={{ fontSize: 15, marginRight: 6 }}
                  />
                  Start
                </div>
              )}
            </button>

            <button
              disabled={selectedRows.length > 0 ? false : true}
              className={[useStyleClasses.homeTableDelete, "customButton"].join(
                " "
              )}
              onClick={() => {
                onStop();
              }}
              style={{ ...styles.submitButton }}
            >
              {stopLoading ? (
                <ButtonSpinner grow={true} />
              ) : (
                <div style={{ justifyContent: "center", display: "flex" }}>
                  <StopOutlinedIcon style={{ fontSize: 15, marginRight: 6 }} />
                  Stop
                </div>
              )}
            </button>
            <button
              disabled={selectedRows.length > 0 ? false : true}
              className={[useStyleClasses.homeTableDelete, "customButton"].join(
                " "
              )}
              onClick={() => {
                setShow(true);
              }}
              style={{ ...styles.submitButton, marginRight: 10 }}
            >
              {deleteLoading ? (
                <ButtonSpinner grow={true} />
              ) : (
                <div style={{ justifyContent: "center", display: "flex" }}>
                  <CancelOutlinedIcon
                    style={{ fontSize: 15, marginRight: 6 }}
                  />
                  Delete
                </div>
              )}
            </button>
          </div>

          <div>
            <FormControl style={styles.formControl}>
              <Select
                id="drop-down"
                //onChange={(e) => setKeysDetected(e.target.value)}
                className="form-control mb-0"
                autoWidth={false}
                style={styles.dropdownButton}
              >
                <MenuItem disabled selected hidden>
                  Radio Station
                </MenuItem>
                <MenuItem value="day">Radio Beta</MenuItem>
                <MenuItem value="week">Tune 1</MenuItem>
                <MenuItem value="month">Radio Rock</MenuItem>
              </Select>
            </FormControl>

            <FormControl style={styles.formControl}>
              <Select
                id="drop-down"
                //onChange={(e) => setKeysDetected(e.target.value)}
                className="form-control mb-0"
                autoWidth={false}
                style={styles.dropdownButton}
              >
                <MenuItem disabled selected hidden>
                  Radio Station
                </MenuItem>
                <MenuItem value="day">Radio Beta</MenuItem>
                <MenuItem value="week">Tune 1</MenuItem>
                <MenuItem value="month">Radio Rock</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              style={{
                padding: 12,
                borderRadius: 5,
                background: "rgb(52, 63, 132)",
              }}
            >
              {" "}
              Subscribe
            </Button>
          </div>
        </Paper>
        {/* <div style={{flexGrow:'1'}}> */}
        {/* <Grid container spacing={0}> */}
        {/* <div> */}
        <TableContainer style={{ ...tableStyle.container }}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow hover>
                <TableCell padding="checkbox">
                  <Checkbox
                    // indeterminate={selectedRows.length===5?true:false}
                    checked={selected.length === 5 ? true : false}
                    onChange={handleSelectAllClick}
                    // inputProps={{ 'aria-label': 'select all desserts' }}
                  />
                </TableCell>
                {columns?.map((col) => {
                  return (
                    <TableCell style={{ ...tableStyle.head }}>{col}</TableCell>
                  );
                })}
              </TableRow>
            </TableHead>

            <TableBody>
              {radiostations?.docs?.map((file, index) => {
                const isItemSelected = isSelected(file._id);
                return (
                  <TableRow key={file?._id} hover className={classes.tableRow}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        onChange={(e) => pagination(e, file?._id)}
                        checked={isItemSelected}
                      />
                    </TableCell>

                    <TableCell style={{ ...tableStyle.body }}>
                      {props.offset+index + 1}
                    </TableCell>
                    <TableCell>
                      <CheckCircleOutlineRoundedIcon style={{ fontSize: 15 }} />
                    </TableCell>
                    <TableCell style={{ ...tableStyle.body, fontSize: 13 }}>
                      {file?.name}
                    </TableCell>
                    <Tooltip title={file?.streamingUrl}>
                      <TableCell
                        style={{
                          ...tableStyle.body,
                          color: "#757575",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          maxWidth: 200,
                          wordWrap: "none",
                          overflow: "hidden",
                        }}
                      >
                        {file?.streamingUrl}
                      </TableCell>
                    </Tooltip>
                    <TableCell style={{ ...tableStyle.body, color: "#757575" }}>
                      {moment(new Date(file?.createdAt)).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell style={{ ...tableStyle.body }}>
                      <Hits radioId={file?._id} key={file?._id} />
                    </TableCell>
                    <TableCell>
                      {file.isStreamStarted === true && (
                        <Badge
                          style={{
                            cursor: "pointer",
                            background: "rgb(229, 245, 244)",
                            color: "black",
                            padding: 5,
                            fontWeight: "lighter",
                          }}
                          variant="warning"
                        >
                          LISTENING
                        </Badge>
                      )}
                      {file.isStreamStarted === false && file.error === null && (
                        <Badge
                          style={{
                            cursor: "pointer",
                            background: "yellow",
                            padding: 5,
                            color: "black",
                            fontWeight: "lighter",
                          }}
                          variant="warning"
                        >
                          NOT LISTENING
                        </Badge>
                      )}
                      {file.isStreamStarted === false && file.error !== null && (
                        <Badge
                          style={{
                            cursor: "pointer",
                            background: "red",
                            padding: 5,
                            color: "black",
                            fontWeight: "lighter",
                            color: "white",
                          }}
                          variant="warning"
                        >
                          ERROR
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell style={{ ...tableStyle.body }}>
                      Details
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <Pagination
            count={props.totalPage}
            page={props.radiostationPageNum}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
          />
        </TableContainer>
        {/* </div> */}
        {/* </div> */}
      </Paper>
    </>
  );
}

const styles = {
  homeContainer: {},
  IconStyle: {
    height: 70,
    width: 70,
    color: "white",
  },
  cardStyle: {
    marginTop: 10,
    padding: 10,
    // backgroundColor: 'rgba(0,0,0,0.1)'
    // borderRadius: 10,
    // boxShadow : '0px 0px 8px 2px #000000;',
  },
  actionContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  tableStyle: {
    backgroundColor: "#ADD8E6",
    // color:'#0269A4',
    // opacity:0.9,
    // fontWeight: 'bold',
    whiteSpace: "nowrap",
    wordWrap: "break-word",
  },
  submitButton: {
    marginLeft: 10,
    height: "30px",
    color: "black",
    fontWeight: "bold",
    width: 80,
    border: "none",
    borderRadius: "50px",
    backgroundColor: "transparent",
    boxShadow: "0px 0px 8px 2px #000000;",
  },
  dropdownButton: {
    color: "black",
    backgroundColor: "transparent",
    outline: "none",
    border: "none",
    boxShadow: "none",
    width: 160,
    margin: "0px 30px 0px 20px",
  },
};

const mapStateToProps = (state) => {
  console.log("States", state);
  return {
    user: state.session,
    sessionLoading: state.session.loading,
    loading: state.radioStations.loading,
    error: state.radioStations.error,
    radiostations: state.radioStations.radiostations,
    totalRadioStreams: state.radioStations.totalRadioStreams,
    radiostationPageNum: state.radioPageNumber.radiostationPageNum,
    totalPage: state.radioStations.radiostations.totalPages,
    offset: state.radioStations.radiostations.offset,
    // selectedRowss : state.global.selectedRows,

    // cardRadiostations : state.cardRadioStaions.cardRadiostations,
    // totalStationsCount : state.cardRadioStaions.totalStationsCount,

    // topRadiostations : state.topRadiostation.topRadiostations,
    // topRadiostationsLoading : state.topRadiostation.loading,
    // topRadiostationsError : state.topRadiostation.error,

    // day : state.count.day,
    // week : state.count.week,
    // month : state.count.month,
    // hits : state.count.hits,
    // hitsLoading : state.count.hitsLoading,
    // hitsError : state.count.hitsError,

    // totalRadiostaionCount : state.count.totalRadiostaionCount,
    // totalListeningCount : state.count.totalListeningCount,
    // totalNotListeningCount : state.count.totalNotListeningCount,
    // totalErrorCount : state.count.totalErrorCount,

    // radiostationPageNum : state.global.radiostationPageNum,
    // radiostationRowsperPage : state.global.radiostationRowsperPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRadioStations: (_offset, _limit) =>
      dispatch(actionCreators.fetchRadioStations(_offset, _limit)),
    // setSelectedRows : (rows) => dispatch(actionCreators.setSelectedRowsRadioStationTable(rows)),
    // fetchRadioStationsSuccess : (payload) => dispatch(actionCreators.fetchRadioStationsSuccess(payload)),
    // fetchRadioStationsFailure : (error) => dispatch(actionCreators.fetchRadioStationsFailure(error)),
    // fetchRadiostationSonicKeyCount : (radiostationId) => dispatch(actionCreators.fetchRadiostationSonicKeyCount(radiostationId)),

    // fetchTotalListeningCount : () => dispatch(actionCreators.fetchTotalListeningCount()),
    // fetchTotalNotListeningCount : () => dispatch(actionCreators.fetchTotalNotListeningCount()),
    // fetchTotalErrorCount : () => dispatch(actionCreators.fetchTotalErrorCount()),
    // fetchTotalRadiostationCount : () => dispatch(actionCreators.fetchTotalRadiostationCount()),

    setRadiostationPageNum: (page) =>
      dispatch(actionCreators.setRadiostationPageNum(page)),
    setRadiostationRowsperPage: (rowsPerPage) =>
      dispatch(actionCreators.setRadiostationRowsperPage(rowsPerPage)),
    dispatch: dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SonicStreamReader);
