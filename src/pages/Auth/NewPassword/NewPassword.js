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
import { StyledTextField } from "../../../StyledComponents/StyledAppTextInput/StyledAppTextInput";
import AppButton from "../../../components/common/AppButton/AppButton";
import { H2 } from "../../../StyledComponents/StyledHeadings";



const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(0.7),
            fontFamily: '"Nunito Sans",sans-serif',
            color: "#343F84",
        },

    },
    textInput: {
        WebkitBoxShadow: "0 0 0px 1000px white inset",
        // WebkitTextFillColor: theme.colors.secondary.lightNavy,
    },
}));

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
                <H2> Change Password </H2>


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
                            <StyledTextField
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
                                inputProps={{ className: classes.textInput }}
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
                        <StyledTextField
                            label="Password *"
                            fullWidth
                            type={values.showPassword ? "text" : "password"}
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error?.message}
                            inputProps={{ className: classes.textInput }}
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
                                form: {
                                    autocomplete: 'off',
                                }
                            }}
                        />
                    )}
                    rules={{ required: "Password is required" }}
                />

                <div
                    className="mt-4 d-flex justify-content-between align-items-center"
                    style={{ width: "100%" }}
                >
                    <AppButton
                        variant={"none"}
                        style={{ paddingLeft: "0px", paddingRight: "0px" }}
                        disabled={values.changeLoading}
                        onClick={() => {
                            dispatch({ type: "LOGOUT" });
                        }}
                    >
                        Back to signIn.
                    </AppButton>

                    {values.changeLoading ? (
                        <AppButton
                            type="submit"
                            variant="fill"
                            color="primary"
                            style={{ width: "90px", height: "40px" }}
                        >
                            <Spinner animation="border" role="status" size="sm">
                            </Spinner>
                        </AppButton>
                    ) : (
                        <AppButton
                            type="submit" variant="fill" size="lg" style={{ width: "90px", height: "40px" }}>
                            Change
                        </AppButton>
                    )}
                </div>
            </form>
            <AuthFooter />
        </div>
    )
}
