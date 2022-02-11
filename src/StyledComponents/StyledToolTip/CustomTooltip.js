import { Tooltip } from "@material-ui/core";
import styled from "styled-components";
import theme from "../../theme";

const StyledTooltip = ({ className, ...props }) => (
    <Tooltip {...props} classes={{ tooltip: className }} placement="center" />
);

export const CustomTooltip = styled(StyledTooltip)(() => ({
    fontSize: `${theme.fontSize.h4}`,
    fontFamily: `${theme.fontFamily.nunitoSansBold}`,
    color: `${theme.colors.secondary.mediumNavy}`,
    backgroundColor: "#E0EFEF",
    borderRadius: 0,
}));