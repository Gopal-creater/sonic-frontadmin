import { Grid, IconButton, InputAdornment } from "@material-ui/core"
import { H2, H4 } from "../../../StyledComponents/StyledHeadings"
import { ButtonContainer, CompanyProfileContainer, MetaDataDetailsContainer, ProperAccessContainer } from "./CompanyProfileStyles"
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import { StyledTextField } from "../../../StyledComponents/StyledAppTextInput/StyledAppTextInput";
import AppToggleSwitch from "../../../components/common/AppToggleSwitch/AppToggleSwitch";
import PersonIcon from '@material-ui/icons/Person';
import theme from "../../../theme";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import AppButton from "../../../components/common/AppButton/AppButton";
import React from "react";


export default function CompanyProfile() {
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
        <CompanyProfileContainer>
            <MetaDataDetailsContainer>
                <H2>Company profile</H2>
                <Grid className="mb-4">
                    <H4 color={theme.colors.primary.teal}>Update company details</H4>
                </Grid>
                <Grid container spacing={10}>
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
                            label="Type"
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


                        <Grid container>
                            <Grid className='mt-5'>
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
                                <PersonIcon style={{ color: theme.colors.primary.teal }} />
                            </Grid>
                        </Grid>
                        <H4 className='mt-2'>Admin details</H4>


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
                            label="Username*"
                            value={state?.metaData?.title}
                            onChange={(e) => { setState({ ...state, metaData: { ...state?.metaData, title: e.target.value } }) }}
                            // placeholder='Song,Video or Audio track title'
                            autoComplete='off'
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
        </CompanyProfileContainer >
    )
}
