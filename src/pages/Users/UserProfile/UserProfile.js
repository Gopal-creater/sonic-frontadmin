import { Grid, IconButton, InputAdornment } from "@material-ui/core"
import { Visibility, VisibilityOff } from "@material-ui/icons"
import AppButton from "../../../components/common/AppButton/AppButton"
import AppToggleSwitch from "../../../components/common/AppToggleSwitch/AppToggleSwitch"
import { DisabledTextField, StyledTextField } from "../../../StyledComponents/StyledAppTextInput/StyledAppTextInput"
import { H1, H2, H4 } from "../../../StyledComponents/StyledHeadings"
import { ButtonContainer, MetaDataDetailsContainer, ProperAccessContainer, UserProfileContainer } from "./UserProfileStyle"
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import React from "react"
import theme from "../../../theme"
import { MainContainer } from "../../../StyledComponents/StyledPageContainer"
import { Controller, useForm } from "react-hook-form"
import cogoToast from "cogo-toast"
import { HelperText } from "../../Licences/LicenseStyled"


export default function UserProfile() {
    const { handleSubmit, control, reset } = useForm();
    const [state, setState] = React.useState({
        copyMetaData: false,
        showPassword: false,
        showNewPassword: false,
        showConfirmPassword: false,
        metaData: {
            title: "",
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

    const handleUserProfile = () => {
        cogoToast.success("Successfully")
    }

    return (
        <MainContainer>

            <H1>User profile</H1>
            <H4 fontFamily={theme.fontFamily.nunitoSansRegular} color={theme.colors.primary.teal}>
                Update user details
            </H4>

            <form onSubmit={handleSubmit(handleUserProfile)}>
                <Grid container spacing={10}>
                    <Grid item lg={6}>

                        <Grid container >
                            <Grid style={{ padding: "5px", borderRadius: "50%", backgroundColor: theme.colors.secondary.lightTeal }}>
                                <PersonIcon style={{ color: theme.colors.primary.teal }} />
                            </Grid>
                        </Grid>

                        <H4 className='mt-2'>User details</H4>

                        <Grid style={{ marginTop: 21 }}>
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
                        </Grid>

                        <Grid style={{ marginTop: 15 }}>
                            <DisabledTextField
                                label={"Account Type"}
                                value={"Company"}
                            />
                        </Grid>

                        <Grid style={{ marginTop: 15 }}>
                            <DisabledTextField
                                label={"User ID"}
                                value={"jhgh234y45345jh3424f243"}
                            />
                        </Grid>

                        <Grid style={{ marginTop: 15 }}>
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
                                            value={state?.metaData?.version}
                                            onChange={(e) => { setState({ ...state, metaData: { ...state?.metaData, version: e.target.value } }) }}
                                        />
                                        {error?.message && <HelperText>{error?.message}</HelperText>}
                                    </>
                                )}
                                rules={{ required: "Email is required" }}
                            />
                        </Grid>

                        <Grid style={{ marginTop: 15 }}>
                            <StyledTextField
                                fullWidth
                                id="standard-basic"
                                label="Phone number"
                                value={state?.metaData?.isrcCode}
                                onChange={(e) => { setState({ ...state, metaData: { ...state?.metaData, isrcCode: e.target.value } }) }}
                            />
                        </Grid>

                        <Grid container>
                            <Grid className='mt-4'>
                                <H4>Status</H4>
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid>
                                <AppToggleSwitch
                                    size={121}
                                    checkedSize={70}
                                    active={"\"ACTIVE\""}
                                    inActive={"\"SUSPENDED\""}
                                    checked={state.checkedActive}
                                    onChange={(e) => setState({ ...state, checkedActive: e.target.checked })}
                                />
                            </Grid>
                        </Grid>

                    </Grid >

                    <Grid item lg={6}>
                        <Grid container >
                            <Grid style={{ padding: "5px", borderRadius: "50%", backgroundColor: theme.colors.secondary.lightTeal }}>
                                <MusicNoteIcon style={{ color: theme.colors.primary.teal }} />
                            </Grid>
                        </Grid>

                        <H4 className='mt-2'>Company details</H4>

                        <Grid style={{ marginTop: 15 }}>
                            <DisabledTextField
                                label={"Company name"}
                                value={"Harvest Media"}
                            />
                        </Grid>

                        <Grid style={{ marginTop: 15 }}>
                            <DisabledTextField
                                label={"Company type"}
                                value={"Distributor"}
                            />
                        </Grid>

                        <Grid style={{ marginTop: 15 }}>
                            <DisabledTextField
                                label={"Company URN / ID"}
                                value={"234453453453424243"}
                            />
                        </Grid>

                        <Grid className="mt-5">
                        </Grid>

                        <Grid container >
                            <Grid style={{ padding: "5px", borderRadius: "50%", backgroundColor: theme.colors.secondary.lightTeal }}>
                                <LockIcon style={{ color: theme.colors.primary.teal }} />
                            </Grid>
                        </Grid>

                        <H4 className='mt-2'>Password</H4>

                        <Grid style={{ marginTop: 15 }}>
                            <StyledTextField
                                fullWidth
                                id="standard-basic"
                                label="Current password"
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
                        </Grid>

                        <Grid style={{ marginTop: 15 }}>
                            <StyledTextField
                                fullWidth
                                id="standard-basic"
                                label="New password"
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
                        </Grid>

                        <Grid style={{ marginTop: 15 }}>
                            <StyledTextField
                                fullWidth
                                id="standard-basic"
                                label="Re-enter new password password"
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
                        </Grid>

                    </Grid >
                </Grid>

                <ProperAccessContainer>
                </ProperAccessContainer>

                <ButtonContainer>
                    <AppButton
                        variant={"outline"}
                    // onClick={() => dispatch({ type: actionTypes.CLEAR_SELECTED_FILE })}
                    >
                        Cancel
                    </AppButton>
                    <AppButton type="submit" variant={"fill"} style={{ marginLeft: "15px" }}>Update details</AppButton>
                </ButtonContainer>
            </form>

        </MainContainer >
    )
}
