import { Grid, IconButton, InputAdornment, TextField, Typography } from '@material-ui/core'
import React from 'react'
import { useForm, Controller } from "react-hook-form";
import Button from "@material-ui/core/Button";
import AuthFooter from "../AuthFooter"
import { useDispatch } from "react-redux";
import { forgotPasword } from '../../../stores/actions/session';
import Spinner from "react-bootstrap/Spinner";
import cogoToast from 'cogo-toast';
import { Auth } from "aws-amplify";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import "./ResetPassword.scss"
import { H1 } from '../../../StyledComponents/StyledHeadings';
import AppButton from '../../../components/common/AppButton/AppButton';


export default function ResetPassword() {
    const { handleSubmit, control } = useForm();

    const { handleSubmit: handleReset, control: controlReset } = useForm();


    const dispatch = useDispatch();

    const [values, setValues] = React.useState({
        username: "",
        sendCodeLoading: false,
        receivedCode: false,
        resetPasswordLoading: false,
        showPassword: false
    })

    const sendCode = (data) => {
        if (values.sendCodeLoading) return;

        setValues({ ...values, sendCodeLoading: true });
        Auth.forgotPassword(data?.username)
            .then(() => {
                setValues({
                    ...values,
                    username: data?.username,
                    sendCodeLoading: false,
                    receivedCode: true,
                });
            })
            .catch((err) => {
                cogoToast.error(err?.message);
                setValues({ ...values, sendCodeLoading: false });
            });
    }

    const resetPassword = (data) => {
        if (values.resetPasswordLoading) return;

        setValues({ ...values, resetPasswordLoading: true });
        Auth.forgotPasswordSubmit(
            values?.username,
            data?.validationCode,
            data?.newPassword
        )
            .then(() => {
                cogoToast.success("Succesfully changed password");
                setValues({ ...values, resetPasswordLoading: false, username: "" });
                dispatch(forgotPasword(false))
            })
            .catch((err) => {
                setValues({ ...values, resetPasswordLoading: false });
                cogoToast.error(err.message);
            });
    }

    if (!values?.receivedCode) {
        return (
            <Grid className="resetPassword-container">
                <H1>Reset password</H1>

                <form key={1} onSubmit={handleSubmit(sendCode)}>
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
                                inputProps={{ className: "textInput" }}
                                InputLabelProps={{ className: "textInputLable" }}
                            />
                        )}
                        rules={{ required: "Username is required" }}
                    />

                    <Grid container justifyContent="space-between" alignItems="center" className="mt-5">
                        <AppButton
                            variant={"none"}
                            onClick={() => dispatch(forgotPasword(false))}
                            disabled={values?.sendCodeLoading ? true : false}
                            style={{ paddingLeft: "0px", paddingRight: "0px" }}
                        >
                            Back to SignIn
                        </AppButton>

                        {values?.sendCodeLoading ? (
                            <AppButton
                                type="submit"
                                variant="fill"
                                style={{ paddingTop: "10px", paddingBottom: "10px", width: "135px", height: "45px" }}
                            >
                                <Spinner animation="border" role="status" size="sm">
                                </Spinner>
                            </AppButton>
                        ) : (
                            <AppButton
                                type="submit"
                                variant="fill"
                                style={{ paddingTop: "10px", paddingBottom: "10px", width: "135px", height: "45px" }}
                            >
                                Send code
                            </AppButton>
                        )}
                    </Grid>

                    <AuthFooter />
                </form >
            </Grid >
        )
    }

    return (
        <Grid className="resetPassword-container">
            <H1>Reset password</H1>

            <form key={2} onSubmit={handleReset(resetPassword)} >
                <Controller
                    name="validationCode"
                    control={controlReset}
                    defaultValue=""
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                            label="Validation Code *"
                            fullWidth
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            className="mt-2"
                            helperText={error?.message}
                            inputProps={{
                                className: "textInput",
                                form: {
                                    autocomplete: 'off',
                                }
                            }}
                            InputLabelProps={{ className: "textInputLable" }}
                        />
                    )}
                    rules={{ required: "Validation code is required" }}
                />

                <Controller
                    name="newPassword"
                    control={controlReset}
                    defaultValue=""
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                            label="New password *"
                            fullWidth
                            type={values.showPassword ? "text" : "password"}
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            className="mt-2"
                            helperText={error?.message}
                            InputProps={{
                                className: "textInput",
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
                                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            InputLabelProps={{ className: "textInputLable" }}
                        />
                    )}
                    rules={{ required: "New password is required" }}
                />

                <Grid container justifyContent="space-between" alignItems="center" className="mt-5">
                    <AppButton
                        variant={"none"}
                        onClick={() => dispatch(forgotPasword(false))}
                        disabled={values?.resetPasswordLoading ? true : false}
                        style={{ paddingLeft: "0px", paddingRight: "0px" }}
                    >
                        Back to SignIn
                    </AppButton>

                    {values?.resetPasswordLoading ? (
                        <AppButton
                            type="submit"
                            variant="fill"
                            style={{ paddingTop: "10px", paddingBottom: "10px", width: "135px", height: "45px" }}
                        >
                            <Spinner animation="border" role="status" size="sm">
                            </Spinner>
                        </AppButton>
                    ) : (
                        <AppButton
                            type="submit"
                            variant="fill"
                            style={{ paddingTop: "10px", paddingBottom: "10px", width: "135px", height: "45px" }}
                        >
                            Reset
                        </AppButton>
                    )}
                </Grid>

                <AuthFooter />
            </form >
        </Grid >
    )
}
