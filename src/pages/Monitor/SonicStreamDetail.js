import {
  Badge,
  Grid,
  makeStyles,
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
import queryString from 'query-string';
import Communication from "../../services/https/Communication";
import LoadingSpinner from "./Components/LoadingSpinner";
import ErrorModal from "./Components/ErrorModal";
import * as actionCreators from '../../stores/actions/index';
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

const columns = [
  "ID",
  "SONICKEY",
  "NAME",
  "ARTIST",
  "QUALITY",
  "DESCRIPTION",
  "HITS",
];

export const SonicStreamDetail = (props) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const parsedQueryString = queryString.parse(props.location.search);
  const [totalCount, setTotalCount] = useState(0);
   const [tableData, setTableData] = useState([]);
  const passedData = JSON.parse(localStorage.getItem("passedData"));
  // const tableData = [{
  //   "contentDescription": "Sample audio",
  //   "contentName": "Radio Sonic Sample",
  //   "contentOwner": "Kevin MacLeod",
  //   "contentQuality": "Goof",
  //   "sonicKey": "WvvICMde2SH",
  //   "hits":'15'
  //   },
  //   {
  //       "contentDescription": "Sample audio2",
  //       "contentName": "Radio Sonic Sample",
  //       "contentOwner": "Kevin MacLeod",
  //       "contentQuality": "Average",
  //       "sonicKey": "HWvvICMde2S",
  //       "hits":'15'
  //       }];  
  const firstFetchSonicKey = (_offset=0,_limit=10) => {
    setLoading(true);
    setError('');
    Communication.fetchSKForSpecificRadioStation(parsedQueryString.radioStationId,_offset,_limit)
        .then((res)=>{
            log('Result',res)
            setLoading(false);
            setError('');
        })
        .catch((error) => {
            setLoading(false);
          });      
  }

  useEffect(() => {
    log('Detail')
    firstFetchSonicKey();
  }, []);

  log('Props',props);
  return (
    <Grid className={classes.container} elevation={8}>
      <Grid style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{ fontWeight: "bold", color: "navy", cursor: "pointer" }}
          onClick={() => props.history.goBack()}
        >
          <ArrowBackIosIcon style={{ fontSize: 12, margin: "0 5 3 0" }} />
          Back
        </div>
      </Grid>
      <Grid item className={classes.header}>
        <div>
          <Typography className={classes.heading}>
            Detected SonicKeys
          </Typography>
          <Typography className={classes.subHeading}>
            Found {tableData.length} SonicKeys in {passedData.name} radio station
            {passedData.isStreamStarted === true && (
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
            {passedData.isStreamStarted === false && passedData.error === null && (
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
            {passedData.isStreamStarted === false && passedData.error !== null && (
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
          </Typography>
        </div>
        <Search  searchData={''} dataSearch={''} />
      </Grid>
      {!loading && !error ?
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
          {tableData?.docs?.map((file, index) => {
              log(file)
              return(
            <TableRow>
              <TableCell style={{ ...tableStyle.body }}>
                {index+1}
              </TableCell>
              <TableCell style={{ ...tableStyle.body,fontSize:15 }}>
                {file?.sonicKey}
              </TableCell>
              <TableCell style={{ ...tableStyle.body,color: "#757575", }}>
                {file?.contentName}
              </TableCell>
              <TableCell style={{ ...tableStyle.body,color: "#757575", }}>
                {file?.contentOwner}
              </TableCell>
              <TableCell style={{ ...tableStyle.body,color: "#757575", }}>
                {file?.contentQuality}
              </TableCell>
              <TableCell style={{ ...tableStyle.body,color: "#757575", }}>
                {file?.contentDescription}
              </TableCell>
              <TableCell style={{ ...tableStyle.body,cursor:'pointer' }}>
                {file?.hits}
              </TableCell>
            </TableRow>
            )})}
          </TableBody>
        </Table>
      </TableContainer>
        :
        loading ?
            <LoadingSpinner multipleGrow={true} containerStyle={{ height: window.innerHeight / 2 }} />
            :
            <ErrorModal errorData={error} additionalStyle={{ height: window.innerHeight / 2 }} />
    }
    </Grid>
  );
};

const mapStateToProps = (state) => {
  log('State',state)
  return {};
};

const mapDispatchToProps = (dispatch)=>{
  return{
    fetchTotalListeningCount : () => dispatch(actionCreators.fetchTotalListeningCount()),
    fetchTotalNotListeningCount : () => dispatch(actionCreators.fetchTotalNotListeningCount()),
    fetchTotalErrorCount : () => dispatch(actionCreators.fetchTotalErrorCount()),
    fetchTotalRadiostationCount : () => dispatch(actionCreators.fetchTotalRadiostationCount()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SonicStreamDetail);
