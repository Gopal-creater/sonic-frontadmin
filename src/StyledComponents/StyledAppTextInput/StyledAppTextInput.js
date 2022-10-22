import { FormControl, Grid, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import styled from "styled-components";

const useStyles = makeStyles(() => ({
  textInput: {
    "&:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 1000px white inset",
    },
  },
}));

const TextfieldFormControl = styled(FormControl)`
  width: 100%;
  &:hover {
    & .MuiInputLabel-formControl {
      color: ${(props) => props.theme.colors.primary.main};
    }
    .Mui-disabled {
      color: ${(props) => props.theme.colors.grey.light};
    }
  }
`;

const CustomTextField = styled(TextField)`
  width: ${(props) => props.width || "100%"};

  //error
  & .Mui-error {
    color: ${(props) => props.theme.colors.primary.main};
  }
  & .MuiFormHelperText-root {
    color: ${(props) => props.theme.colors.grey.main};
  }
  & .MuiInput-underline.Mui-error:after {
    border-bottom-color: ${(props) => props.theme.colors.grey.main};
  }

  //input[type=number]
  & .MuiInput-input {
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: ${(props) => props.spinner || "none"};
    }
  }

  //For label
  & label {
    color: ${(props) => props.theme.colors.grey.main};
    font-family: ${(props) => props.theme.fontFamily.robotoRegular};
    font-size: ${(props) => props.theme.fontSize.content};
  }

  & label.Mui-focused {
    color: ${(props) => props.theme.colors.grey.main};
  }

  //For main input text
  & .MuiInput-root {
    color: ${(props) => props.theme.colors.grey.main};
    font-family: ${(props) => props.theme.fontFamily.robotoRegular};
    font-size: ${(props) => props.theme.fontSize.content};

    :hover {
      color: ${(props) => props.theme.colors.grey.light};
    }
  }

  & .MuiInput-root.Mui-focused {
    color: ${(props) => props.theme.colors.primary.main};
  }

  //Inputfield Icon
  & .MuiInputAdornment-root {
    margin-left: 0;
    margin-right: 0;
  }

  // For border buttom
  & .MuiInput-underline:before {
    border-bottom-color: ${(props) => props.theme.colors.grey.main};
  }

  && .MuiInput-underline:hover:before {
    border-bottom-color: ${(props) => props.theme.colors.primary.main};
  }

  & .MuiInput-underline:after {
    border-bottom-color: ${(props) => props.theme.colors.secondary.main};
  }
`;

const DisabledLabel = styled.span`
  color: ${(props) => props.theme.colors.grey.main};
  font-family: ${(props) => props.theme.fontFamily.robotoRegular};
  font-size: ${(props) => props.theme.fontSize.content};
`;

const DisabledField = styled(Grid)`
  background-color: ${(props) => props.theme.colors.grey.light};
  display: flex;
  align-items: center;
  padding-left: 5px;
  padding-right: 5px;
  height: 45px;
  color: ${(props) => props.theme.colors.grey.main};
  font-family: ${(props) => props.theme.fontFamily.robotoRegular};
  font-size: ${(props) => props.theme.fontSize.content};
`;

export function StyledTextField({ ...props }) {
  const classes = useStyles();
  return (
    <TextfieldFormControl>
      <CustomTextField
        {...props}
        inputProps={{ className: classes.textInput }}
      />
    </TextfieldFormControl>
  );
}

export function DisabledTextField({ label, value, ...props }) {
  return (
    <TextfieldFormControl>
      <DisabledLabel>{label}</DisabledLabel>
      <DisabledField {...props}>{value || ""}</DisabledField>
    </TextfieldFormControl>
  );
}
