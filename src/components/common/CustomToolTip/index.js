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
      backgroundColor: `${background || theme.colors.primary.light}`,
      borderRadius: 0,
      border: "none",
      maxWidth: "250px !important",
      marginTop: `${marginTop || "0px"}`,
      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px !important",
      padding: "10px 10px 10px 15px",
      cursor: "pointer",

      "& .MuiTooltip-arrow": {
        color: theme.colors.primary.light,
        fontSize: 30,
        "&:before": {
          border: "none",
        },
      },
    };
  }
);

export default CustomToolTip;
