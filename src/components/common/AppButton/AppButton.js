import { Button } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { useTheme } from 'styled-components'

const CustomButton = styled(Button)(({ variant, fontSize, color, fontFamily, disabled }) => {
    const theme = useTheme()
    if (variant === "fill") {
        return ({
            textTransform: "none",
            color: color || 'white !important',
            backgroundColor: disabled ? theme.colors.secondary.disabled : theme.colors.primary.navy,
            fontFamily: fontFamily || theme.fontFamily.robotoMedium,
            borderRadius: "5px",
            fontSize: fontSize || theme.fontSize.h5,
            padding: "7px 30px 7px 30px",
            "&:hover": {
                backgroundColor: theme.colors.secondary.lightNavy
            },
            "&:active": {
                backgroundColor: theme.colors.primary.navy,
            },
        })
    }
    else if (variant === "outline") {
        return ({
            textTransform: "none",
            color: disabled ? theme.colors.secondary.disabled : color || theme.colors.primary.navy,
            fontFamily: fontFamily || theme.fontFamily.robotoMedium,
            borderRadius: "7px",
            border: `2px solid ${disabled ? theme.colors.secondary.disabled : theme.colors.primary.navy}`,
            backgroundColor: "transparent",
            padding: "7px 30px 7px 30px",
            fontSize: fontSize || theme.fontSize.h5,
            "&:hover": {
                color: `${theme.colors.secondary.lightNavy} !important`,
                border: `2px solid ${theme.colors.secondary.lightNavy} !important`,
                backgroundColor: "transparent",
            },
            "&:active": {
                color: `${theme.colors.primary.navy} !important`,
                border: `2px solid ${theme.colors.primary.navy} !important`,
            },
        })
    }
    else if (variant === "none") {
        return ({
            textTransform: "none",
            color: `${disabled ? theme.colors.secondary.lightNavy : color || theme.colors.primary.navy}`,
            fontSize: fontSize || theme.fontSize.h5,
            fontFamily: fontFamily || theme.fontFamily.robotoMedium,
            padding: "7px 30px 7px 30px",
            backgroundColor: "transparent",
            "&:hover": {
                color: `${theme.colors.secondary.lightNavy} !important`,
                backgroundColor: "transparent",
            },
            "&:active": {
                color: `${theme.colors.primary.navy} !important`,
            },
        })
    }
    else {
        return ({
            textTransform: "none",
            fontSize: fontSize || theme.fontSize.h5,
            padding: "7px 30px 7px 30px",
            color: `${color || theme.colors.primary.navy} !important`,
            fontFamily: fontFamily || theme.fontFamily.robotoMedium,
        })
    }
})

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
