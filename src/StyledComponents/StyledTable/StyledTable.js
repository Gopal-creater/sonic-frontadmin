import { TableCell, TableRow } from "@material-ui/core"
import styled from "styled-components"

export const StyledTableRow = styled(TableRow)`
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
`

export const AlternateStyledTableData = styled(TableCell)`
    color: ${props => props.theme.colors.secondary.grey};
    font-family:${props => props.theme.fontFamily.nunitoSansBold};
    border-bottom:none;
`