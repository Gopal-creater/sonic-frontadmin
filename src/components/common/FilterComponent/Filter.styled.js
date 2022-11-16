import { Grid, MenuItem, Popover } from "@material-ui/core";
import styled from "styled-components";

export const Container = styled(Grid)`
  background-color: ${(props) => props.theme.background.dark4};
  box-shadow: ${(props) => props.theme.shadows.main};
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 20px 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // @media (max-width: 1240px) {
  //   flex-direction: column;
  // }
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
    box-shadow: none;
    min-width: 120px;
    background-color: ${(props) => props.theme.background.dark4};
    border: 1px solid ${(props) => props.theme.colors.grey.dark};
  }
`;
export const CustomMenuItem = styled(MenuItem)`
  font-family: ${(props) => props.theme.fontFamily.robotoMedium};
  font-size: ${(props) => props.theme.fontSize.content} !important;
  color: ${(props) => props.theme.colors.grey.main};
  :hover {
    background-color: transparent;
    color: ${(props) => props.theme.background.contrastText};
  }
`;
