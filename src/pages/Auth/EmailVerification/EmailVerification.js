import { CircularProgress, Grid } from "@material-ui/core";
import React from "react";
import AppButton from "../../../components/common/AppButton/AppButton";
import { Content, Heading } from "../../../StyledComponents/StyledHeadings";
import AuthFooter from "../AuthFooter";
import { Auth } from "aws-amplify";
import cogoToast from "cogo-toast";
import { useDispatch, useSelector } from "react-redux";
import { setSession } from "../../../stores/actions";
import { log } from "../../../utils/app.debug";
import { StyledTextField } from "../../../StyledComponents/StyledAppTextInput/StyledAppTextInput";
import { Controller, useForm } from "react-hook-form";
import { useTheme } from "styled-components";

export default function EmailVerification() {
  const [state, setState] = React.useState({
    verifyLoading: false,
    recendCodeLoading: false,
  });

  const { handleSubmit, control } = useForm();
  const session = useSelector((state) => state.session);
  const dispatch = useDispatch();
  const theme = useTheme();

  const verifyMail = (data) => {
    if (state.verifyLoading || state.recendCodeLoading) return;

    setState({ ...state, verifyLoading: true });
    Auth.confirmSignUp(session?.user?.username, data.code)
      .then((response) => {
        log("Verify email response", response);
        localStorage.setItem("user_info", JSON.stringify(response));
        dispatch(setSession(response));
        setState({ ...state, verifyLoading: false });
        cogoToast.success("Successfully verified email");
      })
      .catch((error) => {
        log("Error verifying mail", error);
        setState({ ...state, verifyLoading: false });
        cogoToast.error(error?.message || "Error verifying email");
      });
  };

  const resendConfirmationCode = () => {
    if (state.verifyLoading || state.recendCodeLoading) return;

    setState({ ...state, recendCodeLoading: true });
    Auth.resendSignUp(session?.user?.username)
      .then(() => {
        setState({ ...state, recendCodeLoading: false });
        cogoToast.success("Code resent successfully");
      })
      .catch((error) => {
        log("Error sending code", error);
        setState({ ...state, recendCodeLoading: false });
        cogoToast.error(error?.message || "Error sending code");
      });
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      style={{ height: "100%" }}
    >
      <Grid item>
        <Heading>Email verification</Heading>

        <Grid className="mt-3">
          <form onSubmit={handleSubmit(verifyMail)}>
            <Controller
              name="code"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <StyledTextField
                  label="Code *"
                  fullWidth
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
              rules={{ required: "Code is required" }}
            />

            <Grid container justifyContent="flex-end" className="mt-4">
              <AppButton
                type="submit"
                variant={"fill"}
                style={{ width: "135px", height: "50px" }}
              >
                {state.verifyLoading ? (
                  <CircularProgress size={20} color="white" />
                ) : (
                  "Verify"
                )}
              </AppButton>
            </Grid>
          </form>
        </Grid>

        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          style={{ marginTop: "35px" }}
        >
          <Content>Didn't receive a code?</Content>

          <AppButton
            variant={"none"}
            style={{
              padding: "0px",
              marginLeft: 5,
              textDecoration: "underline",
            }}
            onClick={() => resendConfirmationCode()}
          >
            {state.recendCodeLoading ? (
              <CircularProgress size={20} color={theme.colors.pinkPunch} />
            ) : (
              "Resend"
            )}
          </AppButton>
        </Grid>

        <AppButton
          className="mt-3"
          variant={"none"}
          style={{
            padding: "0px",
            marginTop: "-5px",
            textDecoration: "underline",
          }}
          onClick={() => {
            dispatch(setSession(null));
          }}
        >
          Return to Login
        </AppButton>
      </Grid>

      <Grid item>
        <AuthFooter />
      </Grid>
    </Grid>
  );
}
