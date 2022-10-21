import React from "react";
import { MenuContainer, NavIcon, SideBarLabel } from "./style";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { Grid, makeStyles } from "@material-ui/core";
import { NavLink, useLocation } from "react-router-dom";
import LabelIcon from "@material-ui/icons/Label";
import hoverKey from "../../../assets/images/key-logo.png";
import { useSelector } from "react-redux";
import { userRoles } from "../../../constants/constants";
import CustomToolTip from "../CustomToolTip";
import HelpOutline from "@material-ui/icons/HelpOutline";
import { useTheme } from "styled-components";

export default function Menu({ menu }) {
  const appTheme = useTheme();
  const users = useSelector((state) => state.user);
  const [subMenu, setSubMenu] = React.useState(false);

  const location = useLocation();
  const classes = useStyles();

  const showSubMenu = () => setSubMenu(!subMenu);

  const SubMenus = () => {
    const menus = menu?.subPath?.filter((itm) => {
      if (users?.userProfile?.data?.userRole !== userRoles.PARTNER_ADMIN) {
        return itm?.title !== "Companies";
      }
      return itm;
    });
    return menus;
  };

  return (
    <>
      <MenuContainer>
        <NavLink
          to={SubMenus() ? location.pathname : menu?.path}
          onClick={SubMenus() && showSubMenu}
          className={({ isActive }) =>
            isActive && !SubMenus() ? classes.activeSideBarLink : classes.link
          }
        >
          <LabelIcon style={{ fontSize: appTheme.fontSize.subHeading }} />
          <SideBarLabel>
            {menu.title}
            {menu?.helperText && (
              <CustomToolTip
                title={menu.helperText}
                placement={"bottom-start"}
                arrow
                marginTop={"25px"}
              >
                <HelpOutline
                  style={{
                    fontSize: appTheme.fontSize.content,
                    marginLeft: 5,
                  }}
                />
              </CustomToolTip>
            )}
          </SideBarLabel>
          <Grid>
            {SubMenus() && subMenu ? (
              <ArrowDropUpIcon />
            ) : SubMenus() ? (
              <ArrowDropDownIcon />
            ) : null}
          </Grid>
        </NavLink>
      </MenuContainer>
      {subMenu &&
        SubMenus()?.map((item, index) => {
          return (
            <NavLink
              className={({ isActive }) =>
                isActive ? classes.activeSideBarLink : classes.link
              }
              to={item?.path}
              key={index}
            >
              <SideBarLabel left="25px" bottom="10px">
                {item.title}
              </SideBarLabel>
            </NavLink>
          );
        })}
    </>
  );
}

const useStyles = makeStyles(() => {
  const appTheme = useTheme();
  return {
    link: {
      display: "flex",
      alignItems: "center",
      fontSize: appTheme.fontSize.caption,
      color: appTheme.colors.grey.main,
      textDecoration: "none",
      "&:hover": {
        color: appTheme.colors.primary.light,
        "& $sideBarLinkIcon": {
          content: `url(${hoverKey})`,
        },
      },
    },
    sideBarLinkIcon: {},
    activeSideBarLink: {
      fontSize: appTheme.fontSize.content,
      color: appTheme.colors.secondary.main,
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      "&:hover": {
        color: appTheme.colors.primary.light,
        "& $sideBarLinkIcon": {
          content: `url(${hoverKey})`,
        },
      },
    },
  };
});
