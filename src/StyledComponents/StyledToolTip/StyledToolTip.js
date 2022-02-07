import styled from "styled-components";
import theme from "../../theme";
import ReactTooltip from 'react-tooltip';

export const StyledToolTip = styled(ReactTooltip)`
    max-width: 230px !important;
    margin-top: 1.75rem !important;
    border: 2px solid ${theme.colors.secondary.lightNavy} !important;

    ::after{
        left: 90% !important;
    }
    ::before{
        left: 90% !important;
        border-bottom: 8px solid ${theme.colors.secondary.lightNavy}  !important;
    }
`