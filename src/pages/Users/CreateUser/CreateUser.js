import { FormControlLabel, Grid, IconButton, InputAdornment, RadioGroup } from "@material-ui/core"
import { Visibility, VisibilityOff } from "@material-ui/icons"
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import React from "react"
import { ButtonContainer, CheckBoxLabelContainer, CreateUserContainer, MetaDataDetailsContainer, ProperAccessContainer, RadioLabel, RightsHolderContainer } from "./CreateUserStyles";
import { H2, H4, H5 } from "../../../StyledComponents/StyledHeadings";
import { StyledTextField } from "../../../StyledComponents/StyledAppTextInput/StyledAppTextInput";
import AppButton from "../../../components/common/AppButton/AppButton";
import theme from "../../../theme";
import AppCheckBox from "../../../components/common/AppCheckBox";
import MuiPhoneNumber from 'material-ui-phone-number';
import { useNavigate } from "react-router-dom";


export default function CreateUser() {
    // const [phone, setPhone] = useState("");
    const [state, setState] = React.useState({
        phone: "",
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

    const handleOnChange = value => {
        setState(value);
    };

    return (
        <CreateUserContainer>
            <MetaDataDetailsContainer>
                <H2>Create user</H2>
                <Grid className="mb-4">
                    <H4 color={theme.colors.primary.teal}>Add new user</H4>
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
                            label="Email*"
                            className="mt-3"
                            value={state?.metaData?.version}
                            onChange={(e) => { setState({ ...state, metaData: { ...state?.metaData, version: e.target.value } }) }}
                        />
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

                        {/* <StyledTextField
                            fullWidth
                            id="standard-basic"
                            label="Phone number"
                            className="mt-3"
                            value={state?.metaData?.isrcCode}
                            onChange={(e) => { setState({ ...state, metaData: { ...state?.metaData, isrcCode: e.target.value } }) }}
                        // helperText="Hint: GB-H01-02-12345."
                        /> */}
                        <Grid>
                            <Grid className="mt-4">
                                <MuiPhoneNumber
                                    style={{ width: "100%" }}
                                    name="phone"
                                    label="Phone number"
                                    defaultCountry={'gb'}
                                    onChange={handleOnChange}
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
                    <AppButton variant={"fill"} style={{ marginLeft: "15px" }}>Create new user</AppButton>
                </ButtonContainer>
            </MetaDataDetailsContainer>
        </CreateUserContainer >
    )
}
