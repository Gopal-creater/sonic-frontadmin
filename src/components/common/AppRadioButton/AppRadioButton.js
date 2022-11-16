import Radio from "@material-ui/core/Radio";
import styled, { useTheme } from "styled-components";

export const CustomRadioButton = styled(Radio)(
  ({ color, hoverColor, backgroundColor, ...props }) => {
    const theme = useTheme();
    return {
      color: color || theme.colors.grey.main,
      "&:hover": {
        color: hoverColor || theme.colors.primary.main,
        backgroundColor: backgroundColor || theme.colors.grey.light,
      },
      "&.Mui-checked": {
        color: hoverColor || theme.colors.secondary.main,
        "&:hover": {
          color: hoverColor || theme.colors.grey.main,
          backgroundColor: backgroundColor || theme.colors.grey.light,
        },
      },
      "&.Mui-disabled": {
        color: theme.colors.grey.light,
      },
    };
  }
);
