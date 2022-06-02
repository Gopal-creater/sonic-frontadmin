import React from "react";
import { FormControl, FormLabel, Grid } from "@material-ui/core";
import { MusicNote, PermIdentity } from "@material-ui/icons";
import cogoToast from "cogo-toast";
import { Controller, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import AppButton from "../../../components/common/AppButton/AppButton";
import { CustomRadioButton } from "../../../components/common/AppRadioButton/AppRadioButton";
import CustomDatePicker from "../../../components/common/FilterComponent/components/CustomDatePicker";
import { StyledTextField } from "../../../StyledComponents/StyledAppTextInput/StyledAppTextInput";
import { H1, H4 } from "../../../StyledComponents/StyledHeadings";
import { MainContainer } from "../../../StyledComponents/StyledPageContainer";
import theme from "../../../theme";
import { log } from "../../../utils/app.debug";
import { BorderBottom, HelperText, RadioLabel, TuneBox } from "../LicenseStyled";
import AddNewUser from "./AddNewUser";
import KeyValue from "./KeyValue";

export default function EditLicense() {
    const { state } = useLocation();
    const navigate = useNavigate()
    const { handleSubmit, control, reset } = useForm();

    const [license, setLicense] = React.useState(state)
    const [values, setValues] = React.useState()

    log("StaTe LICeNsE", license)

    React.useEffect(() => {
        reset()
    }, [])

    const handleEditLicense = (data) => {
        log("ADD LICENSE", data)
        cogoToast.success("License updated successfully!")
        // setState({ ...state, success: true })
    }

    return (
        <MainContainer>
            <H1>Edit license</H1>
            <H4 fontFamily={theme.fontFamily.nunitoSansRegular} color={theme.colors.primary.teal}>
                Edit license
            </H4>

            <form onSubmit={handleSubmit(handleEditLicense)}>
                <Grid container spacing={2} direction="row">
                    <Grid item xs={12} md={6}>
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
                                <RadioLabel checked control={<CustomRadioButton />} label={`${license?.type} license`} disabled />
                            </FormControl>

                            <Grid item xs={12} md={12}>
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
                                                InputLabelProps={{
                                                    shrink: true
                                                }}
                                            />
                                            {error?.message && <HelperText>{error?.message}</HelperText>}
                                        </>
                                    )}
                                    rules={{ required: "User ID is required" }}
                                />
                            </Grid>

                            <Grid item xs={12} md={12}>
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

                            <Grid item xs={12} md={8}>
                                <StyledTextField
                                    fullWidth
                                    label="Max Uses Encode"
                                    spinner={"true"}
                                    type="number"
                                    value={license?.isUnlimitedEncode ? Number.POSITIVE_INFINITY : license?.maxEncodeUses}
                                    placeholder={license?.isUnlimitedEncode ? "Unlimited" : "eg. 100"}
                                    onChange={(e) => setLicense({ ...license, maxEncodeUses: e.target.value })}
                                    style={{ marginTop: "15px" }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    disabled={license?.isUnlimitedEncode}
                                />
                            </Grid>

                            <Grid item xs={12} md={8}>
                                <StyledTextField
                                    fullWidth
                                    label="Max Uses Monitor"
                                    spinner={"true"}
                                    type="number"
                                    value={license?.isUnlimitedMonitor ? Number.POSITIVE_INFINITY : license?.maxMonitoringUses}
                                    placeholder={license?.isUnlimitedMonitor ? "Unlimited" : "eg. 100"}
                                    onChange={(e) => setLicense({ ...license, maxMonitoringUses: e.target.value })}
                                    style={{ marginTop: "15px" }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    disabled={license?.isUnlimitedMonitor}
                                />
                            </Grid>

                            <Grid item xs={12} md={8} style={{ marginTop: 15 }}>
                                <Controller
                                    name="validity"
                                    control={control}
                                    // defaultValue={license?.validity}
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (
                                        <>
                                            <CustomDatePicker
                                                error={!!error}
                                                selected={value}
                                                onChange={onChange}
                                                title="Validity*"
                                                fullWidth={true}
                                                showYearDropdown
                                                showMonthDropdown
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
                                data={license?.metaData}
                                onChangeData={(newData) => {
                                    setLicense({ ...license, metaData: newData });
                                }}
                                containerStyle={{ marginTop: 5 }}
                            />
                        </Grid>

                        <H4 className="mt-4">Status</H4>
                    </Grid>
                    <Grid item xs={12} md={6} >
                        <Grid container direction="column" className="mt-4">
                            <Grid item container>
                                <TuneBox>
                                    <PermIdentity style={{ color: `${theme.colors.primary.teal}` }} />
                                </TuneBox>
                            </Grid>

                            <H4 component="legend" style={{ color: theme.colors.primary.graphite, fontFamily: theme.fontFamily.nunitoSansBold, fontSize: '18px' }}>
                                Users (0)
                            </H4>
                            <Grid>
                                <AddNewUser />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <BorderBottom />

                <Grid container className="mt-3 mb-2" justifyContent="flex-end">
                    <AppButton variant={"outline"} onClick={() => navigate(-1)}>
                        Cancel
                    </AppButton>
                    <AppButton variant={"fill"} type="submit" style={{ marginLeft: "15px", width: "180px" }}>
                        Update details
                    </AppButton>
                </Grid>
            </form>
        </MainContainer>
    );
}
