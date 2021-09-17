import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FileSelection from "../../components/common/FileSelection";
import { Grid } from "@material-ui/core";
import FailedFileSelection from "../../components/common/FailedFileSelection";
import DecodeSuccess from "./components/DecodeSuccess";
import { log } from "../../utils/app.debug";

const useStyles = makeStyles((theme) => ({}));

export default function Decode() {
  const classes = useStyles();
  const [values, setValues] = useState();
  const [decode, setDecodeData] = useState({
    displayResults: false,
  });

  log("decode data", decode);

  return (
    <Grid>
      {/* <DecodeSuccess /> */}
      
      {decode?.displayResults ? (
        <FailedFileSelection audioName={values?.name} title="Decoding" />
      ) : null}

      <FileSelection
        prop={{
          title: "Decode",
          subTitle: "Upload a file to start.",
          getAudioData: (audioData) => {
            setValues({ ...values, ...audioData });
          },
          decodeResponse: (decodeData) => {
            setDecodeData({ ...decode, displayResults: true, ...decodeData });
          },
        }}
      />
    </Grid>
  );
}
