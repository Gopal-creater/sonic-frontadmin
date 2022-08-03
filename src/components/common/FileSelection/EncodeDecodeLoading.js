import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core'
import encodeKeyImg from "../../../assets/images/loadingKey.png"

const styles = (theme) => ({
    root: {
        margin: 0,
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        paddingTop: theme.spacing(4)
    },
    heading: {
        fontSize: 26,
        color: "#393F5B",
        fontFamily: "NunitoSans-ExtraBold"
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: "#393F5B",
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography className={classes.heading}>{children}</Typography>
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        paddingTop: theme.spacing(0),
        color: "#343F84",
        paddingBottom: theme.spacing(2),
    },
}))(MuiDialogContent);


export default function EncodeDecodeLoading(prop) {

    return (
        <div >
            <Dialog onClose={prop?.onClose} aria-labelledby="customized-dialog-title" open={prop?.open} disableBackdropClick={true}>
                <DialogTitle id="customized-dialog-title" onClose={prop?.onClose}>
                    {prop?.title} {prop?.audioName} in progress
                </DialogTitle>
                <DialogContent >
                    <Typography gutterBottom style={{ fontFamily: "NunitoSans-Regular", fontSize: 18, fontWeight: 500 }}>
                    The speed of your internet connection and the size of the audio file may affect encoding and decoding times. 
                    </Typography>
                    <Grid container justifyContent="center" alignItems="center" className="mt-4 mb-4">
                        <img src={encodeKeyImg} alt="Sonic Key" style={{ width: 190, height: 85 }} />
                    </Grid>
                </DialogContent>
            </Dialog>
        </div>
    );
}
