import { CircularProgress, Grid } from "@material-ui/core";
import { Content, SubHeading } from "../../../StyledComponents/StyledHeadings";
import { ButtonContainer, ProperAccessContainer } from "./CompanyProfileStyles";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import { DisabledTextField } from "../../../StyledComponents/StyledAppTextInput/StyledAppTextInput";
import AppToggleSwitch from "../../../components/common/AppToggleSwitch/AppToggleSwitch";
import PersonIcon from "@material-ui/icons/Person";

import AppButton from "../../../components/common/AppButton/AppButton";
import React from "react";
import { MainContainer } from "../../../StyledComponents/StyledPageContainer";
import { HelperText } from "../../Licences/LicenseStyled";
import { Controller, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { log } from "../../../utils/app.debug";
import { useDispatch, useSelector } from "react-redux";
import { updateCompanyProfileAction } from "../../../stores/actions/CompanyActions";
import { useTheme } from "styled-components";

export default function CompanyProfile() {
  const { handleSubmit, control, reset } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const company = useSelector((state) => state.company);
  const theme = useTheme();
  const { state } = useLocation();
  log("company profile:", state);

  const updateCompanyProfile = (data) => {
    let payload = {
      enabled: data?.status,
    };
    dispatch(updateCompanyProfileAction(payload, state?._id));
  };

  return (
    <MainContainer>
      <SubHeading>Company profile</SubHeading>
      <Content>Update company details</Content>

      <form onSubmit={handleSubmit(updateCompanyProfile)}>
        <Grid container spacing={6} className="mt-2">
          <Grid item xs={12} md={6}>
            <Grid container>
              <Grid
                style={{
                  padding: "5px",
                  borderRadius: "50%",
                  backgroundColor: theme.colors.secondary.main,
                }}
              >
                <MusicNoteIcon style={{ color: theme.colors.secondary.main}} />
              </Grid>
            </Grid>
            <Content className="mt-2">Company details</Content>
            <Grid style={{ marginTop: 15 }}>
              <DisabledTextField label={"Company Name"} value={state?.name} />
            </Grid>

            <Grid style={{ marginTop: 15 }}>
              <DisabledTextField
                label={"Company Type"}
                value={state?.companyType}
              />
            </Grid>

            <Grid style={{ marginTop: 15 }}>
              <DisabledTextField
                label={"Company URN / ID"}
                value={state?.companyUrnOrId}
              />
            </Grid>

            <Grid container>
              <Grid className="mt-5">
                <Content>Status</Content>
              </Grid>
            </Grid>
            <Grid container>
              <Grid>
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
                        defaultChecked={state?.enabled}
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
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid container>
              <Grid
                style={{
                  padding: "5px",
                  borderRadius: "50%",
                  backgroundColor: theme.colors.secondary.main,
                }}
              >
                <PersonIcon style={{ color: theme.colors.secondary.main }} />
              </Grid>
            </Grid>
            <Content className="mt-2">Admin details</Content>

            <Grid style={{ marginTop: 15 }}>
              <DisabledTextField label={"Type"} value={"Admin"} />
            </Grid>

            <Grid style={{ marginTop: 15 }}>
              <DisabledTextField
                label={"Username"}
                value={state?.owner?.username}
              />
            </Grid>

            <Grid style={{ marginTop: 15 }}>
              <DisabledTextField label={"Email"} value={state?.owner?.email} />
            </Grid>

            <Grid style={{ marginTop: 15 }}>
              <DisabledTextField
                label={"Phone number"}
                value={state?.owner?.phone_number || " "}
              />
            </Grid>

            <Grid style={{ marginTop: 15 }}>
              <DisabledTextField
                label={"Admin ID"}
                value={state?.owner?._id || " "}
              />
            </Grid>
          </Grid>
        </Grid>

        <ProperAccessContainer></ProperAccessContainer>

        <ButtonContainer>
          <AppButton
            variant={"outline"}
            onClick={() => navigate(-1)}
            disabled={company?.updateCompany?.loading}
          >
            Cancel
          </AppButton>
          <AppButton
            type="submit"
            variant={"fill"}
            style={{ marginLeft: "15px", width: "180px" }}
          >
            {company?.updateCompany?.loading ? (
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
