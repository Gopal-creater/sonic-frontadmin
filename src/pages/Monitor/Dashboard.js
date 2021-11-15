import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import BackgoundCard from "./Components/BackgoundCard";
import Paper from "@material-ui/core/Paper";
import GraphCard from "./Components/GraphCard";
import InfoCard from "./Components/InfoCard";
import InfoIcon from "@material-ui/icons/Info";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import MusicOffIcon from "@material-ui/icons/MusicOff";
import CancelIcon from "@material-ui/icons/Cancel";
import CloseIcon from "@material-ui/icons/Close";
import StorageIcon from "@material-ui/icons/Storage";
import ReorderIcon from "@material-ui/icons/Reorder";
import Communication from "../../services/https/Communication";
import { log } from "../../utils/app.debug";
import { connect } from "react-redux";
import * as actionCreators from "../../stores/actions/index";
import { cloneDeep } from "lodash";
import { monthRange, todayRange, weekRange } from "../../utils/HelperMethods";
import LoadingSpinner from "./Components/LoadingSpinner";
import ErrorModal from "./Components/ErrorModal";

const useStyles = makeStyles((theme) => ({
  EncodeDecodeContainer: {
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

export function Dashboard(props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalCount, setTotalCount] = useState("");
  const [errorCount, setErrorCount] = useState("");
  const [listeningCount, setListeningCount] = useState("");
  const [notlisteningCount, setNotListeningCount] = useState("");

  const fetchDetectionCount = (param) => {
    setLoading(true)
    setError('')
    Communication.getCount(param)
      .then((res) => {
        console.log("Count res", res);
        if (param === "?isListeningStarted=true") {
          setListeningCount(res);
        } else if (param === "?isListeningStarted=false") {
          setNotListeningCount(res);
        } else if (param === "?isError=true") {
          setErrorCount(res);
        } else if (param === undefined) {
          setTotalCount(res);
        }
        setLoading(false)
        setError("");
      })
      .catch((err) => {
        setLoading(false)
        setError(err);
      });
  };
  useEffect(() => {
    log("DashBoard");
    fetchDetectionCount(`?isListeningStarted=true`);
    fetchDetectionCount(`?isListeningStarted=false`);
    fetchDetectionCount(`?isError=true`);
    fetchDetectionCount();
    props.fetchTopRadioStation()
    props.fetchDaySonicKeyCount(todayRange().split(','))
    props.fetchWeekSonicKeyCount(weekRange().split(','));
    props.fetchMonthSonicKeyCount(monthRange(false, true).split(','));
  }, []);

  const classes = useStyles();
  return (
    <div style={{ backgroundColor: "aqua", minWidth: "50vw" }}>
      <Paper className={classes.EncodeDecodeContainer}>
        {/* <BackgoundCard header='Dashboard' subheader='View SonicKeys Streaming' /> */}
        <Grid item className={classes.header}>
          <div>
            <Typography className={classes.heading}>Dashboard</Typography>
            <Typography className={classes.subHeading}>
              List {totalCount} radio stations
            </Typography>
          </div>
        </Grid>
        <div style={{ padding: 10, marginTop: 25 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3} lg={3}>
              {!loading && !error ? (
                <InfoCard
                  totalRadioStreams={totalCount}
                  title="Realtime listening"
                  bgColor="rgb(229, 245, 244)"
                  count={listeningCount}
                ></InfoCard>
              ) : loading ? (
                <LoadingSpinner
                //  multipleGrow={true}
                //  containerStyle={{ height: window.innerHeight / 2 }}
                />
              ) : (
                <ErrorModal
                  errorData={error}
                  onReload={() => {
                    fetchDetectionCount(`?isListeningStarted=true`);
                  }}
                  additionalStyle={{ height: window.innerHeight / 2 }}
                />
              )}
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3}>
              {!props.hitsLoading && !props.hitsError ? (
                <InfoCard
                  title="SonicKeys Detected"
                  bgColor="rgb(229, 245, 244)"
                  day={props.day}
                  week={props.week}
                  month={props.month}
                ></InfoCard>
              ) : props.hitsLoading ? (
                <LoadingSpinner
                  // multipleGrow={true}
                  // containerStyle={{ height: window.innerHeight / 2 }}
                />
              ) : (
                <ErrorModal
                  errorData={props.error}
                  onReload={() => {
                    props.fetchDaySonicKeyCount(todayRange().split(","));
                    props.fetchWeekSonicKeyCount(weekRange().split(","));
                    props.fetchMonthSonicKeyCount(
                      monthRange(false, true).split(",")
                    );
                  }}
                  additionalStyle={{ height: window.innerHeight / 2 }}
                />
              )}
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3}>
              {!loading && !error ? (
                <InfoCard
                  totalRadioStreams={totalCount}
                  title="Currently not Listening"
                  bgColor="rgb(244, 244, 244)"
                  count={notlisteningCount}
                ></InfoCard>
              ) : loading ? (
                <LoadingSpinner
                  // multipleGrow={true}
                  // containerStyle={{ height: window.innerHeight / 2 }}
                />
              ) : (
                <ErrorModal
                  errorData={error}
                  onReload={() => {
                    fetchDetectionCount(`?isListeningStarted=false`);
                    
                  }}
                  additionalStyle={{ height: window.innerHeight / 2 }}
                />
              )}
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3}>
              {!loading && !error ? (
                <InfoCard
                  totalRadioStreams={totalCount}
                  title="Error Streams"
                  bgColor="rgb(244, 244, 244)"
                  count={errorCount}
                ></InfoCard>
              ) : loading ? (
                <LoadingSpinner
                  // multipleGrow={true}
                  // containerStyle={{ height: window.innerHeight / 2 }}
                />
              ) : (
                <ErrorModal
                  errorData={props.error}
                  onReload={() => {
                    fetchDetectionCount(`?isError=true`);
                   
                  }}
                  additionalStyle={{ height: window.innerHeight / 2 }}
                />
              )}
            </Grid>
          </Grid>

          <div style={{ marginTop: 50 }}>
          {!props.loading && !props.error ?
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <GraphCard
                  preTitle={"First Highest"}
                  graphData={[
                    1265,
                    1749,
                    2010,
                    690,
                    455,
                    959,
                    1330,
                    1650,
                    1456,
                    520,
                    880,
                    1900,
                  ]}
                  graphBgColor={"rgb(112, 120, 168)"}
                  graphCardData={cloneDeep(props.topRadiostations[0])}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <GraphCard
                  preTitle={"Second Highest"}
                  graphData={[
                    665,
                    749,
                    610,
                    1790,
                    1455,
                    1359,
                    1330,
                    1650,
                    1456,
                    520,
                    1480,
                    900,
                  ]}
                  graphBgColor={"rgb(52, 63, 132)"}
                  graphCardData={cloneDeep(props.topRadiostations[1])}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <GraphCard
                  preTitle={"Third Highest"}
                  graphData={[
                    265,
                    749,
                    1610,
                    1690,
                    1455,
                    1559,
                    1330,
                    650,
                    456,
                    1520,
                    1280,
                    900,
                  ]}
                  graphBgColor={"rgb(0, 161, 154)"}
                  graphCardData={cloneDeep(props.topRadiostations[2])}
                />
              </Grid>
            </Grid>
          :
          props.loading || props.sessionLoading? 
          <LoadingSpinner multipleGrow={true} containerStyle={{ height:window.innerHeight/2}} />
          :
          <ErrorModal errorData={props.error} onReload={() => {
              props.fetchTopRadioStation();
          }
          } additionalStyle={{ height: window.innerHeight/2 }}/>
  }
          </div>
        </div>
      </Paper>
    </div>
  );
}
const mapStateToProps = (state) => {
  log("State", state);
  return {
    // loading : state.radiostations.loading,
    // error : state.radiostations.error,
    // radiostations : state.radiostations.radiostations,
    // totalRadioStreams : state.radiostations.totalRadioStreams,

    // sessionLoading : state.session.loading,
    // // selectedRowss : state.global.selectedRows,

    // cardRadiostations : state.cardRadioStaions.cardRadiostations,
    // totalStationsCount : state.cardRadioStaions.totalStationsCount,

    topRadiostations: state.topRadiostation.topRadiostations,
    topRadiostationsLoading: state.topRadiostation.loading,
    topRadiostationsError: state.topRadiostation.error,

    day: state.count.day,
    week: state.count.week,
    month: state.count.month,
    hits: state.count.hits,
    hitsLoading: state.count.hitsLoading,
    hitsError: state.count.hitsError,

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
    setSelectedRows: (rows) =>
      dispatch(actionCreators.setSelectedRowsRadioStationTable(rows)),
    fetchRadioStationsSuccess: (payload) =>
      dispatch(actionCreators.fetchRadioStationsSuccess(payload)),
    fetchRadioStationsFailure: (error) =>
      dispatch(actionCreators.fetchRadioStationsFailure(error)),
    fetchRadiostationSonicKeyCount: (radiostationId) =>
      dispatch(actionCreators.fetchRadiostationSonicKeyCount(radiostationId)),

    fetchDaySonicKeyCount: (tommorrow, today) =>{
      dispatch(actionCreators.fetchDaySonicKeyCount(tommorrow, today))
    },
    fetchWeekSonicKeyCount: (tommorrow, weekBack) =>
      dispatch(actionCreators.fetchWeekSonicKeyCount(tommorrow, weekBack)),
    fetchMonthSonicKeyCount: (tommorrow, monthBack) =>
      dispatch(actionCreators.fetchMonthSonicKeyCount(tommorrow, monthBack)),
    fetchTopRadioStation: () => dispatch(actionCreators.fetchTopRadioStation()),

    dispatch: dispatch,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
const styles = {
  homeContainer: {},
  // firstCardContainer : {
  //     display:'flex',
  //     // width : '100%',
  //     // border : '1px solid red',
  //     flexDirection: 'row',
  //     justifyContent: 'space-between',
  // },
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
  muiTableHeadStyle: {
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
    color: "white",
    width: 80,
    border: "none",
    borderRadius: "50px",
    backgroundColor: "blue",
    boxShadow: "0px 0px 8px 2px #000000;",
  },
};
