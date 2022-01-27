import { Grid } from "@material-ui/core";
import styled from "styled-components";
import theme from "../../../../../theme";
import wave from "../../../../../assets/images/wave-pages.svg"

export const WelcomeBackContainer = styled(Grid)`
    background-color:${theme.colors.primary.navy};
    padding:30px 30px 30px 40px;
    background-image:url(${wave});
    background-repeat:no-repeat;
    background-positionY:top;
    background-positionX:right;
`