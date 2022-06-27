import React from "react";
import Radio from '@material-ui/core/Radio';
import theme from '../../../theme'
import styled from 'styled-components';



export const CustomRadioButton = styled(Radio)(({ color, hoverColor, backgroundColor, ...props }) => {
    return ({
        color: color || theme.colors.primary.navy,
        "&:hover": {
            color: hoverColor || theme.colors.primary.navy,
            backgroundColor: backgroundColor || theme.colors.secondary.extraLightTeal,
        },
        "&.Mui-checked": {
            color: hoverColor || theme.colors.primary.navy,
            "&:hover": {
                color: hoverColor || theme.colors.secondary.grey,
                backgroundColor: backgroundColor || theme.colors.secondary.extraLightTeal,
            },
        },
        "&.Mui-disabled": {
            color: theme.colors.secondary.grey,
        }
    })
})

