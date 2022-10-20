import { Typography } from "@material-ui/core";
import styled from "styled-components";

export const Title = styled(Typography)`
  color: ${(props) => props.theme.colors.primary.dark};
  font-size: ${(props) => props.theme.fontSize.subHeading};
  margin-left: -25px;
`;

export const ColumnTitle = styled(Typography)`
  color: ${(props) => props.theme.colors.primary.dark};
  font-size: ${(props) => props.theme.fontSize.caption};
`;
