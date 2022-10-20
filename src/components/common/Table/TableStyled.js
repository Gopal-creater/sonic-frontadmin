import { MenuItem, Popover, styled } from "@material-ui/core";
import { createStyles, withStyles } from "@material-ui/styles";
import theme from "../../../theme";

export const ActionPopup = styled(Popover)`
  margin-top: 10px;
  .MuiPaper-root {
    border-radius: 0px;
    border: 2px solid ${theme.colors.primary.navy};
    box-shadow: none;
    /* min-width: 120px; */
  }
`;

export const ActionMenuItem = withStyles(() =>
  createStyles({
    root: {
      color: theme.colors.grey.main,
      fontSize: theme.fontSize.caption,
      "&:hover": {
        backgroundColor: theme.colors.primary.contrastText,
        color: theme.colors.primary.light,
      },
    },
    selected: {
      color: theme.colors.primary.main,
    },
  })
)(MenuItem);
