import styled from "styled-components";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Popper, TextField, Typography } from "@material-ui/core";
import theme from "../../../theme";

const CustomPopper = styled(Popper)`
    & .MuiAutocomplete-paper {
        border-radius: 0;
        box-shadow: none;
        padding: 5px 10px;
        outline: 2px solid ${theme.colors.primary.navy};
        margin-top: -1px;
    }

    & .MuiAutocomplete-option {
        color: ${theme.colors.secondary.grey};
        font-family:${theme.fontFamily.nunitoSansRegular};
        font-size: ${theme.fontSize.h5};
        background: transparent;
        :hover {
            color: ${theme.colors.secondary.mediumNavy};
        }
    }
`

const MyPopper = (props) => {
    return <CustomPopper {...props} placement="bottom" />;
};

export const StyledAutocomplete = ({ ...props }) => {
    return (
        <Autocomplete {...props} PopperComponent={MyPopper} />
    )
};

export const AutocompleteTextfield = styled(TextField)`
     //label
     & label {
        color:${theme.colors.primary.navy};
        font-family:${theme.fontFamily.nunitoSansRegular};
        font-size: ${theme.fontSize.h4};
        z-index: 1;
    }
    & label.Mui-focused {
        color: ${theme.colors.secondary.lightGrey};
    };

    //for textInput
    & .MuiInput-root{
        color: ${theme.colors.primary.navy};
        font-family:${theme.fontFamily.nunitoSansRegular};
        font-size: ${theme.fontSize.h4};
        :hover {
            color:${theme.colors.secondary.mediumNavy};
        }
    }
    & .MuiInput-root.Mui-focused {
        color:${theme.colors.primary.graphite};
    };

    // For border buttom
    & .MuiInput-underline:before {
        border-bottom-color: ${theme.colors.secondary.lightNavy};
    };
    && .MuiInput-underline:hover:before {
        border-bottom-color: ${theme.colors.primary.graphite};
    }
    & .MuiInput-underline:after {
        border-bottom-color: ${theme.colors.primary.teal};
    }
`

export const AutocompleteMessage = styled(Typography)`
    color: ${theme.colors.primary.navy};
    font-family:${theme.fontFamily.nunitoSansRegular};
    font-size: ${theme.fontSize.h6};
    background: transparent;
`