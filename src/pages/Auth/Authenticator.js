import { Grid } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import { useTheme as muiTheme } from "@material-ui/core/styles";
// import useMediaQuery from "@material-ui/core/useMediaQuery";
import SignIn from "./SignIn/SignIn";
import NewPassword from "./NewPassword/NewPassword";
import EmailVerification from "./EmailVerification/EmailVerification";
import ResetPassword from "./ResetPassword/ResetPassword";
import { useTheme } from "styled-components";

export default function Authenticator(prop) {
  const classes = useStyles();

  // const theme = muiTheme();
  const appTheme = useTheme();
  // const matches = useMediaQuery(theme.breakpoints.down("xs"));

  const ShowComponents = () => {
    if (prop?.propName === "NEW_PASSWORD_REQUIRED") {
      return <NewPassword />;
    }

    if (prop?.propName === "EmailNotVerified") {
      return <EmailVerification />;
    }

    if (prop?.propName === "ResetPassword") {
      return <ResetPassword />;
    }

    if (prop?.propName === "SignIn") {
      return <SignIn />;
    }

    return;
  };

  return (
    <Grid
      container
      className={classes.root}
      justifyContent="center"
      alignItems="center"
    >
      {/* <Grid
        item
        className={classes.signInCommonContainer}
        style={{ display: matches ? "none" : "" }}
      >
        <img
          src={SplashScreen}
          alt="SplashScreen"
          width="100%"
          height="100%"
          style={{ objectFit: "cover" }}
        />
      </Grid> */}

      <Grid
        item
        className={classes.signInCommonContainer}
        style={{
          padding: "45px 64px",
          backgroundColor: appTheme.colors.primary.contrastText,
        }}
      >
        {<ShowComponents />}
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => {
  const appTheme = useTheme();
  return {
    root: {
      backgroundColor: appTheme.background.dark2,
      height: "100vh",
    },
    signInCommonContainer: {
      width: "30%",
      maxWidth: "450px",
      maxHeight: "650px",
      height: "540px",
      backgroundColor: `${appTheme.background.dark4} !important`,

      [theme.breakpoints.down("md")]: {
        width: "60%",
      },
      [theme.breakpoints.down("sm")]: {
        width: "60%",
      },
      [theme.breakpoints.down("xs")]: {
        width: "80%",
      },
    },
  };
});
