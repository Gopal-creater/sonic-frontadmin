import { Grid } from "@material-ui/core";
import styled from "styled-components";

export const FileSelectionContainer = styled(Grid)`
  background-color: ${(props) => props.theme.colors.primary.main};
  padding: 30px;
`;

export const NewFileSelectionContainer = styled(Grid)`
  /* background-color:red ; */
  /* display:flex;
    flex-direction:column ; */
`;

export const ExistingFileSelectionContainer = styled(Grid)`
  /* background-color:yellow ; */
  /* display:flex;
    flex-direction:column ; */
`;

export const AppAutoCompleteContainer = styled(Grid)`
  background-color: white;
  margin-top: 15px;
  padding: 30px 40px 10px 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  flex: 1;
`;
export const TrackContainer = styled(Grid)`
  margin-top: 40px;
  padding: 30px;
  background-color: ${(props) => props.theme.colors.primary.contrastText};
`;

export const TrackTitleContainer = styled(Grid)`
  display: flex;
  justify-content: space-between;
`;

export const TrackFilterContainer = styled(Grid)`
  /* margin-top:1px ; */
`;

export const TrackTableContainer = styled(Grid)`
  margin-top: 25px;
`;
