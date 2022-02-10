import { TableCell, TableRow } from "@material-ui/core"
import styled from "styled-components"

export const StyledTableRow = styled(TableRow)`
&:hover {
    /* background-color: green; */
    z-index: 10000;
    /* box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 1px 5px rgba(0,0,0,0.22); */
    /* box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; */
    /* box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px; */
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
    background-color:${props => props.theme.colors.secondary.tableColor};
    border-bottom:none;
`