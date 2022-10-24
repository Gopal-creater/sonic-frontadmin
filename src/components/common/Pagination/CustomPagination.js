import React from "react";
import { Pagination } from "@material-ui/lab";
import { makeStyles } from "@material-ui/styles";
import { useTheme } from "styled-components";

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    root: {
      "& > *": { justifyContent: "space-between" },
      "& ul > li:not(:first-child):not(:last-child) > button:not(.Mui-selected)":
        {
          backgroundColor: "transparent",
          textAlign: "center",
          color: theme.colors.primary.dark,
          "&:hover": {
            color: theme.colors.primary.light,
          },
        },
      ".MuiPaginationItem-root": {
        backgroundColor: theme.colors.primary.contrastText,
        width: "100%",
      },
      "&:hover .MuiPaginationItem-root": {
        backgroundColor: theme.colors.primary.contrastText,
      },
      "& .Mui-selected": {
        fontSize: theme.fontSize.content,
        padding: "1px",
        margin: "1px",
        color: theme.colors.primary.dark,
        border: `1px solid ${theme.colors.secondary.main}`,
        backgroundColor: theme.colors.primary.contrastText,
        borderRadius: 0,
        fontFamily: theme.fontFamily.robotoMedium,
      },
      "& .MuiPaginationItem-textPrimary": {
        fontSize: theme.fontSize.subHeading,
        padding: "1px",
        margin: "1px",
        color: theme.colors.primary.main,
        fontFamily: theme.fontFamily.robotoMedium,
      },
      "& .MuiPaginationItem-icon": {
        fontSize: theme.fontSize.heading,
        color: theme.colors.primary.main,
        border: `1px solid ${theme.colors.primary.main}`,
        borderRadius: 8,
        "& .Mui-disabled": {
          border: `1px solid ${theme.colors.grey.main}`,
        },
      },
      "&:hover .MuiPaginationItem-icon": {
        border: `1px solid ${theme.colors.primary.main}`,
      },
    },
  };
});

export default function CustomPagination({ count, page, ...props }) {
  const classes = useStyles();

  return (
    <div>
      <Pagination
        classes={{
          root: classes.root,
        }}
        count={count}
        page={page}
        shape="rounded"
        disableFocusRipple
        disableRipple
        {...props}
      />
    </div>
  );
}
