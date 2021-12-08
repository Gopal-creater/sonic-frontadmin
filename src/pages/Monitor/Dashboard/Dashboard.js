import { Grid } from "@material-ui/core";
import React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import "./Dashboard.scss"
import { BarGraph } from "../Components/BarGraph";

export function Dashboard() {
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
                  <TableCell >0</TableCell>
                </TableRow>
                <TableRow >
                  <TableCell className="table-head">Radio Stations</TableCell>
                  <TableCell >0</TableCell>
                </TableRow>
                <TableRow >
                  <TableCell className="table-head">Countries</TableCell>
                  <TableCell >0</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
        </Grid>

        <Grid item lg={3} md={3} sm={4} xs={12} >
          <Grid item className="radioStations-subscribed-container">
            <p className="radioStations-subscribed-title">Radio Stations Subscribed</p>
            <p style={{ textAlign: "center" }}>0</p>
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
                  <TableCell >Arba</TableCell>
                  <TableCell >United Kingdom</TableCell>
                  <TableCell >0</TableCell>
                  <TableCell >0</TableCell>
                </TableRow>
                <TableRow >
                  <TableCell >Arba</TableCell>
                  <TableCell >United Kingdom</TableCell>
                  <TableCell >0</TableCell>
                  <TableCell >0</TableCell>
                </TableRow>
                <TableRow >
                  <TableCell >Arba</TableCell>
                  <TableCell >United Kingdom</TableCell>
                  <TableCell >0</TableCell>
                  <TableCell >0</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </Grid>

      <Grid>
        <BarGraph />
      </Grid>
    </Grid>
  );
}

