import { Grid } from "@material-ui/core";
import styled from "styled-components";

export const CardContainer = styled.div`
  margin-top: 50px;
  gap: 10px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;

export const TableContainer = styled(Grid)`
  background-color: ${(props) => props.theme.background.dark4};
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
