import React from "react";
import styled, { useTheme } from "styled-components";
import {
  Caption,
  Content,
} from "../../../../../StyledComponents/StyledHeadings";

const FooterContainer = styled.div`
  padding: 5;
`;

export default function Footer() {
  const theme = useTheme();
  return (
    <FooterContainer>
      <Caption color={theme.colors.grey.main}>
        <span>&#169;</span>
        {new Date().getFullYear()} SonicData Ltd. All rights reserved.
      </Caption>
      <Caption color={theme.colors.grey.dark}>
        SonicKeyTM, Returning value to the artist and rights holder.
      </Caption>
    </FooterContainer>
  );
}
