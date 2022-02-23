import { TextField } from "@material-ui/core";
import styled from "styled-components";
import theme from "../../theme";

export const StyledTextField = styled(({ width, ...props }) => (
    <TextField {...props} />
))`
&& {
width:${props => props.width || "100%"};

//For label
& label {
    color:${theme.colors.secondary.lightNavy};
    font-family:${theme.fontFamily.nunitoSansRegular};
    font-size:17px;
    z-index:1;
};

& label.Mui-focused {
    font-family:${theme.fontFamily.nunitoSansRegular};
    color: ${theme.colors.primary.navy};
};

//For main input text
& .MuiInput-root {
    color:${theme.colors.secondary.lightNavy};
    font-family:${theme.fontFamily.nunitoSansRegular};
    font-size:${theme.fontSize.h4};

    /* & :-webkit-autofill::first-line {
        font-size: 28px;
    } */

    :hover {
        font-family:${theme.fontFamily.nunitoSansRegular};
        color:${theme.colors.primary.navy};
    }
};

& .MuiInput-root.Mui-focused {
    color:${theme.colors.primary.navy};
};

// For border buttom
& .MuiInput-underline:before {
    border-bottom-color: ${theme.colors.secondary.lightNavy};
  };

&& .MuiInput-underline:hover:before {
    border-bottom-color: ${theme.colors.primary.navy};
  }

& .MuiInput-underline:after {
  border-bottom-color: ${theme.colors.primary.teal};
};
}
`