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
import { useNavigate } from "react-router-dom";


export default function CreateNewCompany() {
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
    const navigate = useNavigate()

    return (
        <CompanyProfileContainer>
            <MetaDataDetailsContainer>
                <H2>Create new company</H2>
                <Grid className="mb-4">
                    <H4 color={theme.colors.primary.teal}>Add new company</H4>
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

                </ProperAccessContainer>

                <ButtonContainer>
                    <AppButton
                        variant={"outline"}
                        onClick={() => navigate(-1)}
                    >
                        Cancel
                    </AppButton>
                    <AppButton variant={"fill"} style={{ marginLeft: "15px" }}>Create new company</AppButton>
                </ButtonContainer>
            </MetaDataDetailsContainer>
        </CompanyProfileContainer >
    )
}
