import React from "react";
import Radio from '@material-ui/core/Radio';
import theme from '../../../theme'
import styled from 'styled-components';



export const CustomRadioButton = styled(Radio)(({ color, hoverColor, backgroundColor, ...props }) => {
    return ({
        color: color || theme.colors.primary.navy,
        "&:hover": {
            color: hoverColor || theme.colors.greenTea,
            backgroundColor: backgroundColor || theme.colors.greenTeaBg,
        },
        "&.Mui-checked": {
            color: hoverColor || theme.colors.secondary.lightNavy,
            "&:hover": {
                color: hoverColor || theme.colors.greenTea,
                backgroundColor: backgroundColor || theme.colors.greenTeaBg,
            },
        },
        "&.Mui-disabled": {
            color: theme.colors.grey3,
        }
    })
})

