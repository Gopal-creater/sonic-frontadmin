import { Grid, IconButton } from "@material-ui/core";
import styled from "styled-components";
import theme from "../../../theme";

export const CardContainer = styled.div`
  margin-top: 60px;
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

export const StyledIconButton = styled(IconButton)(({ ...props }) => ({
  color: theme.colors.primary.navy,
  border: `2px solid ${theme.colors.primary.navy}`,
  backgroundColor: "none",
  padding: `10px 10px`,
  borderRadius: "8px",
  "&:hover": {
    color: theme.colors.greenTea,
  },
  "&.Mui-disabled": {
    color: theme.colors.grey4,
    border: `3px solid ${theme.colors.grey1} !important`,
  },
}));
