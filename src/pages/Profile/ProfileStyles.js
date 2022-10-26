import styled from "styled-components";
import { Grid } from "@material-ui/core";

export const IconBox = styled(Grid)`
  padding: 10px;
  border-radius: 50%;
  margin-bottom: 10px;
  background-color: ${(props)=>props.theme.colors.primary.main};
`;

export const BorderBottom = styled(Grid)`
  margin-top: 40px;
  border-bottom: 1px solid ${(props)=>props.theme.colors.primary.light};
`;
