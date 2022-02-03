import { Grid } from '@material-ui/core';
import React from 'react';
import { useTheme } from 'styled-components';
import { H2, H3, H4 } from '../../../StyledComponents/StyledHeadings';
import { TrackContainer } from './Styles';

export default function Tracks() {
    const theme = useTheme()
    return (
        <TrackContainer>
            <H2 fontFamily={theme.fontFamily.nunitoSansBold}>My Tracks</H2>
            <H4
                color={theme.colors.primary.teal}
                fontFamily={theme.fontFamily.nunitoSansRegular}
            >
                Showing 1-10 of 38 tracks
            </H4>

        </TrackContainer>
    );
}
