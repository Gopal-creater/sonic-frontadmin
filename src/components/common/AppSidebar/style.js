import { Grid } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

//AppSideBar
export const SideBarContainer = styled(Grid)`
`

export const NavIconContainer = styled(Grid)`
    cursor: pointer;
`

export const NavIcon = styled.img`
    width:${props => props.width || "40px"};
    height:${props => props.height || "40px"};
`
//AppSideBar

//SubMenu
export const SideBarNav = styled(Grid)`
    margin-top:50px ;
`
export const MenuContainer = styled(Grid)`
    display:flex ;
    justify-content:flex-start ;
    align-items: center;
    padding:12px ;
    padding-left:0px ;
`

export const SideBarLink = styled(NavLink)`
    display:flex ;
    align-items:center ;
    justify-content:flex-start ;
    text-decoration:none ;
    font-family:${props => props.theme.fontFamily.nunitoSansRegular} ;
    font-size:15px ;
    color: ${props => props.active ? props.theme.colors.primary.teal : props.theme.colors.secondary.grey} ;

    &:hover {
        color: ${props => props.theme.colors.primary.graphite} ;
    }
`

export const SideBarLabel = styled.span`
    margin-left:${(props) => props.left || "10px"};

`

export const DropDownLink = styled(NavLink)`
    display:flex ;
    align-items:center ;
    justify-content:flex-start ;
    padding:3px ;
    padding-left:0px ;
    text-decoration:none ;
    font-family:${props => props.theme.fontFamily.nunitoSansRegular} ;
    font-size:15px ;
    color: ${props => props.theme.colors.secondary.grey} ;

    &:hover {
        color: ${props => props.theme.colors.primary.graphite} ;
    }
`
//SubMenu