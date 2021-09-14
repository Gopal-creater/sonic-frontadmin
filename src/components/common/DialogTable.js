import React from "react";
import { IconButton, Dialog, DialogTitle, TableContainer, TableRow, TableCell, useTheme, TableHead } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Table from "react-bootstrap/Table";
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import DialogLogo from "../../../src/assets/images/key-logo.png";

const useStyles = makeStyles({});

const StyledTableCell = withStyles((theme) => ({
    head: {
        color: "#D0D0D0",
    },
    body: {
        fontSize: 14,
        color: "#424C8C",
        padding:'1%'
    },
}))(TableCell);

const DailogTable = (props) => {

    const { sonicKey } = props;
    const theme = useTheme()
    const classes = useStyles();

    const handleCloseTable = () => {
        props.setOpenTable(false)
    };

    return (<>

        <Dialog open={true} fullWidth={true}>
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
                    <div style={{ fontWeight: 'bold', color: '#343F84', fontSize: '18px' }}>&nbsp; &nbsp;SonicKey: WD#mg0z9QL7</div>
                </div>
            </DialogTitle>
            {/* <DialogContent dividers> */}
            {/* <DialogContent> */}
            <TableContainer component={Paper} style={{ marginTop: 10, padding: 10 , border: 'none'}} >
                {/* <div style={{backgroundColor:'red', padding:'30px'}}> */}
                <Table className={classes.table} size="small" aria-label="a dense table" fullWidth>
                    {/* Changes for multiple keys */}
                    <TableHead style={{ backgroundColor: '#D3D3D0' }}>
                    </TableHead>
                    <TableRow>
                        <TableCell style={{ fontWeight: 'bold' }}>FILE TYPE</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>TESTING</TableCell>
                    </TableRow>
                    <TableRow >
                        <TableCell align="left">NAME</TableCell>
                        <TableCell align="left">TESTING</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">ARTIST</TableCell>
                        <TableCell align="left">TESTING</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">SONGWRITER</TableCell>
                        <TableCell align="left">TESTING</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left" >PRODUCER</TableCell>
                        <TableCell align="left">TESTING</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">LENGTH</TableCell>
                        <TableCell align="left">TESTING</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">AUDIO SIZE</TableCell>
                        <TableCell align="left">TESTING</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">INDUSTRY CODES</TableCell>
                        <TableCell align="left">
                            ISRC :TESTING
                            ISWC :TESTING
                            Tunecode :TESTING
                            {/* ISRC :{sonicKey.isrcCode ? sonicKey.isrcCode : 'Not Specified'}<br />
                            ISWC :{sonicKey.iswcCode ? sonicKey.iswcCode : 'Not Specified'} <br />
                            Tunecode :{sonicKey.tuneCode ? sonicKey.tuneCode : 'Not Specified'} */}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">UNDERLYING ENCODING OF THE FILE</TableCell>
                        <TableCell align="left">TESTING</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">SAMPLING FREQUENCY </TableCell>
                        <TableCell align="left">TESTING s</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Size </TableCell>
                        <TableCell align="left">TESTING KB</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">AUDIO</TableCell>
                        <TableCell align="left">TESTING Hz</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Content Strength</TableCell>
                        <TableCell align="left">TESTING</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Content Owner</TableCell>
                        <TableCell align="left">TESTING</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Content Description</TableCell>
                        <TableCell align="left">TESTING</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">Addional Meta Data</TableCell>
                        <TableCell align="left">TESTING</TableCell>
                    </TableRow>
                </Table>
                {/* </div> */}
            </TableContainer>
            {/* </DialogContent> */}
            <DialogActions border="none" style={{ margin: '20px', border:'none' }}>
                <Button variant="outlined" style={{fontWeight:'bold',color:'#343F84', borderColor:'#343F84', borderWidth:'2px', borderRadius:'5px', textTransform:'none' }}>
                    Cancel
                </Button>
                <Button variant="contained" style={{fontWeight:'bold',color:'white', backgroundColor:'#343F84', textTransform:'none'}}>
                    View Plays
                </Button>
            </DialogActions>
        </Dialog>
    </>)
}

export default DailogTable;