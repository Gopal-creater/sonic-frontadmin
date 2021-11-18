import { Grid, TextField, Typography } from '@material-ui/core'
import React from 'react'
import { useForm, Controller } from "react-hook-form";
import Button from "@material-ui/core/Button";
import AuthFooter from "../AuthFooter"
import "./ResetPassword.scss"

export default function ResetPassword() {
    const { handleSubmit, control } = useForm();

    const sendCode = () => {

    }

    return (
        <Grid className="resetPassword-container">
            <Typography className="resetPassword-heading">Reset password</Typography>

            <form onSubmit={handleSubmit(sendCode)}>
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
                    <Button
                        type="button"
                        onClick={() => { }}
                        disabled={false}
                        className="backToSignIn-Btn"
                    >
                        Back to SignIn
                    </Button>

                    <Button type="submit" variant="contained" color="primary" className="sendCode-Btn">
                        Send code
                    </Button>
                </Grid>

                <AuthFooter />
            </form>
        </Grid>
    )
}
