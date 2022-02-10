import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import Icon from "../../../assets/images/icon-fail-graphic.png";

const useStyles = makeStyles((theme) => ({
  failedContainer: {
    marginBottom: 40,
    backgroundColor: "white",
    padding: "2% 2.5%",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
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
    fontFamily: 'NunitoSans-Bold',
    color: "#343F84",
  },
  subHeading: {
    fontSize: 18,
    fontFamily: 'NunitoSans-Regular',
    color: "#00A19A",
  },
  help: {
    fontSize: 18,
    fontFamily: 'NunitoSans-Bold',
    color: "#393F5B",
  },
  helpCentre: {
    fontSize: 18,
    fontFamily: 'NunitoSans-Regular',
    color: "#393F5B",
  },
  failedIcon: {
    backgroundColor: "#F4F4F4",
    height: 280,
    padding: "0px 3%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  failed: {
    marginTop: 10,
    fontSize: 24,
    fontFamily: 'NunitoSans-ExtraBold',
    color: "#393F5B",
  },
}));

export default function FailedFileSelection({ title, audioName }) {
  const classes = useStyles();

  return (
    <Grid container className={classes.failedContainer}>
      <Grid item className={classes.details}>
        <div>
          <Typography className={classes.heading}>Ooops!</Typography>
          <Typography className={classes.subHeading}>
            {title} of <b>{audioName}</b> failed.
          </Typography>
        </div>
        <div>
          <Typography className={classes.help}>Do you need help?</Typography>
          <Typography className={classes.helpCentre}>
            Use{" "}
            <a href="https://sonicdata.com/" target="_blank" rel="noopener noreferrer" style={{ color: "#393F5B" }}>
              HelpCentre
            </a>{" "}
            or email our{" "}
            <a href="https://sonicdata.com/" target="_blank" rel="noopener noreferrer" style={{ color: "#393F5B" }}>
              Support Team.
            </a>
          </Typography>
        </div>
      </Grid>
      <Grid item className={classes.failedIcon}>
        <img src={Icon} alt="Failed" style={{ height: 130, width: 130 }} />
        <Typography className={classes.failed}>{title} failed</Typography>
      </Grid>
    </Grid>
  );
}
