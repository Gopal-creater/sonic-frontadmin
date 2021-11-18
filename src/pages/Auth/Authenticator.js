import { Grid } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import SplashScreen from "./../../assets/images/SplashScreen.png"
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useDispatch, useSelector } from "react-redux";
import { log } from '../../utils/app.debug';
import SignIn from './SignIn/SignIn';
import NewPassword from './NewPassword/NewPassword';
import EmailVerification from './EmailVerification/EmailVerification';
import ResetPassword from './ResetPassword/ResetPassword';


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#393F5B",
        height: "100vh",
    },
    signInCommonContainer: {
        backgroundColor: "white",
        width: "26%",
        maxWidth: "450px",
        maxHeight: "650px",
        height: "550px",
        // flexGrow:1,
        [theme.breakpoints.down('md')]: {
            width: "35%",
        },
        [theme.breakpoints.down('sm')]: {
            width: "45%",
        },
        [theme.breakpoints.down('xs')]: {
            width: "75%",
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

            <Grid item className={classes.signInCommonContainer} style={{ padding: "40px 50px", backgroundColor: "white" }}>
                {<ShowComponents />}
            </Grid>
        </Grid>
    )
}
