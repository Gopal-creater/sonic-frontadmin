import styled from "styled-components";
import { Grid } from "@material-ui/core";
import theme from "../../theme";

export const IconBox = styled(Grid)`
    padding: 10px;
    border-radius: 50%;
    margin-bottom: 10px;
    background-color: ${theme.colors.primary.light};
`

export const BorderBottom = styled(Grid)`
    margin-top: 40px;
    border-bottom: 1px solid ${theme.colors.primary.light};
`