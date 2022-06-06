import { Tooltip } from "@material-ui/core";
import styled from "styled-components";
import theme from "../../../theme";

const StyledTooltip = ({ className, placement, ...props }) => (
    <Tooltip {...props} classes={{ tooltip: className }} placement={placement || "bottom"} />
);

const CustomToolTip = styled(StyledTooltip)(({ border, background, color, fontSize, marginTop }) => ({
    fontSize: `${fontSize || "13px"}`,
    fontFamily: `${theme.fontFamily.nunitoSansBold}`,
    color: `${color || theme.colors.primary.teal}`,
    backgroundColor: `${background || "white"}`,
    borderRadius: 0,
    border: `${border || `2px solid ${theme.colors.secondary.lightNavy}`}`,
    maxWidth: "250px !important",
    marginTop: `${marginTop || "0px"}`,
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px !important",
    padding: "10px 10px 10px 15px",

    "& .MuiTooltip-arrow": {
        color: 'white',
        fontSize: 30,
        "&:before": {
            border: `2px solid ${theme.colors.secondary.lightNavy}`
        },
    }
}));

export default CustomToolTip