import React from "react";
import { IconButton, Dialog, DialogTitle, TableContainer, TableRow, TableCell, useTheme, TableBody } from "@material-ui/core";
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
    table: {
    }
});


const DailogTable = (props) => {
    const [values, setValues] = React.useState({
        openHitModal: false,
        hitModalData: {},
        channelName: props?.sonicKey?.channel,
        startDate: new Date().setMonth(new Date().getMonth() - 1),
        endDate: new Date(),
    });

    const dispatch = useDispatch()
    const plays = useSelector(state => state.playsList)
    const history = useHistory()

    const { sonicKey } = props;
    const theme = useTheme()
    const classes = useStyles();

    const handleCloseTable = () => {
        props.setOpenTable(false)
    };

    // const viewPlays = () => {
    //     setValues({ ...values, openHitModal: true, hitModalData: { ...sonicKey } })
    // }
    const viewPlaysWithSonicKey = () => {
        dispatch({ type: actionTypes.SET_PLAYS_FILTER, data: { ...plays?.filters, sonicKey: sonicKey?.sonicKey, channel: sonicKey?.channel } })
        dispatch(getPlaysListsAction(
            plays?.dates?.startDate,
            plays?.dates?.endDate,
            sonicKey?.channel,
            1,
            10,
        )); props.setOpenTable(false)
        dispatch({ type: sessionActionTypes.SET_SIDEBAR, data: true });
        history.push("/plays")
    }

    log("sonic", sonicKey)

    return (
        <>
            <Dialog open={true} fullWidth={true} className={classes.dialogPaper}>
                <IconButton aria-label="close" style={{
                    position: 'absolute',
                    right: theme.spacing(1),
                    top: theme.spacing(1),
                    color: '#343F84',
                }} onClick={handleCloseTable}
                    data-toggle="tooltip" data-placement="top" title='Close'>
                    <CloseIcon />
                </IconButton>

                <DialogTitle id="form-dialog-title">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img style={{ width: '30px' }} src={DialogLogo} alt="" />
                        <div style={{
                            fontFamily: 'NunitoSans-Bold', color: '#343F84', fontSize: '18px'
                        }}>&nbsp; &nbsp;SonicKey: {sonicKey.sonicKey}</div>
                    </div>
                </DialogTitle>
                <TableContainer component={Paper} style={{ marginTop: 10, padding: '10px 25px', border: 'none' }} elevation={0}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableBody>
                            <TableRow>
                                <TableCell className={classes.tableCellOne}>FILE TYPE</TableCell>
                                <TableCell className={classes.tableCellTwo}>{sonicKey?.contentFileType}</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell className={classes.tableCellOne}>NAME</TableCell>
                                <TableCell className={classes.tableCellTwo}>{sonicKey?.originalFileName || sonicKey?.contentFileName}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.tableCellOne}>ARTIST</TableCell>
                                <TableCell className={classes.tableCellTwo}>{sonicKey?.contentOwner}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.tableCellOne}>LENGTH (00:00:00:000)</TableCell>
                                <TableCell className={classes.tableCellTwo}>{moment.utc(sonicKey?.contentDuration * 1000).format("HH:mm:ss:SSS")}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.tableCellOne}>AUDIO SIZE (IN MB)</TableCell>
                                <TableCell className={classes.tableCellTwo}>{(sonicKey?.contentSize / 1024).toFixed(3)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.tableCellOne}>INDUSTRY CODES</TableCell>
                                <TableCell className={classes.tableCellTwo}>
                                    ISRC : {sonicKey?.isrcCode ? sonicKey?.isrcCode : 'Not Specified'}<br />
                                    ISWC : {sonicKey?.iswcCode ? sonicKey?.iswcCode : 'Not Specified'} <br />
                                    Tunecode : {sonicKey?.tuneCode ? sonicKey?.tuneCode : 'Not Specified'}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.tableCellOne}>UNDERLYING ENCODING OF THE FILE</TableCell>
                                <TableCell className={classes.tableCellTwo}>{sonicKey?.contentEncoding}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.tableCellOne}>SAMPLING FREQUENCY </TableCell>
                                <TableCell className={classes.tableCellTwo}>{sonicKey?.contentSamplingFrequency} Hz</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.tableCellOne}>Encoded Date</TableCell>
                                <TableCell className={classes.tableCellTwo}>{moment(sonicKey?.createdAt).format("DD/MM/YYYY")}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.tableCellOne}>Sonic Key</TableCell>
                                <TableCell className={classes.tableCellTwo}>{sonicKey?.sonicKey}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.tableCellOne}>Content Strength</TableCell>
                                <TableCell className={classes.tableCellTwo}>{sonicKey?.encodingStrength}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.tableCellOne}>Content Validation</TableCell>
                                <TableCell className={classes.tableCellTwo}>{sonicKey?.contentValidation ? "Yes" : "No"}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.tableCellOne}>Content Description</TableCell>
                                <TableCell className={classes.tableCellTwo}>{sonicKey?.contentDescription}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.tableCellOne}>Distributor</TableCell>
                                <TableCell className={classes.tableCellTwo}>{sonicKey?.distributor}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.tableCellOne}>Version</TableCell>
                                <TableCell className={classes.tableCellTwo}>{sonicKey?.version}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.tableCellOne}>Label</TableCell>
                                <TableCell className={classes.tableCellTwo}>{sonicKey?.label}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.tableCellOne}>Additional Meta Data</TableCell>
                                <TableCell className={classes.tableCellTwo}>{sonicKey?.additionalMetadata?.message}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <DialogActions border="none" style={{ margin: '20px', border: 'none' }}>
                    <Button onClick={handleCloseTable} variant="outlined" style={{
                        fontFamily: 'NunitoSans-Bold', color: '#343F84', borderColor: '#343F84', borderWidth: '2px', borderRadius: '8px', textTransform: 'none', padding: '10px 20px'
                    }}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        style={{
                            fontFamily: 'NunitoSans-Bold', color: 'white', backgroundColor: '#343F84', textTransform: 'none', borderRadius: '8px', padding: '12px 20px'
                        }}
                        onClick={viewPlaysWithSonicKey}
                    >
                        View Plays
                    </Button>
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

export default DailogTable;