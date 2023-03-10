import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import amazingRadio_Icon from "../../../assets/icons/amazingRadio_Icon.png";
import * as mm from "music-metadata-browser";
import cogoToast from "cogo-toast";
import Communication from "../../../services/https/Communication";
import {
  Caption,
  Content,
  SubHeading,
} from "../../../StyledComponents/StyledHeadings";

import AppButton from "../AppButton/AppButton";
import { MainContainer } from "../../../StyledComponents/StyledPageContainer";
import { tags } from "../../../constants/constants";
import { useTheme } from "styled-components";

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    EncodeDecodeContainer: {
      backgroundColor: "white",
      padding: "2% 2.5%",
      boxShadow: (shadow) => shadow.boxShadow,
    },
    audioFile: {
      height: 25,
      width: "30vw",
      marginRight: 30,
      marginBottom: 5,
      fontSize: 16,
      fontFamily: `${theme.fontFamily.robotoRegular}`,
      color: `${theme.colors.grey.main}`,
      borderBottom: `1px solid ${theme.colors.grey.main}`,
    },
  };
});

export default function FileSelection({ prop }) {
  const shadow = {
    boxShadow: prop?.shadow
      ? "none"
      : "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  };
  const classes = useStyles(shadow);
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
      distributor: "",
      version: "",
      label: "",
    },
    name: null,
  });

  React.useEffect(() => {
    if (prop?.clearSelectedFile) {
      setAudioData({
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
          distributor: "",
          version: "",
          label: "",
        },
        name: null,
      });
      document.getElementById("contained-button-file").value = "";
    }
  }, [prop]);

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
        distributor: "",
        version: "",
        label: "",
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
          name: audioData?.file?.name,
        });
        if (response.length !== 0) {
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
            distributor: "",
            version: "",
            label: "",
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
  const theme = useTheme();
  const sendAudioData = (Data) => {
    return prop?.getAudioData(Data);
  };

  return (
    <MainContainer>
      <Grid item style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <SubHeading>
            {prop?.title} {tags.companyTag}
          </SubHeading>
          <Content>
            {audioData?.name !== null && prop?.title === "Encode"
              ? "Add details to start encoding."
              : prop?.subTitle}
          </Content>
        </div>
        <img src={amazingRadio_Icon} alt="" style={{ height: 80 }} />
      </Grid>

      <Grid item>
        <div style={{ display: "flex" }}>
          <div>
            <Caption>Select a file</Caption>
            <Typography className={classes.audioFile}>
              {truncate(audioData?.name, 50)}
            </Typography>
            <Caption>all audio file formats</Caption>
          </div>

          {audioData?.name !== null && prop?.title === "Decode" ? (
            <>
              <label htmlFor="contained-button-file-decode">
                <AppButton
                  variant="fill"
                  onClick={handleDecode}
                  style={{ height: 45 }}
                >
                  Decode
                </AppButton>
              </label>
            </>
          ) : (
            <>
              <input
                accept="audio/*"
                id="contained-button-file"
                type="file"
                style={{ display: "none" }}
                onChange={handleAudio}
              />
              <label htmlFor="contained-button-file">
                <AppButton
                  variant="outline"
                  component="span"
                  fontFamily={theme.fontFamily.robotoBold}
                  style={{ height: 45 }}
                >
                  Upload a file
                </AppButton>
              </label>
            </>
          )}
        </div>
      </Grid>
    </MainContainer>
  );
}
