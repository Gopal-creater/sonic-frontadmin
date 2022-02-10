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
import { useDispatch, useSelector } from 'react-redux';
import * as actionTypes from "../../../stores/actions/actionTypes"
import { log } from '../../../utils/app.debug';
import { getMonitorExportAction, getMonitorListAction } from '../../../stores/actions/monitorActions/monitorActions';
import MonitorFilter from '../Components/MonitorFilter/MonitorFilter';

export default function Artists() {
    const theme = useTheme()
    const monitor = useSelector(state => state.monitor)
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getMonitorListAction(actions, monitor?.dates?.startDate, monitor?.dates?.endDate, monitor?.artist?.data?.page, "10", "ARTISTS"))
    }, [monitor?.dates?.startDate, monitor?.dates?.endDate])

    const actions = {
        loading: actionTypes.SET_ARTIST_LOADING,
        success: actionTypes.SET_ARTIST_SUCCESS,
        error: actionTypes.SET_ARTIST_ERROR,
    }

    const handleExport = (format) => {
        dispatch(getMonitorExportAction(actions, monitor?.dates?.startDate, monitor?.dates?.endDate, format, 2000, "ARTISTS"))
    }

    const createStableArtistData = () => {
        const artistData = monitor?.artist?.data?.docs?.map((data) => {
            return (
                {
                    artistName: data?.artist,
                    country: data?.countriesCount,
                    plays: data?.playsCount,
                    radioStation: data?.radioStationCount,
                    uniquePlaysCount: data?.uniquePlaysCount,
                }
            )
        })
        return artistData
    }

    const handleArtistPageChange = (event, value) => {
        dispatch(getMonitorListAction(actions, monitor?.dates?.startDate, monitor?.dates?.endDate, value, "10", "ARTISTS"))
    }

    log("Monitor Artist:", monitor)

    return (
        <ArtistContainer>
            <H1 fontFamily={theme.fontFamily.nunitoSansBold}>My Artist</H1>
            {/* <H4
                color={theme.colors.primary.teal}
                fontFamily={theme.fontFamily.nunitoSansRegular}
            >
                Showing 1-10 of 38 tracks
            </H4> */}
            <PaginationCount
                heading={true}
                name={"Artist"}
                start={monitor?.artist?.data?.offset}
                end={monitor?.artist?.data?.docs?.length}
                total={monitor?.artist?.data?.totalDocs}
            />
            <Grid style={{ marginTop: "40px" }}>
                <FilterComponent
                    startDate={monitor?.dates?.startDate}
                    onChangeStartDate={(date) => dispatch({ type: actionTypes.SET_MONITOR_DATES, data: { ...monitor?.dates, startDate: date } })}
                    endDate={monitor?.dates?.endDate}
                    onChangeEndDate={(date) => dispatch({ type: actionTypes.SET_MONITOR_DATES, data: { ...monitor?.dates, endDate: date } })}
                    filterComponent={<MonitorFilter open={true} playsBy="ARTISTS" actions={actions} />}
                    exportData={(value) => handleExport(value)}
                />
            </Grid>

            <CommonDataLoadErrorSuccess
                error={monitor?.artist?.error}
                loading={monitor?.artist?.loading}
                onClickTryAgain={() => dispatch(getMonitorListAction(actions, monitor?.dates?.startDate, monitor?.dates?.endDate, monitor?.artist?.data?.page, "10", "ARTISTS"))}
            >
                <ArtistTable data={createStableArtistData()} />
            </CommonDataLoadErrorSuccess>

            <Grid container justifyContent="space-between" alignItems="center" style={{ marginTop: "30px" }}>
                <Grid item xs={12} sm={6} md={8}>
                    <PaginationCount
                        name="Artists"
                        total={monitor?.artist?.data?.totalDocs}
                        start={monitor?.artist?.data?.offset}
                        end={monitor?.artist?.data?.docs?.length}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <CustomPagination
                        count={monitor?.artist?.data?.totalPages}
                        page={monitor?.artist?.data?.page}
                        onChange={handleArtistPageChange}
                    />
                </Grid>
            </Grid>
        </ArtistContainer>
    );
}
