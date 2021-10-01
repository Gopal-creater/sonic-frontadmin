import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import React from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { logout } from "../../stores/actions/session";
import cogoToast from "cogo-toast";
import { useDispatch, useSelector } from "react-redux";
import { log } from "../../utils/app.debug";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  secondaryButton: {
    textTransform: "none",
    fontFamily: "NunitoSans-Black",
    color: "white",
    "&:focus": {
      outline: "none",
    },
  },
  menuItem: {
    color: "#757575",
    fontFamily: "NunitoSans-Regular",
    "&:hover": {
      color: "#7078A8"
    }
  }
}));

function SecondaryMenu(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const dispatch = useDispatch();

  const { session } = useSelector((state) => ({
    session: state.session,
  }));

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
      dispatch(logout())
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
        style={{ color: "#7078A8" }}
      >
        {session?.user?.signInUserSession?.idToken?.payload?.email || session?.user?.username}
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={handleClose} className={classes.menuItem}>Profile</MenuItem>
                  <MenuItem onClick={onPressLogout} className={classes.menuItem}>Logout</MenuItem>
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
