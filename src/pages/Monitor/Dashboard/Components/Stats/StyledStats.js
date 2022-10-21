import { Grid } from "@material-ui/core";
import styled, { useTheme } from "styled-components";

export const Title = styled.h4(({ color, fontSize, fontFamily }) => {
  const theme = useTheme();
  return {
    color: color || theme.colors.primary.main,
    "font-size": fontSize || theme.fontSize.content,
    "font-family": fontFamily || theme.fontFamily.robotoMedium,
  };
});

export const IconContainer = styled(Grid)`
  position: static;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const DataContainer = styled.span`
  color: ${(props) => props.theme.colors.primary.main};
  font-size: ${(props) => props.theme.fontSize.subHeading};
  line-height: 1;
  font-family: ${(props) => props.theme.fontFamily.robotoRegular};
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
      color: ${(props) => props.theme.colors.primary.dark};
    }
  }
`;
export const CardContainer = styled(Grid)`
  padding: 10px;
  margin-top: -30px;

  background-color: ${(props) => props.theme.colors.primary.main};
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  :hover {
    background-color: ${(props) => props.theme.colors.primary.dark};
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`;
