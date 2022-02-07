import { Grid } from "@material-ui/core";
import styled from "styled-components";

export const FilterContainer = styled(Grid)`
    padding: 20px 10px;
`

export const FilterHeader = styled(Grid)`
    display: flex;
    justify-content: space-between;
    /* align-items: center; */
    padding: 0px 20px 30px 20px;
`

export const FilterItems = styled(Grid)`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`

export const FilterButton = styled(Grid)`
    padding-right: 30px;
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
`