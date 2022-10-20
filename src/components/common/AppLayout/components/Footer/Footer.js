import React from "react";
import styled, { useTheme } from "styled-components";
import {H6 } from "../../../../../StyledComponents/StyledHeadings";

const FooterContainer = styled.div`
  padding: 5;
`;

export default function Footer() {
  const theme = useTheme();
  return (
    <FooterContainer>
      <H6
        fontFamily={theme.fontFamily.nunitoSansBold}
        color={theme.colors.secondary.lightNavy}

      >
        <span>&#169;</span>
        {new Date().getFullYear()} SonicData Ltd. All rights reserved.
      </H6>
      <H6
        fontFamily={theme.fontFamily.nunitoSansBlack}
        color={theme.colors.secondary.lightNavy}
      >
        SonicKeyTM, Returning value to the artist and rights holder.
      </H6>
    </FooterContainer>
  );
}
