import { Grid } from '@material-ui/core'
import React from 'react'
import theme from '../../../theme'
import AppButton from '../AppButton/AppButton'
// import { AutocompleteMessage } from '../StyledPicker'

export default function FetchingError({ error, tryAgain }) {
    return (
        <Grid container direction='column' alignItems='center'>
            <div>{error?.message}</div>
            <AppButton
                onClick={tryAgain}
                style={{ padding: 0, background: 'transparent' }}
                color={theme.colors.secondary.error}>
                Try again...
            </AppButton>
        </Grid>
    )
}
