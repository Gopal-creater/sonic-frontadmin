import {
  Badge,
  Button,
  FormControl,
  Grid,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { tableStyle } from "../../globalStyle";
import UnfoldMoreSharpIcon from "@material-ui/icons/UnfoldMoreSharp";
import { log } from "../../utils/app.debug";
import queryString from "query-string";
import Communication from "../../services/https/Communication";
import LoadingSpinner from "./Components/LoadingSpinner";
import ErrorModal from "./Components/ErrorModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
}));

export const SonicStreamPlays = (props) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const columns = [
    "ID",
    "SONICKEY",
    "NAME",
    "ARTIST",
    "QUALITY",
    "DESCRIPTION",
    "HITS",
  ];

  const tableData = [
    {
      contentDescription: "Sample audio",
      contentName: "Radio Sonic Sample",
      contentOwner: "Kevin MacLeod",
      contentQuality: "Goof",
      sonicKey: "WvvICMde2SH",
      hits: "15",
    },
    {
      contentDescription: "Sample audio2",
      contentName: "Radio Sonic Sample",
      contentOwner: "Kevin MacLeod",
      contentQuality: "Average",
      sonicKey: "HWvvICMde2S",
      hits: "15",
    },
  ];
  return (
    <Grid className={classes.container} elevation={8}>
      <Grid style={{ display: "flex", justifyContent: "space-between" }}>
    
      </Grid>
      <Grid item className={classes.header}>
        <div>
          <Typography className={classes.heading}>
            Plays
          </Typography>
          <Typography className={classes.subHeading}>
            See history of SonicKey plays
          </Typography>
        </div>
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
          {/* <Grid style={{ margin: 10,flexDirection: "row",
             }}>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            to
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            
            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
            </LocalizationProvider> 
            </Grid> */}
            <div style={{width:500,display:'flex',alignItems:'row',margin:15}}>
            <DatePicker wrapperClassName={styles.formControl} selected={startDate} onChange={(date) => setStartDate(date)} />
            to
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            </div>
            <Grid>
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
                <MenuItem value="sonicreader">StreamReader</MenuItem>
                <MenuItem value="sonicportal">SonicPortal</MenuItem>
                <MenuItem value="sonicapp">SonicApp</MenuItem>
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
                <MenuItem value="sonicreader">StreamReader</MenuItem>
                <MenuItem value="sonicportal">SonicPortal</MenuItem>
                <MenuItem value="sonicapp">SonicApp</MenuItem>
              </Select>
            </FormControl>
            <FormControl>            
            <Button
              variant="contained"
              color="primary"
              style={{
                padding: 12,
                borderRadius: 5,
                background: "rgb(52, 63, 132)",
                marginTop:5
              }}
            >
              Filter
            </Button></FormControl>
            
            </Grid>

        </Paper>
        
      {!loading && !error ? (
        <TableContainer style={{ ...tableStyle.container }}>
          <Table aria-label="Detail table">
            <TableHead>
              <TableRow hover>
                {columns?.map((col) => {
                  return (
                    <TableCell style={{ ...tableStyle.head }}>
                      {col}
                      <UnfoldMoreSharpIcon
                        style={{ fontSize: 12, fontWeight: "bold" }}
                        //   onClick={handleSort("id", prop.propFrom)}
                        className="sortIcon"
                      />
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData?.map((file, index) => {
                log(file);
                return (
                  <TableRow>
                    <TableCell style={{ ...tableStyle.body }}>
                      {index + 1}
                    </TableCell>
                    <TableCell style={{ ...tableStyle.body, fontSize: 15 }}>
                      {file?.sonicKey}
                    </TableCell>
                    <TableCell style={{ ...tableStyle.body, color: "#757575" }}>
                      {file?.contentName}
                    </TableCell>
                    <TableCell style={{ ...tableStyle.body, color: "#757575" }}>
                      {file?.contentOwner}
                    </TableCell>
                    <TableCell style={{ ...tableStyle.body, color: "#757575" }}>
                      {file?.contentQuality}
                    </TableCell>
                    <TableCell style={{ ...tableStyle.body, color: "#757575" }}>
                      {file?.contentDescription}
                    </TableCell>
                    <TableCell
                      style={{ ...tableStyle.body, cursor: "pointer" }}
                    >
                      {file?.hits}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : loading ? (
        <LoadingSpinner
          multipleGrow={true}
          containerStyle={{ height: window.innerHeight / 2 }}
        />
      ) : (
        <ErrorModal
          errorData={error}
          additionalStyle={{ height: window.innerHeight / 2 }}
        />
      )}
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SonicStreamPlays);
