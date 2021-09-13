import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import { Container, Grid } from "@material-ui/core";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Header from "./Header";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    background: "#f2f2f2",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "transparent",
  },
  toolBar: {
    background: "white",
    padding: "20px 40px 20px 40px",
  },
  pagecontent: {
    flexGrow: 1,
    padding: theme.spacing(4),
  },
  listContainer: {
    marginLeft: 40,
    marginRight: 10,
  },
  container: {
    marginTop: 100,
  },
  footer: {},
}));

export default function AppLayout({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Header id="headerContainer" />

      <Container maxWidth="lg" className={classes.container}>
        <Toolbar />
        <Grid container id="container">
          <Grid item id="sidebarContainer">
            <Sidebar />
          </Grid>

          <Grid item id="pageContainer" style={{flexGrow:'1'}}>
            <main className={classes.pagecontent}>
              <div style={{ minHeight: "70vh" }}>{children}</div>
            </main>
          </Grid>
        </Grid>

        <Footer id="footerContainer" />
      </Container>
    </div>
  );
}
