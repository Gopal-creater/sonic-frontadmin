import React from "react";
import { IconButton, Dialog, DialogTitle, TableContainer, TableRow, TableCell, useTheme, TableBody } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Table from "react-bootstrap/Table";
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import DialogLogo from "../../../src/assets/images/key-logo.png";

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

    const { sonicKey } = props;
    const theme = useTheme()
    const classes = useStyles();

    const handleCloseTable = () => {
        props.setOpenTable(false)
    };

    return (<>
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
                    <img style={{ width: '30px' }} src={DialogLogo} />
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
                            <TableCell className={classes.tableCellTwo}>{sonicKey.contentFileType}</TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell className={classes.tableCellOne}>NAME</TableCell>
                            <TableCell className={classes.tableCellTwo}>{sonicKey.contentFileName}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.tableCellOne}>ARTIST</TableCell>
                            <TableCell className={classes.tableCellTwo}>{sonicKey.contentOwner}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.tableCellOne}>LENGTH (00:00:00:000)</TableCell>
                            <TableCell className={classes.tableCellTwo}>{sonicKey.contentDuration}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.tableCellOne}>AUDIO SIZE (IN MB)</TableCell>
                            <TableCell className={classes.tableCellTwo}>{sonicKey.contentSize}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.tableCellOne}>INDUSTRY CODES</TableCell>
                            <TableCell className={classes.tableCellTwo}>
                                ISRC : {sonicKey.isrcCode ? sonicKey.isrcCode : 'Not Specified'}<br />
                                ISWC : {sonicKey.iswcCode ? sonicKey.iswcCode : 'Not Specified'} <br />
                                Tunecode : {sonicKey.tuneCode ? sonicKey.tuneCode : 'Not Specified'}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.tableCellOne}>UNDERLYING ENCODING OF THE FILE</TableCell>
                            <TableCell className={classes.tableCellTwo}></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.tableCellOne}>SAMPLING FREQUENCY </TableCell>
                            <TableCell className={classes.tableCellTwo}>{sonicKey.contentSamplingFrequency} Hz s</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.tableCellOne}>Encoded Date</TableCell>
                            <TableCell className={classes.tableCellTwo}>{sonicKey.createdAt}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.tableCellOne}>Sonic Key</TableCell>
                            <TableCell className={classes.tableCellTwo}>{sonicKey.sonicKey}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.tableCellOne}>Content Strength</TableCell>
                            <TableCell className={classes.tableCellTwo}>{sonicKey.encodingStrength}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.tableCellOne}>Content Validation</TableCell>
                            <TableCell className={classes.tableCellTwo}>{sonicKey.contentValidation}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.tableCellOne}>Content Description</TableCell>
                            <TableCell className={classes.tableCellTwo}>{sonicKey.contentDescription}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.tableCellOne}>Addional Meta Data</TableCell>
                            <TableCell className={classes.tableCellTwo}>{sonicKey.additionalMetadata}</TableCell>
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
                <Button variant="contained" style={{
                    fontFamily: 'NunitoSans-Bold', color: 'white', backgroundColor: '#343F84', textTransform: 'none', borderRadius: '8px', padding: '12px 20px'
                }}>
                    View Plays
                </Button>
            </DialogActions>
        </Dialog>
    </>)
}

export default DailogTable;