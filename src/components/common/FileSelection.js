import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Typography } from "@material-ui/core";
import Icon from "../../assets/images/Logo-colour-simple.png";
import { log } from "../../utils/app.debug";

const useStyles = makeStyles((theme) => ({
  EncodeDecodeContainer: {
    backgroundColor: "white",
    padding: "2% 2.5%",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
  heading: {
    fontSize: 30,
    fontWeight: 700,
    color: "#343F84",
  },
  subHeading: {
    paddingBottom: 30,
    fontSize: 18,
    fontWeight: 500,
    color: "#00A19A",
  },
  selectFile: {
    fontSize: 12,
    fontWeight: 300,
    color: "#ACACAC",
  },
  uploadFile: {
    display: "flex",
  },
  audioFile: {
    height: 25,
    width: "30vw",
    marginRight: 30,
    fontSize: 16,
    fontWeight: 500,
    color: "#757575",
    borderBottom: "1px solid #757575",
  },
  clue: {
    paddingBottom: 20,
    fontSize: 12,
    fontWeight: 100,
    color: "#ACACAC",
  },
  uploadBtn: {
    height: 45,
    padding: "0px 20px",
    textTransform: "initial",
    fontSize: 15,
    fontWeight: 700,
    color: "#343F84",
    borderRadius: 8,
    border: "2px solid #343F84",
  },
  decodeBtn: {
    height: 45,
    padding: "0px 20px",
    textTransform: "initial",
    fontSize: 15,
    fontWeight: 700,
    borderRadius: 8,
  },
}));

export default function FileSelection({ prop }) {
  const classes = useStyles();
  const [audioName, setAudioName] = useState(null);

  const handleDecode = (e) => {
    e.preventDefault();
  };

  const handleAudio = (e) => {
    e.preventDefault();
    const file = e?.target?.files[0];
    if (!file?.type?.includes("audio")) {
      alert("Only audio files are supported.");
    }
    setAudioName(file.name);
    sendAudioData(file.name);
  };

  const sendAudioData = (name) => {
    return prop?.getAudioData({ audioData: { name: name } })
  }

  return (
    <Grid className={classes.EncodeDecodeContainer}>
      <Grid item className={classes.header}>
        <div>
          <Typography className={classes.heading}>{prop?.title} SonicKeys</Typography>
          <Typography className={classes.subHeading}>{prop?.subTitle}</Typography>
        </div>
        <img src={Icon} alt="" style={{ height: 80 }} />
      </Grid>

      <Grid item>
        <div className={classes.uploadFile}>
          <div>
            <Typography className={classes.selectFile}>
              Select a file
            </Typography>
            <Typography className={classes.audioFile}>{audioName}</Typography>
            <Typography className={classes.clue}>
              all audio file formats
            </Typography>
          </div>

          {audioName !== null && prop?.title === "Decode" ? (
            <Button
              variant="contained"
              component="span"
              color="primary"
              className={classes.decodeBtn}
              onClick={handleDecode}
            >
              Decode
            </Button>
          ) : (
            <>
              <input
                accept="audio/*"
                className={classes.input}
                id="contained-button-file"
                type="file"
                style={{ display: "none" }}
                onChange={handleAudio}
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="outlined"
                  component="span"
                  className={classes.uploadBtn}
                >
                  Upload a file
                </Button>
              </label>
            </>
          )}
        </div>
      </Grid>
    </Grid>
  );
}
