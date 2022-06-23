import React from "react";
import { CircularProgress, FormControl, FormLabel, Grid, RadioGroup } from "@material-ui/core";
import { MusicNote } from "@material-ui/icons";
import cogoToast from "cogo-toast";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AppButton from "../../../components/common/AppButton/AppButton";
import { CustomRadioButton } from "../../../components/common/AppRadioButton/AppRadioButton";
import AppToggleSwitch from "../../../components/common/AppToggleSwitch/AppToggleSwitch";
import AppAutoComplete from "../../../components/common/AutoComplete/AppAutoComplete";
import CustomDatePicker from "../../../components/common/FilterComponent/components/CustomDatePicker";
import { addLicenseKeyAction } from "../../../stores/actions/licenceKey";
import { getCompanyNameAction, getUsersNameAction } from "../../../stores/actions/picker/titlePicker.action";
import { StyledTextField } from "../../../StyledComponents/StyledAppTextInput/StyledAppTextInput";
import { H1, H4 } from "../../../StyledComponents/StyledHeadings";
import { MainContainer } from "../../../StyledComponents/StyledPageContainer";
import theme from "../../../theme";
import { BorderBottom, HelperText, RadioLabel, TuneBox } from "../LicenseStyled";
import KeyValue from "./KeyValue";
import { log } from "../../../utils/app.debug";

const initialState = {
  licenseType: 'Company',
  licenseName: "",
  maxEncodeUses: 0,
  maxMonitoringUses: 0,
  validity: "",
  isUnlimitedEncode: true,
  isUnlimitedMonitor: true,
  isSuspended: true,
  metaData: {},
  user: {}
}

export default function AddLicence() {
  const [state, setState] = React.useState(initialState)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { handleSubmit, control, reset } = useForm();
  const user = useSelector(state => state.user)
  const company = useSelector(state => state.company)
  const license = useSelector(state => state.licenceKey)

  React.useEffect(() => {
    reset(initialState)
  }, [license?.addLicenseKey?.data])

  const handleAddLicense = (data) => {
    if (!state.user) {
      return cogoToast.warn("User Id is mandatory!");
    }

    let payload = {
      name: data?.licenseName,
      suspended: state?.isSuspended === true ? false : true,
      maxEncodeUses: state?.maxEncodeUses,
      isUnlimitedEncode: state?.isUnlimitedEncode,
      maxMonitoringUses: state?.maxMonitoringUses,
      isUnlimitedMonitor: state?.isUnlimitedMonitor,
      validity: data?.validity,
      metaData: state?.metaData,
      user: state?.user?._id,
      company: state?.user?._id || undefined,
      type: state?.licenseType,
    }
    dispatch(addLicenseKeyAction(payload))
  }

  log("state license", state)

  return (
    <MainContainer>
      <H1>Add new license</H1>
      <H4 fontFamily={theme.fontFamily.nunitoSansRegular} color={theme.colors.primary.teal}>
        Add license
      </H4>

      <form onSubmit={handleSubmit(handleAddLicense)}>
        <Grid container direction="column" className="mt-4">
          <Grid item container>
            <TuneBox>
              <MusicNote style={{ color: `${theme.colors.primary.teal}` }} />
            </TuneBox>
          </Grid>

          <FormControl component="fieldset">
            <FormLabel component="legend" style={{ color: theme.colors.primary.graphite, fontFamily: theme.fontFamily.nunitoSansBold, fontSize: '18px' }}>
              License details
            </FormLabel>
            <RadioGroup
              row
              aria-label="license"
              name="licenseType"
              value={state.licenseType}
              onChange={(e) => setState({ ...state, licenseType: e.target.value })}
            >
              <RadioLabel value="Company" control={<CustomRadioButton />} label="Company license" />
              <RadioLabel value="Individual" control={<CustomRadioButton />} label="Individual license" />
            </RadioGroup>
          </FormControl>

          <Grid item xs={12} md={6} style={{ marginTop: "15px" }}>
            <AppAutoComplete
              setAutoComPleteAction={(value) => state.licenseType === "Company" ? dispatch(getCompanyNameAction(value)) : dispatch(getUsersNameAction(value))}
              setAutoCompleteOptions={(option => (state.licenseType === "Company" ? option?.name : option?.username) || "")}
              setAutoCompleteOptionsLabel={(option => option?._id || "")}
              loading={state.licenseType === "Company" ? company?.companySearch?.loading : user?.userSearch?.loading}
              data={state.licenseType === "Company" ? company?.companySearch?.data?.docs : user?.userSearch?.data?.docs}
              error={state.licenseType === "Company" ? company?.companySearch?.error : user?.userSearch?.error}
              getSelectedValue={(e, v) => setState({ ...state, user: v })}
              labelText={state.licenseType === "Company" ? "Company*" : "User*"}
              hideSearchIcon={true}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name="licenseName"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <>
                  <StyledTextField
                    fullWidth
                    label="License name*"
                    error={!!error}
                    value={value}
                    onChange={onChange}
                    style={{ marginTop: "15px" }}
                  />
                  {error?.message && <HelperText>{error?.message}</HelperText>}
                </>
              )}
              rules={{ required: "License name is required" }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <StyledTextField
              fullWidth
              label="Max Uses Encode"
              spinner={"true"}
              type="number"
              value={state.isUnlimitedEncode ? Number.POSITIVE_INFINITY : state?.maxEncodeUses}
              placeholder={state.isUnlimitedEncode ? "Unlimited" : "eg. 100"}
              onChange={(e) => setState({ ...state, maxEncodeUses: e.target.value })}
              style={{ marginTop: "15px" }}
              InputLabelProps={{
                shrink: true,
              }}
              disabled={state?.isUnlimitedEncode}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <StyledTextField
              fullWidth
              label="Max Uses Monitor"
              spinner={"true"}
              type="number"
              value={state.isUnlimitedMonitor ? Number.POSITIVE_INFINITY : state?.maxMonitoringUses}
              placeholder={state.isUnlimitedMonitor ? "Unlimited" : "eg. 100"}
              onChange={(e) => setState({ ...state, maxMonitoringUses: e.target.value })}
              style={{ marginTop: "15px" }}
              InputLabelProps={{
                shrink: true,
              }}
              disabled={state?.isUnlimitedMonitor}
            />
          </Grid>

          <Grid item xs={12} md={4} style={{ marginTop: 15 }}>
            <Controller
              name="validity"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <>
                  <CustomDatePicker
                    error={!!error}
                    selected={value}
                    onChange={onChange}
                    title="Renewal Date*"
                    fullWidth={true}
                    showYearDropdown={true}
                    showMonthDropdown={true}
                  />
                  {error?.message && <HelperText>{error?.message}</HelperText>}
                </>
              )}
              rules={{ required: "Validity is required" }}
            />
          </Grid>
        </Grid>

        <Grid className="mt-3">
          <KeyValue
            data={state.metaData}
            onChangeData={(newData) => {
              setState({ ...state, metaData: newData });
            }}
            containerStyle={{ marginTop: 5 }}
          />
        </Grid>

        <H4 className="mt-4">Status</H4>

        <Grid container spacing={2} className="mt-1">
          <Grid item>
            <AppToggleSwitch
              size={169}
              checkedSize={102}
              active={"\"UNLIMITED ENCODE\""}
              inActive={"\"LIMITED ENCODE\""}
              checked={state?.isUnlimitedEncode}
              onChange={(e) => setState({ ...state, isUnlimitedEncode: e.target.checked })}
            />
          </Grid>

          <Grid item>
            <AppToggleSwitch
              size={175}
              checkedSize={106}
              active={"\"UNLIMITED MONITOR\""}
              inActive={"\"LIMITED MONITOR\""}
              checked={state?.isUnlimitedMonitor}
              onChange={(e) => setState({ ...state, isUnlimitedMonitor: e.target.checked })}
            />
          </Grid>

          <Grid item>
            <AppToggleSwitch
              size={121}
              checkedSize={70}
              active={"\"ACTIVE\""}
              inActive={"\"SUSPENDED\""}
              checked={state?.isSuspended}
              onChange={(e) => setState({ ...state, isSuspended: e.target.checked })}
            />
          </Grid>
        </Grid>

        <BorderBottom />

        <Grid container className="mt-3 mb-2" justifyContent="flex-end">
          <AppButton variant={"outline"} onClick={() => navigate(-1)} disabled={license?.addLicenseKey?.loading}>
            Cancel
          </AppButton>
          <AppButton variant={"fill"} type="submit" style={{ marginLeft: "15px", width: "180px" }}>
            {license?.addLicenseKey?.loading ? <CircularProgress size={20} color="white" /> : "Add new license"}
          </AppButton>
        </Grid>
      </form>
    </MainContainer>
  );
}
