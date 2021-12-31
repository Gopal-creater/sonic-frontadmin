import { Grid, TableContainer, Button, FormControl, Select, MenuItem, InputLabel, Tooltip, Menu, IconButton, Box, Popover } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
import React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { tableStyle } from "../../../globalStyle";
import { BarGraph } from "../Components/BarGraph";
import { makeStyles } from "@material-ui/styles";
import { log } from "../../../utils/app.debug";
import { monthRange, todayRange, weekRange } from "../../../utils/HelperMethods";
import { useDispatch, useSelector } from "react-redux";
import { getExportDataAction, getGraphDataAction, getMostPlayedStationsDataAction, getTotalSonicKeysCountAction, getTotalSubscribedStationAction } from "../../../stores/actions/dashboard.action";
import { playsTableHeads } from "../../../constants/constants"
import { getPlaysListsAction } from "../../../stores/actions";
import moment from "moment";
import MetaDataDialog from "../../../components/common/MetaDataDialog";
import { useHistory } from "react-router-dom";
import SonicSpinner from "../../../components/common/SonicSpinner";
import * as actionTypes from "../../../stores/actions/actionTypes"
// import ExportIcon from '@material-ui/icons/GetApp';
import "./Dashboard.scss"

const useStyles = makeStyles((theme) => ({
  menuItems: {
    "& ul": {
      backgroundColor: "#FFFFFF",
    },
    "& li": {
      fontSize: "14px",
      fontFamily: "NunitoSans-Bold",
      color: "#757575"
    },
  }
}));

export function Dashboard() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    dayWeekMonth: "Month",
    sonicKeyModal: false,
    selectedSonicKey: {},
  })

  // const dataExportHandleClose = (value) => {
  //   if (values.dayWeekMonth === "Day") {
  //     dispatch(getExportDataAction(todayRange()?.split(",")?.[0], todayRange()?.split(",")?.[1], 2000, value))
  //   } else if (values.dayWeekMonth === "Week") {
  //     dispatch(getExportDataAction(weekRange()?.split(",")?.[0], weekRange()?.split(",")?.[1], 2000, value))
  //   } else {
  //     dispatch(getExportDataAction(monthRange()?.split(",")?.[0], monthRange()?.split(",")?.[1], 2000, value))
  //   }
  //   setAnchorEl(null);
  // };

  const dashboard = useSelector(state => state.dashboard)
  const plays = useSelector(state => state.playsList)
  log("Dashboard Data", dashboard)

  const dispatch = useDispatch()

  const history = useHistory()

  React.useEffect(() => {
    dispatch({
      type: actionTypes.SET_PLAYS_FILTER,
      data: {
        channel: "ALL",
        sonicKey: "",
        country: "",
        artist: "",
        radioStation: "",
        song: "",
        label: "",
        distributor: "",
        encodedDate: ""
      }
    })
    dispatch(getTotalSubscribedStationAction())
    dispatch(getTotalSonicKeysCountAction(monthRange()?.split(",")?.[0], monthRange()?.split(",")?.[1]))
    dispatch(getMostPlayedStationsDataAction(monthRange()?.split(",")?.[0], monthRange()?.split(",")?.[1]))
    dispatch(getPlaysListsAction(monthRange()?.split(",")?.[0], monthRange()?.split(",")?.[1], "ALL", 1, 10, false))
    dispatch(getGraphDataAction(monthRange()?.split(",")?.[0], monthRange()?.split(",")?.[1]));
  }, [])

  const setDateRange = (dateRange) => {
    setValues({ ...values, dayWeekMonth: dateRange })
    if (dateRange === "Day") {
      dispatch(getTotalSonicKeysCountAction(todayRange()?.split(",")?.[0], todayRange()?.split(",")?.[1]))
      dispatch(getMostPlayedStationsDataAction(todayRange()?.split(",")?.[0], todayRange()?.split(",")?.[1]))
      dispatch(getPlaysListsAction(todayRange()?.split(",")?.[0], todayRange()?.split(",")?.[1], "ALL", 1, 10, false))
      dispatch(getGraphDataAction(todayRange()?.split(",")?.[0], todayRange()?.split(",")?.[1]));
    }
    else if (dateRange === "Week") {
      dispatch(getTotalSonicKeysCountAction(weekRange()?.split(",")?.[0], weekRange()?.split(",")?.[1]))
      dispatch(getMostPlayedStationsDataAction(weekRange()?.split(",")?.[0], weekRange()?.split(",")?.[1]))
      dispatch(getPlaysListsAction(weekRange()?.split(",")?.[0], weekRange()?.split(",")?.[1], "ALL", 1, 10, false))
      dispatch(getGraphDataAction(weekRange()?.split(",")?.[0], weekRange()?.split(",")?.[1]));
    }
    else {
      dispatch(getTotalSonicKeysCountAction(monthRange()?.split(",")?.[0], monthRange()?.split(",")?.[1]))
      dispatch(getMostPlayedStationsDataAction(monthRange()?.split(",")?.[0], monthRange()?.split(",")?.[1]))
      dispatch(getPlaysListsAction(monthRange()?.split(",")?.[0], monthRange()?.split(",")?.[1], "ALL", 1, 10, false))
      dispatch(getGraphDataAction(monthRange()?.split(",")?.[0], monthRange()?.split(",")?.[1]));
    }
  }

  return (
    <Grid className="dashboard-container">

      <Grid container justifyContent="space-between">
        <p className="dashboard-title">Dashboard</p>

        <div>
          {/* <FormControl variant="standard" className="radioStations-export-formControl" style={{ backgroundColor: "" }}>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>

              <Tooltip title="Export">
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={dataExportHandleClick}
                  size="small"
                  endIcon={<ExportIcon />}
                >
                  Export
                </Button>
              </Tooltip>
            </Box>
            <Popover
              anchorEl={anchorEl}
              open={open}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'Center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'Center',
              }}
            >
              <MenuItem
                value="xlsx"
                onClick={() => dataExportHandleClose("xlsx")}
              >
                Excel
              </MenuItem>
              <MenuItem
                onClick={() => dataExportHandleClose("csv")}
                value="csv"
              >
                CSV
              </MenuItem>
            </Popover>
          </FormControl> */}

          <FormControl variant="standard" className="radioStations-subscribed-formControl">
            <InputLabel className="subscribed-formControl-title">Date Range</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={values?.dayWeekMonth}
              onChange={(event) => setDateRange(event.target.value)}
              label="Date Range"
              className="subscribed-formControl-menu"
              MenuProps={{ classes: { paper: classes.menuItems } }}
            >
              <MenuItem value={"Day"}>Today</MenuItem>
              <MenuItem value={"Week"}>Last 7 Days</MenuItem>
              <MenuItem value={"Month"}>Last 30 Days</MenuItem>
            </Select>
          </FormControl>
        </div>
      </Grid>

      <Grid container className="dashboard-tables-container" spacing={2}>
        <Grid item container lg={3} md={4} sm={8} xs={12} className="sonickeysDetected-leftTable-container">
          <Grid className="sonickeysDetected-table-container">
            <p className="sonickeysDetected-table-title">Summary</p>

            <Table className="sonickeysDetected-table" size="small">
              <TableHead>
                <TableRow>
                  <TableCell ></TableCell>
                  <TableCell className="table-head">Counts</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow >
                  <TableCell className="table-head">Total Plays</TableCell>
                  <TableCell className="table-cell">
                    {
                      dashboard?.totalSonicKeysCount?.loading
                        ? <CircularProgress size={15} />
                        : dashboard?.totalSonicKeysCount?.error ?
                          "--"
                          : dashboard?.totalSonicKeysCount?.data?.playsCount
                    }
                  </TableCell>
                </TableRow>

                <TableRow >
                  <TableCell className="table-head">At Radio Stations</TableCell>
                  <TableCell className="table-cell">
                    {
                      dashboard?.totalSonicKeysCount?.loading
                        ? <CircularProgress size={15} />
                        : dashboard?.totalSonicKeysCount?.error ?
                          "--"
                          : dashboard?.totalSonicKeysCount?.data?.radioStationsCount
                    }
                  </TableCell>
                </TableRow>

                <TableRow >
                  <TableCell className="table-head">In Countries</TableCell>
                  <TableCell className="table-cell">
                    {
                      dashboard?.totalSonicKeysCount?.loading
                        ? <CircularProgress size={15} />
                        : dashboard?.totalSonicKeysCount?.error ?
                          "--"
                          : dashboard?.totalSonicKeysCount?.data?.countriesCount
                    }
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
        </Grid>

        <Grid item lg={2} md={3} sm={4} xs={12} >
          <Grid className="radioStations-subscribed-container">
            <p className="radioStations-subscribed-title">Radio Stations Selected</p>
            <p className="mt-3" style={{ textAlign: "center", color: "#757575" }}>
              {
                dashboard?.totalSubscribedStationCount?.loading
                  ? <CircularProgress size={20} />
                  : dashboard?.totalSubscribedStationCount?.error ?
                    "--"
                    : dashboard?.totalSubscribedStationCount?.data
              }
            </p>
          </Grid>
        </Grid>

        <Grid item container lg={7} md={5} sm={12} xs={12} className="mostPlays-rightTable-container">
          <Grid className="mostPlays-table-container">
            <p className="mostPlays-table-title">Most Plays by Radio Stations</p>

            <Table className="mostPlays-table" size="small">
              <TableHead>
                <TableRow>
                  <TableCell className="table-head">Radio Station</TableCell>
                  <TableCell className="table-head">Country</TableCell>
                  <TableCell className="table-head">Plays</TableCell>
                  <TableCell className="table-head">Unique Tracks Played</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  dashboard?.mostPlayedStations?.loading ?
                    <TableRow >
                      <TableCell colSpan={4} align="center"><CircularProgress size={20} /></TableCell>
                    </TableRow> :
                    dashboard?.mostPlayedStations?.data?.length === 0 ?
                      <TableRow >
                        <TableCell colSpan={4} align="center" className="table-cell">No Data</TableCell>
                      </TableRow>
                      : dashboard?.mostPlayedStations?.data?.map((data, index) => {
                        if (index <= 2) {
                          return (
                            <TableRow >
                              <TableCell className="table-cell">{data?.radioStation?.name}</TableCell>
                              <TableCell className="table-cell">{data?.radioStation?.country}</TableCell>
                              <TableCell className="table-cell">{data?.playsCount?.playsCount}</TableCell>
                              <TableCell className="table-cell">{data?.playsCount?.uniquePlaysCount}</TableCell>
                            </TableRow>
                          )
                        }
                      })
                }
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </Grid>

      <Grid className="dashboardPlays-table-container">
        <TableContainer style={{ ...tableStyle.container, width: "100%", backgroundColor: "#F4F4F4", borderRadius: "20px" }} className="plays-table">
          <p className="plays-table-title">10 Most Recent Plays</p>

          <Table aria-label="Detail table">
            <TableHead className="dashboardPlays-tableHead">
              <TableRow hover style={{ borderRadius: "20px" }}>
                {playsTableHeads?.map((col) => {
                  return (
                    <TableCell style={{ ...tableStyle.head, fontSize: '14px' }}>
                      {col}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {
                plays?.loading ?
                  <TableRow>
                    <TableCell colSpan={8} align={"center"} style={{ ...tableStyle.body, fontSize: '14px' }}>
                      <div style={{ display: 'flex', justifyContent: 'center', width: '100%', height: '70px' }}>
                        <SonicSpinner title="Loading Sonic Keys..." containerStyle={{ height: '100%', display: 'flex', justifyContent: 'center' }} />
                      </div>
                    </TableCell>
                  </TableRow>
                  : plays?.data?.docs?.length > 0 ? (
                    plays?.data?.docs?.map((data) => (
                      <TableRow key={data?._id} hover className="plays-table-row">
                        <Tooltip title={data?.sonicKey?.sonicKey}>
                          <TableCell
                            style={{ ...tableStyle.body, color: "#00A19A", fontSize: '14px', cursor: "pointer" }}
                            onClick={() => setValues({ ...values, sonicKeyModal: true, selectedSonicKey: data?.sonicKey })}
                          >
                            {data?.sonicKey?.sonicKey}
                          </TableCell>
                        </Tooltip>
                        <TableCell style={{ ...tableStyle.body, fontSize: '14px' }}>
                          {data?.radioStation?.name?.length > 20 ? data?.radioStation?.name?.slice(0, 20) + "..." : data?.radioStation?.name || "---"}
                        </TableCell>
                        <TableCell style={{ ...tableStyle.body, fontSize: '14px' }}>
                          {moment(data?.detectedAt).utc().format("DD/MM/YYYY")}
                        </TableCell>
                        <TableCell style={{ ...tableStyle.body, fontSize: '14px' }}>
                          {moment(data?.detectedAt).utc().format("HH:mm")}
                        </TableCell>
                        <TableCell style={{ ...tableStyle.body, fontSize: '14px' }}>
                          {moment.utc(data?.sonicKey?.contentDuration * 1000).format("mm:ss")}
                        </TableCell>
                        <Tooltip title={data?.sonicKey?.originalFileName || data?.sonicKey?.contentFileName}>
                          <TableCell style={{ ...tableStyle.body, fontSize: '14px' }}>
                            {(data?.sonicKey?.originalFileName?.length > 20 ? data?.sonicKey?.originalFileName?.slice(0, 20) + "..." : data?.sonicKey?.originalFileName) || (data?.sonicKey?.contentFileName?.length > 20 ? data?.sonicKey?.contentFileName?.slice(0, 20) + "..." : data?.sonicKey?.contentFileName)}
                          </TableCell>
                        </Tooltip>
                        <Tooltip title={data?.sonicKey?.contentOwner}>
                          <TableCell style={{ ...tableStyle.body, fontSize: '14px' }}>
                            {(data?.sonicKey?.contentOwner === "" ? "---" : (data?.sonicKey?.contentOwner?.length > 20 ? data?.sonicKey?.contentOwner?.slice(0, 20) + "..." : data?.sonicKey?.contentOwner))}
                          </TableCell>
                        </Tooltip>
                        <TableCell style={{ ...tableStyle.body, fontSize: '14px' }}>
                          {data?.radioStation?.country || "---"}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} align={"center"} style={{ ...tableStyle.body, fontSize: '14px' }}>
                        No Data
                      </TableCell>
                    </TableRow>
                  )}
            </TableBody>
          </Table>
        </TableContainer>

        <Grid className="dashboardPlays-viewMore-btnContainer">
          <Button variant="text" className="viewMore-Btn" onClick={() => history.push("/plays")}>View more plays &gt;&gt;</Button>
        </Grid>
      </Grid>

      {/* <Grid className="dashBoard-Graphs-container">
        <Grid>
          <span className="dashBoard-Graphs-title">Plays - Chart</span><br />
          <p className="dashBoard-Graphs-subtitle">See history of sonickey plays</p>
        </Grid>
        <Grid container spacing={4}>
          <Grid item sm={12} lg={6}>
            <BarGraph
              title="Plays - Country-wise"
              label={dashboard?.graphData?.data?.playsCountryWise?.map(data => data?._id)}
              data={dashboard?.graphData?.data?.playsCountryWise?.map(data => data?.total)}
            />
          </Grid>
          <Grid item sm={12} lg={6}>
            <BarGraph
              title="Plays - Song-wise"
              label={dashboard?.graphData?.data?.playsSongWise?.map(data => data?._id)}
              data={dashboard?.graphData?.data?.playsSongWise?.map(data => data?.total)}
            />
          </Grid>
          <Grid item sm={12} lg={6}>
            <BarGraph
              title="Plays - Station-wise"
              label={dashboard?.graphData?.data?.playsStationWise?.map(data => data?._id)}
              data={dashboard?.graphData?.data?.playsStationWise?.map(data => data?.total)}
            />
          </Grid>
          <Grid item sm={12} lg={6}>
            <BarGraph
              title="Plays - Artist-wise"
              label={dashboard?.graphData?.data?.playsArtistWise?.map(data => data?._id)}
              data={dashboard?.graphData?.data?.playsArtistWise?.map(data => data?.total)}
            />
          </Grid>
        </Grid>
      </Grid> */}

      {values?.sonicKeyModal && (
        <MetaDataDialog
          sonicKey={values?.selectedSonicKey}
          open={true}
          setOpenTable={(flag) => setValues({ ...values, sonicKeyModal: flag })}
          updateMetaData={(key) => {
            dispatch({ type: actionTypes.UPDATE_EDITED_PLAYSLIST, data: key })
          }}
        />
      )}
    </Grid >
  );
}

