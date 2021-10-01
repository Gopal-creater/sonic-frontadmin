import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Typography } from "@material-ui/core";
import Icon from "../../assets/images/icon-add-sound.png";
import * as mm from "music-metadata-browser";
import cogoToast from "cogo-toast";
import Communication from "../../services/https/Communication";

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
    fontFamily: 'NunitoSans-ExtraBold',
    color: "#343F84",
  },
  subHeading: {
    paddingBottom: 30,
    fontSize: 18,
    fontFamily: 'NunitoSans-Regular',
    color: "#00A19A",
  },
  selectFile: {
    fontSize: 12,
    fontFamily: 'NunitoSans-Regular',
    color: "#ACACAC",
  },
  audioFile: {
    height: 25,
    width: "30vw",
    marginRight: 30,
    fontSize: 16,
    fontFamily: 'NunitoSans-Regular',
    color: "#757575",
    borderBottom: "1px solid #757575",
  },
  clue: {
    paddingBottom: 20,
    fontSize: 12,
    fontFamily: 'NunitoSans-Regular',
    color: "#ACACAC",
  },
  uploadBtn: {
    height: 45,
    padding: "0px 20px",
    textTransform: "initial",
    fontSize: 15,
    fontFamily: 'NunitoSans-Bold',
    color: "#343F84",
    borderRadius: 8,
    border: "2px solid #343F84",
  },
  decodeBtn: {
    height: 45,
    padding: "0px 20px",
    textTransform: "initial",
    fontSize: 15,
    fontFamily: 'NunitoSans-Bold',
    borderRadius: 8,
    color: 'white',
    backgroundColor: '#343F84'
  },
}));

export default function FileSelection({ prop }) {
  const classes = useStyles();
  const [audioData, setAudioData] = useState({
    response: false,
    file: null,
    data: {
      encodingStrength: "15",
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
    name: null,
  });

  React.useEffect(() => {
    if (prop?.clearSelectedFile) {
      setAudioData({
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
      })
      document.getElementById("contained-button-file").value = ''
    }
  }, [prop])
  
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const handleDecode = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("mediaFile", audioData?.file);
    prop?.setLoading(true);

    let payload = {
      response: false,
      file: null,
      data: {
        encodingStrength: "15",
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
      name: null,
    };

    Communication.decodeFile(formData)
      .then((response) => {
        // log("response:", response);
        prop?.setLoading(false);
        prop?.decodeResponse(response);
        setAudioData({
          response: true,
          file: audioData?.file,
          data: response,
          name: audioData?.file?.name
        })
        if (response.length != 0) {
          cogoToast.success("Successfully decoded file.");
          setAudioData({ ...payload });
          prop?.setAudioName(audioData?.file?.name);
        } else {
          setAudioData({ ...payload });
          prop?.setAudioName(audioData?.file?.name);
        }
      })
      .catch((err) => {
        prop?.decodeError(err);
        cogoToast.error(err.message || "Error decoding file.");
        prop?.setLoading(false);
        setAudioData({ ...payload });
        prop?.setAudioName(audioData?.file?.name);
      });
  };

  const handleAudio = (e) => {
    e.preventDefault();
    const file = e?.target?.files[0];
    if (!file?.type?.includes("audio")) {
      return cogoToast.warn("Only audio files are supported.");
    }
    mm.parseBlob(file, { native: true })
      .then((metadata) => {
        let payload = {
          response: false,
          file: file,
          data: {
            encodingStrength: "15",
            contentName: metadata.common.title ? metadata.common.title : "",
            contentType: "",
            contentDescription: metadata.common.description
              ? metadata.common.description
              : "",
            contentCreatedDate: new Date(),
            contentValidation: "No",
            contentDuration: metadata.format.duration
              ? metadata.format.duration
              : "",
            contentSize: file.size / 1024,
            contentFileType: file.type,
            contentOwner: metadata.common.artist ? metadata.common.artist : "",
            contentFileType: metadata?.format?.container,
            contentEncoding:
              (metadata.format.codec ? metadata.format.codec.toString() : "") +
              (metadata.format.sampleRate
                ? ", " + metadata.format.sampleRate.toString() + " Hz"
                : "") +
              (metadata.format.codecProfile
                ? ", " + metadata.format.codecProfile.toString()
                : "") +
              (metadata.format.bitrate
                ? ", " + metadata.format.bitrate.toString() + " bps"
                : "") +
              (metadata.format.numberOfChannels
                ? ", " + metadata.format.numberOfChannels.toString() + " ch"
                : ""),
            contentSamplingFrequency: metadata.format.sampleRate
              ? metadata.format.sampleRate.toString() + "  Hz"
              : "",
            contentQuality: "",
            additionalMetadata: { message: "" },
            sonicKey: "",
            contentFilePath: "",
            isrcCode: "",
            iswcCode: "",
            tuneCode: "",
          },
          name: file?.name,
        };
        setAudioData({ ...payload });
        sendAudioData(payload);
      })
      .catch((err) => {
        cogoToast.error(err);
      });
  };

  const sendAudioData = (Data) => {
    return prop?.getAudioData(Data);
  };

  return (
    <Grid className={classes.EncodeDecodeContainer}>
      <Grid item className={classes.header}>
        <div>
          <Typography className={classes.heading}>
            {prop?.title} SonicKeys
          </Typography>
          <Typography className={classes.subHeading}>
            {audioData?.name !== null && prop?.title === "Encode"
              ? "Add details to start encoding."
              : prop?.subTitle}
          </Typography>
        </div>
        <img src={Icon} alt="" style={{ height: 80 }} />
      </Grid>

      <Grid item>
        <div style={{ display: "flex" }}>
          <div>
            <Typography className={classes.selectFile}>
              Select a file
            </Typography>
            <Typography className={classes.audioFile}>
              {truncate(audioData?.name, 50)}
            </Typography>
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
