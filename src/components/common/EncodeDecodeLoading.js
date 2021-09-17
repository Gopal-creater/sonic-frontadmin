import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { CardMedia, Grid } from '@material-ui/core'
import encodeKeyImg from "../../assets/images/Encode-Key.svg"

const styles = (theme) => ({
    root: {
        margin: 0,
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        paddingTop: theme.spacing(4)
    },
    heading: {
        fontSize: "calc(1.1rem + .5vw)",
        color: "#393F5B",
        fontWeight: "bold",
        marginRight: "60px"
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
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        paddingTop: theme.spacing(0),
        color: "#343F84",
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
}))(MuiDialogActions);

export default function EncodeDecodeLoading(prop) {

    return (
        <div >
            <Dialog onClose={prop?.onClose} aria-labelledby="customized-dialog-title" open={prop?.open} disableBackdropClick={true}>
                <DialogTitle id="customized-dialog-title" onClose={prop?.onClose}>
                    {prop?.title} {prop?.audioName} in progress
                </DialogTitle>
                <DialogContent >
                    <Typography gutterBottom style={{ fontWeight: "medium" }}>
                        Depending on your internet connection and a size of an audio file, {prop?.title} may take longer at times.
                    </Typography>
                    <Grid container justifyContent="center" alignItems="center" className="mt-3">
                        <img src={encodeKeyImg} alt="Sonic Key" style={{ width: "auto", height: "100%" }} />
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        autoFocus onClick={prop?.onClose}
                        style={{
                            height: 45,
                            padding: "0px 20px",
                            textTransform: "initial",
                            fontSize: 15,
                            fontWeight: 700,
                            color: "#343F84",
                            borderRadius: 8,
                            border: "2px solid #343F84",
                        }}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
