import React from "react";
import { IconButton, Grid, Dialog, DialogTitle, TableContainer, TableRow, TableCell, TableBody, TextField, CircularProgress } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Table from "react-bootstrap/Table";
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import { makeStyles } from "@material-ui/core/styles";
import DialogLogo from "../../../src/assets/images/key-logo.png";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../stores/actions/actionTypes"
import { log } from "../../utils/app.debug";
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import cogoToast from "cogo-toast";
import Communication from "../../services/https/Communication";
import AppButton from "./AppButton/AppButton";
import theme from "../../theme";
import { monitorInitialState } from "../../stores/reducers/monitor/monitorReducer";
import { getMonitorListAction } from "../../stores/actions/monitorActions/monitorActions";
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
    dialogPaper: {
        minHeight: '75vh',
        maxHeight: '75vh',
        margin: 'auto',
    },
    tableCellOne: {
        padding: '5px',
        fontFamily: `${theme.fontFamily.nunitoSansBold}`,
        fontSize: `12px`,
        color: `${theme.colors.secondary.mediumGrey}`,
    },
    tableCellTwo: {
        padding: '5px',
        fontFamily: `${theme.fontFamily.nunitoSansBold}`,
        fontSize: `${theme.fontSize.h5}`,
        color: `${theme.colors.secondary.grey}`,
    },
    textInput: {
        fontFamily: `${theme.fontFamily.nunitoSansBold}`,
        fontSize: `${theme.fontSize.h5}`,
        color: `${theme.colors.secondary.grey}`,
    }
});


const MetaDataDailog = (props) => {
    const [values, setValues] = React.useState({
        channelName: props?.sonicKey?.channel,
        startDate: new Date().setMonth(new Date().getMonth() - 1),
        endDate: new Date(),
        switchEdit: false,
        sonicKey: props?.sonicKey,
        updateSonicKeyLoading: false,
        updatingSonicKey: {
            contentName: "",
            isrcCode: "",
            iswcCode: "",
            tuneCode: "",
            contentOwner: "",
            contentDescription: "",
            additionalMetadata: {
                message: ""
            },
            distributor: "",
            version: ""
        }
    });

    React.useEffect(() => {
        setValues({
            ...values, updatingSonicKey: {
                contentName: props?.sonicKey?.contentName || "",
                isrcCode: props?.sonicKey?.isrcCode || "",
                iswcCode: props?.sonicKey?.iswcCode || "",
                tuneCode: props?.sonicKey?.tuneCode || "",
                contentOwner: props?.sonicKey?.contentOwner || "",
                contentDescription: props?.sonicKey?.contentDescription || "",
                additionalMetadata: {
                    message: props?.sonicKey?.additionalMetadata?.message || ""
                },
                distributor: props?.sonicKey?.distributor || "",
                version: props?.sonicKey?.version || ""
            }
        })
    }, [])

    const dispatch = useDispatch()
    const monitor = useSelector(state => state.monitor)
    const navigate = useNavigate()
    const classes = useStyles();

    const handleCloseTable = () => {
        if (values?.updateSonicKeyLoading) {
            return
        }
        props.setOpenTable(false)
    };

    const actions = {
        loading: actionTypes.SET_PLAYS_LOADING,
        success: actionTypes.SET_PLAYS_SUCCESS,
        error: actionTypes.SET_PLAYS_ERROR
    }

    const viewPlaysWithSonicKey = () => {
        dispatch({ type: actionTypes.SET_MONITOR_FILTERS, data: { ...monitorInitialState?.filters, sonicKey: values?.sonicKey?.sonicKey } })
        dispatch(getMonitorListAction(
            actions,
            monitor?.dates?.startDate,
            monitor?.dates?.endDate,
            1,
            10,
        ));
        props.setOpenTable(false)
        navigate("/plays")
    }

    const updateSonicKey = () => {
        if (values?.updateSonicKeyLoading) {
            return
        }
        setValues({ ...values, updateSonicKeyLoading: true })
        let payload = {
            isrcCode: values?.updatingSonicKey?.isrcCode || values?.sonicKey?.isrcCode,
            iswcCode: values?.updatingSonicKey?.iswcCode || values?.sonicKey?.iswcCode,
            tuneCode: values?.updatingSonicKey?.tuneCode || values?.sonicKey?.tuneCode,
            contentOwner: values?.updatingSonicKey?.contentOwner || values?.sonicKey?.contentOwner,
            contentDescription: values?.updatingSonicKey?.contentDescription || values?.sonicKey?.contentDescription,
            additionalMetadata: {
                message: values?.updatingSonicKey?.additionalMetadata?.message || values?.sonicKey?.additionalMetadata?.message
            },
            distributor: values?.updatingSonicKey?.distributor || values?.sonicKey?.distributor,
            version: values?.updatingSonicKey?.version || values?.sonicKey?.version,
            contentName: values?.updatingSonicKey?.contentName || values?.sonicKey?.contentName
        }
        Communication.editSonicMetaData(values?.sonicKey?.sonicKey, payload).then((response) => {
            setValues({
                ...values, updateSonicKeyLoading: false, sonicKey: response, switchEdit: false
            })
            props.updateMetaData(response)
            cogoToast.success("Successfully updated meta-data")
        }).catch((error) => {
            log("Error updating meta-data", error)
            setValues({ ...values, updateSonicKeyLoading: false })
            cogoToast.error(error?.message || "Error updating meta-data")
        })
    }

    log("values", values)


    return (
        <>
            <Dialog open={true} fullWidth={true} className={classes.dialogPaper}>
                {
                    props?.enableEditMode &&
                    <Button
                        variant="contained"
                        style={{ backgroundColor: "#343F84", color: "white" }}
                        size="large"
                        className={classes.button}
                        startIcon={values?.switchEdit ? <VisibilityIcon /> : <EditIcon />}
                        onClick={() => {
                            !values?.updateSonicKeyLoading && setValues({ ...values, switchEdit: !values?.switchEdit })
                        }}
                    >
                        Switch to {values?.switchEdit ? "view metadata" : "edit metadata"}
                    </Button>
                }

                <Grid container justifyContent="space-between">
                    <DialogTitle id="form-dialog-title">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img style={{ width: '30px' }} src={DialogLogo} alt="" />
                            <div style={{
                                fontFamily: theme.fontFamily.nunitoSansBold,
                                fontSize: theme.fontSize.h4,
                                color: theme.colors.primary.graphite
                            }}>&nbsp; &nbsp;SonicKey: {values?.sonicKey?.sonicKey || "---"}</div>
                        </div>
                    </DialogTitle>

                    <IconButton
                        aria-label="close"
                        style={{
                            marginRight: 5,
                            color: theme.colors.primary.graphite
                        }}
                        onClick={handleCloseTable}
                        data-toggle="tooltip"
                        data-placement="top"
                        title='Close'
                    >
                        <CloseIcon />
                    </IconButton>
                </Grid>

                <TableContainer component={Paper} style={{ marginTop: 5, padding: '10px 20px', border: 'none' }} elevation={0}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableBody>
                            <TableRow>
                                <TableCell className={classes.tableCellOne}>FILE TYPE</TableCell>
                                <TableCell className={classes.tableCellTwo}>{values?.sonicKey?.contentFileType || "---"}</TableCell>
                            </TableRow>

                            <TableRow >
                                <TableCell className={classes.tableCellOne}>ORIGINAL FILENAME</TableCell>
                                <TableCell className={classes.tableCellTwo}>
                                    {
                                        values?.sonicKey?.originalFileName || "--"
                                    }
                                </TableCell>
                            </TableRow>

                            <TableRow >
                                <TableCell className={classes.tableCellOne}>TITLE</TableCell>
                                <TableCell className={classes.tableCellTwo}>
                                    {
                                        values?.switchEdit ?
                                            <TextField
                                                id="audioNameInput"
                                                fullWidth
                                                placeholder="Edit content name"
                                                inputProps={{ className: classes.textInput }}
                                                value={values?.updatingSonicKey?.contentName}
                                                onChange={(e) => setValues({ ...values, updatingSonicKey: { ...values?.updatingSonicKey, contentName: e.target.value } })} /> :
                                            values?.sonicKey?.contentName || "--"
                                    }
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell className={classes.tableCellOne}>ARTIST</TableCell>
                                <TableCell className={classes.tableCellTwo}>
                                    {
                                        values?.switchEdit ?
                                            <TextField
                                                id="ownerInput"
                                                fullWidth
                                                placeholder="Edit artist"
                                                inputProps={{ className: classes.textInput }}
                                                value={values?.updatingSonicKey?.contentOwner}
                                                onChange={(e) => setValues({ ...values, updatingSonicKey: { ...values?.updatingSonicKey, contentOwner: e.target.value } })} /> :
                                            values?.sonicKey?.contentOwner || "---"
                                    }
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell className={classes.tableCellOne}>LENGTH (00:00:00:000)</TableCell>
                                <TableCell className={classes.tableCellTwo}>{moment.utc(values?.sonicKey?.contentDuration * 1000).format("HH:mm:ss:SSS") || "---"}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell className={classes.tableCellOne}>AUDIO SIZE (IN MB)</TableCell>
                                <TableCell className={classes.tableCellTwo}>{(values?.sonicKey?.contentSize / 1024).toFixed(3) || "---"}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell className={classes.tableCellOne}>INDUSTRY CODES</TableCell>
                                <TableCell className={classes.tableCellTwo}>
                                    {
                                        values?.switchEdit && values?.sonicKey?.contentType === "Music" ?
                                            <TextField
                                                id="isrcInput"
                                                fullWidth
                                                placeholder="Edit isrc"
                                                inputProps={{ className: classes.textInput }}
                                                value={values?.updatingSonicKey?.isrcCode}
                                                onChange={(e) => setValues({ ...values, updatingSonicKey: { ...values?.updatingSonicKey, isrcCode: e.target.value } })}
                                            />
                                            :
                                            `ISRC : ${values?.sonicKey?.isrcCode ? values?.sonicKey?.isrcCode : 'Not Specified'}`
                                    }<br />
                                    {
                                        values?.switchEdit && values?.sonicKey?.contentType === "Music" ?
                                            <TextField
                                                id="iswcInput"
                                                fullWidth
                                                placeholder="Edit iswc"
                                                inputProps={{ className: classes.textInput }}
                                                value={values?.updatingSonicKey?.iswcCode}
                                                onChange={(e) => setValues({ ...values, updatingSonicKey: { ...values?.updatingSonicKey, iswcCode: e.target.value } })}
                                            />
                                            :
                                            `ISWC :  ${values?.sonicKey?.iswcCode ? values?.sonicKey?.iswcCode : 'Not Specified'}`
                                    } <br />
                                    {
                                        values?.switchEdit && values?.sonicKey?.contentType === "Music" ?
                                            <TextField
                                                id="tuneInput"
                                                fullWidth
                                                placeholder="Edit tunecode"
                                                inputProps={{ className: classes.textInput }}
                                                value={values?.updatingSonicKey?.tuneCode}
                                                onChange={(e) => setValues({ ...values, updatingSonicKey: { ...values?.updatingSonicKey, tun: e.target.value } })}
                                            />
                                            :
                                            `Tunecode : ${values?.sonicKey?.tuneCode ? values?.sonicKey?.tuneCode : 'Not Specified'}`
                                    }
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell className={classes.tableCellOne}>UNDERLYING ENCODING OF THE FILE</TableCell>
                                <TableCell className={classes.tableCellTwo}>{values?.sonicKey?.contentEncoding || "---"}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell className={classes.tableCellOne}>SAMPLING FREQUENCY (Hz) </TableCell>
                                <TableCell className={classes.tableCellTwo}>{values?.sonicKey?.contentSamplingFrequency || "---"}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell className={classes.tableCellOne}>Encoded Date</TableCell>
                                <TableCell className={classes.tableCellTwo}>{moment(values?.sonicKey?.createdAt).format("DD/MM/YYYY") || "---"}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell className={classes.tableCellOne}>Sonic Key</TableCell>
                                <TableCell className={classes.tableCellTwo}>{values?.sonicKey?.sonicKey || "---"}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell className={classes.tableCellOne}>Content Strength</TableCell>
                                <TableCell className={classes.tableCellTwo}>{values?.sonicKey?.encodingStrength || "---"}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell className={classes.tableCellOne}>Content Validation</TableCell>
                                <TableCell className={classes.tableCellTwo}>{values?.sonicKey?.contentValidation ? "Yes" : "No" || "---"}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell className={classes.tableCellOne}>Content Description</TableCell>
                                <TableCell className={classes.tableCellTwo}>
                                    {
                                        values?.switchEdit ?
                                            <TextField
                                                id="descriptionInput"
                                                fullWidth
                                                placeholder="Edit description"
                                                inputProps={{ className: classes.textInput }}
                                                value={values?.updatingSonicKey?.contentDescription}
                                                onChange={(e) => setValues({ ...values, updatingSonicKey: { ...values?.updatingSonicKey, contentDescription: e.target.value } })}
                                                multiline
                                                minRows={3} /> :
                                            values?.sonicKey?.contentDescription || "---"
                                    }
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell className={classes.tableCellOne}>Distributor</TableCell>
                                <TableCell className={classes.tableCellTwo}>
                                    {
                                        values?.switchEdit ?
                                            <TextField
                                                id="distributorInput"
                                                fullWidth
                                                placeholder="Edit distributor"
                                                inputProps={{ className: classes.textInput }}
                                                value={values?.updatingSonicKey?.distributor}
                                                onChange={(e) => setValues({ ...values, updatingSonicKey: { ...values?.updatingSonicKey, distributor: e.target.value } })}
                                            /> :
                                            values?.sonicKey?.distributor || "---"
                                    }
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell className={classes.tableCellOne}>Version</TableCell>
                                <TableCell className={classes.tableCellTwo}>
                                    {
                                        values?.switchEdit ?
                                            <TextField
                                                id="versionInput"
                                                fullWidth
                                                placeholder="Edit version"
                                                inputProps={{ className: classes.textInput }}
                                                value={values?.updatingSonicKey?.version}
                                                onChange={(e) => setValues({ ...values, updatingSonicKey: { ...values?.updatingSonicKey, version: e.target.value } })}
                                            /> :
                                            values?.sonicKey?.version || "---"
                                    }
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell className={classes.tableCellOne}>Label</TableCell>
                                <TableCell className={classes.tableCellTwo}>{values?.sonicKey?.label || "---"}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell className={classes.tableCellOne}>Additional Meta Data</TableCell>
                                <TableCell className={classes.tableCellTwo}>
                                    {
                                        values?.switchEdit ?
                                            <TextField
                                                id="additionalInput"
                                                fullWidth
                                                placeholder="Edit additional metadata"
                                                inputProps={{ className: classes.textInput }}
                                                value={values?.updatingSonicKey?.additionalMetadata?.message}
                                                onChange={(e) => setValues({ ...values, updatingSonicKey: { ...values?.updatingSonicKey, additionalMetadata: { ...values?.updatingSonicKey?.additionalMetadata, message: e.target.value } } })}
                                            /> :
                                            values?.sonicKey?.additionalMetadata?.message || "---"
                                    }
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <DialogActions border="none" style={{ margin: '20px', border: 'none' }}>
                    <AppButton
                        variant="outline"
                        onClick={handleCloseTable}
                        style={{ padding: '10px 20px', minWidth: "115px" }}
                    >
                        Cancel
                    </AppButton>

                    {
                        values?.switchEdit && props?.enableEditMode ?
                            <AppButton
                                variant="fill"
                                onClick={updateSonicKey}
                                style={{ padding: '12px 20px', minWidth: "115px" }}
                            >
                                {
                                    values?.updateSonicKeyLoading ? <CircularProgress style={{ color: "white" }} size={24} /> : " Update"
                                }
                            </AppButton>
                            :
                            <AppButton
                                variant="fill"
                                onClick={viewPlaysWithSonicKey}
                                style={{ padding: '12px 20px', minWidth: "115px" }}
                            >
                                View Plays
                            </AppButton>
                    }
                </DialogActions>
            </Dialog>
        </>
    )
}

export default MetaDataDailog;