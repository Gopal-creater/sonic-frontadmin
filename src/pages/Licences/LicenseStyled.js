import { FormControlLabel, Grid } from "@material-ui/core";
import styled from "styled-components";
import theme from "../../theme";

export const LicenseContainer = styled(Grid)`
    margin-bottom: 40px;
    background-color: white;
    padding: 2% 2.5%;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`

export const AddLicenseContainer = styled(Grid)`
    margin-bottom: 40px;
    background-color: white;
    padding: 2% 2.5%;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`

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
    font-family: ${theme.fontFamily.nunitoSansBold}
`