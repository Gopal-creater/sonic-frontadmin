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
        color: color || `${theme.colors.secondary.contrastText} !important`,
        backgroundColor: disabled
          ? theme.colors.grey.light
          : theme.colors.secondary.main,
        fontFamily: fontFamily || theme.fontFamily.robotoMedium,
        borderRadius: theme.border_radius,
        fontSize: fontSize || theme.fontSize.content,
        padding: "7px 30px 7px 30px",
        "&:hover": {
          backgroundColor: theme.colors.secondary.light,
        },
        "&:active": {
          backgroundColor: theme.colors.secondary.dark,
        },
      };
    } else if (variant === "outline") {
      return {
        textTransform: "none",
        color: disabled
          ? theme.colors.grey.main
          : color || theme.colors.secondary.contrastText,
        fontFamily: fontFamily || theme.fontFamily.robotoMedium,
        borderRadius: theme.border_radius,
        border: `2px solid ${
          disabled
            ? theme.colors.grey.main
            : theme.colors.secondary.contrastText
        }`,
        backgroundColor: "transparent",
        padding: "7px 30px 7px 30px",
        fontSize: fontSize || theme.fontSize.content,
        "&:hover": {
          color: `${theme.colors.primary.main} !important`,
          border: `2px solid ${theme.colors.primary.main} !important`,
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
          disabled
            ? theme.colors.grey.main
            : color || theme.colors.secondary.contrastText
        }`,
        fontSize: fontSize || theme.fontSize.content,
        fontFamily: fontFamily || theme.fontFamily.robotoMedium,
        padding: "0px 0px 0px 0px !important",
        backgroundColor: "transparent",
        "&:hover": {
          backgroundColor: "transparent",
          textDecoration: "underline",
          textDecorationColor: theme.colors.secondary.main,
          textDecorationThickness: "5px",
        },
        "&:active": {
          textDecoration: "underline",
          textDecorationColor: theme.colors.secondary.dark,
          textDecorationThickness: "5px",
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
