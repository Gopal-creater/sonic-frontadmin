import React from 'react'
import {
    EncodeContainer, MetaDataHeaderContainer, CheckBoxLabelContainer, IconContainer, ButtonContainer, SearchTrackContainer,
    MetaDataDetailsContainer, ProperAccessContainer, RightsHolderContainer, RadioLabel, TextContainer, PopUpContainer,
    TitleContainer, Anchor
} from './indexStyles'
import { H4, H1, H5, H6, H3 } from "../../../../StyledComponents/StyledHeadings"
import theme from '../../../../theme'
import { useDispatch, useSelector } from 'react-redux'
import { log } from '../../../../utils/app.debug'
import AppCheckBox from '../../../../components/common/AppCheckBox'
import { FormControlLabel, Grid, RadioGroup } from '@material-ui/core'
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import icon_uploaded from "../../../../assets/icons/icon_file_uploaded.png"
import { StyledTextField } from '../../../../StyledComponents/StyledAppTextInput/StyledAppTextInput'
import moment from 'moment'
import { CustomRadioButton } from '../../../../components/common/AppRadioButton/AppRadioButton'
import AppButton from '../../../../components/common/AppButton/AppButton'
import * as actionTypes from "../../../../stores/actions/actionTypes"
import { encodeFileAction } from '../../../../stores/actions/EncodeActions'
import cogoToast from 'cogo-toast'
import PopUp from '../../../../components/common/PopUp'
import encode_progress from "../../../../assets/icons/encode_progress.png"
import sonic_preloader from "../../../../assets/icons/sonic_preloader.gif"
import iconSuccess from "../../../../assets/images/icon-success-graphic.png"
import CloseIcon from '@material-ui/icons/Close';
import * as mm from "music-metadata-browser";
import CustomDropDown from '../../../../components/common/AppTextInput/CustomDropDown'
import errorEncodeIcon from "../../../../assets/images/icon-fail-graphic.png"

export default function EncodeData() {
    const encodeReducer = useSelector(state => state.encode)
    const [state, setState] = React.useState({
        copyMetaData: false,
    })

    const dispatch = useDispatch()

    React.useEffect(() => {
        let data = {}
        mm.parseBlob(encodeReducer?.selectedFile?.[0], { native: true }).then((metaData) => {
            data = {
                ...encodeReducer?.metaData,
                contentDuration: metaData.format.duration || "",
                contentSize: encodeReducer?.selectedFile?.[0]?.size / 1024,
                contentEncoding:
                    (metaData.format.codec ? metaData.format.codec.toString() : "") +
                    (metaData.format.sampleRate
                        ? ", " + metaData.format.sampleRate.toString() + " Hz"
                        : "") +
                    (metaData.format.codecProfile
                        ? ", " + metaData.format.codecProfile.toString()
                        : "") +
                    (metaData.format.bitrate
                        ? ", " + metaData.format.bitrate.toString() + " bps"
                        : "") +
                    (metaData.format.numberOfChannels
                        ? ", " + metaData.format.numberOfChannels.toString() + " ch"
                        : ""),
                contentSamplingFrequency: metaData?.format?.sampleRate?.toString() || "" + "  Hz",
                contentFileType: encodeReducer?.selectedFile?.[0]?.type,
            }
            return dispatch({ type: actionTypes.SET_METADATA, data: data })
        }).catch((err) => {
            cogoToast.error(err);
        })
    }, [])

    const encode = () => {
        if (encodeReducer?.loading) return
        if (!encodeReducer?.metaData?.contentOwner) {
            cogoToast.error("Artist is mandetory field")
            return
        }

        if (encodeReducer?.metaData?.contentType === 'Music' && (encodeReducer?.metaData?.isrcCode === '' || encodeReducer?.metaData?.isrcCode === undefined)
            && (encodeReducer?.metaData?.iswcCode === '' || encodeReducer?.metaData?.iswcCode === undefined)
            && (encodeReducer?.metaData?.tuneCode === '' || encodeReducer?.metaData?.tuneCode === undefined)) {
            return cogoToast.error("At least one industry code must be given when type is \"Music\".");
        }

        const formData = new FormData();
        let isRightsHolderForEncode = encodeReducer?.isRightsHolderForEncode === null || encodeReducer?.isRightsHolderForEncode === "NO" ? false : true
        let isAuthorizedForEncode = encodeReducer?.isAuthorizedForEncode === null || encodeReducer?.isAuthorizedForEncode === "NO" ? false : true
        formData.append("mediaFile", encodeReducer?.selectedFile?.[0]);
        formData.append("data", JSON.stringify({
            ...encodeReducer?.metaData,
            isRightsHolderForEncode: isRightsHolderForEncode,
            isAuthorizedForEncode: isAuthorizedForEncode,
        }));
        dispatch(encodeFileAction(formData))
    }

    const encodeAnotherFile = () => {
        dispatch({ type: actionTypes.SET_SELECTED_FILE, data: null })
        dispatch({ type: actionTypes.CLOSE_SUCCESS_POPUP })
        dispatch({ type: actionTypes.CLOSE_ERROR_POPUP })
        dispatch({ type: actionTypes.SET_METADATA, data: {} })
    }


    return (
        <EncodeContainer>
            <MetaDataHeaderContainer>
                <TextContainer>
                    <Grid container direction='column' justifyItem='center' >
                        <H4 fontFamily={theme.fontFamily.nunitoSansMediumBold}>You're about to encode  new file:</H4>
                        <H1
                            color={theme.colors.primary.navy}
                        >
                            {encodeReducer?.selectedFile?.[0]?.name}
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
                        <img src={icon_uploaded} width={"55px"} />
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
                            value={encodeReducer?.metaData?.contentName}
                            onChange={(e) => { dispatch({ type: actionTypes.SET_METADATA, data: { ...encodeReducer.metaData, contentName: e.target.value } }) }}
                            placeholder='Song,Video or Audio track title'
                            autoComplete='off'
                        />

                        <Grid className='mt-3'>
                            <CustomDropDown
                                id="channel-dropdown"
                                labelText="Type"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                labelProps={{ style: { fontFamily: theme.fontFamily.nunitoSansRegular } }}
                                inputProps={{
                                    value: encodeReducer?.metaData?.contentType,
                                    onChange: (e) => dispatch({ type: actionTypes.SET_METADATA, data: { ...encodeReducer.metaData, contentType: e.target.value } })
                                }}
                                data={[{ value: "Music" }, { value: "Video" }, { value: "Audio" }] || []}
                            />
                        </Grid>

                        <StyledTextField
                            fullWidth
                            id="standard-basic"
                            label="Artist"
                            value={encodeReducer?.metaData?.contentOwner}
                            className="mt-3"
                            onChange={(e) => { dispatch({ type: actionTypes.SET_METADATA, data: { ...encodeReducer.metaData, contentOwner: e.target.value } }) }}
                        />

                        <StyledTextField
                            fullWidth
                            id="standard-basic"
                            label="Version"
                            className="mt-3"
                            value={encodeReducer?.metaData?.version}
                            onChange={(e) => { dispatch({ type: actionTypes.SET_METADATA, data: { ...encodeReducer.metaData, version: e.target.value } }) }}
                        />

                        <StyledTextField
                            fullWidth
                            id="standard-basic"
                            label="ISRC"
                            className="mt-3"
                            value={encodeReducer?.metaData?.isrcCode}
                            onChange={(e) => { dispatch({ type: actionTypes.SET_METADATA, data: { ...encodeReducer.metaData, isrcCode: e.target.value } }) }}
                        // helperText="Hint: GB-H01-02-12345."
                        />

                        <StyledTextField
                            fullWidth
                            id="standard-basic"
                            label="ISWC"
                            className="mt-3"
                            value={encodeReducer?.metaData?.iswcCode}
                            onChange={(e) => { dispatch({ type: actionTypes.SET_METADATA, data: { ...encodeReducer.metaData, iswcCode: e.target.value } }) }}
                        // helperText="Hint: T-123.456.789-C."
                        />

                        <StyledTextField
                            fullWidth
                            id="standard-basic"
                            label="Tune Code"
                            className="mt-3"
                            value={encodeReducer?.metaData?.tuneCode}
                            onChange={(e) => { dispatch({ type: actionTypes.SET_METADATA, data: { ...encodeReducer.metaData, tuneCode: e.target.value } }) }}
                        // helperText="Hint: 9876543Z."
                        />

                        <StyledTextField
                            fullWidth
                            id="standard-basic"
                            label="File type"
                            className="mt-3"
                            inputProps={{ readOnly: true }}
                            InputLabelProps={{ shrink: true, }}
                            value={encodeReducer?.metaData?.contentFileType}
                            onChange={(e) => { dispatch({ type: actionTypes.SET_METADATA, data: { ...encodeReducer.metaData, contentFileType: e.target.value } }) }} />

                        <StyledTextField
                            fullWidth
                            id="standard-basic"
                            label="Audio length"
                            className="mt-3"
                            inputProps={{ readOnly: true }}
                            InputLabelProps={{ shrink: true, }}
                            value={moment.utc(encodeReducer?.metaData?.contentDuration * 1000).format("HH:mm:ss:SSS")}
                        />
                    </Grid >

                    <Grid item lg={6}>
                        <StyledTextField
                            fullWidth
                            id="standard-basic"
                            label="Audio Size (In MB)"
                            inputProps={{ readOnly: true }}
                            value={(encodeReducer?.metaData?.contentSize / 1024).toFixed(3)}
                        />

                        <StyledTextField
                            fullWidth
                            id="standard-basic"
                            label="Underlying encoding of file"
                            inputProps={{ readOnly: true }}
                            InputLabelProps={{ shrink: true, }}
                            value={encodeReducer?.metaData?.contentEncoding}
                            className="mt-3"
                            onChange={(e) => { dispatch({ type: actionTypes.SET_METADATA, data: { ...encodeReducer.metaData, contentEncoding: e.target.value } }) }} />

                        <StyledTextField
                            fullWidth
                            id="standard-basic"
                            label="Sampling Frequency"
                            className="mt-3"
                            inputProps={{ readOnly: true }}
                            InputLabelProps={{ shrink: true, }}
                            value={encodeReducer?.metaData?.contentSamplingFrequency}
                            onChange={(e) => { dispatch({ type: actionTypes.SET_METADATA, data: { ...encodeReducer.metaData, contentSamplingFrequency: e.target.value } }) }} />

                        <StyledTextField
                            fullWidth
                            id="standard-basic"
                            label="Quality Grade"
                            className="mt-3"
                            value={encodeReducer?.metaData?.contentQuality}
                            onChange={(e) => { dispatch({ type: actionTypes.SET_METADATA, data: { ...encodeReducer.metaData, contentQuality: e.target.value } }) }}
                        />

                        <StyledTextField
                            fullWidth
                            id="standard-basic"
                            label="Description"
                            className="mt-3"
                            multiline
                            value={encodeReducer?.metaData?.contentDescription}
                            onChange={(e) => { dispatch({ type: actionTypes.SET_METADATA, data: { ...encodeReducer.metaData, contentDescription: e.target.value } }) }}
                        />

                        <StyledTextField
                            fullWidth
                            id="standard-basic"
                            label="Distributor"
                            className="mt-3"
                            value={encodeReducer?.metaData?.distributor}
                            onChange={(e) => { dispatch({ type: actionTypes.SET_METADATA, data: { ...encodeReducer.metaData, distributor: e.target.value } }) }}
                        />

                        <StyledTextField
                            fullWidth
                            id="standard-basic"
                            label="Label"
                            className="mt-3"
                            value={encodeReducer?.metaData?.label}
                            onChange={(e) => { dispatch({ type: actionTypes.SET_METADATA, data: { ...encodeReducer.metaData, label: e.target.value } }) }}
                        />

                        <StyledTextField
                            fullWidth
                            id="standard-basic"
                            label="Additional Metada"
                            className="mt-3"
                            value={encodeReducer?.metaData?.additionalMetadata?.message}
                            onChange={(e) => { dispatch({ type: actionTypes.SET_METADATA, data: { ...encodeReducer.metaData, additionalMetadata: { message: e.target.value } } }) }} />
                    </Grid >
                </Grid>

                <ProperAccessContainer>
                    <RightsHolderContainer>
                        <H5
                            color={theme.colors.secondary.grey}
                        >
                            Are you the Rights Holder for the audio file you wish to encode with a SonicKey?
                        </H5>
                        <RadioGroup
                            row
                            style={{ marginLeft: "20px" }}
                            value={encodeReducer?.metaData?.isRightsHolderForEncode === null ? "" : encodeReducer?.metaData?.isRightsHolderForEncode ? "Yes" : "No"}
                            onChange={(e) => dispatch({ type: actionTypes.SET_METADATA, data: { ...encodeReducer.metaData, isRightsHolderForEncode: e.target.value === "Yes" ? true : false } })}
                        >
                            <FormControlLabel
                                value={"Yes"}
                                control={<CustomRadioButton style={{ marginTop: "-5px" }} />}
                                label={<RadioLabel>Yes</RadioLabel>}
                            />
                            <FormControlLabel
                                value={"No"}
                                control={<CustomRadioButton style={{ marginTop: "-5px" }} />}
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
                        <RadioGroup
                            row
                            style={{ marginLeft: "20px" }}
                            value={encodeReducer?.metaData?.isAuthorizedForEncode === null ? "" : encodeReducer?.metaData?.isAuthorizedForEncode ? "Yes" : "No"}
                            onChange={(e) => dispatch({ type: actionTypes.SET_METADATA, data: { ...encodeReducer.metaData, isAuthorizedForEncode: e.target.value === "Yes" ? true : false } })}
                        >
                            <FormControlLabel
                                value={"Yes"}
                                control={<CustomRadioButton style={{ marginTop: "-5px" }} />}
                                label={<RadioLabel>Yes</RadioLabel>}
                            />
                            <FormControlLabel
                                value={"No"}
                                control={<CustomRadioButton style={{ marginTop: "-5px" }} />}
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
                    <AppButton
                        disabled={encodeReducer?.metaData?.isAuthorizedForEncode === false && encodeReducer?.metaData?.isRightsHolderForEncode === false ? true : encodeReducer?.metaData?.isAuthorizedForEncode || encodeReducer?.metaData?.isRightsHolderForEncode || encodeReducer?.metaData?.isAuthorizedForEncode !== null && encodeReducer?.metaData?.isRightsHolderForEncode !== null ? false : true}
                        variant={"fill"}
                        style={{ marginLeft: "15px", width: "175px" }}
                        onClick={encode}
                    >
                        Encode New File
                    </AppButton>
                </ButtonContainer>
            </MetaDataDetailsContainer>

            <PopUp
                id="loadingPopUp"
                open={encodeReducer?.loadingPopUp}
                maxWidth="sm"
                fullWidth
            >
                <PopUpContainer>
                    <TitleContainer container direction='column' alignItems='center'>
                        <img src={encode_progress} style={{ width: "140px", height: "140px", zIndex: 1 }} />
                        <H4
                            className='mt-4'
                            fontFamily={theme.fontFamily.nunitoSansBlack}
                            style={{ textAlign: "center", zIndex: 1 }}
                        >
                            Encoding of {encodeReducer?.selectedFile?.[0]?.name} in progress
                        </H4>
                    </TitleContainer>
                    <H5
                        style={{ textAlign: "center", padding: "25px" }}
                    >
                        Depending on your internet connection and a size of an audio file, encoding may take longer at times
                    </H5>
                    <Grid container justifyContent='center'>
                        <img src={sonic_preloader} alt="sonic preloader" />
                    </Grid>
                </PopUpContainer>
            </PopUp>

            <PopUp
                id="successPopUp"
                open={encodeReducer?.successPopUp}
                maxWidth="sm"
                fullWidth
            >
                <PopUpContainer padding="20px 40px 25px 40px">
                    <Grid container justifyContent='flex-end'>
                        <CloseIcon
                            onClick={() => {
                                dispatch({ type: actionTypes.SET_SELECTED_FILE, data: null })
                                dispatch({ type: actionTypes.SET_METADATA, data: {} })
                                dispatch({ type: actionTypes.CLOSE_SUCCESS_POPUP })
                            }}
                            style={{ cursor: "pointer" }} />
                    </Grid>
                    <TitleContainer container direction='column' alignItems='center'>
                        <img src={iconSuccess} style={{ width: "140px", height: "140px", zIndex: 1 }} />
                        <H3
                            className='mt-4'
                            fontFamily={theme.fontFamily.nunitoSansBlack}
                            style={{ textAlign: "center", zIndex: 1 }}
                        >
                            Well done! Encoding successful
                        </H3>
                    </TitleContainer>
                    <Grid container justifyContent='center' className='mt-1'>
                        <AppButton
                            onClick={encodeAnotherFile}
                            fontSize={"15px"}
                            fontFamily={theme.fontFamily.nunitoSansBlack}
                        >
                            Encode another file
                        </AppButton>
                    </Grid>
                </PopUpContainer>
            </PopUp>

            <PopUp
                id="errorPopUp"
                open={encodeReducer?.errorPopUp}
                maxWidth="sm"
                fullWidth
            >
                <PopUpContainer padding="20px 40px 25px 40px">
                    <Grid container justifyContent='flex-end'>
                        <CloseIcon
                            onClick={() => {
                                dispatch({ type: actionTypes.SET_SELECTED_FILE, data: null })
                                dispatch({ type: actionTypes.SET_METADATA, data: {} })
                                dispatch({ type: actionTypes.CLOSE_ERROR_POPUP })
                            }}
                            style={{ cursor: "pointer" }} />
                    </Grid>
                    <TitleContainer container direction='column' alignItems='center' backgroundColor={theme.colors.secondary.lightGrey}>
                        <img src={errorEncodeIcon} style={{ width: "140px", height: "140px", zIndex: 1 }} />
                        <H3
                            className='mt-4'
                            fontFamily={theme.fontFamily.nunitoSansBlack}
                            style={{ textAlign: "center", zIndex: 1 }}
                        >
                            Ooops! Encoding failed
                        </H3>
                    </TitleContainer>
                    <Grid container justifyContent='center' className='mt-1'>
                        <AppButton
                            onClick={encodeAnotherFile}
                            fontFamily={theme.fontFamily.nunitoSansBlack}
                        >
                            Try to encode again
                        </AppButton>
                    </Grid>
                    <Grid className='mt-5'>
                        <H5 fontFamily={theme.fontFamily.nunitoSansBlack}>Do you need help?</H5>
                        <H4 fontFamily={theme.fontFamily.nunitoSansRegular}>Use <Anchor>HelpCenter</Anchor> or email our <Anchor>Support Team</Anchor></H4>
                    </Grid>
                </PopUpContainer>
            </PopUp>
        </EncodeContainer >
    )
}
