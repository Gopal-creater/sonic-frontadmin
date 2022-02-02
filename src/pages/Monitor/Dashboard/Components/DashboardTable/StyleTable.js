import theme from "../../../../../theme";
import styled from "styled-components";

export const TableWrapper = styled.div`
    background-color: #fff;
    overflow: hidden;
    margin-top: 40px;
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
    ;
`