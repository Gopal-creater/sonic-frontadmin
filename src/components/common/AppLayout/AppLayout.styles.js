import { AppBar, Typography } from "@material-ui/core";
import styled from "styled-components";

export const Header = styled(AppBar)`
  background-color: ${(props) => props.theme.colors.primary.contrastText};
  
`;

export const LayoutHeading = styled(Typography)`
  font-size: ${(props) => props.theme.fontSize.heading};
  color: ${(props) => props.theme.colors.primary.dark};
  font-family:${(props)=>props.theme.fontFamily.robotoBold}
`;

export const SideBarHeading = styled(Typography)`
 font-size: ${(props) => props.theme.fontSize.content};
 color: ${(props) => props.theme.colors.primary.dark};
 font-family:${(props)=>props.theme.fontFamily.robotoBlack} ;
`;
export const UserName = styled(Typography)`
 font-size: ${(props) => props.theme.fontSize.content};
 color: ${(props) => props.theme.colors.primary.dark};
 font-family:${(props)=>props.theme.fontFamily.robotoRegular} ;
 margin-left:-25px; 
`;
