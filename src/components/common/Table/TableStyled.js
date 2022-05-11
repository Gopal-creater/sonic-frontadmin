import { MenuItem, Popover, styled } from "@material-ui/core"
import theme from "../../../theme"

export const ActionPopup = styled(Popover)`
    margin-top: 10px;
    .MuiPaper-root {
        border-radius: 0px;
        border: 2px solid ${theme.colors.primary.navy};
        box-shadow: none;
        /* min-width: 120px; */
    }
`

export const ActionMenuItem = styled(MenuItem)`
    font-family: ${theme.fontFamily.nunitoSansBold};
    color: ${theme.colors.primary.graphite};
    border-bottom: 1px solid ${theme.colors.secondary.lightGrey};
    :hover{
        background-color: white;
        color: ${theme.colors.secondary.mediumNavy};
    }
`