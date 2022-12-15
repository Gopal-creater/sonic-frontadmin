import { Grid } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch } from "react-redux";
import {
  emailConfirmation,
  forgotPasword,
  setSession,
} from "../../../stores/actions/session";
import cogoToast from "cogo-toast";
import AuthFooter from "../AuthFooter";
import { Content } from "../../../StyledComponents/StyledHeadings";
import { StyledTextField } from "../../../StyledComponents/StyledAppTextInput/StyledAppTextInput";
import AppButton from "../../../components/common/AppButton/AppButton";
import { useTheme } from "styled-components";
import amazing_logo from "../../../assets/icons/amazing_Logo.png";
import { login } from "../../../services/https/resources/Auth/Auth.api";
import { log } from "../../../utils/app.debug";
import { userActions } from "../../../constants/constants";

export default function SignIn() {
  const classes = useStyles();
  const theme = useTheme();

  const [values, setValues] = React.useState({
    showPassword: false,
    loginLoading: false,
  });

  const dispatch = useDispatch();

  const { handleSubmit, control } = useForm();

  /* Sign in function */
  function signIn(data) {
    if (values.loginLoading) return;

    //Payload for signin--------
    let payload = {
      identifier: data?.username,
      password: data?.password,
    };
    //--------------------------

    setValues({ ...values, loginLoading: true });
    login(payload)
      .then((response) => {
        localStorage.setItem("user_info", JSON.stringify(response));
        dispatch(setSession(response));
        setValues({ ...values, loginLoading: false });
      })
      .catch((err) => {
        log("signin error", err);
        if (err?.message === "User is disabled.") {
          cogoToast.error("User is suspended, please contact admin.");
        } else if (
          err?.userAction === userActions.RESET_PASSWORD_REQUIRED ||
          err?.userAction === userActions.FORCE_CHANGE_PASSWORD
        ) {
          dispatch(forgotPasword(true));
        } else if (
          err?.userAction === userActions.EMAIL_CONFIRMATION_REQUIRED
        ) {
          dispatch(emailConfirmation(true));
        } else {
          cogoToast.error(err?.message);
        }
        setValues({ ...values, loginLoading: false });
      });
  }

  return (
    <Grid
      className={classes.signInRoot}
      justifyContent="center"
      alignItems="center"
    >
      <form onSubmit={handleSubmit(signIn)}>
        <Grid item container justifyContent="center">
          <img src={amazing_logo} alt="amazing_logo" style={{ width: "50%" }} />
          <Content>Encode. Manage. Monitor. Report.</Content>
        </Grid>

        <Controller
          name="username"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <StyledTextField
              fullWidth
              label="Username*"
              value={value}
              onChange={onChange}
              error={!!error}
              style={{ marginTop: "25px" }}
              helperText={error?.message}
              inputProps={
                {
                  // className: classes.textInput,
                  // form: {
                  //     autocomplete: 'off'
                  // },
                }
              }
            />
          )}
          rules={{ required: "Username is required" }}
        />

        <Controller
          name="password"
          control={control}
          defaultValue=""
          className="mt-1"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <StyledTextField
              label="Password*"
              fullWidth
              type={values.showPassword ? "text" : "password"}
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error?.message}
              // inputProps={{ className: classes.textInput }}
              className="mt-1"
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
          rules={{ required: "Password is required" }}
        />

        <Grid
          container
          justifyContent={"space-between"}
          style={{ marginTop: "35px" }}
        >
          <AppButton
            variant={"none"}
            onClick={() => dispatch(forgotPasword(true))}
            disabled={values.loginLoading}
          >
            Forgot password?
          </AppButton>

          {values.loginLoading ? (
            <AppButton
              type="submit"
              variant="fill"
              style={{
                paddingTop: "10px",
                paddingBottom: "10px",
                width: "110px",
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
                width: "110px",
                height: "45px",
              }}
            >
              Sign In
            </AppButton>
          )}
        </Grid>

        <Grid
          container
          direction="column"
          alignItems="flex-end"
          style={{ marginTop: "35px" }}
        >
          <p
            style={{
              color: theme.colors.grey.main,
              fontFamily: theme.fontFamily.robotoRegular,
              fontSize: theme.fontSize.caption,
            }}
          >
            Don't have an account?
          </p>

          <AppButton
            disabled={values.loginLoading}
            onClick={() => {
              dispatch({ type: "SIGN-UP", data: true });
              window.open("https://amazingradio.com/connect/signup", "_blank");
            }}
            variant={"outline"}
            style={{ padding: "8px 5px 8px 5px", width: "110px" }}
          >
            Sign Up
          </AppButton>
        </Grid>
        <AuthFooter />
      </form>
    </Grid>
  );
}

const useStyles = makeStyles(() => {
  return {
    signInRoot: {
      width: "100%",
      height: "100%",
      overflow: "auto",
      "&::-webkit-scrollbar": { display: "none" },
      "&::-ms-overflow-style": "none" /* IE and Edge */,
      "&::-scrollbar-width": "none" /* Firefox */,
    },
  };
});
