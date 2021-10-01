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

import { log } from "../../utils/app.debug";
import ButtonSpinner from "./Components/ButtonSpinner";
import {
  Box,
  Button,
  Container,
  createMuiTheme,
  FormControl,
  Input,
  InputLabel,
  ListItemText,
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
import IconEdit from "../../assets/icons/icon-edit.png";
import IconTick from "../../assets/icons/icon-tick.png";
import Communication from "../../services/https/Communication";
import Search from "../SonicKeys/Components/Search";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "white",
    padding: "2% 2.5%",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
  heading: {
    fontSize: 30,
    fontWeight: 700,
    color: "#343F84",
  },
  subHeading: {
    paddingBottom: 30,
    fontSize: 18,
    fontWeight: 500,
    color: "#00A19A",
  },
  buttons: {
    fontSize: 18,
    marginRight: 6,
    marginTop: 5,
    color: "#343F84",
  },
  tableRow: {
    "&:hover": {
      boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 1px 5px rgba(0,0,0,0.22)",
      cursor: "pointer",
    },
  },
  placeholder: {
    color: "#aaa",
  },
}));

function SonicStreamReader(props) {
  // let radiostations = [];
  let componentRef = useRef(null);
  const classes = useStyles();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [startLoading, setStartLoading] = useState(false);
  const [stopLoading, setStopLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selected, setSelected] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  //Muliple Radio Station Selection
  const [selectRadioStations, setSelectRadioStations] = React.useState([]);
  const [country, setCountry] = React.useState("");
  const [dropDownCountry, setDropDownCountry] = React.useState([]);
  //For check the checkbox
  const [subscribedRadioStations, setSubscribedRadioStations] = React.useState(
    []
  );
  //For pass the radio station in api
  const [subscribedRadioStation, setSubscribedRadioStation] = React.useState(
    []
  );

  const Placeholder = ({ children }) => {
    return <div className={classes.placeholder}>{children}</div>;
  };
  const useStyleClasses = useStyles();
  const [defaultData, setDefaultData] = useState(false);
  const [dataSearch, setDataSearch] = React.useState("");
  const [tableData, setTableData] = React.useState([]);
  const [totalCount, setTotalCount] = React.useState(0);
  const [page, setTotalPage] = React.useState(0);
  const [pagingCount, setTotalPageCount] = React.useState(0);
  const [error, setError] = React.useState("");
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
    if(tableData.length<=0){
      searchMethod(0,5,'')
    }
    if (props.radiostations.length <= 0) {
      props.fetchRadioStations(0, 5);
      setPageCount(props.page);
      // props.fetchAllRadioStations(0, 620);
    }
  }, []);
  useEffect(() => {
    if (defaultData === true) {
      props.fetchRadioStations(0, 5);
      setDefaultData(false);
      setSearchValue('')
    }
  }, [defaultData]);

  const searchMethod = (_offset, rowPerPage, searchText) =>{
    Communication.searchRadioStation(5, 0, searchText).then((res) =>{
      log("Search Result", res)
      setTableData(res.docs);
      setTotalCount(res.totalDocs);
      setTotalPage(res.totalPages);
      setError("");
    }
    ).catch(err=>log('Error',err));
  }

  const onCountryChange = (e) => {
    log("Country Change", e);
    setCountry(e);
    Communication.fetchRadioStationsAccToCountry(e)
      .then((res) => {
        log("Response", res);
        setDropDownCountry(res);
      })
      .catch((err) => log("Error", err));
  };

  const onRadioStationChange = (e) => {
    log("Radio Station Change", e.target.value);
    setSelectRadioStations(e.target.value);
  };

  const onSubscribe = (e) => {
    e.preventDefault();
    log("Subscribe Radio Station", subscribedRadioStation);
    Communication.radioStationSubscribed(subscribedRadioStation)
      .then((res) => {
        log("Response Of Subscribed", res);
        cogoToast.success(
          res.passedData.length +
            " Radios Station Subscribed out of " +
            subscribedRadioStation.length
        );
        setSubscribedRadioStation([]);
        setSubscribedRadioStations([]);
        setSelectRadioStations([]);
        setCountry("");
      })
      .catch((err) => {
        log("Error", err);
        cogoToast.error(err.message);
      });
  };
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handlePageChange = async (event, value) => {
    const limit = 5;
    const page = value;
    props.fetchRadioStations(value, limit);
    setPageCount(event);
    setSelectedRows([]);
    setSelected([]);
  };

  const onSearchChange = (searchText) => {
    console.log("Search Change", searchText);
    setSearchValue(searchText);
    searchMethod(5,0,searchValue)  
  };

  const onDelete = () => {
    const data = { ids: selectedRows };
    log("Delete Radio Stations", data);
    Communication.onDeleteRadioStations(data)
      .then((res) => {
        log("Response", res);
        props.fetchRadioStations(0, 5);
        setSelectRadioStations([]);
        setSelectedRows([]);
        setSelected([]);
      })
      .catch((err) => log("Error", err));
  };

  const onStart = () => {
    log("Start Selected Radio Station", selectedRows);
    const data = { ids: selectedRows };
    log("Start Radio Stations", data);
    Communication.onStartRadioStations(data)
      .then((res) => {
        log("Response", res);
        props.fetchRadioStations(0, 5);
        setSelectRadioStations([]);
        setSelectedRows([]);
        setSelected([]);
      })
      .catch((err) => log("Error", err));
  };

  const onStop = () => {
    const data = { ids: selectedRows };
    log("Stop Radio Stations", data);
    Communication.onStopRadioStations(data)
      .then((res) => {
        log("Response", res);
        props.fetchRadioStations(0, 5);
        setSelectedRows([]);
        setSelected([]);
      })
      .catch((err) => log("Error", err));
      setPageCount(props.page);
  };

  const isSelected = (radiostation_id) => {
    return selected.includes(radiostation_id);
  };

  const isSelectedRadioStation = (radiostation_id) => {
    log(radiostation_id);
    return subscribedRadioStations.includes(radiostation_id);
  };

  const handleSelectAllClick = (event) => {
    log("Event", event.target.checked);
    if (event.target.checked) {
      const newSelecteds = props.radiostations.docs.map((data) => data._id);
      // const data = "radio":{newSelecteds}
      log("All Stations", newSelecteds);
      setSelectedRows(newSelecteds);
      setSelected(newSelecteds);
      return;
    }
    setSelectedRows([]);
    setSelected([]);
  };

  const checkBox = (event, _id) => {
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

  const checkBoxForSubscribed = (event, _id) => {
    if (event.target.checked) {
      // setSubscribedRadioStation([...subscribedRadioStation, _id]);
      setSubscribedRadioStation([
        ...subscribedRadioStation,
        {
          radio: _id,
        },
      ]);
      setSubscribedRadioStations([...subscribedRadioStations, _id]);
    } else {
      const index = selectedRows.indexOf(_id);
      subscribedRadioStation.splice(index, 1);
      setSubscribedRadioStation([...subscribedRadioStation]);
      const index2 = selected.indexOf(_id);
      subscribedRadioStations.splice(index2, 1);
      setSubscribedRadioStations([...subscribedRadioStations]);
    }
  };
  return (
    <>
      <Grid className={classes.container} elevation={8}>
        <Grid item className={classes.header}>
          <div>
            <Typography className={classes.heading}>
              Sonic StreamReader
            </Typography>
            <Typography className={classes.subHeading}>
              List {props.totalRadioStreams} radio stations
            </Typography>
          </div>
          <Search
            searchData={onSearchChange}
            dataSearch={dataSearch}
            setDataSearch={setDataSearch}
            setDefaultData={setDefaultData}
          />
        </Grid>
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
          <Grid style={{ margin: 10 }}>
            <Grid item>
              <Button
                disabled={selectedRows.length > 0 ? false : true}
                className={[
                  useStyleClasses.homeTableDelete,
                  "customButton",
                ].join(" ")}
                onClick={() => {
                  onStart();
                }}
                style={{ ...styles.submitButton, marginRight: 10 }}
              >
                {startLoading ? (
                  <ButtonSpinner grow={true} />
                ) : (
                  <div style={{ justifyContent: "center", display: "flex" }}>
                    <PlayCircleOutlineRoundedIcon className={classes.buttons} />
                    <label
                      style={{
                        marginTop: 2,
                        textTransform: "none",
                        color: "#343F84",
                      }}
                    >
                      Start
                    </label>
                  </div>
                )}
              </Button>
              <Button
                disabled={selectedRows.length > 0 ? false : true}
                className={[
                  useStyleClasses.homeTableDelete,
                  "customButton",
                ].join(" ")}
                onClick={() => {
                  onStop();
                }}
                style={{ ...styles.submitButton }}
              >
                {stopLoading ? (
                  <ButtonSpinner grow={true} />
                ) : (
                  <div style={{ justifyContent: "center", display: "flex" }}>
                    <StopOutlinedIcon className={classes.buttons} />
                    <label
                      style={{
                        marginTop: 2,
                        textTransform: "none",
                        color: "#343F84",
                      }}
                    >
                      Stop
                    </label>
                  </div>
                )}
              </Button>
              <Button
                disabled={selectedRows.length > 0 ? false : true}
                className={[
                  useStyleClasses.homeTableDelete,
                  "customButton",
                ].join(" ")}
                onClick={() => {
                  onDelete();
                }}
                style={{
                  ...styles.submitButton,
                  marginRight: 10,
                  marginLeft: 15,
                }}
              >
                {deleteLoading ? (
                  <ButtonSpinner grow={true} />
                ) : (
                  <div style={{ justifyContent: "center", display: "flex" }}>
                    <CancelOutlinedIcon className={classes.buttons} />
                    <label
                      style={{
                        marginTop: 2,
                        textTransform: "none",
                        color: "#343F84",
                      }}
                    >
                      Delete
                    </label>
                  </div>
                )}
              </Button>
            </Grid>
          </Grid>
          <Grid item>
            <FormControl style={{}}>
              <InputLabel
                id="mutiple-checkbox-label"
                style={{ paddingLeft: 30, color: "grey" }}
              >
                Select country of station
              </InputLabel>
              <Select
                id="drop-down"
                onChange={(e) => onCountryChange(e.target.value)}
                className="form-control mb-0"
                value={country}
                displayEmpty
                // renderValue={
                //   country !== ""
                //     ? undefined
                //     : () => <Placeholder>Select country of station</Placeholder>
                // }
                autoWidth={false}
                style={{
                  color: "black",
                  backgroundColor: "transparent",
                  outline: "none",
                  border: "none",
                  boxShadow: "none",
                  margin: "0px 30px 0px 20px",
                  width: 220,
                }}
              >
                <MenuItem value="Austria">Austria</MenuItem>
                <MenuItem value="France">France</MenuItem>
                <MenuItem value="Germany">Germany</MenuItem>
              </Select>
            </FormControl>
            <FormControl style={styles.formControl}>
              <InputLabel
                id="mutiple-checkbox-label"
                style={{ paddingLeft: 30, color: "grey" }}
              >
                Select Radio
              </InputLabel>
              <Select
                id="drop-down"
                className="form-control mb-0"
                onChange={onRadioStationChange}
                value={selectRadioStations}
                input={<Input />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
                disabled={country === ""}
                style={{
                  color: "black",
                  backgroundColor: "transparent",
                  outline: "none",
                  border: "none",
                  boxShadow: "none",
                  margin: "0px 30px 0px 20px",
                  width: 220,
                }}
                multiple
              >
                {dropDownCountry?.docs?.map((country, index) => {
                  const isItemSelected = isSelectedRadioStation(country?._id);
                  return (
                    <MenuItem
                      key={index}
                      value={country?.name}
                      otherDetails={country}
                    >
                      <Checkbox
                        color="#343F84"
                        onChange={(e) => checkBoxForSubscribed(e, country?._id)}
                        checked={isItemSelected}
                      />
                      <ListItemText primary={country?.name} />
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              style={{
                padding: 12,
                borderRadius: 5,
                background: "rgb(52, 63, 132)",
                marginTop: 5,
                marginLeft: 20,
              }}
              onClick={onSubscribe}
            >
              Subscribe
            </Button>
          </Grid>
        </Paper>
        <TableContainer style={{ ...tableStyle.container }}>
          <Table aria-label="Stream Reader">
            <TableHead>
              <TableRow hover>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="#343F84"
                    checked={
                      selected.length === radiostations?.docs?.length
                        ? true
                        : false
                    }
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
                const isItemSelected = isSelected(file?._id);
                return (
                  <TableRow key={file?._id} hover className={classes.tableRow}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="#343F84"
                        onChange={(e) => checkBox(e, file?._id)}
                        checked={isItemSelected}
                      />
                    </TableCell>

                    <TableCell style={{ ...tableStyle.body }}>
                      {props.offset + index + 1}
                    </TableCell>
                    <TableCell>
                      <img src={IconTick} />
                      {/* <CheckCircleOutlineRoundedIcon style={{ fontSize: 15 }} /> */}
                    </TableCell>
                    <TableCell style={{ ...tableStyle.body, fontSize: 15 }}>
                      {file?.radio?.name}
                    </TableCell>
                    <Tooltip title={file?.radio?.streamingUrl}>
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
                        {file?.radio?.streamingUrl}
                      </TableCell>
                    </Tooltip>
                    <TableCell style={{ ...tableStyle.body, color: "#757575" }}>
                      {moment(new Date(file?.createdAt)).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell style={{ ...tableStyle.body }}>
                      <Hits radioId={file?._id} key={file?._id} />
                    </TableCell>
                    <TableCell>
                      {file?.isListeningStarted === true && (
                        <Badge
                          style={{
                            cursor: "pointer",
                            background: "rgb(229, 245, 244)",
                            color: "rgb(72, 187, 183)",
                            padding: 5,
                            fontWeight: "lighter",
                          }}
                        >
                          LISTENING
                        </Badge>
                      )}
                      {file?.isListeningStarted === false &&
                        file.error === null && (
                          <Badge
                            style={{
                              fontSize: 15,
                              cursor: "pointer",
                              background: "rgb(244, 237, 151)",
                              color: "rgb(183, 170, 53)",
                              padding: 5,
                              marginLeft: 10,
                            }}
                          >
                            NOT LISTENING
                          </Badge>
                        )}
                      {file?.isListeningStarted === false &&
                        file.error !== null && (
                          <Badge
                            style={{
                              fontSize: 15,
                              cursor: "pointer",
                              background: "rgb(242, 125, 162)",
                              color: "rgb(130, 24, 13)",
                              padding: 5,
                              marginLeft: 10,
                            }}
                          >
                            ERROR
                          </Badge>
                        )}
                    </TableCell>
                    <TableCell
                      style={{ ...tableStyle.body }}
                      onClick={() => {
                        localStorage.setItem(
                          "passedData",
                          JSON.stringify(file)
                        );
                        props.history.push({
                          pathname: `/sonicstreamdetail`,
                          search: `?radioStationId=${file._id}`,
                        });
                      }}
                    >
                      <img src={IconEdit} /> Details
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <Pagination
            count={props.totalPage}
            page={props.page}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
          />
        </TableContainer>
      </Grid>
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
    height: "20px",
    color: "black",
    fontWeight: "bold",
    width: 80,
    //border: "none",
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
    page: state.radioStations.page,
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
    fetchAllRadioStations: (_offset, _limit) =>
      dispatch(actionCreators.fetchAllCardRadioStation(_offset, _limit)),

    setRadiostationPageNum: (page) =>
      dispatch(actionCreators.setRadiostationPageNum(page)),
    setRadiostationRowsperPage: (rowsPerPage) =>
      dispatch(actionCreators.setRadiostationRowsperPage(rowsPerPage)),
    dispatch: dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SonicStreamReader);
