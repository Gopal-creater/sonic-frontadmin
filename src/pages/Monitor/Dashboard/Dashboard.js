import { Grid, TableContainer, Button, FormControl, Select, MenuItem, InputLabel } from "@material-ui/core";
import React, { useEffect } from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import "./Dashboard.scss"
import { tableStyle } from "../../../globalStyle";
import { BarGraph, BarGraphCard } from "../Components/BarGraph";
import { makeStyles } from "@material-ui/styles";
import { useDispatch, useSelector } from "react-redux";
import { log } from "../../../utils/app.debug";
import { fetchGraphDataAction } from "../../../stores/actions";

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

  const dispatch = useDispatch();

  const stateGraph = useSelector(state => state.graphData)


  useEffect(() => {
    dispatch(fetchGraphDataAction());
  }, [])

  const GraphData = [10, 20, 30, 40, 10, 50, 70]
  const labels = ["Uk", "Canada", "Germany", "Australia", "America", "Brazil", "Argentina"]

  console.log("testing data:", stateGraph?.data?.playsArtistWise)
  const artistWiseData = stateGraph?.data?.playsArtistWise;
  console.log("artistWise :", artistWiseData)

  return (
    <Grid className="dashboard-container">
      <p className="dashboard-title">Dashboard</p>

      <Grid container className="dashboard-tables-container" spacing={2}>
        <Grid item container lg={3.5} md={4} sm={8} xs={12} className="sonickeysDetected-leftTable-container">
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
                  <TableCell className="table-cell">0</TableCell>
                </TableRow>
                <TableRow >
                  <TableCell className="table-head">Radio Stations</TableCell>
                  <TableCell className="table-cell">0</TableCell>
                </TableRow>
                <TableRow >
                  <TableCell className="table-head">Countries</TableCell>
                  <TableCell className="table-cell">0</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
        </Grid>

        <Grid item lg={4.5} md={3} sm={4} xs={12} >
          <Grid className="radioStations-subscribed-container">
            <Grid container item >
              <Grid lg={8}>
                <span className="radioStations-subscribed-title">Radio Stations Subscribed</span>
              </Grid>

              <Grid lg={4}>
                <FormControl variant="standard" className="radioStations-subscribed-formControl">
                  <InputLabel className="subscribed-formControl-title">Date Range</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={values?.dayWeekMonth}
                    onChange={(event) => setValues({ ...values, dayWeekMonth: event.target.value })}
                    label="Date Range"
                    style={{ maxWidth: "70px" }}
                    className="subscribed-formControl-menu"
                    MenuProps={{ classes: { paper: classes.menuItems } }}
                  >
                    <MenuItem value={"Day"}>Day</MenuItem>
                    <MenuItem value={"Week"}>Week</MenuItem>
                    <MenuItem value={"Month"}>Month</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <p className="mt-3">0</p>
          </Grid>
        </Grid>

        <Grid item lg={5} md={5} sm={12} xs={12} className="mostPlays-rightTable-container">
          <Grid className="mostPlays-table-container">
            <p className="mostPlays-table-title">Most Plays by Radio Stations</p>

            <Table className="mostPlays-table" size="small">
              <TableHead>
                <TableRow>
                  <TableCell className="table-head">Radio Station</TableCell>
                  <TableCell className="table-head">Country</TableCell>
                  <TableCell className="table-head">Plays</TableCell>
                  <TableCell className="table-head">Unique Sogs Played</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow >
                  <TableCell className="table-cell">Arba</TableCell>
                  <TableCell className="table-cell">United Kingdom</TableCell>
                  <TableCell className="table-cell">0</TableCell>
                  <TableCell className="table-cell">0</TableCell>
                </TableRow>
                <TableRow >
                  <TableCell className="table-cell">Arba</TableCell>
                  <TableCell className="table-cell">United Kingdom</TableCell>
                  <TableCell className="table-cell">0</TableCell>
                  <TableCell className="table-cell">0</TableCell>
                </TableRow>
                <TableRow >
                  <TableCell className="table-cell">Arba</TableCell>
                  <TableCell className="table-cell">United Kingdom</TableCell>
                  <TableCell className="table-cell">0</TableCell>
                  <TableCell className="table-cell">0</TableCell>
                </TableRow>
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
            <BarGraph title="Plays - Country-wise" data={stateGraph} />
          </Grid>
          {/* <Grid item sm={12} lg={6}>
            <BarGraph title="Plays - Song-wise" label={labels} data={GraphData} />
          </Grid>
          <Grid item sm={12} lg={6}>
            <BarGraph title="Plays - Station-wise" label={labels} data={GraphData} />
          </Grid>
          <Grid item sm={12} lg={6}>
            <BarGraph title="Plays - Artist-wise" label={labels} data={GraphData} />
          </Grid> */}
        </Grid>
      </Grid>
    </Grid >
  );
}

