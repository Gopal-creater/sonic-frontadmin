import { Grid } from '@material-ui/core';
import React from 'react';
import { useTheme } from 'styled-components';
import CommonDataLoadErrorSuccess from '../../../components/common/CommonDataLoadErrorSuccess/CommonDataLoadErrorSuccess';
import FilterComponent from '../../../components/common/FilterComponent/FilterComponent';
import { H1, H4 } from '../../../StyledComponents/StyledHeadings';
import { TrackContainer } from './Styles';
import TracksTable from './Component/TracksTable';
import PaginationCount from '../../../components/common/Pagination/PaginationCount';
import CustomPagination from '../../../components/common/Pagination/CustomPagination';
import { useDispatch, useSelector } from 'react-redux';
import { log } from '../../../utils/app.debug';
import * as actionTypes from "../../../stores/actions/actionTypes"
import { getMonitorExportAction, getMonitorListAction } from '../../../stores/actions/monitorActions/monitorActions';
import MonitorFilter from '../Components/MonitorFilter/MonitorFilter';
import { trackTableHeads } from '../../../constants/constants';

export default function Tracks() {
    const theme = useTheme()
    const monitor = useSelector(state => state.monitor)
    const dispatch = useDispatch()

    const [state, setState] = React.useState({
        trackTableHeads: trackTableHeads,
        currentSortBy: "",
        currentIsAscending: ""
    })

    React.useEffect(() => {
        dispatch(getMonitorListAction(actions, monitor?.dates?.startDate, monitor?.dates?.endDate, monitor?.track?.data?.page, "10", "TRACKS"))
    }, [monitor?.dates?.startDate, monitor?.dates?.endDate])

    const actions = {
        loading: actionTypes.SET_TRACK_LOADING,
        success: actionTypes.SET_TRACK_SUCCESS,
        error: actionTypes.SET_TRACK_ERROR
    }

    const handleExport = (format) => {
        dispatch(getMonitorExportAction(
            monitor?.dates?.startDate,
            monitor?.dates?.endDate,
            format,
            2000,
            "TRACKS",
            state?.currentSortBy,
            state?.currentIsAscending
        ))
    }

    const createStableTrackData = () => {
        const trackData = monitor?.track?.data?.docs?.map((data) => {
            return (
                {
                    trackName: data?.trackName,
                    plays: data?.playsCount,
                    radioStation: data?.radioStationCount,
                    country: data?.countriesCount
                }
            )
        })
        return trackData
    }

    const handleTrackPageChange = (event, value) => {
        dispatch(getMonitorListAction(
            actions,
            monitor?.dates?.startDate,
            monitor?.dates?.endDate,
            value,
            "10",
            "TRACKS",
            state?.currentSortBy,
            state.currentIsAscending
        ))
    }

    const trackSorting = (sortBy, isAscending, isActive) => {
        // log("sortBy, isAscending, isActive", sortBy, isAscending, isActive)
        var newTrackTableHeads = state.trackTableHeads.map((data, i) => {
            if (data.sortBy === sortBy) {
                data.isActive = isActive
                data.isAscending = isAscending
                dispatch(getMonitorListAction(
                    actions,
                    monitor?.dates?.startDate,
                    monitor?.dates?.endDate,
                    monitor?.track?.data?.page,
                    "10",
                    "TRACKS",
                    sortBy,
                    isAscending
                ))
                return data
            }
            data.isActive = false
            data.isAscending = null
            return data
        })

        return setState({ ...state, trackTableHeads: newTrackTableHeads, currentSortBy: sortBy, currentIsAscending: isAscending })
    }

    // log("Track Table Heads", state.trackTableHeads)

    return (
        <TrackContainer>
            <H1 fontFamily={theme.fontFamily.nunitoSansBold}>My Tracks</H1>
            <H4
                color={theme.colors.primary.teal}
                fontFamily={theme.fontFamily.nunitoSansRegular}
            >
                <PaginationCount
                    heading={true}
                    name="Tracks"
                    total={monitor?.track?.data?.totalDocs}
                    start={monitor?.track?.data?.offset}
                    end={monitor?.track?.data?.docs?.length}
                />
            </H4>

            <Grid style={{ marginTop: "40px" }}>
                <FilterComponent
                    startDate={monitor?.dates?.startDate}
                    onChangeStartDate={(date) => dispatch({ type: actionTypes.SET_MONITOR_DATES, data: { ...monitor?.dates, startDate: date } })}
                    endDate={monitor?.dates?.endDate}
                    onChangeEndDate={(date) => dispatch({ type: actionTypes.SET_MONITOR_DATES, data: { ...monitor?.dates, endDate: date } })}
                    filterComponent={<MonitorFilter open={true} playsBy="TRACKS" actions={actions} />}
                    exportData={(value) => handleExport(value)}
                />
            </Grid>

            <CommonDataLoadErrorSuccess
                error={monitor?.track?.error}
                loading={monitor?.track?.loading}
                onClickTryAgain={() => { dispatch(getMonitorListAction(actions, monitor?.dates?.startDate, monitor?.dates?.endDate, monitor?.track?.data?.page, "10", "TRACKS")) }}
            >
                <>
                    <TracksTable
                        data={createStableTrackData()}
                        trackTableHeads={state.trackTableHeads}
                        onTrackSorting={(sortBy, isAscending, isActive) => trackSorting(sortBy, isAscending, isActive)}
                    />
                    <Grid container justifyContent="space-between" alignItems="center" style={{ marginTop: "30px" }}>
                        <Grid item xs={12} sm={6} md={6}>
                            <PaginationCount
                                name="Tracks"
                                total={monitor?.track?.data?.totalDocs}
                                start={monitor?.track?.data?.offset}
                                end={monitor?.track?.data?.docs?.length}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <CustomPagination
                                count={monitor?.track?.data?.totalPages}
                                page={monitor?.track?.data?.page}
                                onChange={handleTrackPageChange}
                            />
                        </Grid>
                    </Grid>
                </>
            </CommonDataLoadErrorSuccess>
        </TrackContainer >
    );
}
