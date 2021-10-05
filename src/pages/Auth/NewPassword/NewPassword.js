import React from "react";
import { Auth } from "aws-amplify";
import { useDispatch, useSelector } from "react-redux";
import cogoToast from "cogo-toast";
import { useForm, Controller } from "react-hook-form";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";
import Spinner from "react-bootstrap/Spinner";
import { setSession } from "../../../stores/actions/session";
import AuthFooter from "../AuthFooter";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(0.7),
            fontFamily: '"Nunito Sans",sans-serif',
            color: "#343F84",
        },
    },
    textInput: {
        fontFamily: "NunitoSans-Regular",
        fontSize: 18,
        color: "#757575"
    },
    textInputLable: {
        fontFamily: "NunitoSans-Regular",
        fontSize: 18,
        color: "#757575"
    }
}));

const ChangeButton = withStyles({
    root: {
        backgroundColor: "#343F84",
        textTransform: "none",
        width: "80px",
        height: "40px",
        fontFamily: 'NunitoSans-Regular',
    },
})(Button);

const BackButton = withStyles({
    root: {
        color: "blue",
        textTransform: "none",
        padding: 0,
        fontWeight: "bold",
        "&:hover": {
            backgroundColor: "white",
            textDecoration: "underline",
        },
        fontFamily: 'NunitoSans-Black',
    },
})(Button);

export default function NewPassword() {
    const [values, setValues] = React.useState({
        showPassword: false,
        changeLoading: false,
    });

    const classes = useStyles();

    const { handleSubmit, control } = useForm();

    const { session } = useSelector((state) => ({
        session: state.session,
    }));

    const dispatch = useDispatch();

    const getPassword = (data) => {
        if (values.changeLoading) return;

        setValues({ ...values, changeLoading: true });
        Auth.completeNewPassword(session?.user, data.password, {
            email: data.email,
        })
            .then((response) => {
                cogoToast.success("Successfully changed password");
                Auth.currentAuthenticatedUser({
                    bypassCache: true,
                })
                    .then((user) => {
                        localStorage.setItem("user_info", JSON.stringify(user));
                        dispatch(setSession(user));
                    })
                    .catch(() => {
                        dispatch({ type: 'LOGOUT', });
                        setValues({ ...values, changeLoading: false });
                    });
                setValues({
                    ...values,
                    changeLoading: false,
                });
            })
            .catch((e) => {
                cogoToast.error(e.message);
                setValues({ ...values, changeLoading: false });
            });
    };
    return (
        <div>
            <form onSubmit={handleSubmit(getPassword)} className={classes.root}>
                <h2 style={{ fontFamily: "NunitoSans-Bold" }}>
                    <b>Change Password</b>
                </h2>

                {session?.user?.challengeParam?.requiredAttributes?.length >
                    0 ? (
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <TextField
                                label="Email *"
                                fullWidth
                                value={
                                    !session?.user?.attributes?.email
                                        ? value
                                        : session?.user?.attributes?.email
                                }
                                onChange={onChange}
                                error={!!error}
                                helperText={error?.message}
                                InputLabelProps={{ className: classes.textInputLable }}
                                InputProps={{ className: classes.textInput }}
                            />
                        )}
                        rules={{ required: "Email is required" }}
                    />
                ) : (
                    ""
                )}

                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                            label="Password *"
                            fullWidth
                            type={values.showPassword ? "text" : "password"}
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error?.message}
                            InputLabelProps={{ className: classes.textInputLable }}
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

                <div
                    className="mt-4 d-flex justify-content-between align-items-center"
                    style={{ width: "100%" }}
                >
                    <BackButton
                        type="button"
                        disabled={values.changeLoading}
                        onClick={() => {
                            dispatch({ type: "LOGOUT" });
                        }}
                    >
                        Back to signIn.
                    </BackButton>

                    {values.changeLoading ? (
                        <ChangeButton
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="lg"
                        >
                            <Spinner animation="border" role="status" size="sm">
                            </Spinner>
                        </ChangeButton>
                    ) : (
                        <ChangeButton type="submit" variant="contained" color="primary">
                            Change
                        </ChangeButton>
                    )}
                </div>
            </form>
            <AuthFooter />
        </div>
    )
}
