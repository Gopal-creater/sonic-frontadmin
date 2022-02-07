import { Grid } from '@material-ui/core';
import React from 'react';
import { useTheme } from 'styled-components';
import CommonDataLoadErrorSuccess from '../../../components/common/CommonDataLoadErrorSuccess/CommonDataLoadErrorSuccess';
import FilterComponent from '../../../components/common/FilterComponent/FilterComponent';
import { H1, H2, H3, H4 } from '../../../StyledComponents/StyledHeadings';
import { TrackContainer } from './Styles';
import TracksTable from './Component/TracksTable';
import PaginationCount from '../../../components/common/Pagination/PaginationCount';
import CustomPagination from '../../../components/common/Pagination/CustomPagination';

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

            <CommonDataLoadErrorSuccess
                error={null}
                loading={false}
                onClickTryAgain={() => { }}
            >
                <TracksTable />
            </CommonDataLoadErrorSuccess>

            <Grid container justifyContent="space-between" alignItems="center" style={{ marginTop: "30px" }}>
                <Grid item xs={12} sm={6} md={8}>
                    <PaginationCount name="Tracks" total={30} start={1} end={10} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <CustomPagination
                        count={2}
                        page={20}
                        onChange={() => { }}
                    />
                </Grid>
            </Grid>
        </TrackContainer>
    );
}
