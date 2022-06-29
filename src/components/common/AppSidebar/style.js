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
    margin-top: 50px;
    height:450px;
    overflow:auto;
`
export const MenuContainer = styled(Grid)`
    display:flex ;
    justify-content:flex-start ;
    align-items: center;
    padding:12px ;
    padding-left:0px ;
`

export const SideBarLabel = styled.span`
    margin-left:${(props) => props.left || "10px"};
    margin-bottom:${(props) => props.bottom || "0px"};
`
