import { Button } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { useTheme } from "styled-components";

const CustomButton = styled(Button)(
  ({ variant, fontSize, color, fontFamily, disabled }) => {
    const theme = useTheme();
    if (variant === "fill") {
      return {
        textTransform: "none",
        color: color || `${theme.colors.primary.contrastText} !important`,
        backgroundColor: disabled
          ? theme.colors.grey.light
          : theme.colors.primary.main,
        fontFamily: fontFamily || theme.fontFamily.robotoMedium,
        borderRadius: "5px",
        fontSize: fontSize || theme.fontSize.content,
        padding: "7px 30px 7px 30px",
        "&:hover": {
          backgroundColor: theme.colors.primary.light,
        },
        "&:active": {
          backgroundColor: theme.colors.primary.dark,
        },
      };
    } else if (variant === "outline") {
      return {
        textTransform: "none",
        color: disabled
          ? theme.colors.grey.main
          : color || theme.colors.primary.main,
        fontFamily: fontFamily || theme.fontFamily.robotoMedium,
        borderRadius: "7px",
        border: `2px solid ${
          disabled ? theme.colors.grey.main : theme.colors.primary.main
        }`,
        backgroundColor: "transparent",
        padding: "7px 30px 7px 30px",
        fontSize: fontSize || theme.fontSize.content,
        "&:hover": {
          color: `${theme.colors.primary.light} !important`,
          border: `2px solid ${theme.colors.primary.light} !important`,
          backgroundColor: "transparent",
        },
        "&:active": {
          color: `${theme.colors.primary.dark} !important`,
          border: `2px solid ${theme.colors.primary.dark} !important`,
        },
      };
    } else if (variant === "none") {
      return {
        textTransform: "none",
        color: `${
          disabled ? theme.colors.grey.main : color || theme.colors.primary.main
        }`,
        fontSize: fontSize || theme.fontSize.content,
        fontFamily: fontFamily || theme.fontFamily.robotoMedium,
        padding: "7px 30px 7px 30px",
        backgroundColor: "transparent",
        "&:hover": {
          color: `${theme.colors.primary.light} !important`,
          backgroundColor: "transparent",
        },
        "&:active": {
          color: `${theme.colors.primary.dark} !important`,
        },
      };
    } else {
      return {
        textTransform: "none",
        fontSize: fontSize || theme.fontSize.content,
        padding: "7px 30px 7px 30px",
        color: `${color || theme.colors.primary.main} !important`,
        fontFamily: fontFamily || theme.fontFamily.robotoMedium,
      };
    }
  }
);

export default function AppButton({
  children,
  variant,
  fontSize,
  fontFamily,
  color,
  disabled,
  ...props
}) {
  return (
    <CustomButton
      variant={variant}
      fontSize={fontSize}
      color={color}
      disabled={disabled}
      disableRipple
      {...props}
    >
      {children}
    </CustomButton>
  );
}
