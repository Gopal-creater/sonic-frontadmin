import { Grid } from '@material-ui/core';
import React from 'react';
import { useTheme } from 'styled-components';
import CommonDataLoadErrorSuccess from '../../../components/common/CommonDataLoadErrorSuccess/CommonDataLoadErrorSuccess';
import FilterComponent from '../../../components/common/FilterComponent/FilterComponent';
import { H1, H2, H3, H4 } from '../../../StyledComponents/StyledHeadings';
import { TrackContainer } from './Styles';
import TracksTable from './Component/TracksTable';

export default function Tracks() {
    const theme = useTheme()
    return (
        <TrackContainer>
            <H1 fontFamily={theme.fontFamily.nunitoSansBold}>My Tracks</H1>
            <H4
                color={theme.colors.primary.teal}
                fontFamily={theme.fontFamily.nunitoSansRegular}
            >
                Showing 1-10 of 38 tracks
            </H4>

            <Grid style={{ marginTop: "40px" }}>
                <FilterComponent />
            </Grid>

            <Grid>
                <CommonDataLoadErrorSuccess
                    error={null}
                    loading={false}
                    onClickTryAgain={() => { }}
                >
                    <TracksTable />
                </CommonDataLoadErrorSuccess>
            </Grid>

        </TrackContainer>
    );
}
