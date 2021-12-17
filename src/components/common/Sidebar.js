import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import sonickeyGrey from "../../assets/images/sonickey-grey.png";
import sonickeyTeal from "../../assets/images/sonickey-teal.png";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { NavLink } from "react-router-dom"
import { Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../stores/actions/session/actionTypes"
import { useLocation } from 'react-router-dom'

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
  const location = useLocation()

  const session = useSelector(state => state.session)
  const dispatch = useDispatch()

  React.useEffect(() => {
    if (location?.pathname === "/plays" || location?.pathname === "/dashboard" || location?.pathname === "/streamreader") {
      dispatch({ type: actionTypes.SET_SIDEBAR, data: true });
    }
  }, [])

  const classes = useStyles();
  const [newActiveLink, setNewActiveLink] = React.useState(null);

  const listItem = [
    { link: "/encode", linkText: "Encode" },
    { link: "/decode", linkText: "Decode" },
    { link: "/monitor", linkText: "Monitor" },
    { link: "/sonic-keys", linkText: "SonicKeys" },
    { link: "/licences", linkText: "Licenses" }
  ]

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
              <div key={index}>
                <Grid
                  className={classes.listItemContainer}
                  onClick={() => {
                    dispatch({ type: actionTypes.SET_SIDEBAR, data: !session?.sidebar });
                    checkIsActive(true, "", 2)
                  }}
                  style={{ justifyContent: "flex-start", cursor: "pointer" }}
                >
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <img src={sonickeyGrey} alt="key" className={classes.keyImage} />
                    <ListItemText primary={"Monitor"} classes={{ primary: classes.listItemText }} />

                    {session?.sidebar ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                  </div>
                </Grid>

                {
                  session?.sidebar && (
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
              </div>);
          } else {
            return (
              <NavLink
                key={index}
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
