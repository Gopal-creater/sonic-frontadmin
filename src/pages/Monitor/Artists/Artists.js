import { Grid } from '@material-ui/core';
import React from 'react';
import { useTheme } from 'styled-components';
import PaginationCount from '../../../components/common/Pagination/PaginationCount';
import { H1, H4 } from '../../../StyledComponents/StyledHeadings';
import FilterComponent from "../../../components/common/FilterComponent/FilterComponent"
import { ArtistContainer } from './Styles';
import CustomPagination from '../../../components/common/Pagination/CustomPagination';
import PlaysFilter from '../Plays/components/PlaysFilter';
import CommonDataLoadErrorSuccess from '../../../components/common/CommonDataLoadErrorSuccess/CommonDataLoadErrorSuccess';
import ArtistTable from './components/ArtistTable';

export default function Artists() {
    const theme = useTheme()
    const handleExport = () => { }
    return (
        <ArtistContainer>
            <H1 fontFamily={theme.fontFamily.nunitoSansBold}>My Tracks</H1>
            {/* <H4
                color={theme.colors.primary.teal}
                fontFamily={theme.fontFamily.nunitoSansRegular}
            >
                Showing 1-10 of 38 tracks
            </H4> */}
            <PaginationCount
                name={"Artist"}
                start={1}
                end={12}
                total={32}
                heading={true}
            />
            <Grid style={{ marginTop: "40px" }}>
                <FilterComponent
                    // startDate={playsList?.dates?.startDate}
                    // onChangeStartDate={(date) => dispatch({ type: actionTypes.SET_PLAYS_DATES, data: { ...playsList.dates, startDate: date } })}
                    // endDate={playsList?.dates?.endDate}
                    // onChangeEndDate={(date) => dispatch({ type: actionTypes.SET_PLAYS_DATES, data: { ...playsList.dates, endDate: date } })}
                    filterComponent={<PlaysFilter open={true} />}
                    exportData={(value) => handleExport(value)}
                />
            </Grid>

            <CommonDataLoadErrorSuccess
                error={null}
                loading={false}
                onClickTryAgain={() => { }}
            >
                <ArtistTable />
            </CommonDataLoadErrorSuccess>

            <Grid container justifyContent="space-between" alignItems="center" style={{ marginTop: "30px" }}>
                <Grid item xs={12} sm={6} md={8}>
                    <PaginationCount name="Artist" total={33} start={1} end={12} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <CustomPagination
                        count={2}
                        page={20}
                        onChange={() => { }}
                    />
                </Grid>
            </Grid>
        </ArtistContainer>
    );
}
