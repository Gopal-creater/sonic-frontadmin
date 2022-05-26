import { Grid } from "@material-ui/core";
import styled from "styled-components";
import theme from "../../theme";

export const FileContainer = styled(Grid)`
    background-color:white ;
    padding:20px;
    /* box-shadow:18px 8px 8px ${theme.colors.secondary.grey} ; */
`

export const FileSelectionContainer = styled(Grid)`
    background-color: ${theme.colors.secondary.extraLightTeal};
    padding: 2.1rem;
`

export const NewFileSelectionContainer = styled(Grid)`
    /* background-color:red ; */
    /* display:flex;
    flex-direction:column ; */
`

export const ExistingFileSelectionContainer = styled(Grid)`
    /* background-color:yellow ; */
    /* display:flex;
    flex-direction:column ; */
`

export const AppAutoCompleteContainer = styled(Grid)`
    background-color:white ;
    margin-top:15px ;
    padding:30px 40px 10px 40px;
    display:flex ;
    flex-direction:column ;
    align-items: flex-end;
    justify-content:flex-end ;
    flex:1 ;
`
export const TrackContainer = styled(Grid)`
    margin-top:40px ;
    padding:40px ;
    background-color:white ;
`

export const TrackTitleContainer = styled(Grid)`
    display:flex ;
    justify-content:space-between ;
`

export const TrackFilterContainer = styled(Grid)`
    /* margin-top:1px ; */
`

export const TrackTableContainer = styled(Grid)`
    margin-top:25px ;
`