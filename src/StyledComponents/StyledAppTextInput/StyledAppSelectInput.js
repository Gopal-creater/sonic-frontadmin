import { FormControl, InputLabel, Select } from "@material-ui/core";
import styled, { useTheme } from "styled-components";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    select: {
      borderRadius: 0,
      boxShadow: "none",
      outline: `2px solid ${theme.colors.grey.light}`,
      backgroundColor: `${theme.colors.primary.contrastText}`,
      marginTop: -1,

      "& li": {
        fontSize: `${theme.fontSize.content}`,
        color: `${theme.colors.grey.main}`,
        fontFamily: `${theme.fontFamily.robotoRegular}`,
      },

      "& li:hover": {
        backgroundColor: `${theme.colors.primary.contrastText}`,
        color: `${theme.colors.grey.dark}`,
      },

      "& .Mui-selected, .Mui-selected:hover": {
        backgroundColor: `${theme.colors.primary.contrastText}`,
      },
    },
  };
});

const CustomStyledSelect = ({ ...props }) => {
  const classes = useStyles();

  return (
    <CustomSelect
      {...props}
      MenuProps={{
        getContentAnchorEl: null,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left",
        },
        classes: { paper: classes.select },
      }}
    />
  );
};

export const SelectFormControl = styled(FormControl)`
  width: 100%;
  & .MuiInput-underline:hover:not(.Mui-disabled):before {
    border-color: ${(props) => props.theme.colors.primary.main};
  }
  &:hover {
    & .MuiInputLabel-formControl {
      color: ${(props) => props.theme.colors.grey.main};
    }
  }
`;

export const CustomSelect = styled(Select)`
  /* &:before {
      border-color: ${(props) => props.theme.colors.primary.main};
    }
    &::after {
      border-color: ${(props) => props.theme.colors.primary.dark};
    } */
  /* &.Mui-error::after {
      color: ${(props) => props.theme.colors.primary.dark};
      border-color: ${(props) => props.theme.colors.primary.dark};
    } */
`;

/*----------- All Select Dropdowns  -------------*/
export const StyledSelectInput = styled(InputLabel)`
  color: ${(props) => props.theme.colors.grey.main};
  font-size: ${(props) => props.theme.fontSize.content};
  font-family: ${(props) => props.theme.fontFamily.robotoRegular};
  &.Mui-focused {
    color: ${(props) => props.theme.colors.primary.main};
  }
  &.Mui-error {
    color: ${(props) => props.theme.colors.primary.dark};
  }
`;

export const StyledSelect = styled(CustomStyledSelect)(() => ({
  fontSize: `${(props) => props.theme.fontSize.content}`,
  fontFamily: `${(props) => props.theme.fontFamily.robotoRegular}`,
  color: `${(props) => props.theme.colors.grey.light}`,
  "& .MuiSelect-root": {
    background: "transparent",
  },
  "& .MuiSelect-root:hover": {
    color: `${(props) => props.theme.colors.grey.light}`,
  },
}));

/*-----------  Filter Timezone  -------------*/
export const TimezoneSelectInput = styled(InputLabel)`
  color: ${(props) => props.theme.colors.secondary.mediumGrey};
  font-size: 16px;
  font-family: ${(props) => props.theme.fontFamily.robotosBold};
  &.Mui-focused {
    color: ${(props) => props.theme.colors.primary.main};
  }
`;

export const TimezoneSelect = styled(CustomStyledSelect)(() => ({
  fontSize: `${(props) => props.theme.fontSize.subHeading}`,
  fontFamily: `${(props) => props.theme.fontFamily.robotosRegular}`,
  color: `${(props) => props.theme.colors.grey.main}`,
  "& .MuiSelect-root": {
    background: "transparent",
    paddingTop: 3,
    paddingBottom: 3,
  },
  "& .MuiSelect-root:hover": {
    color: `${(props) => props.theme.colors.primary.main}`,
  },
}));
