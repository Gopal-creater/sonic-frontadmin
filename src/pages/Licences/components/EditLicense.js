import { FormControl, FormLabel, Grid, RadioGroup } from "@material-ui/core";
import { ControlPoint, MusicNote, PermIdentity } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import cogoToast from "cogo-toast";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AppButton from "../../../components/common/AppButton/AppButton";
import { CustomRadioButton } from "../../../components/common/AppRadioButton/AppRadioButton";
import CustomDropDown from "../../../components/common/AppTextInput/CustomDropDown";
import CustomDatePicker from "../../../components/common/FilterComponent/components/CustomDatePicker";
import { maxUses } from "../../../constants/constants";
import { StyledTextField } from "../../../StyledComponents/StyledAppTextInput/StyledAppTextInput";
import { H1, H4 } from "../../../StyledComponents/StyledHeadings";
import theme from "../../../theme";
import { log } from "../../../utils/app.debug";
import { AddLicenseContainer, BorderBottom, HelperText, RadioLabel, TuneBox } from "../LicenseStyled";
import AddNewUser from "./AddNewUser";
import KeyValue from "./KeyValue";

const useStyles = makeStyles(() => ({
    textInput: {
        "&:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 1000px white inset"
        }
    },
}));

const initialState = {
    licenseType: 'Individual',
    userId: "",
    licenseName: "",
    maxEncode: "",
    maxMonitor: "",
    validity: "",
    success: false,
    metaData: {}
}

export default function EditLicense() {
    const classes = useStyles();
    const [state, setState] = React.useState(initialState)
    const navigate = useNavigate()
    const { handleSubmit, control, reset } = useForm();

    React.useEffect(() => {
        reset(initialState)
    }, [state.success])

    const handleEditLicense = (data) => {
        log("ADD LICENSE", data)
        cogoToast.success("License added successfully!")
        setState({ ...state, success: true })
    }

    return (
        <AddLicenseContainer>
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
                                                {/* <RadioLabel value="Company" control={<CustomRadioButton />} label="Company license" /> */}
                                            </RadioGroup>
                                        </>
                                    )}
                                />
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
                                                inputProps={{
                                                    className: classes.textInput,
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
                                                InputLabelProps={{
                                                    shrink: true
                                                }}
                                                inputProps={{
                                                    className: classes.textInput,
                                                }}
                                            />
                                            {error?.message && <HelperText>{error?.message}</HelperText>}
                                        </>
                                    )}
                                    rules={{ required: "License name is required" }}
                                />
                            </Grid>

                            <Grid item xs={12} md={8}>
                                <Controller
                                    name="maxEncode"
                                    control={control}
                                    defaultValue=""
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (
                                        <>
                                            <CustomDropDown
                                                labelText="Max Uses Encode"
                                                formControlProps={{
                                                    fullWidth: true,
                                                    style: { marginTop: 15 }
                                                }}
                                                inputProps={{
                                                    error: !!error,
                                                    value: value,
                                                    onChange: onChange,
                                                }}
                                                labelProps={{
                                                    shrink: true,
                                                    style: { fontFamily: theme.fontFamily.nunitoSansRegular }
                                                }}
                                                data={maxUses || []}
                                            />
                                            {error?.message && <HelperText>{error?.message}</HelperText>}
                                        </>
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12} md={8}>
                                <Controller
                                    name="maxMonitor"
                                    control={control}
                                    defaultValue=""
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (
                                        <>
                                            <CustomDropDown
                                                labelText="Max Uses Monitor"
                                                formControlProps={{
                                                    fullWidth: true,
                                                    style: { marginTop: 15 }
                                                }}
                                                inputProps={{
                                                    error: !!error,
                                                    value: value,
                                                    onChange: onChange,
                                                }}
                                                labelProps={{
                                                    shrink: true,
                                                    style: { fontFamily: theme.fontFamily.nunitoSansRegular }
                                                }}
                                                data={maxUses || []}
                                            />
                                            {error?.message && <HelperText>{error?.message}</HelperText>}
                                        </>
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12} md={8} style={{ marginTop: 15 }}>
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
                                                dateFormat="MMM d,yyyy"
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
                                data={state.metaData}
                                onChangeData={(newData) => {
                                    setState({ ...state, metaData: newData });
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
                    <AppButton
                        variant={"outline"}
                        className="mx-2"
                        onClick={() => navigate(-1)}
                    >
                        Cancel
                    </AppButton>
                    <AppButton
                        variant={"fill"}
                        type="submit"
                    >
                        Update details
                    </AppButton>
                </Grid>
            </form>
        </AddLicenseContainer>
    );
}
