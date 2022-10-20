import { Grid } from "@material-ui/core";
import styled from "styled-components";
import theme from "../../../../../theme";

export const Title = styled.h4(({ color, fontSize, fontFamily }) => ({
  color: color || theme.colors.primary.graphite,
  "font-size": fontSize || theme.fontSize.caption,
  "font-family": fontFamily || theme.fontFamily.baronNeueRegular,
}));

export const IconContainer = styled(Grid)`
  position: static;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const DataContainer = styled.span`
  color: ${theme.colors.primary.navy};
  font-size: ${theme.fontSize.subHeading};
  line-height: 1;
  font-family:${theme.fontFamily.baronNeueRegular}
`;

export const StatsContainer = styled(Grid)`
  background-color: white;
  padding: 20px;
  cursor: pointer;
  height: 100%;
  border-radius: 10px;

  :hover {
    background-color: white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

    ${DataContainer},${Title} {
      color: ${theme.colors.primary.dark};
      
    }
  }
`;
export const CardContainer = styled(Grid)`
  padding: 10px;
  margin-top: -30px;


  background-color: ${theme.colors.primary.navy};
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  :hover {
    background-color: ${theme.colors.primary.graphite};
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`;
