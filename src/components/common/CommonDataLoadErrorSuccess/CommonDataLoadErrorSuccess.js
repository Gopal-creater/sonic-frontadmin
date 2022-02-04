import { CircularProgress, Grid } from '@material-ui/core';
import React from 'react';
import styled, { useTheme } from 'styled-components';
import { H4, H5 } from '../../../StyledComponents/StyledHeadings';
import AppButton from '../AppButton/AppButton';

const LoadErrorContainer = styled(Grid)`
    width: 100%;
    min-height: 100px;
    padding: 50px;
`

export default function CommonDataLoadErrorSuccess({ error, loading, onClickTryAgain, children }) {
    const theme = useTheme()
    if (error) {
        return (
            <LoadErrorContainer container direction='column' alignItems='center'>
                <H5 color={theme.colors.secondary.error}>
                    {error || "Opps You got an error..."}
                </H5>
                <AppButton
                    variant="outline"
                    onClick={onClickTryAgain}
                    color={theme.colors.secondary.error}
                    style={{
                        border: `2px solid ${theme.colors.secondary.error}`,
                    }}
                >
                    Try Again...
                </AppButton>
            </LoadErrorContainer>
        );
    }
    if (loading) {
        return (
            <LoadErrorContainer container direction='column' alignItems='center'>
                <Grid>
                    <CircularProgress style={{ color: theme.colors.primary.navy }} />
                </Grid>
                <H4 color={theme.colors.primary.navy}>
                    Fetching Data...
                </H4>
            </LoadErrorContainer>
        )
    }
    return children
}
