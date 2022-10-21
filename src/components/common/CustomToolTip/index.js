import { Tooltip } from "@material-ui/core";
import styled, { useTheme } from "styled-components";

const StyledTooltip = ({ className, placement, ...props }) => (
  <Tooltip
    {...props}
    classes={{ tooltip: className }}
    placement={placement || "bottom"}
  />
);

const CustomToolTip = styled(StyledTooltip)(
  ({ border, background, color, fontSize, marginTop }) => {
    const theme = useTheme();
    return {
      fontSize: `${fontSize || theme.fontSize.caption}`,
      fontFamily: `${theme.fontFamily.robotoMedium}`,
      color: `${color || theme.colors.secondary.main}`,
      backgroundColor: `${background || theme.colors.secondary.contrastText}`,
      borderRadius: 0,
      border: `${border || `2px solid ${theme.colors.grey.main}`}`,
      maxWidth: "250px !important",
      marginTop: `${marginTop || "0px"}`,
      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px !important",
      padding: "10px 10px 10px 15px",
      cursor: "pointer",

      "& .MuiTooltip-arrow": {
        color: "white",
        fontSize: 30,
        "&:before": {
          border: `2px solid ${theme.colors.grey.main}`,
        },
      },
    };
  }
);

export default CustomToolTip;
