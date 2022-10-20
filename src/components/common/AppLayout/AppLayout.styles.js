import { AppBar, Drawer, Typography } from "@material-ui/core";
import styled from "styled-components";

export const Header = styled(AppBar)`
  background-color: ${(props) => props.theme.colors.primary.contrastText};
`;

export const LayoutHeading = styled(Typography)`
  font-size: ${(props) => props.theme.fontSize.heading};
  color: ${(props) => props.theme.colors.primary.dark};
`;

export const SideBarHeading = styled(Typography)`
 font-size: ${(props) => props.theme.fontSize.contet};
 color: ${(props) => props.theme.colors.primary.dark};

`;
