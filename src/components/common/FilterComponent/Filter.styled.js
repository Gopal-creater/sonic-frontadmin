import { Grid } from "@material-ui/core";
import styled from "styled-components";

export const Container = styled(Grid)`
    background-color: white;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    margin-top: 30px;
    margin-bottom: 30px;
    padding: 20px 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const ContainerItem = styled(Grid)`
    display: flex;
    align-items: center;
`
export const FilterExport = styled.div`
    display: flex;
    align-items: center;
    margin-left: 40px;
    cursor: pointer;
`;

export const Image = styled.img`
    width: 25px;
    height: 25px;
    margin-right: 10px;
`;