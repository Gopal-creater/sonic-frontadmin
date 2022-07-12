import { FormControl, Grid } from "@material-ui/core";
import styled from "styled-components";

export const FilterContainer = styled(Grid)`
    padding: 20px 10px;
`

export const FilterHeader = styled(Grid)`
    display: flex;
    justify-content: space-between;
    padding: 0px 20px 30px 20px;
`

export const FilterItems = styled(Grid)`
    padding: 0px 20px 0px 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`

export const SubscribeItems = styled(Grid)`
    padding: 0px 20px 0px 20px;
    display: grid;
    grid-template-columns: 1fr 1fr 100px;
    grid-gap: 20px;
    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`

export const FilterForm = styled(FormControl)`
    width: 100%;
`

export const FilterButton = styled(Grid)`
    padding-right: 30px;
    margin-top: 50px;
    display: flex;
    justify-content: flex-end;
`