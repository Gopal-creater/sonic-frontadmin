import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import React from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import { logout } from "../../../../../stores/actions/session";
import cogoToast from "cogo-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTheme } from "styled-components";

function SecondaryMenu(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const session = useSelector((state) => state.session);
  const user = useSelector((state) => state.user);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const onPressLogout = async () => {
    try {
      dispatch(logout());
      navigate("/");
    } catch (error) {
      cogoToast.error("Error logging out.");
    }
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <Button
        className={classes.secondaryButton}
        ref={anchorRef}
        style={{ color: "black" }}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        endIcon={<ArrowDropDownIcon />}
        onClick={handleToggle}
        disableFocusRipple
        disableRipple
      >
        {session?.user?.signInUserSession?.idToken?.payload?.email ||
          session?.user?.username}
      </Button>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        placement="bottom-end"
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            className={classes.popperGrow}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper
              style={{
                minWidth: "110px",
                borderRadius: "0px",
                boxShadow: "none",
                border: "1px solid #E0E0E0",
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <div style={{ margin: "10px 15px 10px 20px" }}>
                    {user.userMenus?.map((menu, index) => {
                      return (
                        <MenuItem
                          id={index}
                          onClick={(event) => {
                            handleClose(event);
                            navigate(menu.url);
                          }}
                          className={classes.menuItem}
                        >
                          {menu.urlName}
                        </MenuItem>
                      );
                    })}

                    <MenuItem
                      onClick={onPressLogout}
                      className={classes.menuItem}
                    >
                      Logout
                    </MenuItem>
                  </div>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}

export default SecondaryMenu;

const useStyles = makeStyles((theme) => {
  const appTheme = useTheme();
  return {
    root: {
      display: "flex",
      justifyContent: "flex-end",
    },
    paper: {
      marginRight: theme.spacing(2),
    },
    secondaryButton: {
      textTransform: "none",
      paddingLeft: "0px",
      color: `${appTheme.colors.secondary.main} !important`,
      fontFamily: `${appTheme.fontFamily.robotoMedium}`,
      "&:focus": {
        outline: "none",
      },
      "&:hover": {
        backgroundColor: `${appTheme.colors.primary.main}`,
        color: `${appTheme.colors.primary.light}`,
      },
    },
    menuItem: {
      color: `${appTheme.colors.grey.main}`,
      fontSize: `${appTheme.fontSize.caption}`,
      margin: "0px",
      padding: "0px",
      paddingRight: "30px",
      fontFamily: `${appTheme.fontFamily.robotoMedium}`,
      "&:hover": {
        color: `${appTheme.colors.primary.contrastText}`,
      },
    },
    popperGrow: {
      backgroundColor: appTheme.colors.primary.light,
      border: "none !important",
    },
  };
});
