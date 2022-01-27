import { Grid } from "@material-ui/core";
import styled from "styled-components";
import theme from "../../../../../theme";

export const Title = styled.h3(({ color, fontSize, fontFamily }) => ({
    "color": color || theme.colors.primary.graphite,
    "font-size": fontSize || theme.fontSize.h3,
    "font-family": fontFamily || theme.fontFamily.nunitoSansBold
}))

export const IconContainer = styled(Grid)`
width:100%;
display:flex;
justify-content:flex-end;
`

export const OwnershipTitleContainer = styled.span`
    color:${theme.colors.secondary.grey};
    font-family:${theme.fontFamily.nunitoSansBold};
    margin-right:10px;
`

export const DataContainer = styled.span`
    color:${theme.colors.primary.navy};
    font-family:${theme.fontFamily.nunitoSansBlack};
    font-size:45px;
    line-height:1;
`

export const StatsContainer = styled(Grid)`
    background-color:${theme.colors.secondary.lightTeal};
    margin-top:25px;
    padding:15px;
    min-height:140px;
    cursor:pointer;

    :hover{
        background-color:white;
        box-shadow:0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

        ${DataContainer},${OwnershipTitleContainer},${Title} {
            color:${theme.colors.secondary.lightNavy};
        }
    }
`