import React from 'react';
import { Grid } from '@material-ui/core';
import { useTheme } from 'styled-components';
import CommonDataLoadErrorSuccess from '../../../components/common/CommonDataLoadErrorSuccess/CommonDataLoadErrorSuccess';
import FilterComponent from '../../../components/common/FilterComponent/FilterComponent';
import { H1, H2, H3, H4 } from '../../../StyledComponents/StyledHeadings';
import PaginationCount from '../../../components/common/Pagination/PaginationCount';
import CustomPagination from '../../../components/common/Pagination/CustomPagination';
import { useDispatch, useSelector } from 'react-redux';
import { log } from '../../../utils/app.debug';
import { RadioStationContainer } from './Styles';
import { getPlaysListsAction } from '../../../stores/actions';
import RadioStationTable from './components/RadioStationTable';
import PlaysFilter from '../Plays/components/PlaysFilter';
import * as actionTypes from "../../../stores/actions/actionTypes";

export default function RadioStations() {
    const theme = useTheme()
    const playsList = useSelector(state => state.playsList);
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getPlaysListsAction(
            playsList?.dates?.startDate,
            playsList?.dates?.endDate,
            playsList?.filters?.channel,
            playsList?.data?.page,
            10,
            "RADIOSTATIONS"
        ));
    }, [playsList?.dates?.startDate, playsList?.dates?.endDate])

    log("RADIO", playsList)

    const handleExport = () => {

    }

    return (
        <RadioStationContainer>
            <H1 fontFamily={theme.fontFamily.nunitoSansBold}>Radio Stations</H1>
            {!playsList?.loading && <PaginationCount
                heading={true}
                name="radio stations"
                start={playsList?.data?.offset}
                end={playsList?.data?.docs?.length}
                total={playsList?.data?.totalDocs}
            />}

            <Grid style={{ marginTop: "40px" }}>
                <FilterComponent
                    startDate={playsList?.dates?.startDate}
                    onChangeStartDate={(date) => dispatch({ type: actionTypes.SET_PLAYS_DATES, data: { ...playsList.dates, startDate: date } })}
                    endDate={playsList?.dates?.endDate}
                    onChangeEndDate={(date) => dispatch({ type: actionTypes.SET_PLAYS_DATES, data: { ...playsList.dates, endDate: date } })}
                    filterComponent={<PlaysFilter open={true} />}
                    exportData={(value) => handleExport(value)}
                />
            </Grid>

            <CommonDataLoadErrorSuccess
                error={playsList?.error}
                loading={playsList?.loading}
                onClickTryAgain={() => dispatch(getPlaysListsAction(
                    playsList?.dates?.startDate,
                    playsList?.dates?.endDate,
                    playsList?.filters?.channel,
                    playsList?.data?.page,
                    10,
                    "RADIOSTATIONS"
                ))}
            >
                <>
                    <RadioStationTable />
                    <Grid container justifyContent="space-between" alignItems="center" style={{ marginTop: "30px" }}>
                        <Grid item xs={12} sm={4} md={8}>
                            <PaginationCount
                                name="radio stations"
                                start={playsList?.data?.offset}
                                end={playsList?.data?.docs?.length}
                                total={playsList?.data?.totalDocs}
                            />
                        </Grid>
                        <Grid item xs={12} sm={8} md={4}>
                            <CustomPagination
                                count={playsList?.data?.totalPages}
                                page={playsList?.data?.page}
                                onChange={(event, value) => dispatch(getPlaysListsAction(
                                    playsList?.dates?.startDate,
                                    playsList?.dates?.endDate,
                                    playsList?.filters?.channel,
                                    value,
                                    10,
                                    "RADIOSTATIONS"
                                ))}
                            />
                        </Grid>
                    </Grid>
                </>
            </CommonDataLoadErrorSuccess>
        </RadioStationContainer>
    );
}
