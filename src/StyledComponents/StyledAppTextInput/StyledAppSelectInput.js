import { InputLabel, Select } from "@material-ui/core";
import styled from "styled-components";
import theme from "../../theme";

export const StyledSelectInput = styled(InputLabel)`
    color: ${theme.colors.secondary.mediumGrey};
    font-size: ${theme.fontSize.h4};
    font-family: ${theme.fontFamily.nunitoSansBold};
`

export const StyledSelect = styled(Select)`
    color: ${theme.colors.secondary.lightNavy};
    font-size: ${theme.fontSize.h4};
    font-family: ${theme.fontFamily.nunitoSansRegular};

    .MuiSelect-root {
        background: transparent;
    }
`