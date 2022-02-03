import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import sonickeyGrey from "../../assets/images/sonickey-grey.png";
import sonickeyTeal from "../../assets/images/sonickey-teal.png";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../stores/actions/session/actionTypes"
import { useLocation } from 'react-router-dom'
import { useTheme } from "styled-components";
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import { Grid } from "@material-ui/core";
import { routeList } from "../../routes/RoutesData";

const useStyles = makeStyles(() => {
  const theme = useTheme()
  return ({
    toggleButton: {
      cursor: "pointer",
      width: "10px"
    },
    menuIcon: {
      fontSize: 28,
      color: theme.colors.secondary.grey,
      marginBottom: 10
    },
    showMenu: {
      fontSize: theme.fontSize.h4,
      fontFamily: theme.fontFamily.nunitoSansBold,
      color: theme.colors.secondary.grey,
      lineHeight: 0.2,
    },
    listContainer: {
      minWidth: "180px",
      marginTop: 30
    },
    keyImage: {
      height: 15,
      width: 15,
      marginRight: 15,
    },
    listItemContainer: {
      paddingLeft: 0,
      paddingBottom: 15,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textDecoration: "none",
      color: theme.colors.secondary.mediumGrey,
      "&:hover": {
        color: theme.colors.secondary.lightNavy
      }
    },
    activelistItemContainer: {
      fontFamily: theme.fontFamily.nunitoSansBold,
      color: theme.colors.primary.teal,
      fontSize: "15px",
    },
    listItemText: {
      fontSize: "15px",
      fontFamily: theme.fontFamily.nunitoSansBold,
    },
    childListItemContainer: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      textDecoration: "none",
      color: theme.colors.secondary.mediumGrey,
      "&:hover": {
        color: theme.colors.secondary.lightNavy
      }
    },
    activeChildListItemContainer: {
      color: theme.colors.secondary.grey,
    },
  })
});

export default function Sidebar() {
  const location = useLocation()

  const session = useSelector(state => state.session)
  const dispatch = useDispatch()

  const classes = useStyles();
  const [newActiveLink, setNewActiveLink] = React.useState(null);

  const [state, setState] = React.useState({
    menuToggled: true
  })

  React.useEffect(() => {
    if (getChildItemInArray()?.includes(location?.pathname)) {
      dispatch({ type: actionTypes.SET_SIDEBAR, data: true });
    }
  }, [])


  const checkIsActive = (match, location, index) => {
    match && setNewActiveLink(index); // <-- set active index
    return match; // <-- return boolean
  }

  const getChildItemInArray = () => {
    let childArray = []
    for (let index = 0; index < routeList.length; index++) {
      const item = routeList[index];
      if (item?.children) {
        item?.children?.map((child) => {
          childArray.push(child?.link)
        })
      }
    }
    return childArray
  }

  return (
    <>
      <Grid className={classes.toggleButton} onClick={() => setState({ ...state, menuToggled: !state.menuToggled })}>
        <MenuOpenIcon className={classes.menuIcon} /><br />
        {!state.menuToggled && <span className={classes.showMenu}>Show<br />menu</span>}
      </Grid>

      {
        state.menuToggled &&
        <List className={classes.listContainer}>
          {
            routeList?.map((data, index) => {
              //For handling children navigation
              if (data?.children) {
                return (
                  <div key={index} >
                    <NavLink
                      className={classes.listItemContainer}
                      to={data?.children?.[0]?.link}
                      onClick={() => {
                        dispatch({ type: actionTypes.SET_SIDEBAR, data: !session?.sidebar });
                        checkIsActive(true, "", index)
                      }}
                      style={{ justifyContent: "flex-start", paddingBottom: 5 }}
                    >
                      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <img src={newActiveLink === index ? sonickeyTeal : sonickeyGrey} alt="key" className={classes.keyImage} />
                        <ListItemText primary={data?.linkText} classes={{ primary: newActiveLink === index ? classes?.activelistItemContainer : classes.listItemText }} />

                        {
                          session?.sidebar ?
                            <ArrowDropUpIcon style={{ color: newActiveLink === index ? "#00A19A" : "#757575" }} /> :
                            <ArrowDropDownIcon style={{ color: newActiveLink === index ? "#00A19A" : "#757575" }} />
                        }
                      </div>
                    </NavLink>

                    <div style={{ paddingBottom: 10 }}>
                      {
                        session?.sidebar && data?.children?.map((childData) => {
                          return (
                            <NavLink
                              className={classes.childListItemContainer}
                              activeClassName={classes.activeChildListItemContainer}
                              to={childData?.link}
                              exact
                              isActive={(match, location) => checkIsActive(match, location, index)}
                            >
                              <ListItemText primary={childData?.linkText} classes={{ primary: classes.listItemText }} />
                            </NavLink>
                          )
                        })
                      }
                    </div>
                  </div>
                )
              }
              return (
                <NavLink
                  key={index}
                  className={classes.listItemContainer}
                  activeClassName={classes.activelistItemContainer}
                  to={data?.link}
                  exact
                  isActive={(match, location) => checkIsActive(match, location, index)}
                >
                  <img src={newActiveLink === index ? sonickeyTeal : sonickeyGrey} alt="key" className={classes.keyImage} />
                  <ListItemText primary={data?.linkText} classes={{ primary: classes.listItemText }} />
                </NavLink>
              )
            })
          }
        </List>
      }
    </>
  );
}
