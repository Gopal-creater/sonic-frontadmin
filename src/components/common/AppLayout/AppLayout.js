import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import { Divider, Drawer, Grid, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import Footer from "./components/Footer/Footer";
import AppSideBar from "../AppSidebar";
import { useNavigate } from "react-router-dom";
import LogoWithTextImg from "../../../assets/images/Logo-colour-simple.png";
import SecondaryMenu from "./components/SecondaryMenu/SecondaryMenu";
import { useTheme } from "styled-components";
import { Header, LayoutHeading } from "./AppLayout.styles";

export default function AppLayout({ children }) {
  const appTheme = useTheme();
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const toggleSideBar = () => {
    setOpen((open) => !open);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* Header------------------------------------------------------- */}
      <Header
        position="fixed"
        elevation={0}
        className={open ? classes.appBarShift : classes.appBar}
      >
        <Toolbar>
          <IconButton
            onClick={toggleSideBar}
            edge="start"
            className={open ? classes.hide : classes.menuButton}
          >
            <MenuIcon />
          </IconButton>

          <Grid container justifyContent="space-between">
            <LayoutHeading noWrap>Amazing</LayoutHeading>
            <SecondaryMenu />
          </Grid>
        </Toolbar>
      </Header>
      {/* Header------------------------------------------------------- */}

      {/* Drawer---------------------------------------------- */}
      <Drawer
        className={classes.drawer}
        classes={{ paper: classes.drawerPaper }}
        open={open}
        variant="persistent"
        anchor="left"
      >
        <div className={classes.drawerHeader}>
          <img
            alt="logo"
            src={LogoWithTextImg}
            style={{ width: 50, cursor: "pointer" }}
            onClick={() => navigate("/dashboard")}
          />
          <IconButton
            onClick={toggleSideBar}
            style={{ position: "absolute", right: 0 }}
          >
            <CloseIcon />
          </IconButton>
          <Divider />
        </div>
        <AppSideBar />
      </Drawer>
      {/* Drawer---------------------------------------------- */}

      {/* Main Body Container------------------------------------------------------- */}
      <Grid item className={open ? classes.contentShift : classes.content}>
        <main style={{ overflow: "auto" }}>{children}</main>

        <Grid className="pt-4" id="footer">
          <Footer id="footerContainer" />
        </Grid>
      </Grid>
      {/* Main Body Container------------------------------------------------------- */}
    </div>
  );
}

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,

    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    position: "relative",
    width: "0px",
    marginTop: "70px",
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    flexGrow: 1,
    position: "relative",
    width: "0px",
    marginTop: "70px",
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));
