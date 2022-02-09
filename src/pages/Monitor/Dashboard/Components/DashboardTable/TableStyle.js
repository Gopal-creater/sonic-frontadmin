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
    padding: 16px 5px 16px 5px;
    color: ${props => props.theme.colors.secondary.mediumGrey};
    font-family:${props => props.theme.fontFamily.nunitoSansRegular};
    font-size:11px;
    display: flex;
    justify-content:flex-start;
    &:hover {
        color:${props => props.theme.colors.primary.navy};
    };
    &:active {
        color:${props => props.theme.colors.secondary.lightNavy};
    };
    cursor: pointer;
`

export const TableResizer = styled.div`
    /* display: block; */
    position: absolute;
    cursor: col-resize;
    right: 10px !important;
    top: 0;
    width: 2px;
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
    padding: 16px 20px 16px 5px;
    color: ${props => props.theme.colors.secondary.grey};
    font-family:${props => props.theme.fontFamily.nunitoSansBold};
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`

export const AlternateDataColumn = styled.td`
    padding: 16px 20px 16px 5px;
    background-color:${props => props.theme.colors.secondary.tableColor};
    color: ${props => props.theme.colors.secondary.grey};
    font-family:${props => props.theme.fontFamily.nunitoSansBold};
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`