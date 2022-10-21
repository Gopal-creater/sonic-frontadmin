import { Grid } from "@material-ui/core";
import styled from "styled-components";

export const MainContainer = styled(Grid)`
  margin-bottom: 30px;
  background-color: ${(props) => props.theme.colors.primary.contrastText};
  padding: 25px 30px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;
