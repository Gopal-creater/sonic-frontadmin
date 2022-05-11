import { Grid } from "@material-ui/core";
import styled from "styled-components";
import theme from "../../theme";

export const FileContainer = styled(Grid)`
    background-color:white ;
    padding:15px;
    /* box-shadow:18px 8px 8px ${theme.colors.secondary.grey} ; */
`

export const FileSelectionContainer = styled(Grid)`
    background-color: ${theme.colors.secondary.extraLightTeal};
    padding: 2.1rem;
`

export const NewFileSelectionContainer = styled(Grid)`
    /* background-color:red ; */
`

export const ExistingFileSelectionContainer = styled(Grid)`
    /* background-color:yellow ; */
`

export const AppAutoCompleteContainer = styled(Grid)`
    flex:1 ;
    background-color:white ;
    margin-top:15px ;
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