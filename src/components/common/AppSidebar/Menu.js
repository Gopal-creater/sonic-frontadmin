import React from 'react'
import { MenuContainer, NavIcon, SideBarLabel } from './style'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { Grid, makeStyles } from '@material-ui/core';
import sonickeyGrey from "../../../assets/images/sonickey-grey.png";
import sonickeyActive from "../../../assets/images/sonickey-teal.png";
import { NavLink, useLocation } from 'react-router-dom';
import hoverKey from "../../../assets/images/key-logo.png"
import theme from '../../../theme';
import { useSelector } from 'react-redux';
import { userRoles } from '../../../constants/constants';

export default function Menu({ menu }) {
    const users = useSelector(state => state.user)
    const [subMenu, setSubMenu] = React.useState(false)

    const location = useLocation()
    const classes = useStyles();

    const showSubMenu = () => setSubMenu(!subMenu)

    const SubMenus = () => {
        const menus = menu?.subPath?.filter((itm) => {
            if (users?.userProfile?.data?.userRole !== userRoles.PARTNER_ADMIN) {
                return itm?.title !== "Companies";
            }
            return itm
        })
        return menus
    }

    return (
        <>
            <MenuContainer>
                <NavLink
                    to={SubMenus() ? location.pathname : menu?.path}
                    onClick={SubMenus() && showSubMenu}
                    className={({ isActive }) => isActive && !SubMenus() ? classes.activeSideBarLink : classes.link}
                >
                    <NavIcon src={sonickeyGrey} width="15px" height="15px" className={classes.sideBarLinkIcon} />
                    <SideBarLabel>
                        {menu.title}
                    </SideBarLabel>
                    <Grid>
                        {SubMenus() && subMenu ? <ArrowDropUpIcon /> : SubMenus() ? <ArrowDropDownIcon /> : null}
                    </Grid>
                </NavLink>
            </MenuContainer>
            {
                subMenu && SubMenus()?.map((item, index) => {
                    return (
                        <NavLink
                            className={({ isActive }) => isActive ? classes.activeSideBarLink : classes.link}
                            to={item?.path}
                            key={index}
                        >
                            <SideBarLabel left="25px" bottom="10px">
                                {item.title}
                            </SideBarLabel>
                        </NavLink>
                    )
                })
            }
        </>
    )
}


const useStyles = makeStyles(() => {
    return ({
        link: {
            display: "flex",
            alignItems: "center",
            fontSize: "15px",
            color: theme.colors.secondary.grey,
            textDecoration: "none",
            fontFamily: theme.fontFamily.nunitoSansRegular,
            "&:hover": {
                color: theme.colors.primary.graphite,
                "& $sideBarLinkIcon": {
                    content: `url(${hoverKey})`,
                },
            }
        },
        sideBarLinkIcon: {},
        activeSideBarLink: {
            fontSize: "15px",
            fontFamily: theme.fontFamily.nunitoSansRegular,
            color: theme.colors.primary.teal,
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            "& $sideBarLinkIcon": {
                content: `url(${sonickeyActive})`
            },
            "&:hover": {
                "& $sideBarLinkIcon": {
                    content: `url(${hoverKey})`
                },
            },
        }
    })
});