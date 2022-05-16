import { FormControl, Grid, TextField } from "@material-ui/core";
import styled from "styled-components";
import theme from "../../theme";

const TextfieldFormControl = styled(FormControl)`
    width: 100%;
    &:hover {
        & .MuiInputLabel-formControl {
            color: ${theme.colors.secondary.mediumNavy};
        }
    }
`

const CustomTextField = styled(TextField)`
    width: ${props => props.width || "100%"};

    //error
    & .Mui-error {
        color: ${theme.colors.primary.graphite};
    }
    & .MuiFormHelperText-root {
        color: ${theme.colors.secondary.error};
    }
    & .MuiInput-underline.Mui-error:after {
        border-bottom-color: ${theme.colors.secondary.error};
    }

    //For label
    & label {
        color:${theme.colors.secondary.mediumGrey};
        font-family:${theme.fontFamily.nunitoSansRegular};
        font-size:17px;
    };

    & label.Mui-focused {
        color: ${theme.colors.primary.navy};
    };

    //For main input text
    & .MuiInput-root {
        color:${theme.colors.secondary.grey};
        font-family:${theme.fontFamily.nunitoSansRegular};
        font-size:${theme.fontSize.h4};

        /* & :-webkit-autofill::first-line {
        font-size: 28px;
        } */

        :hover {
            color:${theme.colors.secondary.mediumNavy};
        }
    };

    & .MuiInput-root.Mui-focused {
        color:${theme.colors.primary.navy};
    };

    // For border buttom
    & .MuiInput-underline:before {
        border-bottom-color: ${theme.colors.secondary.grey};
    };

    && .MuiInput-underline:hover:before {
        border-bottom-color: ${theme.colors.primary.navy};
    }

    & .MuiInput-underline:after {
        border-bottom-color: ${theme.colors.primary.teal};
    };
`

const DisabledLabel = styled.span`
    color: ${theme.colors.secondary.grey};
    font-family: ${theme.fontFamily.nunitoSansRegular};
    font-size: 12px;
`

const DisabledField = styled(Grid)`
    background-color: ${theme.colors.secondary.lightGrey};
    padding: 8px 5px;
    color: ${theme.colors.secondary.grey};
    font-family: ${theme.fontFamily.nunitoSansRegular};
    font-size:${theme.fontSize.h4};
`

export function StyledTextField({ ...props }) {
    return (
        <TextfieldFormControl>
            <CustomTextField  {...props} />
        </TextfieldFormControl>
    )
}

export function DisabledTextField({ label, value, ...props }) {
    return (
        <TextfieldFormControl>
            <DisabledLabel>{label}</DisabledLabel>
            <DisabledField {...props}>{value}</DisabledField>
        </TextfieldFormControl>
    )
} 
