import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Grid, Typography } from "@material-ui/core";
import Icon from "../../../assets/images/Logo-colour-simple.png";

const useStyles = makeStyles((theme) => ({
  successContainer: {
    marginBottom: 40,
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
    fontSize: 18,
    fontWeight: 500,
    color: "#00A19A",
  },
  found: {
    padding: "30px 0px 0px 0px",
    fontSize: 18,
    fontWeight: 500,
    color: "#393F5B",
  },

  //TABLE
  table: {
    minWidth: 700,
    marginTop: 30,
    width: "100%",
  },
  tableHead: {
    color: "#ACACAC",
    fontSize: 12,
    fontWeight: "700",
  },
  tableRow: {
    "&:hover": {
      boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 1px 5px rgba(0,0,0,0.22)",
      cursor: "pointer",
    },
  },
  key: {
    color: "#343F84",
    fontSize: 18,
    fontWeight: 700,
    paddingTop: 25,
    paddingBottom: 25,
  },
  tableCellColor: {
    color: "#343F84",
    fontSize: 14,
    fontWeight: 700,
  },
  tableCellIcon: {
    display: "flex",
    alignItems: "center",
  },
  tableCellNormalText: {
    fontSize: 14,
    fontWeight: 500,
    color: "#757575",
  },
}));

const tableHead = [
  "SONICKEY",
  "FILE TYPE",
  "NAME",
  "FREQUENCY",
  "OWNER",
  "ACTION",
];

export default function DecodeSuccess() {
  const classes = useStyles();

  return (
    <Grid className={classes.successContainer}>
      <Grid item className={classes.header}>
        <div>
          <Typography className={classes.heading}>Well done!</Typography>
          <Typography className={classes.subHeading}>
            Decoding of <b>RADIO_SONIC.wav</b> successfully done.
          </Typography>
          <Typography className={classes.found}>
            We found <b>2</b> SonicKeys.
          </Typography>
        </div>
        <img src={Icon} alt="Success" style={{ width: 150 }} />
      </Grid>
    </Grid>
  );
}
