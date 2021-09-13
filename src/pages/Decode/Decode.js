import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import EncodeDecode from "../../components/common/EncodeDecode";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({

}));

export default function Decode() {
  const classes = useStyles();

  return (
    <Grid>
      <EncodeDecode title="Decode SonicKeys" subTitle="Upload a file to start." />
    </Grid>
  );
}
