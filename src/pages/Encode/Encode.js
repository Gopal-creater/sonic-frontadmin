import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import cogoToast from 'cogo-toast';
import Communication from '../../services/https/Communication';
import { log } from '../../utils/app.debug';
import EncodeSuccess from './Components/EncodeSuccess';
import moment from 'moment';
import EncodeDecodeLoading from '../../components/common/FileSelection/EncodeDecodeLoading';
import FailedFileSelection from '../../components/common/FileSelection/FailedFileSelection';
import FileSelection from '../../components/common/FileSelection/FileSelection';
import { StyledTextField } from '../../StyledComponents/StyledAppTextInput/StyledAppTextInput';
import EncodeType from './Components/EncodeType';
import { H3 } from '../../StyledComponents/StyledHeadings';
import AppButton from '../../components/common/AppButton/AppButton';
import theme from '../../theme';

const useStyles = makeStyles((theme) => ({
    encodeDataContainer: {
        backgroundColor: "white",
        padding: "2% 2.5%",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        marginTop: "4%",
    },
    heading: {
        color: "#343F84",
        fontSize: 26,
        fontFamily: 'NunitoSans-Bold',
    },
    encodeForm: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    encodeBtn: {
        height: 45,
        padding: "0px 20px",
        textTransform: "initial",
        fontSize: 15,
        fontWeight: 700,
        borderRadius: 8,
        backgroundColor: "#393F5B"
    },
    textInput: {
        fontWeight: "bold",
        color: "#757575",
        fontFamily: 'NunitoSans-Regular',
    },
    textInputLabel: {
        fontWeight: "bold",
        color: "#757575",
        fontFamily: 'NunitoSans-Regular',
    }
}));

export default function Encode() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        isDataPresent: false,
        clearSelectedFile: false,
        encodeLoading: false,
        encodeError: null,
        encodeSuccess: null,
        isRightsHolderForEncode: null,
        isAuthorizedForEncode: null
    });

    const closeEncodeProgressPopUp = (sucess, error) => {
        setValues({ ...values, encodeLoading: false, encodeError: error, encodeSuccess: sucess, clearSelectedFile: true })
    }

    const handleEncode = (e) => {
        e.preventDefault();
        if (values?.data?.contentOwner === "" || values?.data?.contentOwner === undefined) {
            cogoToast.error("Artist is a mandatory field");
            return
        }
        const formData = new FormData();
        formData.append("mediaFile", values?.file);
        if (values?.data?.contentType === 'Music' && (values?.data?.isrcCode === '' || values?.data?.isrcCode === undefined)
            && (values?.data?.iswcCode === '' || values?.data?.iswcCode === undefined)
            && (values?.data?.tuneCode === '' || values?.data?.tuneCode === undefined)) {
            return cogoToast.error("At least one industry code must be given when type is \"Music\".");
        }
        // if (values?.data?.contentType === 'Music') {
        //     if (values?.data?.isrcCode !== undefined && values?.data?.isrcCode.includes('_')) {
        //         return cogoToast.error('Isrc code is incorrect')
        //     }
        //     if (values?.data?.iswcCode !== undefined && values?.data?.iswcCode.includes('_')) {
        //         return cogoToast.error('Iswc code is incorrect')
        //     }
        //     if (values?.data?.tuneCode !== undefined && values?.data?.tuneCode.includes('_')) {
        //         return cogoToast.error('Tune code is incorrect')
        //     }
        // }

        const payload = {
            //  staticMetadata: {
            encodingStrength: values?.data?.encodingStrength,
            contentType: values?.data?.contentType,
            contentDescription: values?.data?.contentDescription,
            contentDuration: values?.data?.contentDuration,
            contentSize: values?.data?.contentSize,
            contentFileType: values?.data?.contentFileType,
            contentEncoding: values?.data?.contentEncoding,
            contentSamplingFrequency: values?.data?.contentSamplingFrequency.replace('Hz', ''),
            isrcCode: values?.data?.isrcCode ? values?.data?.isrcCode.toUpperCase() : '',
            iswcCode: values?.data?.iswcCode ? values?.data?.iswcCode.toUpperCase() : '',
            tuneCode: values?.data?.tuneCode ? values?.data?.tuneCode.toUpperCase() : '',
            //  volatileMetadata?
            contentName: values?.data?.contentName,
            contentOwner: values?.data?.contentOwner,
            contentValidation: true,
            contentFileName: values?.name,
            contentQuality: values?.data?.contentQuality,
            additionalMetadata: { ...values?.data?.additionalMetadata },
            isRightsHolderForEncode: values?.isRightsHolderForEncode === null ? false : values?.isRightsHolderForEncode,
            isAuthorizedForEncode: values?.isAuthorizedForEncode === null ? false : values?.isAuthorizedForEncode,
            distributor: values?.data?.distributor,
            version: values?.data?.version,
            label: values?.data?.label
        }
        formData.append("data", JSON.stringify(payload));

        setValues({ ...values, encodeLoading: true })
        // call api
        Communication?.encodeFile(formData).then((response) => {
            closeEncodeProgressPopUp(response, null);
            log("Encode Success", response)
        }).catch((error) => {
            closeEncodeProgressPopUp(null, error?.data);
            log("Encode Error", error)
            cogoToast.error(error?.data?.message || error?.message)
        })
    }

    log("encode values", values)

    return (
        <Grid className={classes.EncodeContainer} id="encodeDecodeContainer">
            {values?.encodeSuccess !== null && <EncodeSuccess audioName={values?.name} successData={values?.encodeSuccess} />}
            {values?.encodeError !== null && <FailedFileSelection title="Encoding" audioName={values?.name} />}

            {/* <FailedFileSelection title="Encoding" audioName={values?.name} /> */}
            {/* <EncodeSuccess audioName={"dsdfgsdfgsdfgsdfgsdfgsdf"} /> */}
            <FileSelection
                prop={{
                    title: "Encode",
                    subTitle: "Upload a file to start.",
                    getAudioData: (audioData) => {
                        setValues({
                            ...values,
                            clearSelectedFile: false,
                            encodeLoading: false,
                            encodeError: null,
                            encodeSuccess: null,
                            isDataPresent: true,
                            ...audioData,
                        })
                    },
                    clearSelectedFile: values?.clearSelectedFile
                }}
            />

            {values?.isDataPresent && values?.encodeSuccess === null && values?.encodeError === null &&
                <Grid className={classes.encodeDataContainer} id="encodeDataContainer">
                    {/* <Typography className={classes.heading} id="encodeDataTitle">MetaData of Uploaded file "{values?.name}"</Typography> */}
                    <H3>MetaData of Uploaded file "{values?.name}"</H3>
                    <form className={classes.encodeForm}>
                        <Grid item id="audioName">
                            <StyledTextField
                                fullWidth
                                id="standard-basic"
                                label="Title"
                                value={values?.data?.contentName}
                                onChange={(e) => { setValues({ ...values, data: { ...values?.data, contentName: e.target.value } }) }}
                                // helperText="Song,Video or Audio track title"
                                placeholder='Song,Video or Audio track title'
                                autoComplete='off'
                            />
                        </Grid>

                        <Grid item id="audioType">
                            <FormControl className={classes.formControl} fullWidth>
                                <EncodeType
                                    id="demo-simple-select"
                                    labelText="Type"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        value: values?.data?.contentType,
                                        onChange: (e) => {
                                            e.target.value === "Music" ?
                                                setValues({ ...values, data: { ...values?.data, contentType: e.target.value } }) :
                                                setValues({ ...values, data: { ...values?.data, contentType: e.target.value, isrcCode: "", iswcCode: "", tuneCode: "" } })
                                        }
                                    }
                                    }
                                />
                            </FormControl>
                        </Grid>

                        {values?.data?.contentType === "Music" &&
                            <Grid item id="isrc">
                                <p style={{ fontWeight: "bold", color: "#757575", fontFamily: "NunitoSans-Regular", margin: "15px 0px -10px 9px" }}>Industry codes</p>
                                <StyledTextField
                                    fullWidth
                                    id="standard-basic"
                                    label="ISRC"
                                    value={values?.data?.isrcCode}
                                    onChange={(e) => { setValues({ ...values, data: { ...values?.data, isrcCode: e.target.value } }) }}
                                    FormHelperTextProps={{ className: classes.textInputLabel }}
                                    helperText="Hint: GB-H01-02-12345."
                                />
                            </Grid>
                        }

                        {values?.data?.contentType === "Music" &&
                            <Grid item id="iswc">
                                <StyledTextField
                                    fullWidth
                                    id="standard-basic"
                                    label="ISWC"
                                    value={values?.data?.iswcCode}
                                    onChange={(e) => { setValues({ ...values, data: { ...values?.data, iswcCode: e.target.value } }) }}
                                    FormHelperTextProps={{ className: classes.textInputLabel }}
                                    helperText="Hint: T-123.456.789-C."
                                />
                            </Grid>
                        }

                        {values?.data?.contentType === "Music" &&
                            <Grid item id="tunecode">
                                <StyledTextField
                                    fullWidth
                                    id="standard-basic"
                                    label="Tune Code"
                                    value={values?.data?.tuneCode}
                                    onChange={(e) => { setValues({ ...values, data: { ...values?.data, tuneCode: e.target.value } }) }}
                                    FormHelperTextProps={{ className: classes.textInputLabel }}
                                    helperText="Hint: 9876543Z."
                                />
                            </Grid>
                        }

                        <Grid item id="contentFileType">
                            <StyledTextField
                                fullWidth
                                id="standard-basic"
                                label="File type"
                                inputProps={{ readOnly: true }}
                                value={values?.data?.contentFileType}
                                onChange={(e) => { setValues({ ...values, data: { ...values?.data, contentFileType: e.target.value } }) }} />
                        </Grid>

                        <Grid item id="artist">
                            <StyledTextField
                                fullWidth
                                id="standard-basic"
                                label="Artist"
                                value={values?.data?.contentOwner}
                                onChange={(e) => { setValues({ ...values, data: { ...values?.data, contentOwner: e.target.value } }) }} />
                        </Grid>

                        <Grid item id="audioLength">
                            <StyledTextField
                                fullWidth
                                id="standard-basic"
                                label="Audio length"
                                inputProps={{ readOnly: true }}
                                value={moment.utc(values?.data?.contentDuration * 1000).format("HH:mm:ss:SSS")}
                            />
                        </Grid>

                        <Grid item id="audioSize">
                            <StyledTextField
                                fullWidth
                                id="standard-basic"
                                label="Audio Size (In MB)"
                                inputProps={{ readOnly: true }}
                                value={(values?.data?.contentSize / 1024).toFixed(3)}
                            />
                        </Grid>

                        <Grid item id="underlyingEncoding">
                            <StyledTextField
                                fullWidth
                                id="standard-basic"
                                label="Underlying encoding of file"
                                inputProps={{ readOnly: true }}
                                value={values?.data?.contentEncoding}
                                onChange={(e) => { setValues({ ...values, data: { ...values?.data, contentEncoding: e.target.value } }) }} />
                        </Grid>

                        <Grid item id="samplingFrequency">
                            <StyledTextField
                                fullWidth
                                id="standard-basic"
                                label="Sampling Frequency"
                                inputProps={{ readOnly: true }}
                                value={values?.data?.contentSamplingFrequency}
                                onChange={(e) => { setValues({ ...values, data: { ...values?.data, contentSamplingFrequency: e.target.value } }) }} />
                        </Grid>

                        <Grid item id="qualityGrade">
                            <StyledTextField
                                fullWidth
                                id="standard-basic"
                                label="Quality Grade"
                                value={values?.data?.contentQuality}
                                onChange={(e) => { setValues({ ...values, data: { ...values?.data, contentQuality: e.target.value } }) }} />
                        </Grid>

                        <Grid item id="description">
                            <StyledTextField
                                fullWidth
                                id="standard-basic"
                                label="Description"
                                multiline
                                rows={4}
                                value={values?.data?.contentDescription}
                                onChange={(e) => { setValues({ ...values, data: { ...values?.data, contentDescription: e.target.value } }) }} />
                        </Grid>

                        <Grid item id="distributor">
                            <StyledTextField
                                fullWidth
                                id="standard-basic"
                                label="Distributor"
                                value={values?.data?.distributor}
                                onChange={(e) => { setValues({ ...values, data: { ...values?.data, distributor: e.target.value } }) }} />
                        </Grid>

                        <Grid item id="version">
                            <StyledTextField
                                fullWidth
                                id="standard-basic"
                                label="Version"
                                value={values?.data?.version}
                                onChange={(e) => { setValues({ ...values, data: { ...values?.data, version: e.target.value } }) }} />
                        </Grid>

                        <Grid item id="label">
                            <StyledTextField
                                fullWidth
                                id="standard-basic"
                                label="Label"
                                value={values?.data?.label}
                                onChange={(e) => { setValues({ ...values, data: { ...values?.data, label: e.target.value } }) }} />
                        </Grid>

                        <Grid item id="additionalMetadata">
                            <StyledTextField
                                fullWidth
                                id="standard-basic"
                                label="Additional MetaData"
                                value={values?.data?.additionalMetadata?.message}
                                onChange={(e) => { setValues({ ...values, data: { ...values?.data, additionalMetadata: { message: e.target.value } } }) }} />
                        </Grid>

                        <Grid item id="contentValidation" className="mt-3">
                            <FormControl component="fieldset" className={classes.formControl} >
                                <FormLabel
                                    component="legend"
                                    style={{
                                        color: "#757575", fontWeight: "bold", fontFamily: 'NunitoSans-Regular',
                                    }}
                                >
                                    Are you the Rights Holder for the audio file you wish to encode with a SonicKey?
                                </FormLabel>
                                <RadioGroup
                                    color="primary"
                                    row aria-label="gender"
                                    name="gender1"
                                    style={{
                                        color: "#757575", fontWeight: "bold", fontFamily: 'NunitoSans-Regular',
                                    }}
                                    value={values?.isRightsHolderForEncode === null ? "" : values?.isRightsHolderForEncode ? "Yes" : "No"}
                                    onChange={(event) => { setValues({ ...values, isRightsHolderForEncode: event.target.value === "Yes" ? true : false }) }}>

                                    <FormControlLabel value="Yes" control={<Radio style={{
                                        color: "#7078A8"
                                    }} />} label={<Typography style={{
                                        fontFamily: 'NunitoSans-Regular', fontWeight: "bold"
                                    }}>Yes</Typography>} />

                                    <FormControlLabel value="No" control={<Radio style={{ color: "#7078A8" }} />} label={<Typography style={{
                                        fontFamily: 'NunitoSans-Regular', fontWeight: "bold"
                                    }}>No</Typography>} />
                                </RadioGroup>

                                <ul>
                                    <li className={classes.textInputLabel}><i >If you select 'Yes' the grey encode button will turn to blue and you can immediately encode the audio file by clicking on the blue encode button.</i></li>
                                    <li className={classes.textInputLabel}><i>If you select 'No', please answer the question below.</i></li>
                                </ul>
                            </FormControl>
                        </Grid>

                        {!values?.isRightsHolderForEncode &&
                            <Grid item id="contentValidation" className="mt-3">
                                <FormControl component="fieldset" className={classes.formControl} >
                                    <FormLabel component="legend" style={{
                                        color: "#757575", fontWeight: "bold", fontFamily: 'NunitoSans-Regular',
                                    }}
                                    >Are you Authorised by the Rights Holder to encode this audio file with a SonicKey?</FormLabel>
                                    <RadioGroup
                                        color="primary"
                                        row aria-label="gender"
                                        name="gender1"
                                        style={{
                                            color: "#757575", fontWeight: "bold", fontFamily: 'NunitoSans-Regular',
                                        }}
                                        value={values?.isAuthorizedForEncode === null ? "" : values?.isAuthorizedForEncode ? "Yes" : "No"}
                                        onChange={(event) => { setValues({ ...values, isAuthorizedForEncode: event.target.value === "Yes" ? true : false }) }}>
                                        <FormControlLabel value="Yes" control={<Radio style={{
                                            color: "#7078A8"
                                        }} />} label={<Typography style={{
                                            fontFamily: 'NunitoSans-Regular', fontWeight: "bold"
                                        }}>Yes</Typography>} />

                                        <FormControlLabel value="No" control={<Radio style={{ color: "#7078A8" }} />} label={<Typography style={{
                                            fontFamily: 'NunitoSans-Regular', fontWeight: "bold"
                                        }}>No</Typography>} />
                                    </RadioGroup>

                                    <ul>
                                        <li className={classes.textInputLabel}><i >If you select 'Yes' the grey encode button will turn to blue and you can immediately encode the audio file by clicking on the blue encode button.</i></li>
                                        <li className={classes.textInputLabel}><i>If you select 'No', you will be unable to encode the file.</i></li>
                                    </ul>
                                </FormControl>
                            </Grid>
                        }

                        <Grid container justifyContent="center" className="pt-4">
                            <AppButton
                                style={{
                                    backgroundColor: values?.isAuthorizedForEncode === false && values?.isRightsHolderForEncode === false ? "#DC004E" : values?.isAuthorizedForEncode === null || values?.isRightsHolderForEncode === null ? "" : "#393F5B",
                                    color: "white"
                                }}
                                variant="fill"
                                component="span"
                                fontFamily={theme.fontFamily.nunitoSansBold}
                                disabled={values?.isAuthorizedForEncode === false && values?.isRightsHolderForEncode === false ? true : values?.isAuthorizedForEncode || values?.isRightsHolderForEncode || values?.isAuthorizedForEncode !== null && values?.isRightsHolderForEncode !== null ? false : true}
                                onClick={handleEncode}
                                type="submit"
                            >
                                Encode
                            </AppButton>
                        </Grid>

                        {values?.isAuthorizedForEncode === false && values?.isRightsHolderForEncode === false ?
                            <Grid container justifyContent="center" className="pt-2" style={{ color: "#DC004E", fontFamily: "NunitoSans-Bold" }}>
                                Encode Not Authorised
                            </Grid>
                            : ""}
                    </form>

                </Grid >
            }

            <EncodeDecodeLoading
                open={values?.encodeLoading}
                onClose={closeEncodeProgressPopUp}
                title="Encoding"
                audioName={values?.name}
            />
        </Grid >
    )
}