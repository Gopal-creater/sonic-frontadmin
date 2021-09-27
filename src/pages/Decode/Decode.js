import React, { useState } from "react";
import FileSelection from "../../components/common/FileSelection";
import { Grid } from "@material-ui/core";
import FailedFileSelection from "../../components/common/FailedFileSelection";
import DecodeSuccess from "./components/DecodeSuccess";
import EncodeDecodeLoading from "../../components/common/EncodeDecodeLoading";

export default function Decode() {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState();
  const [decode, setDecode] = useState({
    data: [],
    displayResults: false,
  });
  const [decodeError, setDecodeError] = useState(null);
  const [audioName, setAudioName] = useState(null);

  React.useEffect(() => {
    if (decodeError) {
      setDecodeError(null);
    }
  }, [decodeError]);

  return (
    <Grid>
      {decodeError ? (
        <FailedFileSelection audioName={audioName} title="Decoding" />
      ) : null}

      {decode?.displayResults === true ? (
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

      <EncodeDecodeLoading
        open={loading}
        onClose={() => setLoading(false)}
        title="Decoding"
        audioName={values?.name}
      />
    </Grid>
  );
}
