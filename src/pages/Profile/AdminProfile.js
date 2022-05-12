import { Grid, IconButton, InputAdornment } from '@material-ui/core'
import moment from 'moment'
import React from 'react'
import AppButton from '../../components/common/AppButton/AppButton'
import { StyledTextField } from '../../StyledComponents/StyledAppTextInput/StyledAppTextInput'
import { H2, H4 } from '../../StyledComponents/StyledHeadings'
import theme from '../../theme'
import { AdminProfileContainer, ButtonContainer, MetaDataDetailsContainer, ProperAccessContainer } from './AdminProfileStyles'
import EmojiFlagsIcon from '@material-ui/icons/EmojiFlags';
import LockIcon from '@material-ui/icons/Lock';
import { Visibility, VisibilityOff } from '@material-ui/icons'
import AppToggleSwitch from '../../components/common/AppToggleSwitch/AppToggleSwitch'

export default function AdminProfile() {
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
        <AdminProfileContainer>
            <MetaDataDetailsContainer>
                <H2>Admin profile</H2>
                <Grid className="mb-4">
                    <H4 color={theme.colors.primary.teal}>Update Admin details</H4>
                </Grid>
                <Grid container spacing={10}>
                    <Grid item lg={6}>
                        <Grid container >
                            <Grid style={{ padding: "5px", borderRadius: "50%", backgroundColor: theme.colors.secondary.lightTeal }}>
                                <EmojiFlagsIcon style={{ color: theme.colors.primary.teal }} />
                            </Grid>
                        </Grid>
                        <H4 className='mt-2'>Partner admin details</H4>
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
                            label="Type"
                            value={state?.metaData?.title}
                            className="mt-3"
                            onChange={(e) => { setState({ ...state, metaData: { ...state?.metaData, type: e.target.value } }) }}
                            autoComplete='off'
                        />


                        <StyledTextField
                            fullWidth
                            id="standard-basic"
                            label="Partner ID"
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
                    {/* <RightsHolderContainer>
                        <H5
                            color={theme.colors.secondary.grey}
                        >
                            Are you the Rights Holder for the audio file you wish to encode with a SonicKey?
                        </H5>
                        <RadioGroup row style={{ marginLeft: "20px" }}>
                            <FormControlLabel
                                control={<CustomRadioButton />}
                                label={<RadioLabel>Yes</RadioLabel>}
                            />
                            <FormControlLabel
                                control={<CustomRadioButton />}
                                label={<RadioLabel>No</RadioLabel>}
                            />
                        </RadioGroup>
                    </RightsHolderContainer>

                    <RightsHolderContainer>
                        <H5
                            color={theme.colors.secondary.grey}
                        >
                            Are you Authorised by the Rights Holder to encode this audio file with a SonicKey?
                        </H5>
                        <RadioGroup row style={{ marginLeft: "20px" }}>
                            <FormControlLabel
                                control={<CustomRadioButton />}
                                label={<RadioLabel>Yes</RadioLabel>}
                            />
                            <FormControlLabel
                                control={<CustomRadioButton />}
                                label={<RadioLabel>No</RadioLabel>}
                            />
                        </RadioGroup>
                    </RightsHolderContainer> */}
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
        </AdminProfileContainer >
    )
}
