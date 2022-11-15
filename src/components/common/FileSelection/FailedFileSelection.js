import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import amazingRadio_Icon from "../../../assets/icons/amazingRadio_Icon.png";
import { MainContainer } from "../../../StyledComponents/StyledPageContainer";
import { Content, SubHeading } from "../../../StyledComponents/StyledHeadings";
import { useTheme } from "styled-components";

export default function FailedFileSelection({ title, audioName }) {
  const classes = useStyles();

  return (
    <MainContainer container className={classes.failedContainer}>
      <Grid item className={classes.details}>
        <div>
          <SubHeading>Ooops!</SubHeading>
          <Content>
            {title} of <b>{audioName}</b> failed.
          </Content>
        </div>
        <div>
          <SubHeading>Do you need help?</SubHeading>
          <Content className={classes.helpCentre}>
            Use{" "}
            <a
              href="https://sonicdata.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#393F5B" }}
            >
              HelpCentre
            </a>{" "}
            or email our{" "}
            <a
              href="https://sonicdata.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#393F5B" }}
            >
              Support Team.
            </a>
          </Content>
        </div>
      </Grid>
      <Grid item className={classes.failedIcon}>
        <img
          src={amazingRadio_Icon}
          alt="Failed"
          style={{ height: 130, width: 130 }}
        />
        <SubHeading>{title} failed</SubHeading>
      </Grid>
    </MainContainer>
  );
}

const useStyles = makeStyles((theme) => {
  const appTheme = useTheme();
  return {
    failedContainer: {
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
      fontFamily: appTheme.fontFamily.robotoBold,
      color: "#343F84",
    },
    subHeading: {
      fontSize: 18,
      fontFamily: appTheme.fontFamily.robotoBold,
      color: "#00A19A",
    },
    help: {
      fontSize: 18,
      fontFamily: appTheme.fontFamily.robotoBold,
      color: "#393F5B",
    },
    helpCentre: {
      fontSize: 18,
      fontFamily: appTheme.fontFamily.robotoRegular,
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
  };
});
