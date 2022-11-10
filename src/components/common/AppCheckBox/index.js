import { Checkbox, makeStyles } from "@material-ui/core";
import React from "react";
import { useTheme } from "styled-components";

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    root: {
      display: "flex",
      alignItems: "center",
      color: (props) => props.color || theme.colors.primary.main,
      zIndex: "100",
      outline: "10px",
      "&:hover": {
        backgroundColor: theme.colors.primary.light,
      },
      "&.Mui-checked": {
        color: (props) => props.color || theme.colors.primary.main,
        "&:hover": {
          color: (props) => props.color || theme.colors.grey.main,
          backgroundColor: theme.colors.primary.light,
        },
      },
      "&.Mui-disabled": {
        color: theme.colors.grey.light,
      },
    },
  };
});

export default function AppCheckBox({ error, onChange, value, ...props }) {
  const { root } = useStyles(props);

  return (
    <Checkbox
      {...props}
      className={root}
      error={!!error || undefined}
      onChange={onChange}
      checked={value}
      inputProps={{ "aria-label": "decorative checkbox" }}
    />
  );
}
