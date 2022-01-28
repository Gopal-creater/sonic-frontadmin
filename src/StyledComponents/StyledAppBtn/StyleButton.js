import styled from "styled-components";
import theme from "../../theme";

export const AppButton = styled.button(({ color, fontSize, fontFamily, backgroundColor, variant }) => ({
    color: color || `${theme.colors.secondary.grey} !important`,
    fontSize: fontSize || theme.fontSize.h4,
    fontFamily: fontFamily || theme.fontFamily.nunitoSansBold,
    backgroundColor: backgroundColor || `white !important`,
    "&:hover": {
        color: color || `${theme.colors.secondary.mediumNavy} !important`,
    },
    border: 'none',
}))