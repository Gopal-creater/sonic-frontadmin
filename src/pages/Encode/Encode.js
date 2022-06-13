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
import CommonDataLoadErrorSuccess from '../../components/common/CommonDataLoadErrorSuccess/CommonDataLoadErrorSuccess';
import CustomPagination from '../../components/common/Pagination/CustomPagination';
import { tracksTableHeads } from '../../constants/constants';
import AppAutoComplete from "../../components/common/AutoComplete/AppAutoComplete"
import useMediaQuery from '@material-ui/core/useMediaQuery';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import { exportTrackAction, getEncodeSearchTracksAction, getTracksAction } from '../../stores/actions/EncodeActions';
import TracksTable from './Components/TracksTable';
import { getRoleWiseID } from '../../services/https/AuthHelper';
import * as mm from "music-metadata-browser";
import cogoToast from 'cogo-toast';
import TrackFilter from './Components/TrackFilter';

export default function Encode() {
    const [state, setState] = React.useState({
        tracksTableHeads: tracksTableHeads,
        currentSortBy: "",
        currentIsAscending: "",
        autoCompleteValue: "",
        openTrackFilter: false
    })

    const encode = useSelector(state => state.encode)
    const matches = useMediaQuery('(max-width:1280px)');
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getTracksAction(encode?.tracks.startDate, encode?.tracks?.endDate, encode?.tracks?.data?.page || 1, "10", encode?.tracks?.trackFilters))
    }, [])

    const handleExport = (format) => {
        log("format", format)
        dispatch(exportTrackAction(format, 2000, encode?.tracks?.trackFilters, state.currentSortBy, state.currentIsAscending))
    }

    const handleTrackPageChange = (event, value) => {
        dispatch(getTracksAction(encode?.tracks.startDate, encode?.tracks?.endDate, value, "10", encode?.tracks?.trackFilters, state.currentSortBy, state.currentIsAscending))
    }

    const handleDragDropFile = (files) => {
        mm.parseBlob(files?.[0], { native: true }).then((metaData) => {
            // log("MetaData", metaData)
            let data = {
                contentName: metaData?.common?.title || "",
                contentOwner: metaData?.common?.artist || "",
                contentDuration: metaData.format.duration || "",
                contentSize: files?.[0]?.size / 1024,
                contentEncoding:
                    (metaData.format.codec ? metaData.format.codec.toString() : "") +
                    (metaData.format.sampleRate
                        ? ", " + metaData.format.sampleRate.toString() + " Hz"
                        : "") +
                    (metaData.format.codecProfile
                        ? ", " + metaData.format.codecProfile.toString()
                        : "") +
                    (metaData.format.bitrate
                        ? ", " + metaData.format.bitrate.toString() + " bps"
                        : "") +
                    (metaData.format.numberOfChannels
                        ? ", " + metaData.format.numberOfChannels.toString() + " ch"
                        : ""),
                contentSamplingFrequency: metaData?.format?.sampleRate?.toString() || "" + "  Hz",
                contentFileType: files?.[0]?.type,
            }
            dispatch(({ type: actionTypes.SET_SELECTED_FILE, data: { file: files?.[0], metaData: { ...encode.metaData, ...data } } }))
        }).catch((err) => {
            cogoToast.error(err);
        })
    }

    const handleAutoCompleteSelectedValue = (v) => {
        log("Autocomplete selected value", v)
        let metaData = {
            ...encode?.metaData,
            additionalMetadata: JSON.stringify(v?.trackMetaData?.additionalMetadata),
            contentName: v?.trackMetaData?.contentName || v?.title || "",
            contentFileType: v?.trackMetaData?.contentFileType || v?.fileType || "",
            contentOwner: v?.trackMetaData?.contentOwner || v?.artist || "",
            contentDuration: v?.trackMetaData?.contentDuration || v?.duration || "",
            contentSize: v?.trackMetaData?.contentSize || v?.fileSize || "",
            contentEncoding: v?.trackMetaData?.contentEncoding || v?.encoding || "",
            contentSamplingFrequency: v?.trackMetaData?.contentSamplingFrequency || v?.samplingFrequency || "",
        }
        dispatch({ type: actionTypes.SET_SELECTED_EXISTING_FILE, data: { file: v, metaData: metaData } })
    }

    const trackSorting = (sortBy, isAscending, isActive) => {
        log("sortBy, isAscending, isActive", sortBy, isAscending, isActive)
        var newTrackTableHeads = state.tracksTableHeads.map((data) => {
            if (data.sortBy === sortBy) {
                dispatch(getTracksAction(
                    encode?.tracks.startDate,
                    encode?.tracks?.endDate,
                    encode?.tracks?.data?.page,
                    "10",
                    encode?.tracks?.trackFilters,
                    sortBy,
                    isAscending
                ))
                return { ...data, isActive: isActive, isAscending: isAscending }
            }
            return { ...data, isActive: false, isAscending: null }
        })

        log("new table heads", newTrackTableHeads)

        return setState({ ...state, tracksTableHeads: newTrackTableHeads, currentSortBy: sortBy, currentIsAscending: isAscending })
    }

    return (
        <>
            {
                encode?.selectedFile || encode?.selectedExistingFile
                    ? <EncodeData /> :
                    <>
                        <FileContainer>
                            <FileSelectionContainer container>
                                <NewFileSelectionContainer item lg sm={12}>
                                    <H2 fontFamily={theme.fontFamily.nunitoSansMediumBold}>Encode new file with sonickey</H2>
                                    <H5 fontFamily={theme.fontFamily.nunitoSansBold} color={theme.colors.secondary.lightNavy}>
                                        Copy MetaData from existing track if needed.
                                    </H5>

                                    <DragDropFile handleFiles={(files) => handleDragDropFile(files)} />
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
                                            setAutoComPleteAction={(value) => {
                                                dispatch(getEncodeSearchTracksAction(value))
                                                log("user wise role", getRoleWiseID())
                                            }}
                                            setAutoCompleteOptions={(option => option?.trackMetaData?.contentName || option?.originalFileName || "")}
                                            setAutoCompleteOptionsLabel={(option => option?.trackMetaData?.contentOwner || "")}
                                            loading={encode?.encodeSearchTrack?.loading}
                                            data={encode?.encodeSearchTrack?.data?.docs}
                                            error={encode?.encodeSearchTrack?.error}
                                            getSelectedValue={(e, v) => handleAutoCompleteSelectedValue(v)}
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
                                    <Columns columns={state.tracksTableHeads} />
                                </Grid>
                            </TrackTitleContainer>

                            <TrackFilterContainer>
                                <FilterComponent
                                    startDate={encode?.tracks.startDate}
                                    onChangeStartDate={(date) => dispatch({ type: actionTypes.SET_ENCODE_TRACKS_START_DATES, data: date })}
                                    endDate={encode?.tracks?.endDate}
                                    onChangeEndDate={(date) => dispatch({ type: actionTypes.SET_ENCODE_TRACKS_END_DATES, data: date })}
                                    filterComponent={<TrackFilter open={true} />}
                                    exportData={(value) => handleExport(value)}
                                    pdf={false}
                                    timezone={false}
                                />
                            </TrackFilterContainer>

                            <TrackTableContainer>
                                <CommonDataLoadErrorSuccess
                                    error={encode?.tracks?.error}
                                    loading={encode?.tracks?.loading}
                                    onClickTryAgain={() => dispatch(dispatch(getTracksAction(encode?.tracks.startDate, encode?.tracks?.endDate, 1, "10", encode?.tracks?.trackFilters, state.currentSortBy, state.currentIsAscending)))}
                                >
                                    <TracksTable
                                        data={encode?.tracks?.data?.docs}
                                        tableHeads={state.tracksTableHeads}
                                        trackSorting={(sortBy, isAscending, isActive) => trackSorting(sortBy, isAscending, isActive)}
                                    />
                                    <Grid container justifyContent="space-between" alignItems="center" style={{ marginTop: "30px" }}>
                                        <Grid item xs={12} sm={6} md={6}>
                                            <PaginationCount
                                                name="Tracks"
                                                total={encode?.tracks?.data?.totalDocs}
                                                start={encode?.tracks?.data?.offset}
                                                end={encode?.tracks?.data?.docs?.length}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6}>
                                            <CustomPagination
                                                count={encode?.tracks?.data?.totalPages}
                                                page={encode?.tracks?.data?.page}
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
