import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useForm, Controller } from "react-hook-form";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch } from "react-redux";
import { forgotPasword, setSession } from '../../../stores/actions/session';
import { Auth } from "aws-amplify";
import cogoToast from 'cogo-toast';
import AuthFooter from '../AuthFooter';

const useStyles = makeStyles((theme) => ({
    signInRoot: {
        backgroundColor: "white",
        width: "100%",
        maxWidth: "450px",
        maxHeight: "650px",
        height: "100%",
    }
    ,
    signInHeading: {
        color: "#393F5B",
        fontSize: 30,
        fontWeight: "bold",
        fontFamily: 'NunitoSans-Bold',
    },
    signInSubHeading: {
        color: "#393F5B",
        fontSize: 17,
        fontWeight: "bold",
        fontFamily: 'NunitoSans-ExtraBold',
    },
    textInput: {
        fontFamily: "NunitoSans-Regular",
        fontSize: 18,
        color: "#757575",
        WebkitBoxShadow: "0 0 0px 1000px white inset"
    },

}));

const SignInButton = withStyles({
    root: {
        backgroundColor: "#343F84",
        textTransform: "none",
        height: 45,
        width: 105,
        padding: "0px 20px",
        fontSize: 15,
        fontFamily: 'NunitoSans-Bold',
        borderRadius: 8,
    },
})(Button);

const SignUpButton = withStyles({
    root: {
        backgroundColor: "white",
        textTransform: "none",
        border: "1px solid #343F84",
        color: "#7078A8",
        "&:hover": {
            color: "white",
            backgroundColor: "#343F84",
        },
        height: 45,
        width: 105,
        padding: "0px 20px",
        fontSize: 15,
        fontFamily: 'NunitoSans-Bold',
        borderRadius: 8,
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
        fontFamily: 'NunitoSans-Black',
    },
})(Button);

export default function SignIn() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        showPassword: false,
        loginLoading: false,
    });

    const dispatch = useDispatch();

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
        <Grid className={classes.signInRoot} justifyContent="center" alignItems="center">
            <form onSubmit={handleSubmit(signIn)}>
                <Grid item>
                    <Typography className={classes.signInHeading} id="encodeDataTitle">SonicPortal</Typography>
                    <Typography className={classes.signInSubHeading} id="encodeDataTitle">Encode. Manage. Monitor. Report.</Typography>
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
                            fullWidth
                            placeholder="Username *"
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            style={{ marginTop: "35px" }}
                            helperText={error?.message}
                            inputProps={{ className: classes.textInput }}
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
                            placeholder="Password *"
                            fullWidth
                            type={values.showPassword ? "text" : "password"}
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error?.message}
                            inputProps={{ className: classes.textInput }}
                            className="mt-3"
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
                                className: classes.textInput
                            }}
                        />
                    )}
                    rules={{ required: "Password is required" }}
                />

                <Grid container justifyContent={'space-between'} style={{ marginTop: "40px" }}>
                    <ForgetPasswordButton
                        type="button"
                        onClick={() => dispatch(forgotPasword(true))}
                        disabled={values.loginLoading}
                    >
                        Forgot password?
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
                            Sign In
                        </SignInButton>
                    )}
                </Grid>

                <Grid container direction="column" alignItems="flex-end" style={{ marginTop: "35px" }}>
                    <p style={{ color: "#757575", fontWeight: "bold", fontFamily: "NunitoSans-Regular", fontSize: 14 }}>Don't have an account?</p>

                    <SignUpButton
                        type="button"
                        variant="contained"
                        color="primary"
                        disabled={values.loginLoading}
                        onClick={() => {
                            dispatch({ type: "SIGN-UP", data: true });
                        }}
                    >
                        Sign Up
                    </SignUpButton>
                </Grid>
                <AuthFooter />
            </form>
        </Grid>
    )
}
