import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import LogoWithTextImg from "../../assets/images/Logo-colour-simple.png";
// import KeyImg from "../../assets/images/key-logo.png";
import SecondaryMenu from "./SecondaryMenu";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "transparent",
  },
  toolBar: {
    background: "white",
    padding: 0,
    padding: "1% 4%",
  },
  container: {
    paddingLeft: "3%",
    paddingRight: "calc(3% + 10px)"
  }
}));
export default function Header() {
  const classes = useStyles();
  return (
    <AppBar position="sticky" className={classes.appBar} elevation={0}>
      <Container maxWidth="xl" className={classes.container}>
        <Toolbar className={classes.toolBar}>
          <img alt="logo" src={LogoWithTextImg} style={{ width: 80 }} />
          <div style={{ flexGrow: 1 }} />
          <SecondaryMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
