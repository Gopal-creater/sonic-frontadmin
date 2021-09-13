import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import EncodeDecode from "../../components/common/EncodeDecode";
import { Grid } from "@material-ui/core";
import FailedEncodeDecode from "../../components/common/FailedEncodeDecode";
import Icon from "../../assets/images/Logo-colour-simple.png";
import DecodeSuccess from "./components/DecodeSuccess";

const useStyles = makeStyles((theme) => ({
  
}));

export default function Decode() {
  const classes = useStyles();

  return (
    <Grid>
      {/* <DecodeSuccess /> */}
      <FailedEncodeDecode title="Decode" icon={Icon} />
      <EncodeDecode
        title="Decode"
        subTitle="Upload a file to start."
      />
    </Grid>
  );
}
