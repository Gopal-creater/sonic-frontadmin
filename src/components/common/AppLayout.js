import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import {
  AppBar,
  Box,
  Container,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import Footer from "./Footer";
import Header from "./Header";
import Wave from "../../assets/images/wave-pages.svg";
import AppSideBar from "./AppSidebar";
import { SideBarContainer } from "./AppSidebar/style";
import { useNavigate } from "react-router-dom";
import LogoWithTextImg from "../../assets/images/Logo-colour-simple.png";
import SecondaryMenu from "./SecondaryMenu";

export default function AppLayout({ children }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const toggleSideBar = () => {
    setOpen((open) => !open);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
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
          <Toolbar>
            <img
              alt="logo"
              src={LogoWithTextImg}
              style={{ width: 80, cursor: "pointer" }}
              onClick={() => navigate("/dashboard")}
            ></img>
            <div style={{ flexGrow: 2 }}>
              <SecondaryMenu />
            </div>
          </Toolbar>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        classes={{ paper: classes.drawerPaper }}
        open={open}
        variant="persistent"
        anchor="left"
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={toggleSideBar}>
            <CloseIcon />
          </IconButton>
          <Divider />
        </div>
        <AppSideBar />
      </Drawer>
      <Grid item className={open ? classes.contentShift : classes.content}>
        
        <main style={{overflow:"auto"}}>
          {children}
        </main>
        
        <Grid className="pt-4" id="footer">
          <Footer id="footerContainer" />
        </Grid>
      </Grid>
      {/* <main>
        <div style={{ minHeight: "68vh" }}>{children}</div>
      </main> */}
    </div>
  );
}

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    backgroundColor: "white",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    backgroundColor: "white",
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
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    position:"relative",
    width:"0px",
    marginTop:"70px",
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    flexGrow: 1,
    position:"relative",
    width:"0px",
    marginTop:"70px",
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));
