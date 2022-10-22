import { FormControl, Grid, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import styled from "styled-components";
import theme from "../../theme";

const useStyles = makeStyles(() => ({
    textInput: {
        "&:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 1000px white inset"
        }
    },
}));

const TextfieldFormControl = styled(FormControl)`
    width: 100%;
    &:hover {
        & .MuiInputLabel-formControl {
            color: ${theme.colors.primary.main};
        }
        .Mui-disabled {
            color:${theme.colors.grey.main};
        }
    }
`

const CustomTextField = styled(TextField)`
    width: ${props => props.width || "100%"};

    //error
    & .Mui-error {
        color: ${theme.colors.primary.dark};
    }
    & .MuiFormHelperText-root {
        color: ${theme.colors.secondary.error};
    }
    & .MuiInput-underline.Mui-error:after {
        border-bottom-color: ${theme.colors.secondary.error};
    }

    //input[type=number]
    & .MuiInput-input {
        &::-webkit-outer-spin-button, &::-webkit-inner-spin-button {
            -webkit-appearance: ${props => props.spinner || "none"};
        }
    }

    //For label
    & label {
        color:${theme.colors.grey.dark};
        font-family:${theme.fontFamily.robotoRegular};
        font-size:17px;
    };

    & label.Mui-focused {
        color: ${theme.colors.primary.main};
    };

    //For main input text
    & .MuiInput-root {
        color:${theme.colors.secondary.grey};
        font-family:${theme.fontFamily.robotoRegular};
        font-size:${theme.fontSize.h4};

        :hover {
            color:${theme.colors.secondary.mediumNavy};
        }
    };

    & .MuiInput-root.Mui-focused {
        color:${theme.colors.primary.navy};
    };

    //Inputfield Icon
    & .MuiInputAdornment-root {
        margin-left: 0;
        margin-right: 0;
    };

    // For border buttom
    & .MuiInput-underline:before {
        border-bottom-color: ${theme.colors.grey.main};
    };

    && .MuiInput-underline:hover:before {
        border-bottom-color: ${theme.colors.primary.main};
    }

    & .MuiInput-underline:after {
        border-bottom-color: ${theme.colors.primary.dark};
    };
`

const DisabledLabel = styled.span`
    color: ${theme.colors.grey.main};
    font-family: ${theme.fontFamily.robotoMedium};
    font-size: 12px;
`

const DisabledField = styled(Grid)`
    background-color: ${theme.colors.grey.light};
    display: flex;
    align-items: center;
    padding-left: 5px;
    padding-right: 5px;
    height: 35px;
    color: ${theme.colors.grey.main};
    font-family: ${theme.fontFamily.robotoRegular};
    font-size:${theme.fontSize.content};
`

export function StyledTextField({ ...props }) {
    const classes = useStyles();
    return (
        <TextfieldFormControl>
            <CustomTextField  {...props} inputProps={{ className: classes.textInput }} />
        </TextfieldFormControl>
    )
}

export function DisabledTextField({ label, value, ...props }) {
    return (
        <TextfieldFormControl>
            <DisabledLabel>{label}</DisabledLabel>
            <DisabledField {...props}>{value || ""}</DisabledField>
        </TextfieldFormControl>
    )
} 
