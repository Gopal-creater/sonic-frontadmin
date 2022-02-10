import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Spinner from "react-bootstrap/Spinner";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Grid } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import cogoToast from "cogo-toast";
import Communication from "../../../services/https/Communication";
import AppButton from "../../../components/common/AppButton/AppButton";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: 22,
    fontFamily: 'NunitoSans-ExtraBold',
    color: "#343F84",
  },
  button: {
    height: 45,
    padding: "23px 25px",
    textTransform: "initial",
    fontSize: 15,
    fontFamily: 'NunitoSans-Bold',
    borderRadius: 8,
    border: "2px solid #343F84",
    marginRight: "2%",
    marginBottom: 20,
  },
  addButton: {
    height: 45,
    width: "25%",
    padding: "23px 0px",
    textTransform: "initial",
    // fontSize: 15,
    fontFamily: 'NunitoSans-Bold',
    borderRadius: 8,
    border: "2px solid #343F84",
    marginRight: "2%",
    marginBottom: 20,
    color: 'white',
    backgroundColor: '#343F84',
  },
  hint: {
    fontSize: 12,
    fontFamily: 'NunitoSans-Regular',
    color: "#ACACAC",
  },
}));

export default function AddLicence({ open, setOpen, fetchLicence }) {
  const classes = useStyles();
  const [newinputkey, setNewinputkey] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitNewKey = () => {
    setLoading(true);
    Communication.createLicenceKey(newinputkey)
      .then(function (response) {
        setLoading(false);
        cogoToast.success("Licence Key added successfully.");
        fetchLicence();
      })
      .catch((err) => {
        setLoading(false);
        cogoToast.error(err.message || "Error adding key.");
      });
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="form-dialog-title"
      maxWidth="sm"
      fullWidth
    >
      <Grid style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <DialogTitle id="form-dialog-title">
          <div className={classes.heading}>Add a licence key</div>
        </DialogTitle>
        <CloseIcon
          style={{ marginRight: "3%", cursor: "pointer" }}
          onClick={() => setOpen(false)}
        />
      </Grid>
      <DialogContent>
        <TextField
          autoFocus
          onChange={(e) => {
            setNewinputkey(e.target.value);
          }}
          value={newinputkey}
          placeholder="Type here"
          margin="dense"
          id="licence"
          label="SonicData licence"
          type="text"
          fullWidth
        />
        <DialogContentText className={classes.hint}>
          e.g. 009FF191-A342-400A-AE3D-0D789D4545EF
        </DialogContentText>
      </DialogContent>
      <DialogActions style={{ paddingLeft: 24, paddingRight: 24, paddingBottom: 36 }}>
        <AppButton
          variant="outline"
          onClick={() => setOpen(false)}
          fontSize={15}
          style={{
            height: 45,
            padding: "0px 30px",
            borderWidth: 3
          }}
        >
          Cancel
        </AppButton>
        {loading ? (
          <Button
            className={classes.addButton}
            variant="contained"
            color="primary"
          >
            <Spinner animation="border" size="sm"></Spinner>
          </Button>
        ) : (
          <AppButton
            onClick={() => {
              onSubmitNewKey();
              setOpen(false);
            }}
            variant="fill"
            fontSize={15}
            style={{
              height: 45,
              padding: "0px 30px",
            }}
          >
            Add licence</AppButton>
        )}
      </DialogActions>
    </Dialog>
  );
}
