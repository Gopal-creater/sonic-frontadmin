import { Grid, TableContainer, Button, FormControl, Select, MenuItem, InputLabel } from "@material-ui/core";
import React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import "./Dashboard.scss"
import { tableStyle } from "../../../globalStyle";

export function Dashboard() {
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
  return (
    <Grid className="dashboard-container">
      <p className="dashboard-title">Dashboard</p>

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

        <Grid item lg={3} md={3} sm={4} xs={12} >
          <Grid className="radioStations-subscribed-container">
            <Grid item >
              <p className="radioStations-subscribed-title">Radio Stations Subscribed</p>
              <p>0</p>
            </Grid>

            <Grid item container justifyContent="flex-end">
              <FormControl variant="standard" className="radioStations-subscribed-formControl">
                <InputLabel className="subscribed-formControl-title">Date Range</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={values?.dayWeekMonth}
                  onChange={(event) => setValues({ ...values, dayWeekMonth: event.target.value })}
                  label="Date Range"
                >
                  <MenuItem value={"Day"} >Day</MenuItem>
                  <MenuItem value={"Week"}>Week</MenuItem>
                  <MenuItem value={"Month"}>Month</MenuItem>
                </Select>
              </FormControl>
            </Grid>
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
    </Grid >
  );
}

