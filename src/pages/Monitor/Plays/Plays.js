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
import { getMonitorExportAction, getMonitorListAction } from '../../../stores/actions/monitorActions/monitorActions';
import MonitorFilter from '../Components/MonitorFilter/MonitorFilter';
import { playsTableHeads, userRoles } from '../../../constants/constants';
import { MainContainer } from '../../../StyledComponents/StyledPageContainer';
import Columns from '../../../components/common/Columns/Columns';

export default function Plays() {
    const dispatch = useDispatch();
    const monitor = useSelector(state => state.monitor);
    const user = useSelector(state => state.user)
    const [state, setState] = React.useState({
        playsTableHeads: playsTableHeads,
        currentSortBy: "",
        currentIsAscending: ""
    })

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
                company: data?.sonicKey?.company?.name,
                companyType: data?.sonicKey?.company?.companyType,
                artist: data?.sonicKey?.contentOwner,
                title: data?.sonicKey?.contentFileName,
                version: data?.sonicKey?.version,
                radioStation: data?.radioStation?.name,
                date: data?.detectedAt,
                time: data?.detectedAt,
                duration: data?.sonicKey?.contentDuration,
                country: data?.radioStation?.country,
                sonicKey: data?.sonicKey?.sonicKey,
                isrcCode: data?.sonicKey?.isrcCode,
                distributor: data?.sonicKey?.distributor,
                label: data?.sonicKey?.label,
                iswc: data?.sonicKey?.iswcCode,
                tuneCode: data?.sonicKey?.tuneCode,
                modal: data,
                trackId: data?.sonicKey?.track,
                fileType: data?.sonicKey?.contentFileType,
                description: data?.sonicKey?.contentDescription,

            }
        })
        return stableTableData
    }

    const getStableTableColumnHead = () => {
        let tableHead = state.playsTableHeads;
        if (user?.userProfile?.data?.userRole !== userRoles.PARTNER_ADMIN) {
            return tableHead.filter((itm) => (itm?.title !== "COMPANY" && itm?.title !== "COMPANY TYPE"))
        }
        return tableHead
    }

    const handleExport = (format) => {
        dispatch(getMonitorExportAction(
            monitor?.dates?.startDate,
            monitor?.dates?.endDate,
            format,
            2000,
            "",
            state?.currentSortBy,
            state?.currentIsAscending
        ))
    };

    const handlePlaysPageChange = (event, value) => {
        dispatch(getMonitorListAction(
            actions,
            monitor?.dates?.startDate,
            monitor?.dates?.endDate,
            value,
            "10",
            "",
            state?.currentSortBy,
            state.currentIsAscending)
        )
    }

    const playsSorting = (sortBy, isAscending, isActive) => {
        var newPlaysTableHeads = state.playsTableHeads.map((data, i) => {
            if (data.sortBy === sortBy) {
                data.isActive = isActive
                data.isAscending = isAscending
                dispatch(getMonitorListAction(
                    actions,
                    monitor?.dates?.startDate,
                    monitor?.dates?.endDate,
                    monitor?.plays?.data?.page,
                    "10",
                    "",
                    sortBy,
                    isAscending
                ))
                return data
            }
            data.isActive = false
            data.isAscending = null
            return data
        })

        return setState({ ...state, playsTableHeads: newPlaysTableHeads, currentSortBy: sortBy, currentIsAscending: isAscending })
    }

    return (
        <MainContainer>
            <Grid container alignItems='center' justifyContent="space-between" className="plays-title-container">
                <Grid item>
                    <H1>My Plays</H1>
                    <PaginationCount
                        heading={true}
                        name="plays"
                        start={monitor?.plays?.data?.offset}
                        end={monitor?.plays?.data?.docs?.length}
                        total={monitor?.plays?.data?.totalDocs}
                    />
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
                <PlaysTable
                    data={createStableTableData()}
                    playsTableHeads={getStableTableColumnHead()}
                    onPlaysSorting={(sortBy, isAscending, isActive) => playsSorting(sortBy, isAscending, isActive)}
                />
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
                            onChange={handlePlaysPageChange}
                        />
                    </Grid>
                </Grid>
            </CommonDataLoadErrorSuccess>
        </MainContainer>
    )
}
