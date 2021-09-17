import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Icon from "../../assets/images/icon-fail-graphic.png";

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
  failedIcon: {
    backgroundColor: "#F4F4F4",
    height: 280,
    padding: "0px 3%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  failed: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: 700,
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
      <Grid item className={classes.failedIcon}>
        <img src={Icon} alt="Failed" style={{ height: 130, width: 130 }} />
        <Typography className={classes.failed}>{title} failed</Typography>
      </Grid>
    </Grid>
  );
}
