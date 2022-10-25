import styled from "styled-components";


export const ProgressContainer = styled.div`
    background-color:${props => props.bgColor || props.theme.colors.secondary.mediumGrey} ;
    height: ${props => props.height || "20px"};
    width:${props => props.width || "100%"};
    border-radius: ${props => props.borderRadius || "10px"};
    color:${props => props.textColor || "white"};
    display:flex ;
    justify-content:center ;
    align-items:center ;
    margin-top:20px ;
    font-size:10px ;
    font-family:${props => props.theme.fontFamily.robotoRegular} ;
    position:relative ;

    ::before {
        content:"" ;
        width:${props => props.percentComplete + "%" || "0%"};
        max-width: 100%;
        height:100% ;
        background-color:${props => props.progressBgColor || props.theme.colors.primary.dark} ;
        left:0 ;
        position:absolute ;
        border-radius: ${props => props.borderRadius || "10px"};
    }
`

export const LabelContainer = styled.span`
    z-index:1 ;
`