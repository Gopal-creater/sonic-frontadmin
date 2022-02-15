import { Grid } from "@material-ui/core";
import styled from "styled-components";

export const CardContainer = styled.div`
    margin-top:25px;
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    grid-column-gap:25px;

    @media (max-width:${props => props.theme.devices.tablet}){
        grid-template-columns: auto !important;
        grid-row-gap:20px;
    }

    @media (max-width:${props => props.theme.devices.laptopL}){
        grid-template-columns: repeat(2, minmax(0, 1fr));
        grid-row-gap:20px;
    }
`

export const TableContainer = styled(Grid)`
    background-color:white;
    margin-top:30px;
    padding: 35px;
`