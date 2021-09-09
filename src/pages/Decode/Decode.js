import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import EncodeDecode from "../../components/common/EncodeDecode";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 70,
    backgroundColor: "white",
    padding: "30px 40px",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  },
}));

export default function Decode() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <EncodeDecode title="Decode SonicKeys" />
    </div>
  );
}
