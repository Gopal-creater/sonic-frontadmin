import { Typography } from "@material-ui/core";
import styled from "styled-components";

export const Span = styled.span(({ color, fontFamily, fontSize, align }) => ({
  color: color,
  "font-size": fontSize,
  "font-family": fontFamily,
  "text-align": align,
}));

export const Heading = styled(Typography)`
  color: ${(props) => props.color || props.theme.background.contrastText};
  font-size: ${(props) => props.fontSize || props.theme.fontSize.heading};
  font-family: ${(props) =>
    props.fontFamily || props.theme.fontFamily.robotoBold};
  text-transform: uppercase;
`;

export const SubHeading = styled(Typography)`
  color: ${(props) => props.color || props.theme.background.contrastText};
  font-size: ${(props) => props.fontSize || props.theme.fontSize.subHeading};
  font-family: ${(props) =>
    props.fontFamily || props.theme.fontFamily.robotoMedium};
  text-transform: uppercase;
`;

export const Content = styled(Typography)`
  color: ${(props) => props.color || props.theme.background.contrastText};
  font-size: ${(props) => props.fontSize || props.theme.fontSize.content};
  font-family: ${(props) =>
    props.fontFamily || props.theme.fontFamily.robotoRegular};
`;

export const Caption = styled(Typography)`
  color: ${(props) => props.color || props.theme.background.contrastText};
  font-size: ${(props) => props.fontSize || props.theme.fontSize.caption};
  font-family: ${(props) =>
    props.fontFamily || props.theme.fontFamily.robotoThin};
`;

export const Large = styled(Typography)`
  color: ${(props) => props.color || props.theme.background.contrastText};
  font-size: ${(props) => props.fontSize || props.theme.fontSize.extra};
  font-family: ${(props) =>
    props.fontFamily || props.theme.fontFamily.robotoBold};
`;
