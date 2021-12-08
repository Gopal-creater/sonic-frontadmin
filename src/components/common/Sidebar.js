import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import sonickeyGrey from "../../assets/images/sonickey-grey.png";
import sonickeyTeal from "../../assets/images/sonickey-teal.png";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  keyImage: {
    height: 17,
    width: 17,
    marginRight: 15,
  },
  listContainer: {
    minWidth: "180px",
  }
  ,
  listItemContainer: {
    paddingLeft: 0,
    paddingBottom: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textDecoration: "none",
    color: "#757575",
  },
  activelistItemContainer: {
    color: "#00A19A"
  },
  listItemText: {
    fontFamily: "NunitoSans-Bold",
  }
}));
export default function Sidebar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [newActiveLink, setNewActiveLink] = React.useState(null);

  const listItem = [{ link: "/encode", linkText: "Encode" },
  { link: "/decode", linkText: "Decode" },
  { link: "/monitor", linkText: "Monitor" },
  { link: "/sonic-keys", linkText: "SonicKeys" },
  { link: "/licences", linkText: "Licenses" }]

  const checkIsActive = (match, location, index) => {
    match && setNewActiveLink(index); // <-- set active index
    return match; // <-- return boolean
  }

  return (
    <List className={classes.listContainer}>
      {
        listItem?.map((data, index) => {
          if (data?.linkText === "Monitor") {
            return (
              <>
                <NavLink
                  className={classes.listItemContainer}
                  activeClassName={classes.activelistItemContainer}
                  onClick={() => {
                    setOpen((open) => !open);
                  }}
                  to="/dashboard"
                  isActive={(match, location) => { return checkIsActive(match, location, index) }}
                  exact
                  style={{ justifyContent: "flex-start" }}
                >
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", }}>
                    <img src={newActiveLink === 2 ? sonickeyTeal : sonickeyGrey} alt="key" className={classes.keyImage} />
                    <ListItemText primary={"Monitor"} classes={{ primary: classes.listItemText }} style={{ color: newActiveLink === 2 ? "#00A19A" : "#757575" }} />

                    {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                  </div>
                </NavLink>

                {
                  open && (
                    <div style={{ paddingLeft: 30 }}>
                      <NavLink
                        className={classes.listItemContainer}
                        activeClassName={classes.activelistItemContainer}
                        to={"/dashboard"}
                        exact
                        isActive={(match, location) => { return checkIsActive(match, location, index) }}
                      >
                        <ListItemText primary={"Dashboard"} classes={{ primary: classes.listItemText }} />
                      </NavLink>

                      <NavLink
                        className={classes.listItemContainer}
                        activeClassName={classes.activelistItemContainer}
                        to="/plays" exact
                        isActive={(match, location) => { return checkIsActive(match, location, index) }}
                      >
                        <ListItemText primary={"Plays"} classes={{ primary: classes.listItemText }} />
                      </NavLink>

                      <NavLink
                        className={classes.listItemContainer}
                        activeClassName={classes.activelistItemContainer}
                        to="/streamreader" exact
                        isActive={(match, location) => { return checkIsActive(match, location, index) }}
                      >
                        <ListItemText primary={"StreamReader"} classes={{ primary: classes.listItemText }} />
                      </NavLink>
                    </div>
                  )
                }
              </>);
          } else {
            return (
              <NavLink
                className={classes.listItemContainer}
                activeClassName={classes.activelistItemContainer}
                to={data?.link}
                exact
                isActive={(match, location) => { return checkIsActive(match, location, index) }}
              >
                <img src={newActiveLink === index ? sonickeyTeal : sonickeyGrey} alt="key" className={classes.keyImage} />
                <ListItemText primary={data?.linkText} classes={{ primary: classes.listItemText }} />
              </NavLink>
            )
          }
        })
      }
    </List>
  );
}
