import { FormControlLabel, Grid, List, ListItemAvatar } from "@material-ui/core";
import styled, { useTheme } from "styled-components";


export const TuneBox = styled(Grid)`

    padding: 10px;
    border-radius: 50%;
    margin-bottom: 20px;
    background-color: ${(props)=>props.theme.colors.secondary.light};
`

export const BorderBottom = styled(Grid)`
    margin-top: 40px;
    border-bottom: 1px solid ${(props)=>props.theme.colors.primary.light};
`

export const RadioLabel = styled(FormControlLabel)`
    .MuiFormControlLabel-label {
        color: ${(props)=>props.theme.colors.secondary.mediumGrey};
        font-family: ${(props)=>props.theme.fontFamily.robotoBold};
    }
`

export const HelperText = styled.span`
    color: ${(props)=>props.theme.colors.secondary.error};
    font-size: 13px;
    font-family: ${(props)=>props.theme.fontFamily.robotoBold};
`