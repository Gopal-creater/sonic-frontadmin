import { AppBar, Typography } from "@material-ui/core";
import styled from "styled-components";

export const Header = styled(AppBar)`
  background-color: ${(props) => props.theme.colors.primary.contrastText};
`;

export const LayoutHeading = styled(Typography)`
  font-size: ${(props) => props.theme.fontSize.heading};
  color: ${(props) => props.theme.colors.primary.dark};
  font-family: ${(props) => props.theme.fontFamily.robotoBold};
`;

export const SideBarHeading = styled(Typography)`
  font-size: ${(props) => props.theme.fontSize.content};
  color: ${(props) => props.theme.colors.primary.dark};
  font-family: ${(props) => props.theme.fontFamily.robotoMedium};
`;

export const Avatar = styled.div`
  font-size: ${(props) => props.theme.fontSize.subHeading};
  color: ${(props) => props.theme.colors.secondary.contrastText};
  font-family: ${(props) => props.theme.fontFamily.robotoMedium};
  background-color: ${(props) => props.theme.colors.secondary.main};
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`;
