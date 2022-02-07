import { Grid } from "@material-ui/core";
import styled from "styled-components";

export const CardContainer = styled.div`
    margin-top:25px;
    display: grid;
    grid-template-columns: auto auto auto auto;
    grid-column-gap:30px;

    @media (max-width:${props => props.theme.devices.tablet}){
        grid-template-columns: auto !important;
        grid-row-gap:20px;
    }

    @media (max-width:${props => props.theme.devices.laptopL}){
        grid-template-columns: auto auto;
        grid-row-gap:20px;
    }
`

export const TableContainer = styled(Grid)`
    background-color:white;
    margin-top:30px;
    padding: 45px;
`