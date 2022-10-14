import { Grid } from "@material-ui/core";
import styled from "styled-components";

//AppSideBar
export const SideBarContainer = styled(Grid)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 100%;

  @media (max-width: 1200px) {
    display: none;
  }
`;

export const MenuSideContainer = styled(Grid)`
  display: flex;
  margin-top:76px;
  padding:10px;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 100%;
  background-color:white;
  opacity:95%;
  @media (min-width: 1200px) {
    display: none;
  }

`;

export const NavIconContainer = styled(Grid)`
  cursor: pointer;
`;

export const NavIcon = styled.img`
  width: ${(props) => props.width || "40px"};
  height: ${(props) => props.height || "40px"};
`;
//AppSideBar

//SubMenu
export const SideBarNav = styled(Grid)``;
export const MenuContainer = styled(Grid)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 12px;
  padding-left: 0px;
`;

export const SideBarLabel = styled.span`
  margin-left: ${(props) => props.left || "10px"};
  margin-bottom: ${(props) => props.bottom || "0px"};
  display: flex;
  align-items: center;
`;
