import { Popover } from "@material-ui/core";
import styled from "styled-components";
import theme from "../../../theme";

export const ActionPopup = styled(Popover)`
    margin-top: 10px;
    .MuiPaper-root {
        border-radius: 0px;
        padding: 40px 30px 20px 30px;
        border: 2px solid ${theme.colors.primary.main};
        box-shadow: none;
        width: 350px;
    }
`