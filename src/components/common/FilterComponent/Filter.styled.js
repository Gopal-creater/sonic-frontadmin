import { Grid, MenuItem, Popover } from "@material-ui/core";
import styled from "styled-components";

export const Container = styled(Grid)`
  background-color: ${(props) => props.theme.colors.primary.contrastText};
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 20px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 1240px) {
    flex-direction: column;
  }
`;

export const ContainerItem = styled(Grid)`
  display: flex;
  align-items: center;
`;
export const FilterExport = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const CustomPopup = styled(Popover)`
  .MuiPaper-root {
    border-radius: 0px;
    border: 2px solid ${(props) => props.theme.colors.primary.main};
    box-shadow: none;
    min-width: 120px;
  }
`;
export const CustomMenuItem = styled(MenuItem)`
  font-family: ${(props) => props.theme.fontFamily.robotoMedium};
  font-size: ${(props) => props.theme.fontSize.content} !important;
  color: ${(props) => props.theme.colors.primary.light};
  border-bottom: 1px solid ${(props) => props.theme.colors.grey.main};
  :hover {
    background-color: ${(props) => props.theme.colors.primary.contrastText};
    color: ${(props) => props.theme.colors.primary.main};
  }
`;
