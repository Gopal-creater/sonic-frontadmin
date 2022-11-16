import styled from "styled-components";
import { Grid } from "@material-ui/core";

export const IconBox = styled(Grid)`
  padding: 10px;
  border-radius: 50%;
  margin: 10px 0px;
  background-color: ${(props) => props.theme.colors.primary.main};
`;

export const CheckBoxLabelContainer = styled.div`
  display: flex;
  margin-top: 10px;
`;

export const ProperAccessContainer = styled(Grid)`
  margin-top: 40px;
  border-bottom: 1px solid ${(props) => props.theme.colors.secondary.mediumGrey};
`;

export const ButtonContainer = styled(Grid)`
  margin-top: 35px;
  display: flex;
  justify-content: flex-end;
`;
