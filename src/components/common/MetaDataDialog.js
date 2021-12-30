import React from "react";
import { IconButton, Dialog, DialogTitle, TableContainer, TableRow, TableCell, useTheme, TableBody, TextField, CircularProgress, FormControl, Box, Tooltip, Menu, MenuItem } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Table from "react-bootstrap/Table";
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import { makeStyles } from "@material-ui/core/styles";
import DialogLogo from "../../../src/assets/images/key-logo.png";
import HitModal from "./HitModal"
import moment from "moment";
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../stores/actions/actionTypes"
import * as sessionActionTypes from "../../stores/actions/session/actionTypes"
import { log } from "../../utils/app.debug";
import { getPlaysListsAction } from "../../stores/actions";
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import cogoToast from "cogo-toast";
import Communication from "../../services/https/Communication";
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import { getExportPlaysDataAction } from "../../stores/actions/dashboard.action";

const useStyles = makeStyles({
    dialogPaper: {
        minHeight: '75vh',
        maxHeight: '75vh',
        margin: 'auto',
    },
    tableCellOne: {
        padding: '5px',
        fontFamily: 'NunitoSans-Bold',
        fontWeight: 'bold',
        fontSize: '12px',
        color: '#ACACAC',
    },
    tableCellTwo: {
        padding: '5px',
        fontFamily: 'NunitoSans-Bold',
        fontWeight: '700',
        fontSize: '14px',
        color: '#757575',
    },
    textInput: {
        fontFamily: 'NunitoSans-Bold',
        fontWeight: '700',
        fontSize: '14px',
        color: '#757575',
    }
});


const MetaDataDailog = (props) => {
    const [values, setValues] = React.useState({
        openHitModal: false,
        hitModalData: {},
        channelName: props?.sonicKey?.channel,
        startDate: new Date().setMonth(new Date().getMonth() - 1),
        endDate: new Date(),
        switchEdit: false,
        sonicKey: props?.sonicKey,
        updateSonicKeyLoading: false,
        updatingSonicKey: {
            contentFileName: "",
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

    const dispatch = useDispatch()
    const plays = useSelector(state => state.playsList)
    const history = useHistory()

    const theme = useTheme()
    const classes = useStyles();

    const handleCloseTable = () => {
        if (values?.updateSonicKeyLoading) {
            return
        }
        props.setOpenTable(false)
    };

    // const viewPlays = () => {
    //     setValues({ ...values, openHitModal: true, hitModalData: { ...sonicKey } })
    // }
    const viewPlaysWithSonicKey = () => {
        dispatch({ type: actionTypes.SET_PLAYS_FILTER, data: { ...plays?.filters, sonicKey: values?.sonicKey?.sonicKey, channel: "ALL" } })
        dispatch(getPlaysListsAction(
            plays?.dates?.startDate,
            plays?.dates?.endDate,
            "ALL",
            1,
            10,
        )); props.setOpenTable(false)
        dispatch({ type: sessionActionTypes.SET_SIDEBAR, data: true });
        history.push("/plays")
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
            contentFileName: values?.updatingSonicKey?.contentFileName || values?.sonicKey?.contentFileName
        }
        Communication.editSonicMetaData(values?.sonicKey?.sonicKey, payload).then((response) => {
            setValues({
                ...values, updateSonicKeyLoading: false, sonicKey: response, switchEdit: false,
                updatingSonicKey: {
                    contentFileName: "",
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
            })
            props.updateMetaData({ ...values?.sonicKey, ...response })
            cogoToast.success("Successfully updated meta-data")
        }).catch((error) => {
            setValues({ ...values, updateSonicKeyLoading: false })
            cogoToast.error(error?.message || "Error updating meta-data")
        })
    }

    log("values", values)

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    };

    const handleClose = (value) => {
        dispatch(getExportPlaysDataAction(props?.sonicKey?.playsStartDate, props?.sonicKey?.playsEndDate, 2000, values?.sonicKey?.sonicKey, value))
        setAnchorEl(null);
    };

    return (
        <>
            <Dialog open={true} fullWidth={true} className={classes.dialogPaper}>
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
                <IconButton
                    aria-label="close"
                    style={{
                        position: 'absolute',
                        right: theme.spacing(1),
                        top: theme.spacing(6),
                        color: '#343F84',
                    }}
                    onClick={handleCloseTable}
                    data-toggle="tooltip"
                    data-placement="top"
                    title='Close'
                >
                    <CloseIcon />
                </IconButton>

                <DialogTitle id="form-dialog-title">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img style={{ width: '30px' }} src={DialogLogo} alt="" />
                        <div style={{
                            fontFamily: 'NunitoSans-Bold', color: '#343F84', fontSize: '18px'
                        }}>&nbsp; &nbsp;SonicKey: {values?.sonicKey?.sonicKey || "---"}</div>
                    </div>
                </DialogTitle>

                <TableContainer component={Paper} style={{ marginTop: 5, padding: '10px 20px', border: 'none' }} elevation={0}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableBody>
                            <TableRow>
                                <TableCell className={classes.tableCellOne}>FILE TYPE</TableCell>
                                <TableCell className={classes.tableCellTwo}>{values?.sonicKey?.contentFileType || "---"}</TableCell>
                            </TableRow>

                            <TableRow >
                                <TableCell className={classes.tableCellOne}>TRACK FILE NAME</TableCell>
                                <TableCell className={classes.tableCellTwo}>
                                    {
                                        values?.sonicKey?.originalFileName || "--"
                                    }
                                </TableCell>
                            </TableRow>

                            <TableRow >
                                <TableCell className={classes.tableCellOne}>CONTENT NAME</TableCell>
                                <TableCell className={classes.tableCellTwo}>
                                    {
                                        values?.switchEdit ?
                                            <TextField
                                                id="audioNameInput"
                                                fullWidth
                                                placeholder="Edit content name"
                                                inputProps={{ className: classes.textInput }}
                                                value={values?.updatingSonicKey?.contentFileName}
                                                onChange={(e) => setValues({ ...values, updatingSonicKey: { ...values?.updatingSonicKey, contentFileName: e.target.value } })} /> :
                                            values?.sonicKey?.contentFileName || "--"
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

                <DialogActions border="none" style={{ margin: '20px', border: 'none', display: "flex", justifyContent: "space-between" }}>
                    <div>
                        {props?.sonicKey?.showExport &&
                            <FormControl variant="standard" className="radioStations-export-formControl" style={{ backgroundColor: "" }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>

                                    <Tooltip title="Export">
                                        <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                                            <FileCopyOutlinedIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={() => setAnchorEl(null)}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                                >
                                    {/* <MenuItem
                                        value="xlsx"
                                        onClick={() => handleClose("xlsx")}
                                    >
                                        Excel
                                    </MenuItem> */}
                                    <MenuItem
                                        onClick={() => handleClose("csv")}
                                        value="csv"
                                    >
                                        CSV
                                    </MenuItem>
                                </Menu>
                            </FormControl>
                        }
                    </div>
                    <div>
                        <Button onClick={handleCloseTable} variant="outlined" style={{
                            marginRight: "15px",
                            fontFamily: 'NunitoSans-Bold', color: '#343F84', borderColor: '#343F84', borderWidth: '2px', borderRadius: '8px', textTransform: 'none', padding: '10px 20px', minWidth: "110px"
                        }}>
                            Cancel
                        </Button>


                        {
                            values?.switchEdit ?
                                <Button
                                    variant="contained"
                                    style={{
                                        fontFamily: 'NunitoSans-Bold', color: 'white', backgroundColor: '#343F84', textTransform: 'none', borderRadius: '8px', padding: '12px 20px', minWidth: "115px"
                                    }}
                                    onClick={updateSonicKey}
                                >
                                    {
                                        values?.updateSonicKeyLoading ? <CircularProgress style={{ color: "white" }} size={24} /> : " Update"
                                    }
                                </Button>
                                :
                                <Button
                                    variant="contained"
                                    style={{
                                        fontFamily: 'NunitoSans-Bold', color: 'white', backgroundColor: '#343F84', textTransform: 'none', borderRadius: '8px', padding: '12px 20px'
                                    }}
                                    onClick={viewPlaysWithSonicKey}
                                >
                                    View Plays
                                </Button>
                        }
                    </div>
                </DialogActions>
            </Dialog>

            {
                values?.openHitModal && (
                    <HitModal
                        closeHitModal={(flag) => setValues({ ...values, openHitModal: flag })}
                        startDate={values?.startDate}
                        endDate={values?.endDate}
                        channel={values?.channelName}
                        sonicKeyData={values?.hitModalData}
                    />
                )
            }
        </>
    )
}

export default MetaDataDailog;