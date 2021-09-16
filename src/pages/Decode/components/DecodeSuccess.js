import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import Icon from "../../../assets/images/Logo-colour-simple.png";
import KeysTable from "../../../components/common/KeysTable";

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
}));

function createData(h1, h2, h3, h4, h5, h6) {
  return { h1, h2, h3, h4, h5, h6 };
}

const head = [
  createData("SONICKEY", "FILE TYPE", "NAME", "FREQUENCY", "OWNER", "ACTION"),
];

const body = [
  createData("WD3mg0z9QL7", "audio/wav", "Test", 44100, "SG", ""),
  createData("AXD234Ghtr29", "audio/wav", "Testing", 44100, "SG", ""),
];

export default function DecodeSuccess() {
  const classes = useStyles();

  const rows = [1, 2];

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

      <KeysTable type head={head} body={body} />
    </Grid>
  );
}
