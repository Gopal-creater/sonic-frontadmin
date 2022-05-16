import styled from "styled-components";
import { Grid } from "@material-ui/core";
import theme from "../../theme";

export const CheckBoxLabelContainer = styled.div`
    display:flex ;
    margin-top:10px ;
`

export const IconContainer = styled.div`
    display:flex ;
    align-items:center ;
    justify-content:center ;
    padding:35px;
    border-left:3px solid ${theme.colors.secondary.lightTeal} ;
`

export const ProperAccessContainer = styled(Grid)`
    padding:60px 0px 50px 0px;
    border-bottom:1px solid ${theme.colors.secondary.mediumGrey} ;
`

export const RightsHolderContainer = styled(Grid)`
    display:flex ;
    align-items:center ;
`

export const RadioLabel = styled.h6`
    margin-top:2px ;
    font-family:${theme.fontFamily.nunitoSansBold} ;
    color:${theme.colors.secondary.grey} ;
`

export const TextContainer = styled(Grid)`
    display:flex ;
    justify-content:space-between ;
    align-items:center ;
`

export const SearchTrackContainer = styled(Grid)`
    margin-top:15px ;
    padding:30px;
    width:100% ;
    background-color:white ;
`

export const BorderBottom = styled(Grid)`
    margin-top: 40px;
    border-bottom: 1px solid ${theme.colors.secondary.mediumNavy};
`