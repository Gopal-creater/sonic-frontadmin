import React from 'react'
import {
    FileContainer, FileSelectionContainer, NewFileSelectionContainer, ExistingFileSelectionContainer, AppAutoCompleteContainer,
    TrackContainer, TrackTitleContainer, TrackTableContainer, TrackFilterContainer
} from './EncodeStyle';
import theme from '../../theme';
import { H1, H2, H4, H5 } from '../../StyledComponents/StyledHeadings';
import { Grid } from '@material-ui/core';
import DragDropFile from '../../components/common/DragDropFile.js';
import { useDispatch, useSelector } from 'react-redux';
import * as actionTypes from "../../stores/actions/actionTypes"
import EncodeData from './Components/MetaDataDetails';
import { log } from '../../utils/app.debug.js';
import PaginationCount from '../../components/common/Pagination/PaginationCount';
import Columns from '../../components/common/Columns/Columns';
import FilterComponent from '../../components/common/FilterComponent/FilterComponent';
import MonitorFilter from '../Monitor/Components/MonitorFilter/MonitorFilter';
import { getMonitorExportAction, getMonitorListAction } from '../../stores/actions/monitorActions/monitorActions';
import CommonDataLoadErrorSuccess from '../../components/common/CommonDataLoadErrorSuccess/CommonDataLoadErrorSuccess';
import TracksTable from '../Monitor/Tracks/Component/TracksTable';
import CustomPagination from '../../components/common/Pagination/CustomPagination';
import { trackTableHeads } from '../../constants/constants';
import { getTrackTitleAction } from '../../stores/actions/picker/titlePicker.action';
import AppAutoComplete from "../../components/common/AutoComplete/AppAutoComplete"
import useMediaQuery from '@material-ui/core/useMediaQuery';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import { getEncodedTrackAction } from '../../stores/actions/EncodeActions';

export default function Encode() {
    const [state, setState] = React.useState({
        trackTableHeads: trackTableHeads,
        currentSortBy: "",
        currentIsAscending: "",
        autoCompleteValue: ""
    })

    const encode = useSelector(state => state.encode)
    const monitor = useSelector(state => state.monitor)
    const matches = useMediaQuery('(max-width:1280px)');
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getEncodedTrackAction())
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
                    country: data?.countriesCount,
                }
            )
        })
        return trackData
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

    return (
        <>
            {
                encode.selectedFile
                    ? <EncodeData /> :
                    <>
                        <FileContainer>
                            <FileSelectionContainer container>
                                <NewFileSelectionContainer item lg sm={12}>
                                    <H2 fontFamily={theme.fontFamily.nunitoSansMediumBold}>Encode new file with sonickey</H2>
                                    <H5 fontFamily={theme.fontFamily.nunitoSansBold} color={theme.colors.secondary.lightNavy}>
                                        Copy MetaData from existing track if needed.
                                    </H5>

                                    <DragDropFile
                                        handleFiles={(files) => {
                                            dispatch(({ type: actionTypes.SET_SELECTED_FILE, data: files }))
                                        }}
                                    />

                                </NewFileSelectionContainer>

                                <Grid item style={{ width: matches ? "100%" : "80px" }} container justifyContent='center' alignItems='center' >
                                    <H4 style={{ marginTop: "15px" }}>or</H4>
                                </Grid>

                                <ExistingFileSelectionContainer item container direction='column' lg sm={12}>
                                    <H2 fontFamily={theme.fontFamily.nunitoSansMediumBold}>Encode existing file</H2>
                                    <H5 fontFamily={theme.fontFamily.nunitoSansBold} color={theme.colors.secondary.lightNavy}>
                                        Encode a track multiple times to share with different distributors.
                                    </H5>
                                    <AppAutoCompleteContainer>
                                        <AppAutoComplete
                                            setTextFieldValue={typedValue => setState({ ...state, autoCompleteValue: typedValue })}
                                            textFieldValue={state.autoCompleteValue}
                                            setAutoComPleteAction={(value) => dispatch(getTrackTitleAction(value))}
                                            setAutoCompleteOptions={(option => option?.sonicKey?.contentFileName || "")}
                                            loading={encode?.encodeSearchTrack?.loading}
                                            data={encode?.encodeSearchTrack?.data?.docs || []}
                                            error={encode?.encodeSearchTrack?.error}
                                            getSelectedValue={(e, v) => log("AutoComplete selected Value", v)}
                                            placeholder={"Search for a track by title"}
                                            helperText="Search your company records"
                                        />
                                        <Grid container justifyContent='flex-end' style={{ marginRight: "-30px" }}>
                                            <HelpOutlineOutlinedIcon style={{ color: theme.colors.secondary.lightNavy, fontSize: "15px" }} />
                                        </Grid>
                                    </AppAutoCompleteContainer>
                                </ExistingFileSelectionContainer>
                            </FileSelectionContainer>
                        </FileContainer>

                        <TrackContainer>
                            <TrackTitleContainer >
                                <Grid>
                                    <H1>My Tracks</H1>
                                    <H4 color={theme.colors.primary.teal}>
                                        Browse your tracks
                                    </H4>
                                    <H5><PaginationCount start={0} end={10} total={20} name={"tracks"} /></H5>
                                </Grid>
                                <Grid>
                                    <Columns columns={state.trackTableHeads} />
                                </Grid>
                            </TrackTitleContainer>

                            <TrackFilterContainer>
                                <FilterComponent
                                    startDate={monitor?.dates?.startDate}
                                    onChangeStartDate={(date) => dispatch({ type: actionTypes.SET_MONITOR_DATES, data: { ...monitor.dates, startDate: date } })}
                                    endDate={monitor?.dates?.endDate}
                                    onChangeEndDate={(date) => dispatch({ type: actionTypes.SET_MONITOR_DATES, data: { ...monitor.dates, endDate: date } })}
                                    filterComponent={<MonitorFilter open={true} actions={actions} dashboard={true} />}
                                    exportData={(value) => handleExport(value)}
                                    pdf={false}
                                />
                            </TrackFilterContainer>

                            <TrackTableContainer>
                                <CommonDataLoadErrorSuccess
                                    error={monitor?.track?.error}
                                    loading={monitor?.track?.loading}
                                    onClickTryAgain={() => { dispatch(getMonitorListAction(actions, monitor?.dates?.startDate, monitor?.dates?.endDate, monitor?.track?.data?.page, "10", "TRACKS")) }}
                                >
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
                                </CommonDataLoadErrorSuccess>
                            </TrackTableContainer>
                        </TrackContainer>
                    </>
            }
        </>
    )
}