import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Typography } from "@material-ui/core";
import Icon from "../../assets/images/Logo-colour-simple.png";
import { log } from "../../utils/app.debug";
import * as mm from 'music-metadata-browser';
import cogoToast from "cogo-toast";


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
  const [audioData, setAudioData] = useState({
    response: false,
    file: null,
    data: {
      encodingStrength: '15',
      contentName: "",
      contentType: "",
      contentDescription: "",
      contentCreatedDate: new Date(),
      contentValidation: "No",
      contentDuration: "",
      contentSize: "",
      contentOwner: "",
      contentFileType: "",
      contentEncoding: "",
      contentSamplingFrequency: "",
      contentQuality: "",
      additionalMetadata: { message: "" },
      sonicKey: "",
      contentFilePath: "",
      isrcCode: "",
      iswcCode: "",
      tuneCode: "",
    },
    name: null
  });

  const handleDecode = (e) => {
    e.preventDefault();
  };

  const handleAudio = (e) => {
    e.preventDefault();
    const file = e?.target?.files[0];
    if (!file?.type?.includes("audio")) {
      return cogoToast.warn("Only audio files are supported.");
    }
    mm.parseBlob(file, { native: true }).then(metadata => {
      let payload = {
        response: false,
        file: file,
        data: {
          encodingStrength: '15',
          contentName: (metadata.common.title) ? metadata.common.title : "",
          contentType: file.type,
          contentDescription: (metadata.common.description) ? metadata.common.description : '',
          contentCreatedDate: new Date(),
          contentValidation: "No",
          contentDuration: (metadata.format.duration) ? metadata.format.duration : '',
          contentSize: (file.size / 1024), contentFileType: file.type,
          contentOwner: (metadata.common.artist) ? metadata.common.artist : '',
          contentFileType: "",
          contentEncoding: (
            ((metadata.format.codec) ? ((metadata.format.codec).toString()) : '') +
            ((metadata.format.sampleRate) ? (', ' + (metadata.format.sampleRate).toString() + " Hz") : '') +
            ((metadata.format.codecProfile) ? (', ' + (metadata.format.codecProfile).toString()) : '') +
            ((metadata.format.bitrate) ? (', ' + (metadata.format.bitrate).toString() + " bps") : '') +
            ((metadata.format.numberOfChannels) ? (', ' + (metadata.format.numberOfChannels).toString() + " ch") : '')
          ),
          contentSamplingFrequency: (metadata.format.sampleRate) ? (metadata.format.sampleRate).toString() + "  Hz" : '',
          contentQuality: "",
          additionalMetadata: { message: "" },
          sonicKey: "",
          contentFilePath: "",
          isrcCode: "",
          iswcCode: "",
          tuneCode: "",
        },
        name: file?.name
      }
      setAudioData({ ...payload });
      sendAudioData(payload);
    }).catch((err) => {
      cogoToast.error(err)
    })
  };

  const sendAudioData = (Data) => {
    return prop?.getAudioData(Data)
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
            <Typography className={classes.audioFile}>{audioData?.name}</Typography>
            <Typography className={classes.clue}>
              all audio file formats
            </Typography>
          </div>

          {audioData?.name !== null && prop?.title === "Decode" ? (
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
