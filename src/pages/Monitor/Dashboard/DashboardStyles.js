import { Grid } from "@material-ui/core";
import styled from "styled-components";

export const CardContainer = styled.div`
  margin-top: 50px;
  display: flex;
  width: 100%;
`;

export const TableContainer = styled(Grid)`
  background-color: white;
  margin-top: 30px;
  padding: 30px;
`;

export const ButtonContainer = styled(Grid)`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 80px;
`;
