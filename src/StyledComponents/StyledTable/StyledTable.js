import { TableCell } from "@material-ui/core"
import styled from "styled-components"

export const StyledTableHead = styled(TableCell)`
    color: ${props => props.theme.colors.secondary.mediumGrey};
    font-family:${props => props.theme.fontFamily.nunitoSansBold};
    font-size:12px;
    border-bottom:none;
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