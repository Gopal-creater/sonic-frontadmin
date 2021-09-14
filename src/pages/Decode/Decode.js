import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import EncodeDecode from "../../components/common/FileSelection";
import { Grid } from "@material-ui/core";
import FailedFileSelection from "../../components/common/FailedFileSelection";
import Icon from "../../assets/images/Logo-colour-simple.png";
import DecodeSuccess from "./components/DecodeSuccess";

const useStyles = makeStyles((theme) => ({
  
}));

export default function Decode() {
  const classes = useStyles();

  return (
    <Grid>
      <DecodeSuccess />
      {/* <FailedFileSelection title="Decode" icon={Icon} /> */}
      <EncodeDecode
        title="Decode"
        subTitle="Upload a file to start."
      />
    </Grid>
  );
}
