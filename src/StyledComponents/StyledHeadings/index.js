import { Typography } from "@material-ui/core";
import styled from "styled-components";
import theme from "../../theme";

export const H1 = styled.h1(({ color, fontSize, fontFamily }) => ({
  color: color || theme.colors.primary.graphite,
  "font-size": fontSize || theme.fontSize.h1,
  "font-family": fontFamily || theme.fontFamily.nunitoSansBold,
}));

export const H2 = styled.h2(({ color, fontSize, fontFamily }) => ({
  color: color || theme.colors.primary.graphite,
  "font-size": fontSize || theme.fontSize.h2,
  "font-family": fontFamily || theme.fontFamily.nunitoSansBold,
}));

export const H3 = styled.h3(({ color, fontSize, fontFamily }) => ({
  color: color || theme.colors.primary.graphite,
  "font-size": fontSize || theme.fontSize.h3,
  "font-family": fontFamily || theme.fontFamily.nunitoSansBold,
}));

export const H4 = styled.h4(({ color, fontSize, fontFamily }) => ({
  color: color || theme.colors.primary.graphite,
  "font-size": fontSize || theme.fontSize.h4,
  "font-family": fontFamily || theme.fontFamily.nunitoSansBold,
}));

export const H5 = styled.h5(({ color, fontSize, fontFamily }) => ({
  color: color || theme.colors.primary.graphite,
  "font-size": fontSize || theme.fontSize.h5,
  "font-family": fontFamily || theme.fontFamily.nunitoSansBold,
}));

export const H6 = styled.h6(({ color, fontSize, fontFamily }) => ({
  color: color || theme.colors.primary.graphite,
  "font-size": fontSize || theme.fontSize.h6,
  "font-family": fontFamily || theme.fontFamily.nunitoSansBold,
}));

export const Span = styled.span(({ color, fontFamily, fontSize, align }) => ({
  color: color,
  "font-size": fontSize,
  "font-family": fontFamily,
  "text-align": align,
}));

export const Heading = styled(Typography)`
  color: ${(props) => props.color || props.theme.colors.primary.main};
  font-size: ${(props) => props.fontSize || props.theme.fontSize.heading};
  font-family:${(props)=> props.fontFamily || props.theme.fontFamily.baronNeueRegular}
`;

export const SubHeading = styled(Typography)`
  color: ${(props) => props.color || props.theme.colors.primary.dark};
  font-size: ${(props) => props.fontSize || props.theme.fontSize.subHeading};
  font-family:${(props)=> props.fontFamily || props.theme.fontFamily.baronNeueRegular}
`;

export const Content = styled(Typography)`
  color: ${(props) => props.color || props.theme.colors.primary.main};
  font-size: ${(props) => props.fontSize || props.theme.fontSize.content};
  font-family:${(props)=> props.fontFamily || props.theme.fontFamily.baronNeueRegular}
`;

export const Caption = styled(Typography)`
  color: ${(props) => props.color || props.theme.colors.grey.dark};
  font-size: ${(props) => props.fontSize || props.theme.fontSize.caption};
  font-family:${(props)=> props.fontFamily || props.theme.fontFamily.baronNeueRegular}
`;

export const Large = styled(Typography)`
  color: ${(props) => props.color || props.theme.colors.primary.contrastText};
  font-size: ${(props) => props.fontSize || props.theme.fontSize.extra};
  font-family:${(props)=> props.fontFamily || props.theme.fontFamily.baronNeueRegular}
`;