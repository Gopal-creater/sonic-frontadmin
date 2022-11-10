import { Grid } from "@material-ui/core";
import React from "react";
import { useTheme } from "styled-components";
import { tags } from "../../constants/constants";
import { Caption } from "../../StyledComponents/StyledHeadings";

export default function AuthFooter() {
  const theme = useTheme();
  return (
    <Grid id="footer" style={{ marginTop: "25px" }}>
      <Caption
        fontSize={theme.fontSize.caption}
        color={theme.colors.grey.main}
        fontFamily={theme.fontFamily.robotoRegular}
      >
        <span>&#169;</span> {new Date().getFullYear()} {tags.companyName} Ltd.
        All rights reserved.
      </Caption>
    </Grid>
  );
}
