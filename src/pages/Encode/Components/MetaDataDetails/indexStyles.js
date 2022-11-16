import styled from "styled-components";
import { Grid } from "@material-ui/core";

export const EncodeContainer = styled(Grid)`
  padding: 25px;
  background-color: ${(props) => props.theme.background.dark4};
`;

export const MetaDataHeaderContainer = styled(Grid)`
  background-color: ${(props) => props.theme.background.dark3};
  padding: 25px;
  position: relative;

  ::before {
    content: "";
    position: absolute;
    top: 100%;
    left: 35px;
    border-width: 20px;
    border-style: solid;
    border-color: ${(props) => props.theme.background.dark3} transparent
      transparent transparent;
  }
`;

export const CheckBoxLabelContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 3px;
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 35px;
  border-left: 3px solid ${(props) => props.theme.background.contrastText};
`;

export const MetaDataDetailsContainer = styled(Grid)`
  padding: 50px 35px 60px 35px;
`;

export const ProperAccessContainer = styled(Grid)`
  padding: 60px 0px 50px 0px;
  border-bottom: 1px solid ${(props) => props.theme.colors.secondary.mediumGrey};
`;

export const RightsHolderContainer = styled(Grid)`
  display: flex;
  align-items: center;
`;

export const RadioLabel = styled.h6`
  margin-top: 2px;
  font-family: ${(props) => props.theme.fontFamily.robotoMedium};
  color: ${(props) => props.theme.colors.grey.main};
`;

export const ButtonContainer = styled(Grid)`
  margin-top: 35px;
  display: flex;
  justify-content: flex-end;
`;

export const TextContainer = styled(Grid)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SearchTrackContainer = styled(Grid)`
  margin-top: 15px;
  padding: 30px;
  width: 100%;
  background-color: ${(props) => props.theme.background.dark4};
`;

export const PopUpContainer = styled(Grid)`
  padding: ${(props) => props.padding || "30px"};
  background-color: ${(props) => props.theme.background.dark4};
`;

export const TitleContainer = styled(Grid)`
  padding: 0px 20px 20px 20px;
  position: relative;

  ::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 65%;
    top: 35%;
    background-color: ${(props) =>
      props?.backgroundColor || props.theme.background.dark3} !important;
  }
`;

export const Anchor = styled.a`
  text-transform: underline;
  cursor: pointer;
  color: ${(props) => props.theme.colors.primary.dark};
  :hover {
    color: ${(props) => props.theme.colors.primary.main} !important ;
  }
`;

export const SelectedTrackTextContainer = styled(Grid)`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colors.primary.dark};
`;

export const UlList = styled.li`
  color: ${(props) => props.theme.colors.grey.main};
  font-family: ${(props) => props.theme.fontFamily.robotoRegular};
  font-size: ${(props) => props.theme.fontSize.content};
`;
