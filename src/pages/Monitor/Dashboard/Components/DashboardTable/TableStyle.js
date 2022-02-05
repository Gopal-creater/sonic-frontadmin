import styled from "styled-components";

export const TableWrapper = styled.div`
    background-color: #fff;
    overflow: hidden;
    margin-top: 35px;
`

export const ResizableTable = styled.table`
    width: 100%;
    display: grid;
    overflow: auto;
    overflow-y: hidden;
    grid-template-columns: 
    minmax(50px, 1fr)
    minmax(50px, 1fr)
    minmax(50px, 1fr)
    minmax(50px, 1fr)
    minmax(50px, 1fr);
`

export const StyledTableHead = styled.thead`
    display: contents;
`

export const StyledTableBody = styled.tbody`
    display: contents;
`

export const StyledTableRow = styled.tr`
    display: contents;
`

export const StyledTableHeadColumn = styled.th`
    position: relative;
    padding-bottom:15px;
    color: ${props => props.theme.colors.secondary.mediumGrey};
    font-family:${props => props.theme.fontFamily.nunitoSansRegular};
    font-size:11px;
`

export const TableResizer = styled.div`
    /* display: block; */
    position: absolute;
    cursor: col-resize;
    right: 10px !important;
    top: 0;
    width: 1px;
    height: 100%;
    z-index: 1;
    &:hover {
        background-color: ${props => props.theme.colors.secondary.mediumGrey};
    };
    &:active {
        background-color: ${props => props.theme.colors.secondary.lightNavy};
    }
`
export const TableDataColumn = styled.td`
    padding-top:15px;
    padding-bottom:15px;
    color: ${props => props.theme.colors.secondary.grey};
    font-family:${props => props.theme.fontFamily.nunitoSansBold};
`
export const AlternateDataColumn = styled.td`
    padding-top:15px;
    padding-bottom:15px;
    background-color:${props => props.theme.colors.secondary.tableColor};
    color: ${props => props.theme.colors.secondary.grey};
    font-family:${props => props.theme.fontFamily.nunitoSansBold};
`
