import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
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

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: 22,
    fontWeight: 700,
    color: "#343F84",
  },
  button: {
    height: 45,
    padding: "23px 25px",
    textTransform: "initial",
    fontSize: 15,
    fontWeight: 700,
    borderRadius: 8,
    border: "2px solid #343F84",
    marginRight: "2%",
    marginBottom: 20,
  },
  hint: {
    fontSize: 12,
    fontWeight: 500,
    color: "#ACACAC",
  },
}));

export default function AddLicence({ open, setOpen, fetchLicence }) {
  const classes = useStyles();
  const [newinputkey, setNewinputkey] = useState("");

  const onSubmitNewKey = () => {
    Communication.createLicenceKey(newinputkey)
      .then(function (response) {
        cogoToast.success("Licence Key added successfully.");
        fetchLicence();
      })
      .catch((err) => {
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
      <Grid style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
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
      <DialogActions>
        <Button
          onClick={() => setOpen(false)}
          className={classes.button}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            onSubmitNewKey();
            setOpen(false);
          }}
          className={classes.button}
          variant="contained"
          color="primary"
        >
          Add Licence
        </Button>
      </DialogActions>
    </Dialog>
  );
}
