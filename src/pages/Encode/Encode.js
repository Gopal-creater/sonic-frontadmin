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
import EncodeLoading from './Components/EncodeLoading';

const useStyles = makeStyles((theme) => ({
    EncodeContainer: {

    },
    encodeDataContainer: {
        backgroundColor: "white",
        padding: "2% 2.5%",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        marginTop: "4%",
    },
    heading: {
        color: "#343F84",
        fontSize: 22,
        fontWeight: 'bold',

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
    }
}));

export default function Encode() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        isDataPresent: false,
        encodeLoading: false,
        encodeError: null,
        encodeSuccess: null
    });

    const closeEncodeProgressPopUp = (sucess, error) => {
        setValues({ ...values, encodeLoading: false, encodeError: error, encodeSuccess: sucess })
    }

    const handleEncode = (e) => {
        e.preventDefault();
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
        // Communication?.encodeFile(formData).then((response) => {
        //     closeEncodeProgressPopUp(response, null);
        //     log("Encode Success", response)
        // }).catch((error) => {
        //     closeEncodeProgressPopUp(null, error?.data);
        //     log("Encode Error", error)
        //     cogoToast.error(error?.data?.message)
        // })
    }

    return (
        <Grid className={classes.EncodeContainer} id="encodeDecodeContainer">
            <FileSelection
                prop={{
                    title: "Encode",
                    subTitle: "Upload a file to start",
                    getAudioData: (audioData) => { setValues({ ...values, isDataPresent: true, ...audioData }) }
                }}
            />

            {values?.isDataPresent &&
                <Grid className={classes.encodeDataContainer} id="encodeDataContainer">
                    <Typography className={classes.heading} id="encodeDataTitle">{values?.name || "Audio"} details</Typography>

                    <form className={classes.encodeForm}>
                        <Grid item id="audioName">
                            <TextField
                                fullWidth
                                id="standard-basic"
                                label="Audio name"
                                value={values?.name}
                                onChange={(e) => { setValues({ ...values, name: e.target.value }) }} />
                        </Grid>

                        <Grid item id="audioType">
                            <FormControl className={classes.formControl} fullWidth>
                                <InputLabel id="demo-simple-select-label">File Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={values?.data?.contentFileType}
                                    fullWidth
                                    onChange={(e) => {
                                        e.target.value === "Music" ?
                                            setValues({ ...values, data: { ...values?.data, contentFileType: e.target.value } }) :
                                            setValues({ ...values, data: { ...values?.data, contentFileType: e.target.value, isrcCode: "", iswcCode: "", tuneCode: "" } })
                                    }}
                                >
                                    <MenuItem value={"Music"}>Music</MenuItem>
                                    <MenuItem value={"Video"}>Video</MenuItem>
                                    <MenuItem value={"Audio"}>Audio</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item id="artist">
                            <TextField
                                fullWidth
                                id="standard-basic"
                                label="Artist"
                                value={values?.data?.contentOwner}
                                onChange={(e) => { setValues({ ...values, data: { ...values?.data, contentOwner: e.target.value } }) }} />
                        </Grid>

                        {/* <Grid item id="Songwriter">
                            <TextField fullWidth id="standard-basic" label="Songwriter" />
                        </Grid>
        
                        <Grid item id="producer">
                            <TextField fullWidth id="standard-basic" label="producer" />
                        </Grid> */}

                        <Grid item id="audioLength">
                            <TextField
                                fullWidth
                                id="standard-basic"
                                label="Audio length"
                                value={new Date(values?.data?.contentDuration * 1000).toISOString().substr(11, 8)}
                            />
                        </Grid>

                        <Grid item id="audioSize">
                            <TextField
                                fullWidth
                                id="standard-basic"
                                label="Audio Size (In MB)"
                                value={(values?.data?.contentSize / 1024).toFixed(3)}
                            />
                        </Grid>

                        {values?.data?.contentFileType === "Music" && <Grid item id="isrc">
                            {/* <label>asdasd</label> */}

                            <TextField
                                fullWidth
                                id="standard-basic"
                                label="ISRC"
                                value={values?.data?.isrcCode}
                                onChange={(e) => { setValues({ ...values, data: { ...values?.data, isrcCode: e.target.value } }) }} />
                        </Grid>}

                        {values?.data?.contentFileType === "Music" && <Grid item id="iswc">
                            <TextField
                                fullWidth
                                id="standard-basic"
                                label="ISWC"
                                value={values?.data?.iswcCode}
                                onChange={(e) => { setValues({ ...values, data: { ...values?.data, iswcCode: e.target.value } }) }} />
                        </Grid>}

                        {values?.data?.contentFileType === "Music" && <Grid item id="tunecode">
                            <TextField
                                fullWidth
                                id="standard-basic"
                                label="TuneCode"
                                value={values?.data?.tuneCode}
                                onChange={(e) => { setValues({ ...values, data: { ...values?.data, tuneCode: e.target.value } }) }} />
                        </Grid>}

                        <Grid item id="underlyingEncoding">
                            <TextField
                                fullWidth
                                id="standard-basic"
                                label="Underlying encoding of file"
                                value={values?.data?.contentEncoding}
                                onChange={(e) => { setValues({ ...values, data: { ...values?.data, contentEncoding: e.target.value } }) }} />
                        </Grid>

                        <Grid item id="samplingFrequency">
                            <TextField
                                fullWidth
                                id="standard-basic"
                                label="Sampling Frequency"
                                value={values?.data?.contentSamplingFrequency}
                                onChange={(e) => { setValues({ ...values, data: { ...values?.data, contentSamplingFrequency: e.target.value } }) }} />
                        </Grid>

                        <Grid item id="qualityGrade">
                            <TextField
                                fullWidth
                                id="standard-basic"
                                label="Quality Grade"
                                value={values?.data?.contentQuality}
                                onChange={(e) => { setValues({ ...values, data: { ...values?.data, contentQuality: e.target.value } }) }} />
                        </Grid>

                        <Grid item id="description">
                            <TextField
                                fullWidth
                                id="standard-basic"
                                label="Description"
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
                                value={values?.data?.additionalMetadata?.message}
                                onChange={(e) => { setValues({ ...values, data: { ...values?.data, additionalMetadata: { message: e.target.value } } }) }} />
                        </Grid>

                        <Grid item id="contentValidation" className="mt-3">
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormLabel component="legend">Has content been validated for ownership?</FormLabel>
                                <RadioGroup
                                    color="primary"
                                    row aria-label="gender"
                                    name="gender1"
                                    value={values?.data?.contentValidation}
                                    onChange={(event) => { setValues({ ...values, data: { ...values?.data, contentValidation: event.target.value } }) }}>
                                    <FormControlLabel value="Yes" control={<Radio color="primary" />} label="Yes" />
                                    <FormControlLabel value="No" control={<Radio color="primary" />} label="No" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        <Grid item id="authorization">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={values.checkedAuthorization}
                                        onChange={(event) => { setValues({ ...values, checkedAuthorization: event.target.checked }) }}
                                        name="checkedAuthorization"
                                        color="primary"
                                    />
                                }
                                label="I/we/am/are authorised to encode this file"
                            />
                        </Grid>

                        <Grid container justifyContent="center" className="pt-4">
                            <Button
                                variant="contained"
                                component="span"
                                color="primary"
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

            <EncodeLoading
                open={values?.encodeLoading}
                onClose={closeEncodeProgressPopUp}
                audioName={values?.name}
            />

        </Grid>
    )
}
