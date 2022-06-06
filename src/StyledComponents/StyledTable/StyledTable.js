import { TableCell, TableRow, Grid } from "@material-ui/core"
import styled from "styled-components"
import theme from "../../theme"

export const StyledTableRow = styled(TableRow)`
    background-color:${props => props?.bgColor || "white"};
    &:hover {
        box-shadow: 0 0 12px rgba(0,0,0,0.25), 0 0 12px rgba(0,0,0,0.22);
        opacity: 0.8;
    }
`
export const StyledAlternateTableRow = styled(TableRow)`
    background-color:${props => props.theme.colors.secondary.tableColor};
    &:hover {
        box-shadow: 0 0 12px rgba(0,0,0,0.25), 0 0 12px rgba(0,0,0,0.22);
        opacity: 0.8;
    }
`

export const StyledTableHead = styled(TableCell)`
    color: ${props => props.theme.colors.secondary.mediumGrey};
    font-family:${props => props.theme.fontFamily.nunitoSansBold};
    font-size:12px;
    border-bottom:none;
    cursor:pointer;
    &:hover {
        color:${props => props.theme.colors.primary.navy};
    };
    &:active {
        color:${props => props.theme.colors.secondary.lightNavy};
    };
`

export const StyledTableData = styled(TableCell)`
    color: ${props => props.theme.colors.secondary.grey};
    font-family:${props => props.theme.fontFamily.nunitoSansBold};
    border-bottom:none;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 120px;
`

export const AlternateStyledTableData = styled(TableCell)`
    color: ${props => props.theme.colors.secondary.grey};
    font-family:${props => props.theme.fontFamily.nunitoSansBold};
    border-bottom:none;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 120px;
`

export const ActiveBox = styled(Grid)`
    background-color: ${theme.colors.secondary.extraLightTeal};
    color: ${theme.colors.primary.teal};
    border-radius: 5px;
    text-align: center;
    padding: 5px 0px;
    width: 90px;
    font-size:12px;
`

export const SuspendedBox = styled(Grid)`
    background-color: ${theme.colors.secondary.mediumGrey};
    color: ${theme.colors.secondary.tableColor};
    border-radius: 5px;
    text-align: center;
    padding: 5px 0px;
    width: 90px;
    font-size:12px;

`