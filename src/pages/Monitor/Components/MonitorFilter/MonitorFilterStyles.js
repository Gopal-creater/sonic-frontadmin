import { FormControl, Grid } from "@material-ui/core";
import styled from "styled-components";

export const FilterContainer = styled(Grid)`
  padding: 20px;
  background-color: ${(props) => props.theme.background.dark4};
`;

export const FilterHeader = styled(Grid)`
  display: flex;
  justify-content: space-between;
`;

export const FilterItems = styled(Grid)`
  margin-top: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const FilterForm = styled(FormControl)`
  width: 100%;
`;

export const FilterButton = styled(Grid)`
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
`;

//Subscribe Stations
export const SubscribeContainer = styled(Grid)`
  padding: 20px 10px;
  height: 90vh;
`;

export const SubscribeItems = styled(Grid)`
  padding: 0px 20px 0px 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 100px;
  grid-gap: 20px;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const SubscribeButton = styled(Grid)`
  padding: 15px 30px;
  display: flex;
  justify-content: flex-end;
`;
