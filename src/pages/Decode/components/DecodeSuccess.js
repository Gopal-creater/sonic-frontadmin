import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import Icon from "../../../assets/images/Logo-colour-simple.png";

const useStyles = makeStyles((theme) => ({
  successContainer: {
    marginBottom: 40,
    backgroundColor: "white",
    padding: "30px 40px",
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
