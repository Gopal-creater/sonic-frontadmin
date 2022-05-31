import { FormControl, FormLabel, Grid, RadioGroup } from "@material-ui/core";
import { MusicNote } from "@material-ui/icons";
import cogoToast from "cogo-toast";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AppButton from "../../../components/common/AppButton/AppButton";
import { CustomRadioButton } from "../../../components/common/AppRadioButton/AppRadioButton";
import AppToggleSwitch from "../../../components/common/AppToggleSwitch/AppToggleSwitch";
import CustomDatePicker from "../../../components/common/FilterComponent/components/CustomDatePicker";
import { StyledTextField } from "../../../StyledComponents/StyledAppTextInput/StyledAppTextInput";
import { H1, H4 } from "../../../StyledComponents/StyledHeadings";
import { MainContainer } from "../../../StyledComponents/StyledPageContainer";
import theme from "../../../theme";
import { log } from "../../../utils/app.debug";
import { BorderBottom, HelperText, RadioLabel, TuneBox } from "../LicenseStyled";
import KeyValue from "./KeyValue";

const initialState = {
  licenseType: 'Company',
  userId: "",
  licenseName: "",
  maxEncode: "",
  maxMonitor: "",
  validity: "",
  success: false,
  checkedEncode: true,
  checkedMonitor: true,
  checkedActive: true,
  metaData: {}
}

export default function AddLicence() {
  const [state, setState] = React.useState(initialState)
  const navigate = useNavigate()
  const { handleSubmit, control, reset } = useForm();

  React.useEffect(() => {
    reset(initialState)
  }, [state.success])

  const handleAddLicense = (data) => {
    log("ADD LICENSE", data)
    cogoToast.success("License added successfully!")
    // setState({ ...state, success: true })
  }

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
            <Controller
              name="licenseType"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <>
                  <RadioGroup
                    row
                    aria-label="license"
                    name="licenseType"
                    defaultValue={state.licenseType}
                    error={!!error}
                    value={value}
                    onChange={onChange}
                  >
                    <RadioLabel value="Individual" control={<CustomRadioButton />} label="Individual license" />
                    <RadioLabel value="Company" control={<CustomRadioButton />} label="Company license" />
                  </RadioGroup>
                  {error?.message && <HelperText>{error?.message}</HelperText>}
                </>
              )}
              rules={{ required: "User ID is required" }}
            />
          </FormControl>

          <Grid item xs={12} md={6}>
            <Controller
              name="userId"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <>
                  <StyledTextField
                    fullWidth
                    label="User ID*"
                    error={!!error}
                    value={value}
                    onChange={onChange}
                    style={{ marginTop: "15px" }}
                  />
                  {error?.message && <HelperText>{error?.message}</HelperText>}
                </>
              )}
              rules={{ required: "User ID is required" }}
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
            <Controller
              name="maxEncode"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <>
                  <StyledTextField
                    fullWidth
                    label="Max Uses Encode"
                    spinner={"true"}
                    type="number"
                    error={!!error}
                    value={value}
                    onChange={onChange}
                    style={{ marginTop: "15px" }}
                    disabled={state?.checkedEncode}
                  />
                  {error?.message && <HelperText>{error?.message}</HelperText>}
                </>
              )}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Controller
              name="maxMonitor"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <>
                  <StyledTextField
                    fullWidth
                    label="Max Uses Monitor"
                    spinner={"true"}
                    type="number"
                    error={!!error}
                    value={value}
                    onChange={onChange}
                    style={{ marginTop: "15px" }}
                    disabled={state?.checkedMonitor}
                  />
                  {error?.message && <HelperText>{error?.message}</HelperText>}
                </>
              )}
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
                    dateformat="MMM d,yyyy"
                    title="Validity*"
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
              checked={state?.checkedEncode}
              onChange={(e) => setState({ ...state, checkedEncode: e.target.checked })}
            />
          </Grid>

          <Grid item>
            <AppToggleSwitch
              size={175}
              checkedSize={106}
              active={"\"UNLIMITED MONITOR\""}
              inActive={"\"LIMITED MONITOR\""}
              checked={state?.checkedMonitor}
              onChange={(e) => setState({ ...state, checkedMonitor: e.target.checked })}
            />
          </Grid>

          <Grid item>
            <AppToggleSwitch
              size={121}
              checkedSize={70}
              active={"\"ACTIVE\""}
              inActive={"\"SUSPENDED\""}
              checked={state?.checkedActive}
              onChange={(e) => setState({ ...state, checkedActive: e.target.checked })}
            />
          </Grid>
        </Grid>

        <BorderBottom />

        <Grid container className="mt-3 mb-2" justifyContent="flex-end">
          <AppButton variant={"outline"} onClick={() => navigate(-1)}>
            Cancel
          </AppButton>
          <AppButton variant={"fill"} type="submit" style={{ marginLeft: "15px", width: "180px" }}>
            Add new license
          </AppButton>
        </Grid>
      </form>
    </MainContainer>
  );
}
