import React from 'react';
import "./Plays.scss";
import { Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import * as actionTypes from "../../../stores/actions/actionTypes";
import { H1 } from '../../../StyledComponents/StyledHeadings';
import FilterComponent from '../../../components/common/FilterComponent/FilterComponent';
import PaginationCount from '../../../components/common/Pagination/PaginationCount';
import CommonDataLoadErrorSuccess from '../../../components/common/CommonDataLoadErrorSuccess/CommonDataLoadErrorSuccess';
import PlaysTable from './components/PlaysTable';
import CustomPagination from '../../../components/common/Pagination/CustomPagination';
import { log } from '../../../utils/app.debug';
import { getMonitorExportAction, getMonitorListAction } from '../../../stores/actions/monitorActions/monitorActions';
import MonitorFilter from '../Components/MonitorFilter/MonitorFilter';

export default function Plays() {
    const dispatch = useDispatch();
    const monitor = useSelector(state => state.monitor);

    React.useEffect(() => {
        dispatch(getMonitorListAction(
            actions,
            monitor?.dates?.startDate,
            monitor?.dates?.endDate,
            monitor?.plays?.data?.page,
            10
        ));
    }, [monitor?.dates?.startDate, monitor?.dates?.endDate])

    const actions = {
        loading: actionTypes.SET_PLAYS_LOADING,
        success: actionTypes.SET_PLAYS_SUCCESS,
        error: actionTypes.SET_PLAYS_ERROR
    }

    const createStableTableData = () => {
        let stableTableData = monitor?.plays?.data?.docs?.map((data) => {
            return {
                artist: data?.sonicKey?.contentOwner,
                title: data?.sonicKey?.contentFileName,
                radioStation: data?.radioStation?.name,
                date: data?.sonicKey?.detectedAt,
                time: data?.sonicKey?.detectedAt,
                duration: data?.sonicKey?.contentDuration,
                country: data?.radioStation?.country,
                sonicKey: data?.sonicKey?.sonicKey,
                isrcCode: data?.sonicKey?.isrcCode,
                label: data?.sonicKey?.label,
                distributor: data?.sonicKey?.distributor,
                modal: data?.sonicKey,
            }
        })
        return stableTableData
    }

    const handleExport = (format) => {
        dispatch(getMonitorExportAction(monitor?.dates?.startDate, monitor?.dates?.endDate, format, 2000, "PLAYS"))
    };

    return (
        <Grid className="plays-container">
            <Grid container justifyContent="space-between" className="plays-title-container">
                <Grid>
                    <H1>My Plays</H1>
                    {!monitor?.plays?.loading && <PaginationCount
                        heading={true}
                        name="plays"
                        start={monitor?.plays?.data?.offset}
                        end={monitor?.plays?.data?.docs?.length}
                        total={monitor?.plays?.data?.totalDocs}
                    />}
                </Grid>
            </Grid>

            <Grid>
                <FilterComponent
                    startDate={monitor?.dates?.startDate}
                    onChangeStartDate={(date) => dispatch({ type: actionTypes.SET_MONITOR_DATES, data: { ...monitor.dates, startDate: date } })}
                    endDate={monitor?.dates?.endDate}
                    onChangeEndDate={(date) => dispatch({ type: actionTypes.SET_MONITOR_DATES, data: { ...monitor.dates, endDate: date } })}
                    filterComponent={<MonitorFilter open={true} actions={actions} />}
                    exportData={(value) => handleExport(value)}
                />
            </Grid>

            <CommonDataLoadErrorSuccess
                error={monitor?.plays?.error}
                loading={monitor?.plays?.loading}
                onClickTryAgain={() => dispatch(getMonitorListAction(actions, monitor?.dates?.startDate, monitor?.dates?.endDate, monitor?.plays?.data?.page, 10))}
            >
                <PlaysTable data={createStableTableData()} />
                <Grid container justifyContent="space-between" alignItems="center" style={{ marginTop: "30px" }}>
                    <Grid item xs={12} sm={4} md={6}>
                        <PaginationCount
                            name="plays"
                            start={monitor?.plays?.data?.offset}
                            end={monitor?.plays?.data?.docs?.length}
                            total={monitor?.plays?.data?.totalDocs}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8} md={6}>
                        <CustomPagination
                            count={monitor?.plays?.data?.totalPages}
                            page={monitor?.plays?.data?.page}
                            onChange={(event, value) => dispatch(getMonitorListAction(
                                actions,
                                monitor?.dates?.startDate,
                                monitor?.dates?.endDate,
                                value,
                                10
                            ))}
                        />
                    </Grid>
                </Grid>
            </CommonDataLoadErrorSuccess>
        </Grid>
    )
}
