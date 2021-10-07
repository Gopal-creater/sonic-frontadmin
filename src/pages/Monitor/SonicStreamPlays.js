import {
  Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, Input, InputLabel, makeStyles, MenuItem,
  Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme,
} from "@material-ui/core";
import React, { forwardRef, useEffect, useState } from "react";
import { tableStyle } from "../../globalStyle";
import UnfoldMoreSharpIcon from "@material-ui/icons/UnfoldMoreSharp";
import { log } from "../../utils/app.debug";
import LoadingSpinner from "./Components/LoadingSpinner";
import ErrorModal from "./Components/ErrorModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchThirdPartySonicKeys } from "../../stores/actions/thirdPartySonicKey";
import { isValid, format } from "date-fns";
import { converstionOfKb } from "../../utils/HelperMethods";
import DailogTable from "../../components/common/DialogTable";
import CloseIcon from "@material-ui/icons/Close";
import CalendarLogo from "../../../src/assets/icons/icon-calendar.png";
import viewFilter from "../../../src/assets/images/view.png";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";
import HitModal from "./Components/HitModal";


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
    fontSize: 15,
    marginRight: 6,
    marginTop: 5,
  },
  tableRow: {
    "&:hover": {
      boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 1px 5px rgba(0,0,0,0.22)",
      cursor: "pointer",
    },
  },
  dialogPaper: {
    minHeight: "75vh",
    maxHeight: "75vh",
    margin: "auto",
  },
  tableCellOne: {
    padding: "5px",
    fontWeight: "bold",
    fontSize: "12px",
    color: "#ACACAC",
  },
  tableCellTwo: {
    padding: "5px",
    fontWeight: "700",
    fontSize: "14px",
    color: "#757575",
  },
  placeholder: {
    color: "#aaa",
  },
  columnFilter: {
    position: "absolute",
    marginTop: 10,
    display: "none",
    backgroundColor: "#ffffff",
    borderRadius: "5px",
    minWidth: "100px",
    padding: "10px",
    maxWidth: "400px",
    width: "fit-content",
    right: 50,
    boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 1px 5px rgba(0,0,0,0.22)",
    "&.active": {
      display: "block",
    },
    zIndex: 1
  },
  closeDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
  },
}));

export const SonicStreamPlays = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const plays = useSelector(state => state.thirdPartyKeys)
  log("plays", plays)

  const theme = useTheme();
  const [sonicKey, setSonicKey] = React.useState({
    sonicKey: "",
    contentName: "",
    contentOwner: "",
    contentValidation: "",
    contentQuality: "",
    contentDescription: "",
    contentFileName: "",
    contentFileType: "",
    createdAt: new Date(),
    contentDuration: "",
    encodingStrength: "",
    contentSize: "",
    contentSamplingFrequency: "",
    additionalMetadata: {},
    iswcCode: "",
    isrcCode: "",
    tuneCode: "",
    contentType: "",
  });

  const columns = [
    "ID",
    "SONICKEY",
    "NAME",
    "ARTIST",
    "QUALITY",
    "DESCRIPTION",
    "HITS",
  ];
  const [filterColumn, setFilterColumn] = useState([
    "ID",
    "SONICKEY",
    "NAME",
    "ARTIST",
    "QUALITY",
    "DESCRIPTION",
    "HITS",
  ]);

  const [values, setValues] = React.useState({
    startDate: new Date().setMonth(new Date().getMonth() - 1),
    endDate: new Date(),
    channelName: "PORTAL",
    sonicDetailModal: false,
    openHitModal: false,
    hitModalData: {},
  })


  useEffect(() => {
    dispatch(fetchThirdPartySonicKeys(10, 1, values?.channelName, values?.startDate, values?.endDate))
  }, []);

  function fetchSonicKeyById(response) {
    setSonicKey({
      ...sonicKey,
      sonicKey: response.sonicKey,
      contentName: response.contentName,
      contentOwner: response.contentOwner,
      contentValidation: response.contentValidation ? "YES" : "NO",
      contentQuality: response.contentQuality,
      contentDescription: response.contentDescription,
      contentFileName: response.contentFileName,
      contentFileType: response.contentFileType,
      createdAt: isValid(new Date(response.createdAt))
        ? `${format(new Date(response.createdAt), "dd/MM/yyyy")}`
        : "--",
      contentDuration: response?.contentDuration.toFixed(2),
      encodingStrength: response.encodingStrength,
      contentSize: converstionOfKb(response.contentSize),
      contentSamplingFrequency: response?.contentSamplingFrequency?.replace(
        "Hz",
        ""
      ),
      additionalMetadata: response?.additionalMetadata?.message || "",
      iswcCode: response.iswcCode ? response.iswcCode.toUpperCase() : "",
      isrcCode: response.isrcCode ? response.isrcCode.toUpperCase() : "",
      tuneCode: response.tuneCode ? response.tuneCode.toUpperCase() : "",
      contentType: response?.contentType,
    });
    setValues({ ...values, sonicDetailModal: true, selectedSonicKey: response })
  }

  const isSelected = (radiostation_id) => {
    return filterColumn.includes(radiostation_id);
  };

  const checkBox = (event, _id) => {
    console.log(_id, event.target.checked);
    if (event.target.checked) {
      console.log("column1:", event, _id);
      setFilterColumn([...filterColumn, _id]);
    } else {
      const index = filterColumn.indexOf(_id);
      filterColumn.splice(index, 1);
      setFilterColumn([...filterColumn]);
    }
  };

  const StartDateInput = forwardRef(({ value, onClick }, ref) => (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label style={{ fontSize: 12, color: "grey", fontWeight: "bold" }}>
          Start Date
        </label>
        <Input
          value={value}
          style={{
            color: "grey",
            fontSize: 20,
            fontWeight: "lighter",
            width: 140,
            cursor: "pointer",
          }}
          className="input-date-picker"
          onClick={onClick}
          ref={ref}
        />
      </div>
    </>
  ));

  const EndDateInput = forwardRef(({ value, onClick }, ref) => (
    <>
      <Grid style={{ display: "flex", flexDirection: "column" }}>
        <label style={{ fontSize: 12, color: "grey", fontWeight: "bold" }}>
          End Date
        </label>
        <Input
          value={value}
          style={{
            color: "grey",
            fontSize: 20,
            fontWeight: "lighter",
            width: 140,
          }}
          className="input-date-picker"
          onClick={onClick}
          ref={ref}
        />
      </Grid>
    </>
  ));

  return (
    <Grid className={classes.container} elevation={8}>
      <Grid item className={classes.header} id="header">
        <div>
          <Typography className={classes.heading}>Plays</Typography>
          <Typography className={classes.subHeading}>
            See history of SonicKey plays
          </Typography>
        </div>

        <Grid style={{ display: "flex" }}>
          {/* <div style={{ backgroundColor: '', marginRight: '25px' }} >
        <Search  searchData={onSearchChange} 
          dataSearch={dataSearch} 
          setDataSearch={setDataSearch} 
          setDefaultData={setDefaultData} /></div> */}

          <img
            src={viewFilter}
            style={{ cursor: "pointer" }}
            height="20"
            onClick={() => { document.getElementById("columnFilter").classList.add("active") }}
          />
          <div id="columnFilter" className={classes.columnFilter}>
            <div className={classes.closeDiv}>
              <div>Show Columns</div>
              <div>
                <CloseIcon onClick={() => document.getElementById("columnFilter").classList.remove("active")} />
              </div>
            </div>
            <FormGroup column>
              {columns?.map((col) => {
                const isItemSelected = isSelected(col);
                return (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isItemSelected}
                        onChange={(e) => checkBox(e, col)}
                        className={classes.checkBoxSytle}
                        color="default"
                      />
                    }
                    label={col}
                  />
                );
              })}
            </FormGroup>
          </div>

        </Grid>
      </Grid>

      <Paper maxWidth="lg" id="dates and channels"
        style={{
          marginTop: 20,
          marginBottom: 20,
          padding: 14,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Grid
          style={{
            width: "100%",
            display: "flex",
            alignItems: "row",
            justifyContent: "space-between",
          }}
        >
          <Grid item id="dates"
            style={{
              display: "flex",
              alignItems: "row",
            }}
          >
            <img
              src={CalendarLogo}
              style={{
                width: 20,
                height: 18,
                margin: 15,
                marginTop: 28,
              }}
            />
            <Grid item style={{ width: 140 }}>
              <DatePicker
                selected={values?.startDate}
                onChange={(date) => setValues({ ...values, startDate: date })}
                customInput={<StartDateInput />}
                dateFormat="MMM d,yyyy"
              />
            </Grid>
            <label
              style={{
                marginTop: 20,
                marginLeft: 10,
                marginRight: 10,
                fontSize: 20,
                color: "grey",
              }}
            >
              to
            </label>
            <Grid item style={{ width: 140 }}>
              <DatePicker
                selected={values?.endDate}
                onChange={(date) => setValues({ ...values, endDate: date })}
                customInput={<EndDateInput />}
                dateFormat="MMM d,yyyy"
              />
            </Grid>
          </Grid>

          <Grid item id="filter channels">
            <FormControl style={styles.formControl}>
              <InputLabel
                id="mutiple-checkbox-label"
                style={{
                  paddingLeft: 30,
                  color: "grey",
                  paddingBottom: 50,
                  marginBottom: 20,
                }}
              >
                Filter by channel
              </InputLabel>

              <Select
                id="drop-down"
                onChange={(e) => setValues({ ...values, channelName: e.target.value })}
                className="form-control"
                value={values?.channelName}
                autoWidth={false}
                style={{
                  color: "#757575",
                  backgroundColor: "transparent",
                  outline: "none",
                  border: "none",
                  boxShadow: "none",
                  margin: "10px 30px 0px 20px",
                  width: 220,
                }}
              >
                <MenuItem value="STREAMREADER">StreamReader</MenuItem>
                <MenuItem value="PORTAL">SonicPortal</MenuItem>
                <MenuItem value="MOBILEAPP">SonicApp</MenuItem>
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
                marginLeft: 30,
              }}
              onClick={() => dispatch(fetchThirdPartySonicKeys(10, 1, values?.channelName, values?.startDate, values?.endDate))}
            >
              Filter
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {!plays.loading ? (
        <TableContainer style={{ ...tableStyle.container, width: "100%" }}>
          <Table aria-label="Detail table">
            <TableHead>
              <TableRow hover>
                {columns?.map((col) => {
                  const isItemSelected = isSelected(col);
                  return (
                    <TableCell style={{ ...tableStyle.head }}>
                      {isItemSelected && (
                        <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                          {col}
                          <UnfoldMoreSharpIcon
                            style={{ fontSize: 12, fontWeight: "bold" }}
                            className="sortIcon"
                          />
                        </div>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {plays?.data?.docs?.length > 0 ? (
                plays?.data?.docs?.map((file, index) => {
                  return (
                    <TableRow hover className={classes.tableRow}>
                      <TableCell style={{ ...tableStyle.body }}>
                        {isSelected("ID") && (plays?.data?.page * 10 - (10 - (index + 1)))}
                      </TableCell>

                      <TableCell
                        style={{
                          ...tableStyle.body,
                          fontSize: 15,
                          cursor: "pointer",
                        }}
                        onClick={() => fetchSonicKeyById(file?.sonicKey)}
                      >
                        {isSelected("SONICKEY") && file?.sonicKey?.sonicKey}
                      </TableCell>

                      <TableCell
                        style={{ ...tableStyle.body, color: "#757575" }}
                      >
                        {isSelected("NAME") && file?.sonicKey?.contentName !== "" ?
                          file?.sonicKey?.contentName :
                          file?.sonicKey?.originalFileName !== "" ?
                            file?.sonicKey?.originalFileName : ""}
                      </TableCell>

                      <TableCell
                        style={{ ...tableStyle.body, color: "#757575" }}
                      >
                        {isSelected("ARTIST") && file?.sonicKey?.contentOwner}
                      </TableCell>

                      <TableCell
                        style={{ ...tableStyle.body, color: "#757575" }}
                      >
                        {isSelected("QUALITY") &&
                          file?.sonicKey?.contentQuality}
                      </TableCell>

                      <TableCell
                        style={{ ...tableStyle.body, color: "#757575" }}
                      >
                        {isSelected("DESCRIPTION") &&
                          file?.sonicKey?.contentDescription}
                      </TableCell>

                      <TableCell
                        onClick={() => setValues({ ...values, openHitModal: true, hitModalData: { ...file?.sonicKey, totalHits: file?.totalHits } })}
                        style={{ ...tableStyle.body, cursor: "pointer" }}
                      >
                        {isSelected("HITS") && file?.totalHits}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align={"center"}>
                    No Data
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : plays?.loading ? (
        <LoadingSpinner
          multipleGrow={true}
          containerStyle={{ height: window.innerHeight / 2 }}
        />
      ) : (
        <ErrorModal
          errorData={plays?.error}
          additionalStyle={{ height: window.innerHeight / 2 }}
        />
      )}

      {values?.sonicDetailModal && (
        <DailogTable
          sonicKey={sonicKey}
          open={true}
          setOpenTable={(flag) => setValues({ ...values, sonicDetailModal: flag })}
        />
      )}

      {/*Update Table Detail on row click Up */}
      {values?.openHitModal && (
        <HitModal
          closeHitModal={(flag) => setValues({ ...values, openHitModal: flag })}
          startDate={values?.startDate}
          endDate={values?.endDate}
          channel={values?.channelName}
          sonicKeyData={values?.hitModalData}
        />
      )}

      <Pagination
        count={plays?.data?.totalPages}
        page={plays?.page}
        variant="outlined"
        shape="rounded"
        onChange={(event, value) => dispatch(fetchThirdPartySonicKeys(10, value, values?.channelName, values?.startDate, values?.endDate))}
      />
    </Grid>
  );
};

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

