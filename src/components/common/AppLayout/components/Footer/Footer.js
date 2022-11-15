import React from "react";
import styled, { useTheme } from "styled-components";
import { tags } from "../../../../../constants/constants";
import { Caption } from "../../../../../StyledComponents/StyledHeadings";

const FooterContainer = styled.div`
  padding: 5;
`;

export default function Footer() {
  const theme = useTheme();
  return (
    <FooterContainer>
      <Caption color={theme.colors.primary.contrastTex}>
        <span>&#169;</span>
        {new Date().getFullYear()} {tags.companyName} Ltd. All rights reserved.
      </Caption>
      <Caption color={theme.colors.primary.contrastText}>
        {tags.companyTag}TM, Returning value to the artist and rights holder.
      </Caption>
    </FooterContainer>
  );
}
