import { Grid } from '@material-ui/core'
import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import SplashScreen from "../../../assets/images/SplashScreen.png"
import { useForm, Controller } from "react-hook-form";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch } from "react-redux";
import { setSession } from '../../../stores/actions/session';
import { Auth } from "aws-amplify";
import cogoToast from 'cogo-toast';
import Footer from '../../../components/common/Footer';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';


const useStyles = makeStyles((theme) => ({
    signInRoot: {
        backgroundColor: "#393F5B",
        height: "100vh",
    },
    signInCommonContainer: {
        backgroundColor: "white",
        width: "25%",
        maxWidth: "450px",
        maxHeight: "650px",
        minHeight: "550px",
        height: "70%",
        [theme.breakpoints.down('md')]: {
            width: "30%",
        },
        [theme.breakpoints.down('sm')]: {
            width: "40%",
        },
        [theme.breakpoints.down('xs')]: {
            width: "70%",
        },
    },
    SignInForm: {
        padding: "15%"
    }
    ,
    signInHeader: {
        color: "#393F5B",
        fontWeight: "bold"
    }
}));

const SignInButton = withStyles({
    root: {
        backgroundColor: "#343F84",
        textTransform: "none",
        width: "80px",
        height: "40px",
    },
})(Button);

const SignUpButton = withStyles({
    root: {
        backgroundColor: "white",
        textTransform: "none",
        width: "80px",
        height: "40px",
        border: "1px solid #343F84",
        color: "black",
        "&:hover": {
            color: "white",
            backgroundColor: "#343F84",
        },
    },
})(Button);

const ForgetPasswordButton = withStyles({
    root: {
        color: "blue",
        textTransform: "none",
        padding: 0,
        color: "#343F84",
        fontWeight: "bold",
        "&:hover": {
            backgroundColor: "white",
            textDecoration: "underline",
        },
    },
})(Button);

export default function SignIn() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        showPassword: false,
        loginLoading: false,
        pwdReset: false,
    });

    const dispatch = useDispatch();

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('xs'));

    const { handleSubmit, control } = useForm();

    /* Sign in function */
    function signIn(data) {
        if (values.loginLoading) return;

        setValues({ ...values, loginLoading: true });
        Auth.signIn(data.username, data.password)
            .then((response) => {
                localStorage.setItem("user_info", JSON.stringify(response));
                dispatch(setSession(response));
                setValues({ ...values, loginLoading: false });
            })
            .catch((err) => {
                cogoToast.error(err.message);
                setValues({ ...values, loginLoading: false });
            });
    }

    return (
        <Grid container className={classes.signInRoot} justifyContent="center" alignItems="center">
            <Grid item className={classes.signInCommonContainer} style={{ display: matches ? "none" : "" }}>
                <img src={SplashScreen} alt="SplashScreen" width="100%" height="100%" />
            </Grid>

            <Grid item className={classes.signInCommonContainer}>
                <form onSubmit={handleSubmit(signIn)} className={classes.SignInForm}>
                    <Grid className={classes.signInHeader}>
                        <h2 >SonicPortal</h2>
                        <h6>Encode. Manage. Monitor. Report.</h6>
                    </Grid>
                    <Controller
                        name="username"
                        control={control}
                        defaultValue=""
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <TextField
                                label="Username *"
                                fullWidth
                                value={value}
                                onChange={onChange}
                                error={!!error}
                                className="mt-2"
                                helperText={error?.message}
                            />
                        )}
                        rules={{ required: "Username is required" }}
                    />

                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        className="mt-3"
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <TextField
                                label="Password *"
                                fullWidth
                                type={values.showPassword ? "text" : "password"}
                                value={value}
                                onChange={onChange}
                                error={!!error}
                                helperText={error?.message}
                                className="mt-2"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => {
                                                    setValues({
                                                        ...values,
                                                        showPassword: !values.showPassword,
                                                    });
                                                }}
                                                onMouseDown={(event) => {
                                                    event.preventDefault();
                                                }}
                                            >
                                                {values.showPassword ? (
                                                    <Visibility />
                                                ) : (
                                                    <VisibilityOff />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}
                        rules={{ required: "Password is required" }}
                    />

                    <Grid container justifyContent={'space-between'} className="mt-5">
                        <ForgetPasswordButton
                            type="button"
                            onClick={() => setValues({ ...values, pwdReset: true })}
                            disabled={values.loginLoading}
                        >
                            Forget password?
                        </ForgetPasswordButton>

                        {values.loginLoading ? (
                            <SignInButton
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="lg"
                            >
                                <Spinner animation="border" role="status" size="sm">
                                </Spinner>
                            </SignInButton>
                        ) : (
                            <SignInButton type="submit" variant="contained" color="primary">
                                SignIn
                            </SignInButton>
                        )}
                    </Grid>

                    <Grid container direction="column" alignItems="flex-end" className="mt-4">
                        <p style={{ color: "#757575", fontSize: "small" }}>Don't have an account?</p>

                        <SignUpButton
                            type="button"
                            variant="contained"
                            color="primary"
                            disabled={values.loginLoading}
                            onClick={() => {
                                dispatch({ type: "SIGN-UP", data: true });
                            }}
                        >
                            SignUp
                        </SignUpButton>
                    </Grid>

                    <Grid className="mt-3">
                        <Footer />
                    </Grid>

                </form>
            </Grid>
        </Grid>
    )
}
