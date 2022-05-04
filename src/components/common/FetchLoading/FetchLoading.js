import { CircularProgress, Grid } from '@material-ui/core'
import React from 'react'
import theme from '../../../theme'
// import { AutocompleteMessage } from '../StyledPicker'

export default function FetchLoading({ loading = false }) {
    if (loading) {
        return (
            <Grid container direction='column' alignItems='center'>
                <CircularProgress style={{ color: theme.colors.secondary.error }} size={24} />
                <div>Searching...</div>
            </Grid>
        )
    }
    return (
        <Grid container direction='column' alignItems='center'>
            <div>No Data</div>
        </Grid>
    )
}
