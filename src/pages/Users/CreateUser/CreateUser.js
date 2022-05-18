import { FormControlLabel, Grid, IconButton, InputAdornment, RadioGroup } from "@material-ui/core"
import { ControlPoint, Visibility, VisibilityOff } from "@material-ui/icons"
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import React from "react"
import { ButtonContainer, CheckBoxLabelContainer, CreateUserContainer, MetaDataDetailsContainer, ProperAccessContainer, RadioLabel, RightsHolderContainer } from "./CreateUserStyles";
import { H1, H2, H4, H5 } from "../../../StyledComponents/StyledHeadings";
import { StyledTextField } from "../../../StyledComponents/StyledAppTextInput/StyledAppTextInput";
import AppButton from "../../../components/common/AppButton/AppButton";
import theme from "../../../theme";
import AppCheckBox from "../../../components/common/AppCheckBox";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import CustomDropDown from "../../../components/common/AppTextInput/CustomDropDown";
import cogoToast from "cogo-toast";
import { companyType, countries, userType } from "../../../constants/constants";
import { HelperText } from "../../Licences/LicenseStyled";
import { log } from "../../../utils/app.debug";
import { MainContainer } from "../../../StyledComponents/StyledPageContainer";
import PhoneCode from "../../../components/common/AppTextInput/PhoneCode";


export default function CreateUser() {
    const { handleSubmit, control, reset } = useForm();
    const [state, setState] = React.useState({
        defaultCountryCode: "+44",
        show: false,
        phone: "",
        copyMetaData: false,
        showPassword: false,
        showNewPassword: false,
        showConfirmPassword: false,
        metaData: {
            title: "",
            accountType: "",
            contentSize: "",
            contentEncoding: "",
            contentType: "",
            artist: "",
            contentSamplingFrequency: "",
            contentQuality: "",
            isrcCode: "",
            iswcCode: "",
            tuneCode: "",
            contentDescription: "",
            distributor: "",
            contentFileType: "",
            label: "",
            additionalMetadata: {

            },
            contentDuration: "",
            isRightsHolderForEncode: null,
            isAuthorizedForEncode: null
        }
    })
    const navigate = useNavigate()

    const handleOnChange = value => {
        setState(value);
    };

    const handleOnCreateUser = () => {
        cogoToast.success("user added");
    }

    return (
        <MainContainer>

            <H1>Create user</H1>
            <H4 fontFamily={theme.fontFamily.nunitoSansRegular} color={theme.colors.primary.teal}>
                Add new user
            </H4>

            <form onSubmit={handleSubmit(handleOnCreateUser)}>
                <Grid container spacing={10}>
                    <Grid item lg={6}>

                        <Grid container >
                            <Grid style={{ padding: "5px", borderRadius: "50%", backgroundColor: theme.colors.secondary.lightTeal }}>
                                <PersonIcon style={{ color: theme.colors.primary.teal }} />
                            </Grid>
                        </Grid>

                        <H4 className='mt-2'>User details</H4>

                        <Controller
                            name="userName"
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
                                        label="Username*"
                                        value={state?.metaData?.title}
                                        onChange={(e) => { setState({ ...state, metaData: { ...state?.metaData, title: e.target.value } }) }}
                                        // placeholder='Song,Video or Audio track title'
                                        autoComplete='off'
                                    />
                                    {error?.message && <HelperText>{error?.message}</HelperText>}
                                </>
                            )}
                            rules={{ required: "Username is required" }}
                        />

                        <Controller
                            name="accountType"
                            control={control}
                            defaultValue=""
                            onChange={(e) => { setState({ ...state, metaData: { ...state?.metaData, accountType: e.target.value } }) }}
                            render={({
                                field: { onChange, value },
                                fieldState: { error },
                            }) => (
                                <>
                                    <CustomDropDown
                                        labelText="Account type*"
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
                                            style: { fontFamily: theme.fontFamily.nunitoSansRegular }
                                        }}
                                        data={userType || []}
                                    />
                                    {error?.message && <HelperText>{error?.message}</HelperText>}
                                </>
                            )}
                            rules={{ required: "Account type is required" }}
                        />

                        <Controller
                            name="email"
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
                                        label="Email*"
                                        className="mt-3"
                                        value={state?.metaData?.version}
                                        onChange={(e) => { setState({ ...state, metaData: { ...state?.metaData, version: e.target.value } }) }}
                                    />
                                    {error?.message && <HelperText>{error?.message}</HelperText>}
                                </>
                            )}
                            rules={{ required: "Email is required" }}
                        />

                        <Grid>
                            <FormControlLabel
                                control={
                                    <AppCheckBox
                                        checked={state.copyMetaData}
                                    // onChange={() => setState({ ...state, copyMetaData: !state.copyMetaData })}
                                    />
                                }
                                label={
                                    <CheckBoxLabelContainer>
                                        <H5
                                            color={theme.colors.secondary.lightNavy}
                                        >
                                            Mark email as verified*
                                        </H5>
                                        {/* <HelpOutlineOutlinedIcon style={{ color: theme.colors.secondary.lightNavy, fontSize: 17, marginLeft: "5px" }} /> */}
                                    </CheckBoxLabelContainer>
                                }
                            />
                        </Grid>

                        <Grid>
                            <Grid className="mt-4">
                                <Controller
                                    // name="accountType"
                                    control={control}
                                    defaultValue=""
                                    // onChange={(e) => { setState({ ...state, metaData: { ...state?.metaData, accountType: e.target.value } }) }}
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (
                                        <Grid style={{ backgroundColor: "", }}>
                                            <span
                                                color={theme.colors.secondary.lightNavy}
                                            // style={{ backgroundColor: "red", padding: "0px", margin: "0px" }}
                                            >
                                                Phone number
                                            </span>
                                            <Grid container justifyContent="center" alignItems="center" >
                                                <Grid style={{ width: "20%", }}>
                                                    <Controller
                                                        name="countryCode"
                                                        control={control}
                                                        defaultValue={state?.defaultCountryCode}
                                                        render={({
                                                            field: { onChange, value },
                                                            fieldState: { error },
                                                        }) => (
                                                            <>
                                                                <PhoneCode
                                                                    formControlProps={{
                                                                        fullWidth: true,
                                                                        style: { marginTop: 15 }

                                                                    }}
                                                                    inputProps={{
                                                                        error: !!error,
                                                                        // style: { backgroundColor: "yellow" },
                                                                        value: value,
                                                                        onChange: onChange,
                                                                    }}
                                                                />
                                                            </>
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid style={{ width: "80%" }}>
                                                    <StyledTextField
                                                        fullWidth
                                                        id="standard-basic"
                                                        className="mt-3"
                                                        // style={{ backgroundColor: "green" }}
                                                        value={state?.metaData?.version}
                                                        onChange={(e) => { setState({ ...state, metaData: { ...state?.metaData, version: e.target.value } }) }}
                                                    />
                                                </Grid>

                                                {error?.message && <HelperText>{error?.message}</HelperText>}
                                            </Grid>
                                        </Grid>
                                    )}
                                />
                            </Grid>
                        </Grid>

                        <FormControlLabel
                            control={
                                <AppCheckBox
                                    checked={state.copyMetaData}
                                // onChange={() => setState({ ...state, copyMetaData: !state.copyMetaData })}
                                />
                            }
                            label={
                                <CheckBoxLabelContainer>
                                    <H5
                                        color={theme.colors.secondary.lightNavy}
                                    >
                                        Mark phone number as verified
                                    </H5>
                                    {/* <HelpOutlineOutlinedIcon style={{ color: theme.colors.secondary.lightNavy, fontSize: 17, marginLeft: "5px" }} /> */}
                                </CheckBoxLabelContainer>
                            }
                        />
                    </Grid >

                    <Grid item lg={6}>
                        <Grid container >
                            <Grid style={{ padding: "5px", borderRadius: "50%", backgroundColor: theme.colors.secondary.lightTeal }}>
                                <MusicNoteIcon style={{ color: theme.colors.primary.teal }} />
                            </Grid>
                        </Grid>

                        <H4 className='mt-2'>Company details</H4>

                        {!state?.show && <Grid>
                            <AppButton
                                variant={"none"}
                                startIcon={<ControlPoint />}
                                style={{ paddingLeft: 0 }}
                                onClick={() => setState({ ...state, show: true })}
                            >
                                Add associated new company
                            </AppButton>
                        </Grid>}
                        {state?.show &&
                            <>
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
                                                label="Company name*"
                                                value={state?.metaData?.title}
                                                onChange={(e) => { setState({ ...state, metaData: { ...state?.metaData, title: e.target.value } }) }}
                                                // placeholder='Song,Video or Audio track title'
                                                autoComplete='off'
                                            />
                                            {error?.message && <HelperText>{error?.message}</HelperText>}
                                        </>
                                    )}
                                    rules={{ required: "Company name is required" }}
                                />

                                <Controller
                                    name="CompanyType"
                                    control={control}
                                    defaultValue=""
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (
                                        <>
                                            <CustomDropDown
                                                labelText="Company type*"
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
                                                    style: { fontFamily: theme.fontFamily.nunitoSansRegular }
                                                }}
                                                data={companyType || []}
                                            />
                                            {error?.message && <HelperText>{error?.message}</HelperText>}
                                        </>
                                    )}
                                    rules={{ required: "Company type is required" }}
                                />

                                <Controller
                                    name="CompanyURNID"
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
                                                label="Company URN / ID*"
                                                value={state?.metaData?.artist}
                                                className="mt-3"
                                                onChange={(e) => { setState({ ...state, metaData: { ...state?.metaData, artist: e.target.value } }) }}
                                            />
                                            {error?.message && <HelperText>{error?.message}</HelperText>}
                                        </>
                                    )}
                                    rules={{ required: "Company URN / ID is required" }}
                                />
                            </>
                        }

                        <Grid className="mt-5">
                        </Grid>

                        <Grid container >
                            <Grid style={{ padding: "5px", borderRadius: "50%", backgroundColor: theme.colors.secondary.lightTeal }}>
                                <LockIcon style={{ color: theme.colors.primary.teal }} />
                            </Grid>
                        </Grid>

                        <H4 className='mt-2'>Password</H4>

                        <StyledTextField
                            fullWidth
                            id="standard-basic"
                            label="Temporary password"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            // onClick={() => {
                                            //     setState({
                                            //         ...state,
                                            //         showNewPassword: !state?.showNewPassword,
                                            //     });
                                            // }}
                                            onMouseDown={(event) => {
                                                event.preventDefault();
                                            }}
                                        >
                                            {state?.showNewPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                    </Grid >
                </Grid>

                <ProperAccessContainer>
                </ProperAccessContainer>

                <ButtonContainer>
                    <AppButton
                        variant={"outline"}
                        onClick={() => navigate(-1)}
                    >
                        Cancel
                    </AppButton>
                    <AppButton type="submit" variant={"fill"} style={{ marginLeft: "15px" }}>Create new user</AppButton>
                </ButtonContainer>
            </form>
        </MainContainer >
    )
}
