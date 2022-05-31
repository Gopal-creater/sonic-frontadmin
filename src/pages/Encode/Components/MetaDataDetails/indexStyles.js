import styled from "styled-components";
import { Grid } from "@material-ui/core";
import theme from "../../../../theme";

export const EncodeContainer = styled(Grid)`
    padding:20px ;
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

export const MetaDataDetailsContainer = styled(Grid)`
    padding:60px 35px 60px 35px;
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

export const ButtonContainer = styled(Grid)`
    margin-top:35px ;
    display:flex ;
    justify-content:flex-end ;
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

export const PopUpContainer = styled(Grid)`
    padding:${props => props.padding || "40px"};
`

export const TitleContainer = styled(Grid)`    
    padding:0px 20px 20px 20px;
    position:relative ;

    ::before {
        content:"";
        position: absolute;
        width: 100%;
        height:65% ;
        top:35%;
        background-color:${props => props?.backgroundColor || theme.colors.secondary.lightTeal}  !important;
    }
`

export const Anchor = styled.a`
    text-transform:underline ;
    cursor: pointer;
    color:${theme.colors.primary.graphite} ;
    :hover{
        color:${theme.colors.primary.navy} !important ;
    }
`

export const SelectedTrackTextContainer = styled(Grid)`
    display:flex ;
    align-items:center ;
`