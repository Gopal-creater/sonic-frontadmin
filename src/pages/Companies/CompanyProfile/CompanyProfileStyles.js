import styled from "styled-components";
import { Grid } from "@material-ui/core";

export const CompanyProfileContainer = styled(Grid)`
    padding:20px ;
    background-color:white ;
`

export const MetaDataHeaderContainer = styled(Grid)`
    background-color: ${(props)=>props.theme.colors.secondary.light};
    /* padding:30px ; */
    position:relative ;

    ::before {
        content:"";
        position:absolute ;
        top:100% ;
        left:35px ;
        border-width: 20px;
        border-style: solid;
        border-color:${(props)=>props.theme.colors.secondary.light} transparent transparent transparent;
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
    border-left:3px solid ${(props)=>props.theme.colors.secondary.light} ;
`

export const MetaDataDetailsContainer = styled(Grid)`
    padding:60px 35px 60px 35px;
`

export const ProperAccessContainer = styled(Grid)`
    padding:60px 0px 50px 0px;
    border-bottom:1px solid ${(props)=>props.theme.colors.secondary.mediumGrey} ;
`

export const RightsHolderContainer = styled(Grid)`
    display:flex ;
    align-items:center ;
`

export const RadioLabel = styled.h6`
    margin-top:2px ;
    font-family:${(props)=>props.theme.fontFamily.robotoBold} ;
    color:${(props)=>props.theme.colors.grey.main} ;
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