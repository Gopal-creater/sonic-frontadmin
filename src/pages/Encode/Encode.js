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
import CommonDataLoadErrorSuccess from '../../components/common/CommonDataLoadErrorSuccess/CommonDataLoadErrorSuccess';
import CustomPagination from '../../components/common/Pagination/CustomPagination';
import { TracksTableHeads } from '../../constants/constants';
import AppAutoComplete from "../../components/common/AutoComplete/AppAutoComplete"
import useMediaQuery from '@material-ui/core/useMediaQuery';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import { getEncodeSearchTracksAction, getTracksAction } from '../../stores/actions/EncodeActions';
import TracksTable from './Components/TracksTable';

export default function Encode() {
    const [state, setState] = React.useState({
        tracksTableHeads: TracksTableHeads,
        currentSortBy: "",
        currentIsAscending: "",
        autoCompleteValue: ""
    })

    const encode = useSelector(state => state.encode)
    const matches = useMediaQuery('(max-width:1280px)');
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getTracksAction(encode?.tracks.startDate, encode?.tracks?.endDate, encode?.tracks?.data?.page || 1, "10"))
    }, [])

    const handleExport = (format) => {

    }

    const handleTrackPageChange = (event, value) => {
        dispatch(getTracksAction(encode?.tracks.startDate, encode?.tracks?.endDate, value, "10"))
    }

    log("Encode", encode)

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
                                            setAutoComPleteAction={(value) => dispatch(getEncodeSearchTracksAction(value))}
                                            setAutoCompleteOptions={(option => option?.originalFileName || "")}
                                            loading={encode?.encodeSearchTrack?.loading}
                                            data={encode?.encodeSearchTrack?.data?.docs || []}
                                            error={encode?.encodeSearchTrack?.error}
                                            getSelectedValue={(e, v) => {
                                                log("Autocomplete selected value", v)
                                                dispatch({ type: actionTypes.SET_SELECTED_EXISTING_FILE, data: v })
                                            }}
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
                                    filterComponent={<MonitorFilter open={true} dashboard={true} />}
                                    exportData={(value) => handleExport(value)}
                                    pdf={false}
                                />
                            </TrackFilterContainer>

                            <TrackTableContainer>
                                <CommonDataLoadErrorSuccess
                                    error={encode?.tracks?.error}
                                    loading={encode?.tracks?.loading}
                                    onClickTryAgain={() => dispatch(dispatch(getTracksAction(encode?.tracks.startDate, encode?.tracks?.endDate, 1, "10")))}
                                >
                                    <TracksTable data={encode?.tracks?.data?.docs} tableHeads={state.tracksTableHeads} />
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
