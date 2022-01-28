import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import { Container, Grid } from "@material-ui/core";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Wave from "../../assets/images/wave-pages.svg"

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#f2f2f2",
  },
  container: {
    paddingLeft: "3%",
    paddingRight: "3%",
    backgroundImage: `url(${Wave})`,
    backgroundRepeat: 'no-repeat',
    backgroundPositionX: 'right',
    backgroundPositionY: 'top',
  },
  subContainer: {
    padding: "1% 4%",
    width: "100%",
    display: "flex",
  },
  sidebarContainer: {
    width: "190px",
    paddingTop: "1%",
    position: "fixed",
    height: "100%",
  },
  pagecontent: {
    flexGrow: 1,
    marginLeft: "190px",
    overflowY: "auto",
    paddingRight: 20,
    paddingLeft: 20
  },
}));

export default function AppLayout({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Header id="headerContainer" />

      <Container maxWidth="xl" className={classes.container}>
        <Toolbar />
        <Grid id="container" className={classes.subContainer}>
          <Grid item id="sidebarContainer" className={classes.sidebarContainer}>
            <Sidebar />
          </Grid>

          <Grid item id="pageContainer" className={classes.pagecontent}>
            <main >
              <div style={{ minHeight: "68vh" }}>{children}</div>
            </main>

            <Grid className="pt-4" id="footer">
              <Footer id="footerContainer" />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
