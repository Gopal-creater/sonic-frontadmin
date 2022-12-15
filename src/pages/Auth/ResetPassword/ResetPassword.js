import { Grid, IconButton, InputAdornment } from "@material-ui/core";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import AuthFooter from "../AuthFooter";
import { useDispatch } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import cogoToast from "cogo-toast";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Heading } from "../../../StyledComponents/StyledHeadings";
import AppButton from "../../../components/common/AppButton/AppButton";
import { StyledTextField } from "../../../StyledComponents/StyledAppTextInput/StyledAppTextInput";
import {
  forgotUserPassword,
  resetPassword,
} from "../../../services/https/resources/Auth/Auth.api";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { log } from "../../../utils/app.debug";
import { forgotPasword } from "../../../stores/actions/session";

export default function ResetPassword() {
  //-----form related declarations------//
  const formSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const formOptions = { resolver: yupResolver(formSchema) };
  const { handleSubmit: handleReset, control: controlReset } = useForm();
  const { handleSubmit, control } = useForm(formOptions);
  //-----form related declarations------//

  const dispatch = useDispatch();

  const [values, setValues] = React.useState({
    email: "",
    sendCodeLoading: false,
    receivedCode: false,
    resetPasswordLoading: false,
    showPassword: false,
  });

  const sendCode = (data) => {
    if (values.sendCodeLoading) return;
    //Payload for forgotPassword-------
    let payload = {
      email: data?.email,
      emailType: "code",
    };
    //---------------------------------

    setValues({ ...values, sendCodeLoading: true });
    forgotUserPassword(payload)
      .then(() => {
        setValues({
          ...values,
          email: data?.email,
          sendCodeLoading: false,
          receivedCode: true,
        });
      })
      .catch((err) => {
        log("forgotPassword error", err);
        cogoToast.error(err?.message);
        setValues({ ...values, sendCodeLoading: false });
      });
  };

  const resetPasswordWithCodeVerification = (data) => {
    if (values.resetPasswordLoading) return;

    //Reset password payload------------
    let payload = {
      verificationCode: data?.validationCode,
      password: data?.newPassword,
    };
    //----------------------------------

    setValues({ ...values, resetPasswordLoading: true });
    resetPassword(payload)
      .then(() => {
        cogoToast.success("Succesfully changed password");
        setValues({ ...values, resetPasswordLoading: false, username: "" });
        dispatch(forgotPasword(false));
      })
      .catch((err) => {
        setValues({ ...values, resetPasswordLoading: false });
        cogoToast.error(err.message);
      });
  };

  if (!values?.receivedCode) {
    return (
      <Grid>
        <Heading>Reset password</Heading>

        <form key={1} onSubmit={handleSubmit(sendCode)}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <StyledTextField
                label="Email *"
                fullWidth
                value={value}
                onChange={onChange}
                error={!!error}
                className="mt-2"
                helperText={error?.message}
              />
            )}
            rules={{ required: "Email is required" }}
          />

          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            className="mt-5"
          >
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
                style={{
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  width: "135px",
                  height: "45px",
                }}
              >
                <Spinner animation="border" role="status" size="sm"></Spinner>
              </AppButton>
            ) : (
              <AppButton
                type="submit"
                variant="fill"
                style={{
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  width: "135px",
                  height: "45px",
                }}
              >
                Send code
              </AppButton>
            )}
          </Grid>

          <AuthFooter />
        </form>
      </Grid>
    );
  }

  return (
    <Grid className="resetPassword-container">
      <Heading>Reset password</Heading>

      <form key={2} onSubmit={handleReset(resetPasswordWithCodeVerification)}>
        <Controller
          name="validationCode"
          control={controlReset}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <StyledTextField
              label="Validation Code *"
              fullWidth
              value={value}
              onChange={onChange}
              error={!!error}
              className="mt-2"
              helperText={error?.message}
              autoComplete="off"
              inputProps={{
                form: {
                  autocomplete: "off",
                },
              }}
            />
          )}
          rules={{ required: "Validation code is required" }}
        />

        <Controller
          name="newPassword"
          control={controlReset}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <StyledTextField
              label="New password *"
              fullWidth
              type={values.showPassword ? "text" : "password"}
              value={value}
              onChange={onChange}
              error={!!error}
              className="mt-2"
              helperText={error?.message}
              autoComplete="off"
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
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
          rules={{ required: "New password is required" }}
        />

        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          className="mt-5"
        >
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
              style={{
                paddingTop: "10px",
                paddingBottom: "10px",
                width: "135px",
                height: "45px",
              }}
            >
              <Spinner animation="border" role="status" size="sm"></Spinner>
            </AppButton>
          ) : (
            <AppButton
              type="submit"
              variant="fill"
              style={{
                paddingTop: "10px",
                paddingBottom: "10px",
                width: "135px",
                height: "45px",
              }}
            >
              Reset
            </AppButton>
          )}
        </Grid>

        <AuthFooter />
      </form>
    </Grid>
  );
}
