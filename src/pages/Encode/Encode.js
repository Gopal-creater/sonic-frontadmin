import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import FileSelection from '../../components/common/FileSelection';
import TextField from '@material-ui/core/TextField';
import { Button, Grid, Typography } from '@material-ui/core'
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import cogoToast from 'cogo-toast';
import Communication from '../../services/https/Communication';
import { log } from '../../utils/app.debug';
import EncodeDecodeLoading from '../../components/common/EncodeDecodeLoading';
import InputMask from 'react-input-mask';
import EncodeSuccess from './Components/EncodeSuccess';
import FailedFileSelection from '../../components/common/FailedFileSelection';
import moment from 'moment';

const countryCodes = require("country-codes-list");
const myCountryCodesObject = countryCodes.customList(
    "countryCode",
    "[{countryCode}]"
);


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
        checkedAuthorization: false
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
        if (values?.data?.contentFileType == 'Music' && (values?.data?.isrcCode == '' || values?.data?.isrcCode === undefined)
            && (values?.data?.iswcCode == '' || values?.data?.iswcCode === undefined)
            && (values?.data?.tuneCode == '' || values?.data?.tuneCode === undefined)) {
            return cogoToast.error("At least one industry code must be given when type is \"Music\".");
        }
        if (values?.data?.contentFileType == 'Music') {
            if (values?.data?.isrcCode !== undefined && values?.data?.isrcCode.includes('_')) {
                return cogoToast.error('ISRC code is incorrect')
            }
            if (values?.data?.iswcCode !== undefined && values?.data?.iswcCode.includes('_')) {
                return cogoToast.error('ISWC code is incorrect')
            }
            if (values?.data?.tuneCode !== undefined && values?.data?.tuneCode.includes('_')) {
                return cogoToast.error('Tune code is incorrect')
            }
        }

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
            contentValidation: values?.data?.contentValidation == "Yes" ? true : false,
            contentFileName: values?.name,
            contentQuality: values?.data?.contentQuality,
            additionalMetadata: { ...values?.data?.additionalMetadata }
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

    return (
        <Grid className={classes.EncodeContainer} id="encodeDecodeContainer">
            {values?.encodeSuccess !== null && <EncodeSuccess audioName={values?.name} successData={values?.encodeSuccess} />}
            {values?.encodeError !== null && <FailedFileSelection title="Encoding" audioName={values?.name} />}

            {/* <FailedFileSelection title="Encoding" audioName={values?.name} /> */}
            {/* <EncodeSuccess audioName={"dsdfgsdfgsdfgsdfgsdfgsdf"} /> */}
            <FileSelection
                prop={{
                    title: "Encode",
                    subTitle: "Upload a file to start",
                    getAudioData: (audioData) => {
                        setValues({
                            ...values,
                            clearSelectedFile: false,
                            encodeLoading: false,
                            encodeError: null,
                            encodeSuccess: null,
                            isDataPresent: true,
                            ...audioData
                        })
                    },
                    clearSelectedFile: values?.clearSelectedFile
                }}
            />

            {values?.isDataPresent && values?.encodeSuccess === null && values?.encodeError === null &&
                <Grid className={classes.encodeDataContainer} id="encodeDataContainer">
                    <Typography className={classes.heading} id="encodeDataTitle">MetaData of {values?.name}</Typography>

                    <form className={classes.encodeForm}>
                        <Grid item id="audioName">
                            <TextField
                                fullWidth
                                id="standard-basic"
                                label="Audio name"
                                inputProps={{ className: classes.textInput }}
                                InputLabelProps={{ className: classes.textInputLabel }}
                                value={values?.data?.contentName}
                                onChange={(e) => { setValues({ ...values, data: { ...values?.data, contentName: e.target.value } }) }} />
                        </Grid>

                        <Grid item id="audioType">
                            <FormControl className={classes.formControl} fullWidth>
                                <InputLabel id="demo-simple-select-label" style={{
                                    color: "#757575", fontWeight: "bold", fontFamily: 'NunitoSans-Regular',
                                }}>Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    style={{
                                        color: "#757575", fontWeight: "bold", fontFamily: 'NunitoSans-Regular',
                                    }}
                                    value={values?.data?.contentType}
                                    fullWidth
                                    onChange={(e) => {
                                        e.target.value === "Music" ?
                                            setValues({ ...values, data: { ...values?.data, contentType: e.target.value } }) :
                                            setValues({ ...values, data: { ...values?.data, contentType: e.target.value, isrcCode: "", iswcCode: "", tuneCode: "" } })
                                    }}
                                >
                                    <MenuItem value={"Music"} style={{ color: "#757575", fontWeight: "bold" }}>Music</MenuItem>
                                    <MenuItem value={"Video"} style={{ color: "#757575", fontWeight: "bold" }}>Video</MenuItem>
                                    <MenuItem value={"Audio"} style={{ color: "#757575", fontWeight: "bold" }}>Audio</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {values?.data?.contentType === "Music" &&
                            <Grid item id="isrc">
                                <InputMask
                                    mask="aa-a99-99-99999"
                                    value={values?.data?.isrcCode}
                                    onChange={(e) => { setValues({ ...values, data: { ...values?.data, isrcCode: e.target.value } }) }}>
                                    {(inputProps) =>
                                        <TextField
                                            {...inputProps}
                                            fullWidth
                                            id="standard-basic"
                                            label="ISRC"
                                            inputProps={{ className: classes.textInput }}
                                            InputLabelProps={{ className: classes.textInputLabel }}
                                            FormHelperTextProps={{ className: classes.textInputLabel }}
                                            helperText={values?.data?.isrcCode &&
                                                values?.data?.isrcCode?.substring(0, 1) !== "_" &&
                                                !Object.keys(myCountryCodesObject)
                                                    .toString()
                                                    .includes(
                                                        values?.data?.isrcCode?.substring(0, 2).toUpperCase()
                                                    ) ? "Pass proper country codes." : "Hint: GB-H01-02-12345."} />
                                    }
                                </InputMask>
                            </Grid>
                        }

                        {values?.data?.contentType === "Music" &&
                            <Grid item id="iswc">
                                <InputMask
                                    className="form-control"
                                    mask="T-999.999.999-*"
                                    inputProps={{ className: classes.textInput }}
                                    InputLabelProps={{ className: classes.textInputLabel }}
                                    FormHelperTextProps={{ className: classes.textInputLabel }}
                                    value={values?.data?.iswcCode}
                                    onChange={(e) => { setValues({ ...values, data: { ...values?.data, iswcCode: e.target.value } }) }} >
                                    {(inputProps) => <TextField
                                        {...inputProps}
                                        fullWidth
                                        id="standard-basic"
                                        label="ISWC"
                                        helperText="Hint: T-123.456.789-C."
                                    />}
                                </InputMask>
                            </Grid>
                        }

                        {values?.data?.contentType === "Music" &&
                            <Grid item id="tunecode">
                                <InputMask
                                    className="form-control"
                                    mask="9999999a"
                                    value={values?.data?.tuneCode}
                                    onChange={(e) => { setValues({ ...values, data: { ...values?.data, tuneCode: e.target.value } }) }}>
                                    {(inputProps) => <TextField
                                        {...inputProps}
                                        fullWidth
                                        inputProps={{ className: classes.textInput }}
                                        InputLabelProps={{ className: classes.textInputLabel }}
                                        FormHelperTextProps={{ className: classes.textInputLabel }}
                                        id="standard-basic"
                                        label="TuneCode"
                                        helperText="Hint: 9876543Z."
                                    />}
                                </InputMask>

                            </Grid>
                        }

                        <Grid item id="contentFileType">
                            <TextField
                                fullWidth
                                id="standard-basic"
                                label="File type"
                                inputProps={{ className: classes.textInput, readOnly: true }}
                                InputLabelProps={{ className: classes.textInputLabel }}
                                value={values?.data?.contentFileType}
                                onChange={(e) => { setValues({ ...values, data: { ...values?.data, contentFileType: e.target.value } }) }} />
                        </Grid>

                        <Grid item id="artist">
                            <TextField
                                fullWidth
                                id="standard-basic"
                                label="Artist"
                                inputProps={{ className: classes.textInput }}
                                InputLabelProps={{ className: classes.textInputLabel }}
                                value={values?.data?.contentOwner}
                                onChange={(e) => { setValues({ ...values, data: { ...values?.data, contentOwner: e.target.value } }) }} />
                        </Grid>

                        <Grid item id="audioLength">
                            <TextField
                                fullWidth
                                id="standard-basic"
                                label="Audio length"
                                inputProps={{ className: classes.textInput, readOnly: true }}
                                InputLabelProps={{ className: classes.textInputLabel }}
                                value={moment.utc(values?.data?.contentDuration * 1000).format("HH:mm:ss:SSS")}
                            />
                        </Grid>

                        <Grid item id="audioSize">
                            <TextField
                                fullWidth
                                id="standard-basic"
                                label="Audio Size (In MB)"
                                inputProps={{ className: classes.textInput, readOnly: true }}
                                InputLabelProps={{ className: classes.textInputLabel }}
                                value={(values?.data?.contentSize / 1024).toFixed(3)}
                            />
                        </Grid>

                        <Grid item id="underlyingEncoding">
                            <TextField
                                fullWidth
                                id="standard-basic"
                                label="Underlying encoding of file"
                                inputProps={{ className: classes.textInput, readOnly: true }}
                                InputLabelProps={{ className: classes.textInputLabel }}
                                value={values?.data?.contentEncoding}
                                onChange={(e) => { setValues({ ...values, data: { ...values?.data, contentEncoding: e.target.value } }) }} />
                        </Grid>

                        <Grid item id="samplingFrequency">
                            <TextField
                                fullWidth
                                id="standard-basic"
                                label="Sampling Frequency"
                                inputProps={{ className: classes.textInput, readOnly: true }}
                                InputLabelProps={{ className: classes.textInputLabel }}
                                value={values?.data?.contentSamplingFrequency}
                                onChange={(e) => { setValues({ ...values, data: { ...values?.data, contentSamplingFrequency: e.target.value } }) }} />
                        </Grid>

                        <Grid item id="qualityGrade">
                            <TextField
                                fullWidth
                                id="standard-basic"
                                label="Quality Grade"
                                inputProps={{ className: classes.textInput }}
                                InputLabelProps={{ className: classes.textInputLabel }}
                                value={values?.data?.contentQuality}
                                onChange={(e) => { setValues({ ...values, data: { ...values?.data, contentQuality: e.target.value } }) }} />
                        </Grid>

                        <Grid item id="description">
                            <TextField
                                fullWidth
                                id="standard-basic"
                                label="Description"
                                inputProps={{ className: classes.textInput }}
                                InputLabelProps={{ className: classes.textInputLabel }}
                                multiline
                                rows={4}
                                value={values?.data?.contentDescription}
                                onChange={(e) => { setValues({ ...values, data: { ...values?.data, contentDescription: e.target.value } }) }} />
                        </Grid>

                        <Grid item id="additionalMetadata">
                            <TextField
                                fullWidth
                                id="standard-basic"
                                label="Additional Metada"
                                inputProps={{ className: classes.textInput }}
                                InputLabelProps={{ className: classes.textInputLabel }}
                                value={values?.data?.additionalMetadata?.message}
                                onChange={(e) => { setValues({ ...values, data: { ...values?.data, additionalMetadata: { message: e.target.value } } }) }} />
                        </Grid>

                        <Grid item id="contentValidation" className="mt-3">
                            <FormControl component="fieldset" className={classes.formControl} >
                                <FormLabel component="legend" style={{
                                    color: "#757575", fontWeight: "bold", fontFamily: 'NunitoSans-Regular',
                                }}
                                >Has content been validated for ownership?</FormLabel>
                                <RadioGroup
                                    color="primary"
                                    row aria-label="gender"
                                    name="gender1"
                                    style={{
                                        color: "#757575", fontWeight: "bold", fontFamily: 'NunitoSans-Regular',
                                    }}
                                    value={values?.data?.contentValidation}
                                    onChange={(event) => { setValues({ ...values, data: { ...values?.data, contentValidation: event.target.value } }) }}>
                                    <FormControlLabel value="Yes" control={<Radio style={{
                                        color: "#7078A8"
                                    }} />} label={<Typography style={{
                                        fontFamily: 'NunitoSans-Regular', fontWeight: "bold"
                                    }}>Yes</Typography>} />

                                    <FormControlLabel value="No" control={<Radio style={{ color: "#7078A8" }} />} label={<Typography style={{
                                        fontFamily: 'NunitoSans-Regular', fontWeight: "bold"
                                    }}>No</Typography>} />
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        <Grid item id="authorization">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={values?.checkedAuthorization}
                                        onChange={(event) => { setValues({ ...values, checkedAuthorization: event.target.checked }) }}
                                        name="checkedAuthorization"
                                        style={{ color: "#7078A8" }}
                                    />
                                }
                                label={<Typography style={{ color: "#757575", fontWeight: "bold", fontFamily: 'NunitoSans-Regular' }}>I/we/am/are authorised to encode this file</Typography>}

                            />
                        </Grid>

                        <Grid container justifyContent="center" className="pt-4">
                            <Button
                                variant="contained"
                                component="span"
                                color="primary"
                                disabled={values?.checkedAuthorization ? false : true}
                                className={classes.encodeBtn}
                                onClick={handleEncode}
                                type="submit"
                            >
                                Encode
                            </Button>
                        </Grid>
                    </form>

                </Grid>
            }

            <EncodeDecodeLoading
                open={values?.encodeLoading}
                onClose={closeEncodeProgressPopUp}
                title="Encoding"
                audioName={values?.name}
            />
        </Grid>
    )
}
