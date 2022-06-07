import { FormControlLabel, Grid, List, ListItemAvatar } from "@material-ui/core";
import styled from "styled-components";
import theme from "../../theme";

export const TuneBox = styled(Grid)`
    padding: 10px;
    border-radius: 50%;
    margin-bottom: 20px;
    background-color: ${theme.colors.secondary.lightTeal};
`

export const BorderBottom = styled(Grid)`
    margin-top: 40px;
    border-bottom: 1px solid ${theme.colors.secondary.mediumNavy};
`

export const RadioLabel = styled(FormControlLabel)`
    .MuiFormControlLabel-label {
        color: ${theme.colors.secondary.mediumGrey};
        font-family: ${theme.fontFamily.nunitoSansBold};
    }
`

export const HelperText = styled.span`
    color: ${theme.colors.secondary.error};
    font-size: 13px;
    font-family: ${theme.fontFamily.nunitoSansBold};
`