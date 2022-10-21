import styled from "styled-components";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { FormControl, Popper, TextField, Typography } from "@material-ui/core";

const CustomPopper = styled(Popper)`
  & .MuiAutocomplete-paper {
    border-radius: 0;
    box-shadow: none;
    padding: 5px 10px;
    outline: 2px solid ${(props) => props.theme.colors.primary.main};
    margin-top: -1px;
  }

  & .MuiAutocomplete-option {
    color: ${(props) => props.theme.colors.grey.main};
    font-family: ${(props) => props.theme.fontFamily.robotoMedium};
    font-size: ${(props) => props.theme.fontSize.content};
    background: transparent;
    :hover {
      color: ${(props) => props.theme.colors.primary.light};
    }
  }
`;

const MyPopper = (props) => {
  return <CustomPopper {...props} placement="bottom" />;
};

export const StyledAutocomplete = ({ ...props }) => {
  return (
    <AutocompleteFormControl>
      <Autocomplete {...props} PopperComponent={MyPopper} />
    </AutocompleteFormControl>
  );
};

export const AutocompleteFormControl = styled(FormControl)`
  width: 100%;
  & .MuiInput-underline:hover:not(.Mui-disabled):before {
    border-color: ${(props) => props.theme.colors.primary.main};
  }
  &:hover {
    & .MuiInputLabel-formControl {
      color: ${(props) => props.theme.colors.primary.light};
    }
  }
`;

export const AutocompleteTextfield = styled(TextField)`
  & .MuiFormHelperText-root {
    color: ${(props) => props.theme.colors.grey.dark};
    font-family: ${(props) => props.theme.fontFamily.robotoRegular};
    font-size: ${(props) => props.theme.fontSize.content};
  }

  //label
  & label {
    color: ${(props) => props.theme.colors.grey.main};
    font-family: ${(props) => props.theme.fontFamily.robotoRegular};
    font-size: ${(props) => props.theme.fontSize.content};
    z-index: 1;
  }
  & label.Mui-focused {
    color: ${(props) => props.theme.colors.primary.main};
  }

  //for textInput
  & .MuiInput-root {
    color: ${(props) => props.color || props.theme.colors.primary.main};
    font-family: ${(props) =>
      props.fontFamily || props.theme.fontFamily.robotoMedium};
    font-size: ${(props) => props.fontSize || props.theme.fontSize.content};
    :hover {
      color: ${(props) => props.theme.colors.primary.light};
    }
  }
  & .MuiInput-root.Mui-focused {
    color: ${(props) => props.theme.colors.primary.dark};
  }

  // For border buttom
  & .MuiInput-underline:before {
    border-bottom-color: ${(props) => props.theme.colors.primary.light};
  }
  && .MuiInput-underline:hover:before {
    border-bottom-color: ${(props) => props.theme.colors.primary.dark};
  }
  & .MuiInput-underline:after {
    border-bottom-color: ${(props) => props.theme.colors.secondary.main};
  }
`;

export const AutocompleteMessage = styled(Typography)`
  color: ${(props) => props.theme.colors.primary.main};
  font-family: ${(props) => props.theme.fontFamily.robotoMedium};
  font-size: ${(props) => props.theme.fontSize.content};
  background: transparent;
`;
