import React from 'react'
import TextField from '@material-ui/core/TextField';
import { Button, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { log } from '../../../utils/app.debug';


const useStyles = makeStyles((theme) => ({
    encodeDataContainer: {
        backgroundColor: "white",
        padding: "30px 40px",
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

export default function EncodeData({ prop }) {
    const classes = useStyles();

    const [values, setValues] = React.useState({
        fileType: "",
        contentValidation: "No",
        checkedAuthorization: false
    });

    const handleEncode = () => {
        return null
    }

    return (
        <Grid className={classes.encodeDataContainer} id="encodeDataContainer">
            <Typography className={classes.heading} id="encodeDataTitle">{prop?.audioData?.name || "Audio"} details</Typography>

            <form className={classes.encodeForm}>
                <Grid item id="audioName">
                    <TextField fullWidth id="standard-basic" label="Audio name" />
                </Grid>

                <Grid item id="audioType">
                    <FormControl className={classes.formControl} fullWidth>
                        <InputLabel id="demo-simple-select-label">File Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={values?.audioType}
                            fullWidth
                            onChange={(event) => { setValues({ ...values, fileType: event.target.value }) }}
                        >
                            <MenuItem value={"Music"}>Music</MenuItem>
                            <MenuItem value={"Video"}>Video</MenuItem>
                            <MenuItem value={"Audio"}>Audio</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item id="artist">
                    <TextField fullWidth id="standard-basic" label="Artist" />
                </Grid>

                <Grid item id="Songwriter">
                    <TextField fullWidth id="standard-basic" label="Songwriter" />
                </Grid>

                <Grid item id="producer">
                    <TextField fullWidth id="standard-basic" label="producer" />
                </Grid>

                <Grid item id="audioLength">
                    <TextField fullWidth id="standard-basic" label="Audio length" />
                </Grid>

                <Grid item id="isrc">
                    {/* <label>asdasd</label> */}

                    <TextField fullWidth id="standard-basic" label="ISRC" />
                </Grid>

                <Grid item id="iswc">
                    <TextField fullWidth id="standard-basic" label="ISWC" />
                </Grid>

                <Grid item id="tunecode">
                    <TextField fullWidth id="standard-basic" label="TuneCode" />
                </Grid>

                <Grid item id="underlyingEncoding">
                    <TextField fullWidth id="standard-basic" label="Underlying encoding of file" />
                </Grid>

                <Grid item id="samplingFrequency">
                    <TextField fullWidth id="standard-basic" label="Sampling Frequency" />
                </Grid>

                <Grid item id="qualityGrade">
                    <TextField fullWidth id="standard-basic" label="Quality Grade" />
                </Grid>

                <Grid item id="description">
                    <TextField fullWidth id="standard-basic" label="Description" multiline rows={4} />
                </Grid>

                <Grid item id="additionalMetadata">
                    <TextField fullWidth id="standard-basic" label="Additional Metada" />
                </Grid>

                <Grid item id="contentValidation" className="mt-3">
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">Has content been validated for ownership?</FormLabel>
                        <RadioGroup color="primary" row aria-label="gender" name="gender1" value={values?.contentValidation} onChange={(event) => { setValues({ ...values, contentValidation: event.target.value }) }}>
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
    )
}
