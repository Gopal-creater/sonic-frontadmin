import React from 'react'
import {
    EncodeContainer, MetaDataHeaderContainer, CheckBoxLabelContainer, IconContainer, ButtonContainer, SearchTrackContainer,
    MetaDataDetailsContainer, ProperAccessContainer, RightsHolderContainer, RadioLabel, TextContainer
} from './indexStyles'
import { H4, H1, H5 } from "../../../../StyledComponents/StyledHeadings"
import theme from '../../../../theme'
import { useDispatch, useSelector } from 'react-redux'
import { log } from '../../../../utils/app.debug'
import AppCheckBox from '../../../../components/common/AppCheckBox'
import { FormControlLabel, Grid, RadioGroup } from '@material-ui/core'
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import iconAddSound from "../../../../assets/images/icon-add-sound.png"
import { StyledTextField } from '../../../../StyledComponents/StyledAppTextInput/StyledAppTextInput'
import moment from 'moment'
import { CustomRadioButton } from '../../../../components/common/AppRadioButton/AppRadioButton'
import AppButton from '../../../../components/common/AppButton/AppButton'
import * as actionTypes from "../../../../stores/actions/actionTypes"

export default function EncodeData() {
    const encode = useSelector(state => state.encode)
    const [state, setState] = React.useState({
        copyMetaData: false,
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

    const dispatch = useDispatch()

    // log("selected to encode", encode.selectedFile[0])

    return (
        <EncodeContainer>
            <MetaDataHeaderContainer>
                <TextContainer>
                    <Grid container direction='column' justifyItem='center' >
                        <H4 fontFamily={theme.fontFamily.nunitoSansMediumBold}>You're about to encode  new file:</H4>
                        <H1
                            color={theme.colors.primary.navy}
                        >
                            {encode?.selectedFile?.[0]?.name}
                        </H1>

                        <FormControlLabel
                            control={
                                <AppCheckBox
                                    checked={state.copyMetaData}
                                    onChange={() => setState({ ...state, copyMetaData: !state.copyMetaData })}
                                />
                            }
                            label={
                                <CheckBoxLabelContainer>
                                    <H5
                                        color={theme.colors.secondary.lightNavy}
                                    >
                                        Copy MetaData from existing track
                                    </H5>
                                    <HelpOutlineOutlinedIcon style={{ color: theme.colors.secondary.lightNavy, fontSize: 17, marginLeft: "5px" }} />
                                </CheckBoxLabelContainer>
                            }
                        />
                    </Grid>

                    <IconContainer>
                        <img src={iconAddSound} width={"55px"} />
                    </IconContainer>
                </TextContainer>

                {
                    state.copyMetaData && <SearchTrackContainer>
                        Search track
                    </SearchTrackContainer>
                }
            </MetaDataHeaderContainer>

            <MetaDataDetailsContainer>
                <H4 color={theme.colors.primary.teal}>Enter MetaData details</H4>

                <Grid container spacing={10}>
                    <Grid item lg={6}>
                        <StyledTextField
                            fullWidth
                            id="standard-basic"
                            label="Title"
                            value={state?.metaData?.title}
                            onChange={(e) => { setState({ ...state, metaData: { ...state?.metaData, title: e.target.value } }) }}
                            placeholder='Song,Video or Audio track title'
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
                            label="Artist"
                            value={state?.metaData?.artist}
                            className="mt-3"
                            onChange={(e) => { setState({ ...state, metaData: { ...state?.metaData, artist: e.target.value } }) }}
                        />

                        <StyledTextField
                            fullWidth
                            id="standard-basic"
                            label="Version"
                            className="mt-3"
                            value={state?.metaData?.version}
                            onChange={(e) => { setState({ ...state, metaData: { ...state?.metaData, version: e.target.value } }) }}
                        />

                        <StyledTextField
                            fullWidth
                            id="standard-basic"
                            label="ISRC"
                            className="mt-3"
                            value={state?.metaData?.isrcCode}
                            onChange={(e) => { setState({ ...state, metaData: { ...state?.metaData, isrcCode: e.target.value } }) }}
                        // helperText="Hint: GB-H01-02-12345."
                        />

                        <StyledTextField
                            fullWidth
                            id="standard-basic"
                            label="ISWC"
                            className="mt-3"
                            value={state?.metaData?.iswcCode}
                            onChange={(e) => { setState({ ...state, metaData: { ...state?.metaData, iswcCode: e.target.value } }) }}
                        // helperText="Hint: T-123.456.789-C."
                        />

                        <StyledTextField
                            fullWidth
                            id="standard-basic"
                            label="Tune Code"
                            className="mt-3"
                            value={state?.metaData?.tuneCode}
                            onChange={(e) => { setState({ ...state, metaData: { ...state?.metaData, tuneCode: e.target.value } }) }}
                        // helperText="Hint: 9876543Z."
                        />

                        <StyledTextField
                            fullWidth
                            id="standard-basic"
                            label="File type"
                            className="mt-3"
                            inputProps={{ readOnly: true }}
                            value={state?.metaData?.contentFileType}
                            onChange={(e) => { setState({ ...state, metaData: { ...state?.metaData, contentFileType: e.target.value } }) }} />

                        <StyledTextField
                            fullWidth
                            id="standard-basic"
                            label="Audio length"
                            className="mt-3"
                            inputProps={{ readOnly: true }}
                            value={moment.utc(state?.metaData?.contentDuration * 1000).format("HH:mm:ss:SSS")}
                        />
                    </Grid >

                    <Grid item lg={6}>
                        <StyledTextField
                            fullWidth
                            id="standard-basic"
                            label="Audio Size (In MB)"
                            inputProps={{ readOnly: true }}
                            value={(state?.metaData?.contentSize / 1024).toFixed(3)}
                        />

                        <StyledTextField
                            fullWidth
                            id="standard-basic"
                            label="Underlying encoding of file"
                            inputProps={{ readOnly: true }}
                            value={state?.metaData?.contentEncoding}
                            className="mt-3"
                            onChange={(e) => { setState({ ...state, metaData: { ...state?.metaData, contentEncoding: e.target.value } }) }} />

                        <StyledTextField
                            fullWidth
                            id="standard-basic"
                            label="Sampling Frequency"
                            className="mt-3"
                            inputProps={{ readOnly: true }}
                            value={state?.metaData?.contentSamplingFrequency}
                            onChange={(e) => { setState({ ...state, metaData: { ...state?.metaData, contentSamplingFrequency: e.target.value } }) }} />

                        <StyledTextField
                            fullWidth
                            id="standard-basic"
                            label="Quality Grade"
                            className="mt-3"
                            value={state?.metaData?.contentQuality}
                            onChange={(e) => { setState({ ...state, metaData: { ...state?.metaData, contentQuality: e.target.value } }) }}
                        />

                        <StyledTextField
                            fullWidth
                            id="standard-basic"
                            label="Description"
                            className="mt-3"
                            multiline
                            value={state?.metaData?.contentDescription}
                            onChange={(e) => { setState({ ...state, metaData: { ...state?.metaData, contentDescription: e.target.value } }) }}
                        />

                        <StyledTextField
                            fullWidth
                            id="standard-basic"
                            label="Distributor"
                            className="mt-3"
                            value={state?.metaData?.distributor}
                            onChange={(e) => { setState({ ...state, metaData: { ...state?.metaData, distributor: e.target.value } }) }}
                        />

                        <StyledTextField
                            fullWidth
                            id="standard-basic"
                            label="Label"
                            className="mt-3"
                            value={state?.metaData?.label}
                            onChange={(e) => { setState({ ...state, metaData: { ...state?.metaData, label: e.target.value } }) }}
                        />

                        <StyledTextField
                            fullWidth
                            id="standard-basic"
                            label="Additional Metada"
                            className="mt-3"
                            value={state?.metaData?.additionalMetadata?.message}
                            onChange={(e) => { setState({ ...state, metaData: { ...state?.metaData, additionalMetadata: { message: e.target.value } } }) }} />
                    </Grid >
                </Grid>

                <ProperAccessContainer>
                    <RightsHolderContainer>
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
                    </RightsHolderContainer>
                </ProperAccessContainer>

                <ButtonContainer>
                    <AppButton
                        variant={"outline"}
                        onClick={() => dispatch({ type: actionTypes.CLEAR_SELECTED_FILE })}
                    >
                        Cancel
                    </AppButton>
                    <AppButton variant={"fill"} style={{ marginLeft: "15px" }}>Encode New File</AppButton>
                </ButtonContainer>
            </MetaDataDetailsContainer>
        </EncodeContainer >
    )
}
