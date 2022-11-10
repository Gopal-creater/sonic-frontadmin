import { CircularProgress, Grid } from "@material-ui/core";
import { Content, SubHeading } from "../../../StyledComponents/StyledHeadings";
import { ButtonContainer, ProperAccessContainer } from "./CompanyProfileStyles";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import {
  DisabledTextField,
  StyledTextField,
} from "../../../StyledComponents/StyledAppTextInput/StyledAppTextInput";
import PersonIcon from "@material-ui/icons/Person";
import AppButton from "../../../components/common/AppButton/AppButton";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainContainer } from "../../../StyledComponents/StyledPageContainer";
import { Controller, useForm } from "react-hook-form";
import { HelperText } from "../../Licences/LicenseStyled";
import CustomDropDown from "../../../components/common/AppTextInput/CustomDropDown";
import { companyType } from "../../../constants/constants";
import { createCompanyAction } from "../../../stores/actions/CompanyActions";
import { useDispatch, useSelector } from "react-redux";
import AppAutoComplete from "../../../components/common/AutoComplete/AppAutoComplete";
import { getUsersNameAction } from "../../../stores/actions/picker/titlePicker.action";
import { getUsersAction } from "../../../stores/actions/UserActions";
import Popper from "../../../components/common/Popper";
import { log } from "../../../utils/app.debug";
import { useTheme } from "styled-components";

export default function CreateNewCompany() {
  const { handleSubmit, control, reset } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const user = useSelector((state) => state.user);
  const company = useSelector((state) => state.company);
  const [state, setState] = useState({
    countryCode: "+44",
    user: {},
    showUserDetails: false,
  });

  React.useEffect(() => {
    dispatch(getUsersAction());
  }, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    reset({
      companyName: "",
      companyType: "",
      companyURNID: "",
      userName: "",
      phoneNumber: "",
      email: "",
    });
  }, [company?.createCompany?.data]); // eslint-disable-line react-hooks/exhaustive-deps

  const createCompany = (data) => {
    let payload = {
      name: data?.companyName,
      companyType: data?.companyType,
      companyUrnOrId: data?.companyURNID,
      email: data?.email,
      contactNo: data?.phoneNumber,
      owner: state?.user?._id,
      partner: user?.userProfile?.data?.adminPartner?._id,
    };
    dispatch(createCompanyAction(payload));
  };
  log("state to user", state?.user);

  return (
    <MainContainer>
      <SubHeading>Create new company</SubHeading>
      <Content>Add new company</Content>

      <form onSubmit={handleSubmit(createCompany)}>
        <Grid container spacing={6} className="mt-2">
          <Grid item xs={12} md={6}>
            <Grid container>
              <Grid
                style={{
                  padding: "5px",
                  borderRadius: "50%",
                  backgroundColor: theme.colors.primary.main,
                }}
              >
                <MusicNoteIcon
                  style={{ color: theme.colors.primary.contrastText }}
                />
              </Grid>
            </Grid>

            <Content className="mt-2">Company details</Content>

            <Grid style={{ marginTop: 21 }}>
              <Controller
                name="companyName"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <>
                    <StyledTextField
                      fullWidth
                      id="standard-basic"
                      label="Company Name*"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      autoComplete="off"
                    />
                    {error?.message && (
                      <HelperText>{error?.message}</HelperText>
                    )}
                  </>
                )}
                rules={{ required: "Company name is required" }}
              />
            </Grid>

            <Grid style={{ marginTop: 17 }}>
              <Controller
                name="companyType"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <>
                    <CustomDropDown
                      labelText="Company Type*"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        error: !!error,
                        value: value,
                        onChange: onChange,
                      }}
                      labelProps={{
                        style: {
                          fontFamily: theme.fontFamily.robotoRegular,
                        },
                      }}
                      data={companyType || []}
                    />
                    {error?.message && (
                      <HelperText>{error?.message}</HelperText>
                    )}
                  </>
                )}
                rules={{ required: "Company type is required" }}
              />
            </Grid>

            <Grid style={{ marginTop: 17 }}>
              <Controller
                name="companyURNID"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <>
                    <StyledTextField
                      fullWidth
                      id="standard-basic"
                      label="Company URN / ID"
                      value={value}
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
            <Grid container>
              <Grid
                style={{
                  padding: "5px",
                  borderRadius: "50%",
                  backgroundColor: theme.colors.primary.main,
                }}
              >
                <PersonIcon
                  style={{ color: theme.colors.primary.contrastText }}
                />
              </Grid>
            </Grid>

            <Content className="mt-2">Admin details</Content>
            <Popper
              title={"Select Admin"}
              showDetails={(flag) =>
                setState({ ...state, showUserDetails: flag })
              }
            >
              <AppAutoComplete
                setAutoComPleteAction={(value) =>
                  dispatch(getUsersNameAction(value))
                }
                setAutoCompleteOptions={(option) => option?.username || ""}
                setAutoCompleteOptionsLabel={(option) => option?.email || ""}
                loading={user?.userSearch?.loading}
                data={user?.userSearch?.data?.docs}
                error={user?.userSearch?.error}
                getSelectedValue={(e, v) => setState({ ...state, user: v })}
                placeholder={"Search for a user"}
              />
            </Popper>

            {state?.showUserDetails && (
              <Grid style={{ marginTop: 15 }}>
                <DisabledTextField label={"User Type"} value={"Admin"} />
                <Grid style={{ marginTop: 15 }}>
                  <DisabledTextField
                    label={"Username"}
                    value={state?.user?.username || ""}
                  />
                </Grid>

                <Grid style={{ marginTop: 15 }}>
                  <DisabledTextField
                    label={"Email"}
                    value={state?.user?.email || ""}
                  />
                </Grid>

                <Grid style={{ marginTop: 15 }}>
                  <DisabledTextField
                    label={"Phone Number"}
                    value={state?.user?.phone_number || ""}
                  />
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>

        <ProperAccessContainer></ProperAccessContainer>

        <ButtonContainer>
          <AppButton
            variant={"outline"}
            onClick={() => navigate(-1)}
            disabled={company?.createCompany?.loading}
          >
            Cancel
          </AppButton>
          <AppButton
            disabled={!state.showUserDetails}
            variant={"fill"}
            type="submit"
            style={{ marginLeft: "15px", width: "210px" }}
          >
            {company?.createCompany?.loading ? (
              <CircularProgress size={20} color="white" />
            ) : (
              "Create new company"
            )}
          </AppButton>
        </ButtonContainer>
      </form>
    </MainContainer>
  );
}
