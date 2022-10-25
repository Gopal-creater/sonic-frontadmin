import {
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import AppButton from "../../../components/common/AppButton/AppButton";
import AppToggleSwitch from "../../../components/common/AppToggleSwitch/AppToggleSwitch";
import {
  DisabledTextField,
  StyledTextField,
} from "../../../StyledComponents/StyledAppTextInput/StyledAppTextInput";
import { Content, SubHeading } from "../../../StyledComponents/StyledHeadings";
import {
  ButtonContainer,
  IconBox,
  ProperAccessContainer,
} from "./UserProfileStyle";
import PersonIcon from "@material-ui/icons/Person";
import LockIcon from "@material-ui/icons/Lock";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import React from "react";
import theme from "../../../theme";
import { MainContainer } from "../../../StyledComponents/StyledPageContainer";
import { Controller, useForm } from "react-hook-form";
import { HelperText } from "../../Licences/LicenseStyled";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import * as actionTypes from "../../../stores/actions/actionTypes";
import cogoToast from "cogo-toast";
import { updateUser } from "../../../services/https/resources/UserApi";
import { userRoles } from "../../../constants/constants";
import { log } from "../../../utils/app.debug";

export default function UserProfile() {
  const schema = Yup.object().shape({
    newPassword: Yup.string(),
    confirmNewPassword: Yup.string().oneOf(
      [Yup.ref("newPassword")],
      "Passwords does not match"
    ),
  });
  const formOptions = { resolver: yupResolver(schema) };
  const { handleSubmit, control, reset } = useForm(formOptions);

  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();

  const [updatedUser, setUpdateUser] = React.useState(state);
  const [values, setValues] = React.useState({
    showNewPassword: false,
    showConfirmNewPassword: false,
    updated: false,
    loading: false,
  });

  React.useEffect(() => {
    reset({
      status: updatedUser?.enabled,
      phoneNumber: updatedUser?.phoneNumber,
      newPassword: "",
      confirmNewPassword: "",
    });
  }, [values.updated]);

  function handleUserProfile(data) {
    setValues({ ...values, loading: true });
    let payload = {
      password: data?.newPassword || undefined,
      phoneNumber: data?.phoneNumber,
      firstName: data?.firstName || undefined,
      lastName: data?.lastName || undefined,
      enabled: data?.status,
    };

    updateUser(state?._id, payload)
      .then((res) => {
        dispatch({ type: actionTypes.UPDATE_USERS_PROFILE, data: res });
        setUpdateUser(res);
        setValues({ ...values, loading: false, updated: true });
        cogoToast.success("User updated successfully!");
      })
      .catch((err) => {
        log("User update error", err);
        setValues({ ...values, loading: false });
        cogoToast.error(err?.message);
      });
  }

  const getAccountType = () => {
    if (
      state?.userRole === userRoles.PARTNER_ADMIN ||
      state?.userRole === userRoles.PARTNER_USER
    ) {
      return "Partner";
    } else if (
      state?.userRole === userRoles.COMPANY_ADMIN ||
      state?.userRole === userRoles.COMPANY_USER
    ) {
      return "Company";
    }
    return null;
  };

  return (
    <MainContainer>
      <SubHeading>User profile</SubHeading>
      <Content>Update user details</Content>

      <form onSubmit={handleSubmit(handleUserProfile)}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Grid container>
              <IconBox>
                <PersonIcon style={{ color: theme.colors.primary.teal }} />
              </IconBox>
            </Grid>

            <Content className="mt-2">User details</Content>

            <Grid style={{ marginTop: 15 }}>
              <DisabledTextField
                label={"Username"}
                value={updatedUser?.username || ""}
              />
            </Grid>

            <Grid style={{ marginTop: 15 }}>
              <DisabledTextField
                label={"Email"}
                value={updatedUser?.email || ""}
              />
            </Grid>

            <Grid style={{ marginTop: 15 }}>
              <DisabledTextField
                label={"Account Type"}
                value={getAccountType()}
              />
            </Grid>

            <Grid container spacing={1} style={{ marginTop: 15 }}>
              <Grid item xs={12} md={6}>
                <Controller
                  name="firstName"
                  control={control}
                  defaultValue={updatedUser?.firstName}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <>
                      <StyledTextField
                        fullWidth
                        label="Firstname"
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      {error?.message && (
                        <HelperText>{error?.message}</HelperText>
                      )}
                    </>
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="lastName"
                  control={control}
                  defaultValue={updatedUser?.lastName}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <>
                      <StyledTextField
                        fullWidth
                        label="Surname"
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      {error?.message && (
                        <HelperText>{error?.message}</HelperText>
                      )}
                    </>
                  )}
                />
              </Grid>
            </Grid>

            <Grid style={{ marginTop: 15 }}>
              <Controller
                name="phoneNumber"
                control={control}
                defaultValue={updatedUser?.phone_number}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <>
                    <StyledTextField
                      fullWidth
                      label="Phone number"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    {error?.message && (
                      <HelperText>{error?.message}</HelperText>
                    )}
                  </>
                )}
              />
            </Grid>

            <Grid style={{ marginTop: 15 }}>
              <DisabledTextField
                label={"User ID"}
                value={updatedUser?._id || ""}
              />
            </Grid>

            <Grid className="mt-4">
              <Content>Status</Content>
              <Controller
                name="status"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <>
                    <AppToggleSwitch
                      size={121}
                      checkedSize={70}
                      active={'"ACTIVE"'}
                      inActive={'"SUSPENDED"'}
                      defaultChecked={updatedUser?.enabled}
                      checked={value}
                      onChange={onChange}
                      error={!!error}
                    />
                    {error?.message && (
                      <HelperText>{error?.message}</HelperText>
                    )}
                  </>
                )}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            {getAccountType() !== null && (
              <Grid className="mb-4">
                <Grid container>
                  <IconBox>
                    <MusicNoteIcon
                      style={{ color: theme.colors.primary.teal }}
                    />
                  </IconBox>
                </Grid>

                <Content className="mt-2">{getAccountType()} details</Content>

                <>
                  {getAccountType() === "Partner" ? (
                    <Grid>
                      <Grid style={{ marginTop: 15 }}>
                        <DisabledTextField
                          label={"Partner Name"}
                          value={updatedUser?.partner?.name}
                        />
                      </Grid>
                      <Grid style={{ marginTop: 15 }}>
                        <DisabledTextField
                          label={"Partner Type"}
                          value={updatedUser?.partner?.partnerType}
                        />
                      </Grid>
                      <Grid style={{ marginTop: 15 }}>
                        <DisabledTextField
                          label={"Partner ID"}
                          value={updatedUser?.partner?._id}
                        />
                      </Grid>
                    </Grid>
                  ) : (
                    <Grid>
                      <Grid style={{ marginTop: 15 }}>
                        <DisabledTextField
                          label={"Company Name"}
                          value={updatedUser?.company?.name || ""}
                        />
                      </Grid>

                      <Grid style={{ marginTop: 15 }}>
                        <DisabledTextField
                          label={"Company Type"}
                          value={updatedUser?.company?.companyType || ""}
                        />
                      </Grid>

                      <Grid style={{ marginTop: 15 }}>
                        <DisabledTextField
                          label={"Company URN / ID"}
                          value={updatedUser?.company?.companyUrnOrId || ""}
                        />
                      </Grid>
                    </Grid>
                  )}
                </>
              </Grid>
            )}

            <Grid container>
              <IconBox>
                <LockIcon style={{ color: theme.colors.primary.teal }} />
              </IconBox>
            </Grid>

            <Content className="mt-2">Password</Content>

            <Grid style={{ marginTop: 15 }}>
              <Controller
                name="newPassword"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <>
                    <StyledTextField
                      fullWidth
                      label="New password"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      type={values?.showNewPassword ? "text" : "password"}
                      autoComplete="new-password"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => {
                                setValues({
                                  ...values,
                                  showNewPassword: !values?.showNewPassword,
                                });
                              }}
                              onMouseDown={(event) => {
                                event.preventDefault();
                              }}
                            >
                              {values?.showNewPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    {error?.message && (
                      <HelperText>{error?.message}</HelperText>
                    )}
                  </>
                )}
              />
            </Grid>

            <Grid style={{ marginTop: 15 }}>
              <Controller
                name="confirmNewPassword"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <>
                    <StyledTextField
                      fullWidth
                      label="Re-enter new password password"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      type={
                        values?.showConfirmNewPassword ? "text" : "password"
                      }
                      autoComplete="new-password"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => {
                                setValues({
                                  ...values,
                                  showConfirmNewPassword:
                                    !values?.showConfirmNewPassword,
                                });
                              }}
                              onMouseDown={(event) => {
                                event.preventDefault();
                              }}
                            >
                              {values?.showConfirmNewPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    {error?.message && (
                      <HelperText>{error?.message}</HelperText>
                    )}
                  </>
                )}
              />
            </Grid>
          </Grid>
        </Grid>

        <ProperAccessContainer />

        <ButtonContainer className="mt-3 mb-2">
          <AppButton
            variant={"outline"}
            onClick={() => navigate(-1)}
            disabled={values?.loading}
          >
            Cancel
          </AppButton>
          <AppButton
            type="submit"
            variant={"fill"}
            style={{ marginLeft: "15px", width: "180px" }}
          >
            {values?.loading ? (
              <CircularProgress size={20} color="white" />
            ) : (
              "Update details"
            )}
          </AppButton>
        </ButtonContainer>
      </form>
    </MainContainer>
  );
}
