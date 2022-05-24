import React from 'react'
import { MenuContainer, NavIcon, SideBarLabel, SideBarLink, DropDownLink } from './style'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { Grid, makeStyles } from '@material-ui/core';
import sonickeyGrey from "../../../assets/images/sonickey-grey.png";
import { useLocation } from 'react-router-dom';
import theme from '../../../theme';
import hoverKey from "../../../assets/images/key-logo.png"
import { log } from '../../../utils/app.debug';

export default function Menu({ menu }) {
    const [subMenu, setSubMenu] = React.useState(false)

    const location = useLocation()
    const classes = useStyles();

    const showSubMenu = () => setSubMenu(!subMenu)

    return (
        <>
            <MenuContainer>
                <SideBarLink
                    to={menu?.subPath ? location.pathname : menu?.path}
                    onClick={menu?.subPath && showSubMenu}
                    className={classes.sideBarLink}
                >
                    <NavIcon src={sonickeyGrey} width="15px" height="15px" className={classes.sideBarLinkIcon} />
                    <SideBarLabel>
                        {menu.title}
                    </SideBarLabel>
                    <Grid>
                        {menu?.subPath && subMenu ? <ArrowDropUpIcon /> : menu?.subPath ? <ArrowDropDownIcon /> : null}
                    </Grid>
                </SideBarLink>
            </MenuContainer>
            {
                subMenu && menu?.subPath?.map((item, index) => {
                    return (
                        <DropDownLink to={item?.path} key={index}>
                            <SideBarLabel left="0px">
                                {item.title}
                            </SideBarLabel>
                        </DropDownLink>
                    )
                })
            }
        </>
    )
}


const useStyles = makeStyles(() => {
    return ({
        sideBarLink: {
            "&:hover": {
                "& $sideBarLinkIcon": {
                    content: `url(${hoverKey})`
                },
            }
        },
        sideBarLinkIcon: {},
        activeSideBarLink: {
            color: "red"
        }
    })
});