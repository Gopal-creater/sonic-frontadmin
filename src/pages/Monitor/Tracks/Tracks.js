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
import { useDispatch, useSelector } from 'react-redux';
import { log } from '../../../utils/app.debug';
import * as actionTypes from "../../../stores/actions/actionTypes"
import TrackFilterModal from './Component/TrackFilterModal/TrackFilterModal';
import { getTrackListAction } from '../../../stores/actions/track.action';

export default function Tracks() {
    const theme = useTheme()
    const track = useSelector(state => state.track)
    const dispatch = useDispatch()

    log("Track Data", track)

    React.useEffect(() => {
        dispatch(getTrackListAction())
    }, [])

    const handleExport = () => {

    }

    return (
        <TrackContainer>
            <H1 fontFamily={theme.fontFamily.nunitoSansBold}>My Tracks</H1>
            <H4
                color={theme.colors.primary.teal}
                fontFamily={theme.fontFamily.nunitoSansRegular}
            >
                <PaginationCount heading={true} name="Tracks" total={30} start={1} end={10} />
            </H4>

            <Grid style={{ marginTop: "40px" }}>
                <FilterComponent
                    startDate={track?.dates?.startDate}
                    onChangeStartDate={(date) => dispatch({ type: actionTypes.SET_TRACK_DATES, data: { ...track.dates, startDate: date } })}
                    endDate={track?.dates?.endDate}
                    onChangeEndDate={(date) => dispatch({ type: actionTypes.SET_TRACK_DATES, data: { ...track.dates, endDate: date } })}
                    filterComponent={<TrackFilterModal open={true} />}
                    exportData={(value) => handleExport(value)}
                />
            </Grid>

            <CommonDataLoadErrorSuccess
                error={track?.error}
                loading={track?.loading}
                onClickTryAgain={() => { dispatch(getTrackListAction()) }}
            >
                <>
                    <TracksTable data={track?.data} />
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
                </>
            </CommonDataLoadErrorSuccess>
        </TrackContainer>
    );
}
