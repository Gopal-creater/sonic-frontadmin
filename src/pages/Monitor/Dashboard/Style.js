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
`

export const TableResizer = styled.div`
    display: block;
    position: absolute;
    cursor: col-resize;
    right: 0;
    top: 0;
    width: 2px;
    height: 100%;
    z-index: 1;
    background-color: red;
    &:hover {
        background-color: #ccc;
    };
    &:active {
        background-color: #517ea5;
    }
`