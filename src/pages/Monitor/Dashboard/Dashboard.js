import { Grid, TableContainer, Button, FormControl, Select, MenuItem, InputLabel } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
import React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import "./Dashboard.scss"
import { tableStyle } from "../../../globalStyle";
import { BarGraph } from "../Components/BarGraph";
import { makeStyles } from "@material-ui/styles";
import { log } from "../../../utils/app.debug";
import { monthRange, todayRange, weekRange } from "../../../utils/HelperMethods";
import { useDispatch, useSelector } from "react-redux";
import { getMostPlayedStationsDataAction, getTotalSonicKeysCountAction, getTotalSubscribedStationAction } from "../../../stores/actions/dashboard.action";

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
    dayWeekMonth: "Day"
  })

  const dashboard = useSelector(state => state.dashboard)
  log("Dashboard Data", dashboard)

  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(getTotalSonicKeysCountAction(todayRange()?.split(",")?.[0], todayRange()?.split(",")?.[1]))
    dispatch(getTotalSubscribedStationAction())
    dispatch(getMostPlayedStationsDataAction(todayRange()?.split(",")?.[0], todayRange()?.split(",")?.[1]))
  }, [])

  const dashboardPlaysColumns = [
    "SonicKey",
    "Radio Station",
    "Date",
    "Time",
    "Duration",
    "Audio Filename",
    "Artist",
    "Country"
  ];

  const dummy = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const GraphData = [10, 20, 30, 40, 10, 50, 70]
  const labels = ["Uk", "Canada", "Germany", "Australia", "America", "Brazil", "Argentina"]

  const setDateRange = (dateRange) => {
    setValues({ ...values, dayWeekMonth: dateRange })
    if (dateRange === "Day") {
      dispatch(getTotalSonicKeysCountAction(todayRange()?.split(",")?.[0], todayRange()?.split(",")?.[1]))
      dispatch(getMostPlayedStationsDataAction(todayRange()?.split(",")?.[0], todayRange()?.split(",")?.[1]))
    }
    else if (dateRange === "Week") {
      dispatch(getTotalSonicKeysCountAction(weekRange()?.split(",")?.[0], weekRange()?.split(",")?.[1]))
      dispatch(getMostPlayedStationsDataAction(weekRange()?.split(",")?.[0], weekRange()?.split(",")?.[1]))
    }
    else {
      dispatch(getTotalSonicKeysCountAction(monthRange()?.split(",")?.[0], monthRange()?.split(",")?.[1]))
      dispatch(getMostPlayedStationsDataAction(monthRange()?.split(",")?.[0], monthRange()?.split(",")?.[1]))
    }
  }

  return (
    <Grid className="dashboard-container">

      <Grid container justifyContent="space-between">
        <p className="dashboard-title">Dashboard</p>

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
            <MenuItem value={"Day"}>Day</MenuItem>
            <MenuItem value={"Week"}>Week</MenuItem>
            <MenuItem value={"Month"}>Month</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid container className="dashboard-tables-container" spacing={2}>
        <Grid item container lg={4} md={4} sm={8} xs={12} className="sonickeysDetected-leftTable-container">
          <Grid className="sonickeysDetected-table-container">
            <p className="sonickeysDetected-table-title">Total SonicKeys Detected</p>

            <Table className="sonickeysDetected-table" size="small">
              <TableHead>
                <TableRow>
                  <TableCell ></TableCell>
                  <TableCell className="table-head">Subscribed</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow >
                  <TableCell className="table-head">Plays</TableCell>
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
                  <TableCell className="table-head">Radio Stations</TableCell>
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
                  <TableCell className="table-head">Countries</TableCell>
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

        <Grid item lg={3} md={3} sm={4} xs={12} >
          <Grid className="radioStations-subscribed-container">
            <p className="radioStations-subscribed-title">Radio Stations Subscribed</p>
            <p className="mt-3" style={{ textAlign: "center" }}>
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

        <Grid item container lg={5} md={5} sm={12} xs={12} className="mostPlays-rightTable-container">
          <Grid className="mostPlays-table-container">
            <p className="mostPlays-table-title">Most Plays by Radio Stations</p>

            <Table className="mostPlays-table" size="small">
              <TableHead>
                <TableRow>
                  <TableCell className="table-head">Radio Station</TableCell>
                  <TableCell className="table-head">Country</TableCell>
                  <TableCell className="table-head">Plays</TableCell>
                  <TableCell className="table-head">Unique Songs Played</TableCell>
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
                {dashboardPlaysColumns?.map((col) => {
                  return (
                    <TableCell style={{ ...tableStyle.head, fontSize: '14px' }}>
                      {col}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {dummy.map((index) => (
                <TableRow key={index} hover className="plays-table-row">
                  <TableCell style={{ ...tableStyle.body, fontSize: '14px' }}>ugGmojtz0XW</TableCell>
                  <TableCell style={{ ...tableStyle.body, fontSize: '14px' }}>BBC London</TableCell>
                  <TableCell style={{ ...tableStyle.body, fontSize: '14px' }}>06/12/2021</TableCell>
                  <TableCell style={{ ...tableStyle.body, fontSize: '14px' }}>11:53</TableCell>
                  <TableCell style={{ ...tableStyle.body, fontSize: '14px' }}>03:43</TableCell>
                  <TableCell style={{ ...tableStyle.body, fontSize: '14px' }}>My Universe</TableCell>
                  <TableCell style={{ ...tableStyle.body, fontSize: '14px' }}>Coldplay</TableCell>
                  <TableCell style={{ ...tableStyle.body, fontSize: '14px' }}>UK</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Grid className="dashboardPlays-viewMore-btnContainer">
          <Button variant="text" className="viewMore-Btn">View more plays &gt;&gt;</Button>
        </Grid>
      </Grid>

      <Grid className="dashBoard-Graphs-container">
        <Grid>
          <span className="dashBoard-Graphs-title">Plays - Chart</span><br />
          <p className="dashBoard-Graphs-subtitle">See history of sonickey plays</p>
        </Grid>
        <Grid container spacing={4}>
          <Grid item sm={12} lg={6}>
            <BarGraph title="Plays - Country-wise" label={labels} data={GraphData} />
          </Grid>
          <Grid item sm={12} lg={6}>
            <BarGraph title="Plays - Song-wise" label={labels} data={GraphData} />
          </Grid>
          <Grid item sm={12} lg={6}>
            <BarGraph title="Plays - Station-wise" label={labels} data={GraphData} />
          </Grid>
          <Grid item sm={12} lg={6}>
            <BarGraph title="Plays - Artist-wise" label={labels} data={GraphData} />
          </Grid>
        </Grid>
      </Grid>
    </Grid >
  );
}

