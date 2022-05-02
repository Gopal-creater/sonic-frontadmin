import { MenuItem, Popover } from "@material-ui/core"
import styled from "styled-components"
import theme from "../../../../theme"

export const ColumnPopup = styled(Popover)`
    .MuiPaper-root {
        border-radius: 0px;
        border: 2px solid ${theme.colors.primary.navy};
        box-shadow: none;
        max-height: 220px;
    }
`

export const ColumnMenuItem = styled(MenuItem)`
    font-family: ${theme.fontFamily.nunitoSansBold};
    font-size: ${theme.fontSize.h5};
    color: ${theme.colors.primary.graphite};
    border-bottom: 1px solid ${theme.colors.secondary.lightGrey};
    padding-right: 25px;
    :hover{
        background-color: white;
        color: ${theme.colors.secondary.lightNavy};
    }
`