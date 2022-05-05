import styled from "styled-components";
import { Grid } from "@material-ui/core";
import theme from "../../../../theme";

export const EncodeContainer = styled(Grid)`
    padding:15px ;
    background-color:white ;
`

export const MetaDataHeaderContainer = styled(Grid)`
    background-color: ${theme.colors.secondary.extraLightTeal};
    padding:30px ;
    position:relative ;

    ::before {
        content:"";
        position:absolute ;
        top:100% ;
        left:35px ;
        border-width: 20px;
        border-style: solid;
        border-color:${theme.colors.secondary.extraLightTeal} transparent transparent transparent;
    }
`