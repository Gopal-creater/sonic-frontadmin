import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import { Divider, Drawer, Grid, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Footer from "./components/Footer/Footer";
import AppSideBar from "../AppSidebar";
import SecondaryMenu from "./components/SecondaryMenu/SecondaryMenu";
import { useTheme } from "styled-components";
import { Header, SideBarHeading, Avatar } from "./AppLayout.styles";
import { getUserName } from "../../../services/https/AuthHelper";
import amazing_Logo from "../../../assets/icons/amazing_Logo.png";

export default function AppLayout({ children }) {
  const classes = useStyles();
  const date = new Date();
  const hour = date.getHours();
  const [open, setOpen] = React.useState(true);
  const appTheme = useTheme();

  const toggleSideBar = () => {
    setOpen((open) => !open);
  };

  const getGreetings = () => {
    if (hour < 12) {
      return "Good Morning";
    } else if (hour < 16) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
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
            <img src={amazing_Logo} height="40px" alt="logo" />
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
        <Grid container className={classes.drawerHeader}>
          <Grid
            item
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            xs={10}
            style={{ backgroundColor: appTheme.background.dark3 }}
          >
            <Avatar>{Array.from(getUserName())[0]}</Avatar>
            <SideBarHeading>{getGreetings()}</SideBarHeading>
          </Grid>
          <Grid item container alignItems="center" xs={2}>
            <IconButton
              onClick={toggleSideBar}
              style={{
                position: "absolute",
                right: 0,
                color: appTheme.colors.primary.contrastText,
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
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

const drawerWidth = 220;

const useStyles = makeStyles((theme) => {
  const appTheme = useTheme();
  return {
    root: {
      display: "flex",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      backgroundColor: `${appTheme.background.dark3} !important`,
      borderBottom: `1px solid ${appTheme.colors.grey.main}`,
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      backgroundColor: `${appTheme.background.dark3} !important`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      borderBottom: `1px solid ${appTheme.colors.grey.main}`,
    },
    divider: {
      border: `1px solid ${appTheme.colors.primary.contrastText}`,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      color: appTheme.colors.primary.contrastText,
    },
    hide: {
      display: "none",
      color: appTheme.colors.primary.contrastText,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: appTheme.background.dark1,
    },
    drawerHeader: {
      padding: theme.spacing(0, 1),
      backgroundColor: appTheme.background.dark3,
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
  };
});
