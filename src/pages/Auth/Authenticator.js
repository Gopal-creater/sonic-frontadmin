import { Grid } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SignIn from "./SignIn/SignIn";
import NewPassword from "./NewPassword/NewPassword";
import EmailVerification from "./EmailVerification/EmailVerification";
import ResetPassword from "./ResetPassword/ResetPassword";
import { useTheme } from "styled-components";
import { userActions } from "../../constants/constants";

export default function Authenticator(prop) {
  const classes = useStyles();

  const appTheme = useTheme();

  const ShowComponents = () => {
    if (prop?.propName === userActions.FORCE_CHANGE_PASSWORD) {
      return <NewPassword />;
    }

    if (prop?.propName === userActions.EMAIL_CONFIRMATION_REQUIRED) {
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
