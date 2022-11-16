import { Grid } from "@material-ui/core";
import styled from "styled-components";

export const WelcomeBackContainer = styled(Grid)`
  background-color: ${(props) => props.theme.background.dark4};
  padding: 30px 30px 30px 40px;
  background-repeat: no-repeat;
  background-position-x: -120px;
`;
