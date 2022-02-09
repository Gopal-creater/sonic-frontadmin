import { Grid, MenuItem, Popover } from "@material-ui/core";
import styled from "styled-components";
import theme from "../../../theme";

export const Container = styled(Grid)`
    background-color: white;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    margin-top: 30px;
    margin-bottom: 30px;
    padding: 20px 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const ContainerItem = styled(Grid)`
    display: flex;
    align-items: center;
`
export const FilterExport = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`;

export const CustomPopup = styled(Popover)`
    .MuiPaper-root {
        border-radius: 0px;
        border: 2px solid ${theme.colors.secondary.lightNavy};
        box-shadow: none;
        min-width: 120px;
    }
`
export const CustomMenuItem = styled(MenuItem)`
    font-family: ${theme.fontFamily.nunitoSansRegular};
    color: ${theme.colors.primary.graphite};
    border-bottom: 1px solid ${theme.colors.secondary.lightGrey};
    :hover{
        background-color: white;
        color: ${theme.colors.secondary.lightNavy};
    }
`