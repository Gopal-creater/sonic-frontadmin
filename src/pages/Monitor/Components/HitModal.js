import React from "react";
import { IconButton, Dialog, DialogTitle, TableContainer, TableRow, TableCell, useTheme, TableBody } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Table from "react-bootstrap/Table";
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import { makeStyles } from "@material-ui/core/styles";
import DialogLogo from "../../../assets/images/key-logo.png";
import { log } from "../../../utils/app.debug";
import Communication from "../../../services/https/Communication";
import cogoToast from "cogo-toast";
import moment from "moment";

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


const HitModal = (props) => {
    const theme = useTheme()
    const classes = useStyles();

    const [values, setValues] = React.useState({
        hitLoading: true,
        hitData: null,
        hitError: null
    })

    React.useEffect(() => {
        fetchHits()
    }, [])

    const handleCloseTable = () => {
        props.closeHitModal(false)
    };

    const fetchHits = () => {
        let params = new URLSearchParams(`detectedAt>${moment(props?.startDate).format("YYYY-MM-DD")}&detectedAt<${moment(props?.endDate).format("YYYY-MM-DD")}`)
        params.append("limit", 500)
        params.append("skip", 0)
        params.append("sort", "-createdAt")
        params.append("page", 1)

        Communication.fetchThirdPartyDetectedDetails(props?.sonicId, params)
            .then((response) => {
                log("Response of hit", response);
                setValues({ ...values, hitData: response, hitLoading: false })
            })
            .catch((err) => {
                log("Hit Error", err);
                cogoToast.error(err.message);
                setValues({ ...values, hitError: err.message, hitLoading: false })
            });
    }

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
                    <img style={{ width: '30px' }} src={DialogLogo} alt="" />
                    <div style={{
                        fontFamily: 'NunitoSans-Bold', color: '#343F84', fontSize: '18px'
                    }}>&nbsp; &nbsp;SonicKey: ghhh</div>
                </div>
            </DialogTitle>
            <TableContainer component={Paper} style={{ marginTop: 10, padding: '10px 25px', border: 'none' }} elevation={0}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableBody>
                        <TableRow>
                            <TableCell className={classes.tableCellOne}>FILE TYPE</TableCell>
                            <TableCell className={classes.tableCellTwo}>hjghjg</TableCell>
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
            </DialogActions>
        </Dialog>
    </>)
}

export default HitModal;