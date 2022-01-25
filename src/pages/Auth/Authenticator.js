import { Grid } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import SplashScreen from "./../../assets/images/SplashScreen.png"
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import SignIn from './SignIn/SignIn';
import NewPassword from './NewPassword/NewPassword';
import EmailVerification from './EmailVerification/EmailVerification';
import ResetPassword from './ResetPassword/ResetPassword';
import waveSignIn from "../../assets/images/wave-signin.png";


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#393F5B",
        height: "100vh",
        backgroundImage: `url(${waveSignIn})`,
        backgroundRepeat: "no-repeat",
        backgroundPositionY: "90%",
        backgroundPositionX: "center",
        // backgroundSize: "cover"
    },
    signInCommonContainer: {
        width: "27%",
        maxWidth: "450px",
        maxHeight: "650px",
        height: "540px",

        [theme.breakpoints.down('md')]: {
            width: "40%",
        },
        [theme.breakpoints.down('sm')]: {
            width: "48%",
        },
        [theme.breakpoints.down('xs')]: {
            width: "80%",
        },
    },
}));

export default function Authenticator(prop) {
    const classes = useStyles();

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('xs'));

    const ShowComponents = () => {
        if (prop?.propName === "NEW_PASSWORD_REQUIRED") {
            return <NewPassword />;
        }

        if (prop?.propName === "EmailNotVerified") {
            return <EmailVerification />
        }

        if (prop?.propName === "ResetPassword") {
            return <ResetPassword />
        }

        if (prop?.propName === "SignIn") {
            return <SignIn />
        }

        return
    }

    return (
        <Grid container className={classes.root} justifyContent="center" alignItems="center">
            <Grid item className={classes.signInCommonContainer} style={{ display: matches ? "none" : "" }}>
                <img src={SplashScreen} alt="SplashScreen" width="100%" height="100%" style={{ objectFit: 'cover' }} />
            </Grid>

            <Grid item className={classes.signInCommonContainer} style={{ padding: "45px 64px", backgroundColor: "white" }}>
                {<ShowComponents />}
            </Grid>
        </Grid>
    )
}
