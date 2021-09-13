import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  failedContainer: {
    marginBottom: 40,
    backgroundColor: "white",
    padding: "30px 40px",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
  details: {
    display: "flex",
    flexDirection: "column",
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
  help: {
    fontSize: 18,
    fontWeight: 700,
    color: "#393F5B",
  },
  helpCentre: {
    fontSize: 18,
    fontWeight: 500,
    color: "#393F5B",
  },
}));

export default function FailedEncodeDecode({ title, icon }) {
  const classes = useStyles();

  return (
    <Grid className={classes.failedContainer}>
      <Grid item className={classes.header}>
        <Grid className={classes.details}>
          <div>
            <Typography className={classes.heading}>Ooops!</Typography>
            <Typography className={classes.subHeading}>
              {title} of <b>RADIO_SONIC.wav</b> failed.
            </Typography>
          </div>
          <div>
            <Typography className={classes.help}>Do you need help?</Typography>
            <Typography className={classes.helpCentre}>
              Use{" "}
              <Link to="#" style={{ color: "#393F5B" }}>
                HelpCentre
              </Link>{" "}
              or email our{" "}
              <Link to="#" style={{ color: "#393F5B" }}>
                Support Team.
              </Link>
            </Typography>
          </div>
        </Grid>
        <img src={icon} alt="Failed" style={{ height: 200 }} />
      </Grid>
    </Grid>
  );
}
