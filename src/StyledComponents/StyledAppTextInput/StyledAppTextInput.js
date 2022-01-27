import { TextField } from "@material-ui/core";
import styled from "styled-components";
import theme from "../../theme";

export const StyledTextField = styled(({ width, ...props }) => (
    <TextField {...props} />
))`
    color:red;
    width:${props => props.width || "100%"}
`