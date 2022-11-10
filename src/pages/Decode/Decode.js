import React, { useState } from "react";
import FileSelection from "../../components/common/FileSelection/FileSelection";
import { Grid } from "@material-ui/core";
import FailedFileSelection from "../../components/common/FileSelection/FailedFileSelection";
import DecodeSuccess from "./components/DecodeSuccess";
import PopUp from "../../components/common/PopUp";
import { Content, SubHeading } from "../../StyledComponents/StyledHeadings";
import {
  PopUpContainer,
  TitleContainer,
} from "../Encode/Components/MetaDataDetails/indexStyles";
import encode_progress from "../../assets/icons/encode_progress.png";
import sonic_preloader from "../../assets/icons/sonic_preloader.gif";
import { useTheme } from "styled-components";

export default function Decode() {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState();
  const [decode, setDecode] = useState({
    data: [],
    displayResults: false,
  });
  const [decodeError, setDecodeError] = useState(null);
  const [audioName, setAudioName] = useState(null);
  const theme = useTheme();

  React.useEffect(() => {
    if (decode?.displayResults) {
      setDecodeError(null);
    }
  }, [decode]);

  return (
    <Grid>
      {decodeError ? (
        <FailedFileSelection audioName={audioName} title="Decoding" />
      ) : null}

      {decode?.displayResults ? (
        <DecodeSuccess
          audioName={audioName}
          title="Decoding"
          decodeKeys={decode}
        />
      ) : null}

      <FileSelection
        prop={{
          title: "Decode",
          subTitle:
            decode?.displayResults || decodeError
              ? "Upload a file to start again."
              : "Upload a file to start.",
          shadow: decode?.displayResults || decodeError ? true : false,
          getAudioData: (audioData) => {
            setValues({ ...values, ...audioData });
          },
          decodeResponse: (decodeData) => {
            setDecode({
              ...decode,
              displayResults: true,
              data: [...decodeData],
            });
          },
          setLoading: setLoading,
          setAudioName: setAudioName,
          decodeError: (error) => {
            setDecodeError({ ...decodeError, ...error });
          },
        }}
      />

      <PopUp id="loadingPopUp" open={loading} maxWidth="sm" fullWidth>
        <PopUpContainer>
          <TitleContainer container direction="column" alignItems="center">
            <img
              src={encode_progress}
              style={{ width: "140px", height: "140px", zIndex: 1 }}
              alt="encode_progress"
            />
            <SubHeading
              color={theme.colors.primary.contrastText}
              style={{ textAlign: "center", zIndex: 1 }}
            >
              Decoding of {values?.name} in progress
            </SubHeading>
          </TitleContainer>
          <Content style={{ textAlign: "center", padding: "25px" }}>
            The speed of your internet connection and the size of the audio file
            may affect encoding and decoding times.
          </Content>
          <Grid container justifyContent="center">
            <img src={sonic_preloader} alt="sonic preloader" />
          </Grid>
        </PopUpContainer>
      </PopUp>
    </Grid>
  );
}
