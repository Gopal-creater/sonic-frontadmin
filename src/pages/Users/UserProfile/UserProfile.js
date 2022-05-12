import { Grid, IconButton, InputAdornment } from "@material-ui/core"
import { Visibility, VisibilityOff } from "@material-ui/icons"
import AppButton from "../../../components/common/AppButton/AppButton"
import AppToggleSwitch from "../../../components/common/AppToggleSwitch/AppToggleSwitch"
import { StyledTextField } from "../../../StyledComponents/StyledAppTextInput/StyledAppTextInput"
import { H2, H4 } from "../../../StyledComponents/StyledHeadings"
import { ButtonContainer, MetaDataDetailsContainer, ProperAccessContainer, UserProfileContainer } from "./UserProfileStyle"
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import React from "react"
import theme from "../../../theme"


export default function UserProfile() {
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
    return (
        <UserProfileContainer>
            <MetaDataDetailsContainer>
                <H2>User profile</H2>
                <Grid className="mb-4">
                    <H4 color={theme.colors.primary.teal}>Update user details</H4>
                </Grid>
                <Grid container spacing={10}>
                    <Grid item lg={6}>
                        <Grid container >
                            <Grid style={{ padding: "5px", borderRadius: "50%", backgroundColor: theme.colors.secondary.lightTeal }}>
                                <PersonIcon style={{ color: theme.colors.primary.teal }} />
                            </Grid>
                        </Grid>
                        <H4 className='mt-2'>User details</H4>
                        <StyledTextField
                            fullWidth
                            id="standard-basic"
                            label="Username*"
                            value={state?.metaData?.title}
                            onChange={(e) => { setState({ ...state, metaData: { ...state?.metaData, title: e.target.value } }) }}
                            // placeholder='Song,Video or Audio track title'
                            autoComplete='off'
                        />

                        <StyledTextField
                            fullWidth
                            id="standard-basic"
                            label="Account type"
                            value={state?.metaData?.title}
                            className="mt-3"
                            onChange={(e) => { setState({ ...state, metaData: { ...state?.metaData, type: e.target.value } }) }}
                            autoComplete='off'
                        />


                        <StyledTextField
                            fullWidth
                            id="standard-basic"
                            label="User ID"
                            value={state?.metaData?.artist}
                            className="mt-3"
                            onChange={(e) => { setState({ ...state, metaData: { ...state?.metaData, artist: e.target.value } }) }}
                        />

                        <StyledTextField
                            fullWidth
                            id="standard-basic"
                            label="Email*"
                            className="mt-3"
                            value={state?.metaData?.version}
                            onChange={(e) => { setState({ ...state, metaData: { ...state?.metaData, version: e.target.value } }) }}
                        />

                        <StyledTextField
                            fullWidth
                            id="standard-basic"
                            label="Phone number"
                            className="mt-3"
                            value={state?.metaData?.isrcCode}
                            onChange={(e) => { setState({ ...state, metaData: { ...state?.metaData, isrcCode: e.target.value } }) }}
                        // helperText="Hint: GB-H01-02-12345."
                        />

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
                        <StyledTextField
                            fullWidth
                            id="standard-basic"
                            label="Company name"
                            value={state?.metaData?.title}
                            onChange={(e) => { setState({ ...state, metaData: { ...state?.metaData, title: e.target.value } }) }}
                            // placeholder='Song,Video or Audio track title'
                            autoComplete='off'
                        />

                        <StyledTextField
                            fullWidth
                            id="standard-basic"
                            label="Company type"
                            value={state?.metaData?.title}
                            className="mt-3"
                            onChange={(e) => { setState({ ...state, metaData: { ...state?.metaData, type: e.target.value } }) }}
                            autoComplete='off'
                        />


                        <StyledTextField
                            fullWidth
                            id="standard-basic"
                            label="Company URN / ID"
                            value={state?.metaData?.artist}
                            className="mt-3"
                            onChange={(e) => { setState({ ...state, metaData: { ...state?.metaData, artist: e.target.value } }) }}
                        />
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
                    <AppButton variant={"fill"} style={{ marginLeft: "15px" }}>Update details</AppButton>
                </ButtonContainer>
            </MetaDataDetailsContainer>
        </UserProfileContainer >
    )
}
