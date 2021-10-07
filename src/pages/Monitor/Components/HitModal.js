import React from "react";
import { IconButton, Dialog, DialogTitle, TableContainer, TableRow, TableCell, useTheme, TableBody, TableHead, DialogContent } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Table from "react-bootstrap/Table";
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import { makeStyles } from "@material-ui/core/styles";
import DialogLogo from "../../../assets/images/key-logo.png";
import { log } from "../../../utils/app.debug";
import moment from "moment";
import Communication from "../../../services/https/Communication";
import cogoToast from "cogo-toast";
import { Pagination } from "@material-ui/lab";
import SonicSpinner from "../../../components/common/SonicSpinner"

const useStyles = makeStyles({
    dialogPaper: {
        minHeight: '65vh',
        maxHeight: '65vh',
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
        color: '#ACACAC',
    },
    table: {
    }
});


const HitModal = (props) => {
    const theme = useTheme()
    const classes = useStyles();

    const [values, setValues] = React.useState({
        hitLoading: false,
        hitData: null,
        hitError: null,
        page: 1
    })

    log("hit props", props)

    React.useEffect(() => {
        fetchHits(values?.page)
    }, [])

    const handleCloseTable = () => {
        props.closeHitModal(false)
    };

    const fetchHits = (page) => {
        let newEndDate = new Date(props?.endDate)
        let params = new URLSearchParams(`detectedAt>=${moment(props?.startDate).format("YYYY-MM-DD")}&detectedAt<=${moment(newEndDate?.setDate?.(newEndDate?.getDate?.() + 1)).format("YYYY-MM-DD")}`)
        params.append("limit", 5)
        params.append("skip", page > 1 ? (page - 1) * 5 : 0)
        params.append("sort", "-detectedAt")
        params.append("page", page)

        setValues({ ...values, page: page, hitLoading: true })
        Communication.fetchThirdPartyDetectedDetails(props?.sonicKeyData?.sonicKey, props?.channel, params)
            .then((response) => {
                log("Response of hit", response);
                setValues({ ...values, hitData: response, page: page, hitLoading: false })
            })
            .catch((err) => {
                log("Hit Error", err);
                cogoToast.error(err.message);
                setValues({ ...values, hitError: err.message, page: page, hitLoading: false })
            });
    }

    return (<>
        <Dialog open={true} classes={{ paper: classes.dialogPaper }} fullWidth={true} maxWidth="xs">
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
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <img style={{ width: '30px', marginTop: "4px" }} src={DialogLogo} alt="" />
                    <div style={{
                        fontFamily: 'NunitoSans-Bold', color: '#343F84', fontSize: '18px'
                    }}>
                        <span>&nbsp; &nbsp;SonicKey: {props?.sonicKeyData?.sonicKey}</span><br />
                        <span>&nbsp; &nbsp;{props?.sonicKeyData?.contentName || props?.sonicKeyData?.originalFileName || props?.sonicKeyData?.contentOwner},{props?.sonicKeyData?.totalHits} hits</span>
                    </div>
                </div>
            </DialogTitle>
            {
                values?.hitLoading ? <SonicSpinner /> :
                    <TableContainer component={Paper} style={{ marginTop: 10, padding: '10px 25px', border: 'none' }} elevation={0}>
                        <Table className={classes.table} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.tableCellOne}>Date</TableCell>
                                    <TableCell className={classes.tableCellTwo}>Time</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    values?.hitData?.docs?.map((data) => {
                                        return (
                                            <TableRow>
                                                <TableCell className={classes.tableCellOne}>{moment(data?.detectedAt).format("DD/MM/YYYY")}</TableCell>
                                                <TableCell className={classes.tableCellTwo}>{moment(data?.detectedAt).format("HH:MM:SS")}</TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>

                        <Pagination
                            count={values?.hitData?.totalPages}
                            page={values?.page}
                            variant="outlined"
                            shape="rounded"
                            onChange={(event, value) => fetchHits(value)}
                        />
                    </TableContainer>
            }
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