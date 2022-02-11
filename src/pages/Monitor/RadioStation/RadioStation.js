import React from 'react';
import { Grid } from '@material-ui/core';
import { useTheme } from 'styled-components';
import CommonDataLoadErrorSuccess from '../../../components/common/CommonDataLoadErrorSuccess/CommonDataLoadErrorSuccess';
import FilterComponent from '../../../components/common/FilterComponent/FilterComponent';
import { H1 } from '../../../StyledComponents/StyledHeadings';
import PaginationCount from '../../../components/common/Pagination/PaginationCount';
import CustomPagination from '../../../components/common/Pagination/CustomPagination';
import { useDispatch, useSelector } from 'react-redux';
import { log } from '../../../utils/app.debug';
import { RadioStationContainer } from './Styles';
import RadioStationTable from './components/RadioStationTable';
import * as actionTypes from "../../../stores/actions/actionTypes";
import { getMonitorExportAction, getMonitorListAction } from '../../../stores/actions/monitorActions/monitorActions';
import MonitorFilter from '../Components/MonitorFilter/MonitorFilter';

export default function RadioStations() {
    const theme = useTheme()
    const monitor = useSelector(state => state.monitor);
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getMonitorListAction(
            actions,
            monitor?.dates?.startDate,
            monitor?.dates?.endDate,
            monitor?.radioStation?.data?.page,
            10,
            "RADIOSTATIONS"
        ));
    }, [monitor?.dates?.startDate, monitor?.dates?.endDate])

    const actions = {
        loading: actionTypes.SET_RADIOSTATION_LOADING,
        success: actionTypes.SET_RADIOSTATION_SUCCESS,
        error: actionTypes.SET_RADIOSTATION_ERROR,
    }

    const createStableRadioStationData = () => {
        const radioStationData = monitor?.radioStation?.data?.docs?.map((data) => {
            return (
                {
                    radioStation: data?.radioStation?.name,
                    country: data?.radioStation?.country,
                    playsCount: data?.playsCount,
                    uniquePlays: data?.uniquePlaysCount,
                    artistsCount: data?.artistsCount,
                }
            )
        })
        return radioStationData
    }

    const handleExport = (format) => {
        dispatch(getMonitorExportAction(monitor?.dates?.startDate, monitor?.dates?.endDate, format, 2000, "RADIOSTATIONS"))
    }

    const handleRadioStationPageChange = (event, value) => {
        dispatch(getMonitorListAction(actions, monitor?.dates?.startDate, monitor?.dates?.endDate, value, "10", "RADIOSTATIONS"))
    }

    log("RADIO Station data monitor", monitor)


    return (
        <RadioStationContainer>
            <H1 fontFamily={theme.fontFamily.nunitoSansBold}>Radio Stations</H1>
            <PaginationCount
                heading={true}
                name="radio stations"
                start={monitor?.radioStation?.data?.offset}
                end={monitor?.radioStation?.data?.docs?.length}
                total={monitor?.radioStation?.data?.totalDocs}
            />

            <Grid style={{ marginTop: "40px" }}>
                <FilterComponent
                    startDate={monitor?.dates?.startDate}
                    onChangeStartDate={(date) => dispatch({ type: actionTypes.SET_MONITOR_DATES, data: { ...monitor?.dates, startDate: date } })}
                    endDate={monitor?.dates?.endDate}
                    onChangeEndDate={(date) => dispatch({ type: actionTypes.SET_MONITOR_DATES, data: { ...monitor?.dates, endDate: date } })}
                    filterComponent={<MonitorFilter open={true} playsBy="RADIOSTATIONS" actions={actions} />}
                    exportData={(value) => handleExport(value)}
                />
            </Grid>

            <CommonDataLoadErrorSuccess
                error={monitor?.radioStation?.error}
                loading={monitor?.radioStation?.loading}
                onClickTryAgain={() => dispatch(getMonitorListAction(
                    monitor?.dates?.startDate,
                    monitor?.dates?.endDate,
                    monitor?.radioStation?.data?.page,
                    10,
                    "RADIOSTATIONS"
                ))}
            >
                <>
                    <RadioStationTable data={createStableRadioStationData()} />
                    <Grid container justifyContent="space-between" alignItems="center" style={{ marginTop: "30px" }}>
                        <Grid item xs={12} sm={4} md={8}>
                            <PaginationCount
                                name="radio stations"
                                total={monitor?.radioStation?.data?.totalDocs}
                                start={monitor?.radioStation?.data?.offset}
                                end={monitor?.radioStation?.data?.docs?.length}
                            />
                        </Grid>
                        <Grid item xs={12} sm={8} md={4}>
                            <CustomPagination
                                count={monitor?.radioStation?.data?.totalPages}
                                page={monitor?.radioStation?.data?.page}
                                onChange={handleRadioStationPageChange}
                            />
                        </Grid>
                    </Grid>
                </>
            </CommonDataLoadErrorSuccess>
        </RadioStationContainer>
    );
}
