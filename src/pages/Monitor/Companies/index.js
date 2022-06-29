import React from 'react'
import { Grid } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import PaginationCount from '../../../components/common/Pagination/PaginationCount'
import { H1 } from '../../../StyledComponents/StyledHeadings'
import { MainContainer } from '../../../StyledComponents/StyledPageContainer'
import theme from '../../../theme'
import FilterComponent from '../../../components/common/FilterComponent/FilterComponent'
import MonitorFilter from '../Components/MonitorFilter/MonitorFilter'
import * as actionTypes from "../../../stores/actions/actionTypes"
import { getMonitorExportAction, getMonitorListAction } from '../../../stores/actions/monitorActions/monitorActions'
import { monitorCompaniesTableHeads } from '../../../constants/constants'
import CustomPagination from '../../../components/common/Pagination/CustomPagination'
import CommonDataLoadErrorSuccess from '../../../components/common/CommonDataLoadErrorSuccess/CommonDataLoadErrorSuccess'
import MonitorCompaniesTable from './components/MonitorCompaniesTable'

export default function MonitorCompanies() {
    const monitor = useSelector(state => state.monitor)
    const dispatch = useDispatch()

    const [state, setState] = React.useState({
        companiesTableHeads: monitorCompaniesTableHeads,
        currentSortBy: "",
        currentIsAscending: ""
    })

    const actions = {
        loading: actionTypes.SET_MONITOR_COMPANIES_LOADING,
        success: actionTypes.SET_MONITOR_COMPANIES_SUCCESS,
        error: actionTypes.SET_MONITOR_COMPANIES_ERROR,
    }

    React.useEffect(() => {
        dispatch(getMonitorListAction(actions, monitor?.dates?.startDate, monitor?.dates?.endDate, monitor?.companies?.data?.page, "10", "COMPANIES"))
    }, [monitor?.dates?.startDate, monitor?.dates?.endDate])

    const createStableCompaniesData = () => {
        const monitorCompaniesData = monitor?.companies?.data?.docs?.map((data) => {
            return (
                {
                    comID: data?.company?._id,
                    companyName: data?.company?.name,
                    companyType: data?.company?.companyType,
                    artist: data?.artistsCount,
                    plays: data?.playsCount,
                    uniquePlaysCount: data?.uniquePlaysCount,
                }
            )
        })
        return monitorCompaniesData
    }

    const handleExport = (format) => {
        dispatch(getMonitorExportAction(
            monitor?.dates?.startDate,
            monitor?.dates?.endDate,
            format,
            2000,
            "COMPANIES",
            state?.currentSortBy,
            state?.currentIsAscending
        ))
    }

    const handleArtistPageChange = (event, value) => {
        dispatch(getMonitorListAction(
            actions,
            monitor?.dates?.startDate,
            monitor?.dates?.endDate,
            value,
            "10",
            "COMPANIES",
            state?.currentSortBy,
            state?.currentIsAscending
        ))
    }

    const monitorCompaniesSorting = (sortBy, isAscending, isActive) => {
        var newMonitorCompaniesTableHeads = state.companiesTableHeads.map((data, i) => {
            if (data.sortBy === sortBy) {
                data.isActive = isActive
                data.isAscending = isAscending
                dispatch(getMonitorListAction(
                    actions,
                    monitor?.dates?.startDate,
                    monitor?.dates?.endDate,
                    monitor?.companies?.data?.page,
                    "10",
                    "COMPANIES",
                    sortBy,
                    isAscending
                ))
                return data
            }
            data.isActive = false
            data.isAscending = null
            return data
        })

        return setState({ ...state, companiesTableHeads: newMonitorCompaniesTableHeads, currentSortBy: sortBy, currentIsAscending: isAscending })
    }

    return (
        <MainContainer>
            <H1 fontFamily={theme.fontFamily.nunitoSansBold}>Companies</H1>
            <PaginationCount
                heading={true}
                name={"companies"}
                start={monitor?.companies?.data?.offset}
                end={monitor?.companies?.data?.docs?.length}
                total={monitor?.companies?.data?.totalDocs}
            />
            <Grid style={{ marginTop: "40px" }}>
                <FilterComponent
                    startDate={monitor?.dates?.startDate}
                    onChangeStartDate={(date) => dispatch({ type: actionTypes.SET_MONITOR_DATES, data: { ...monitor?.dates, startDate: date } })}
                    endDate={monitor?.dates?.endDate}
                    onChangeEndDate={(date) => dispatch({ type: actionTypes.SET_MONITOR_DATES, data: { ...monitor?.dates, endDate: date } })}
                    filterComponent={<MonitorFilter open={true} playsBy="COMPANIES" actions={actions} />}
                    exportData={(value) => handleExport(value)}
                />
            </Grid>

            <CommonDataLoadErrorSuccess
                error={monitor?.companies?.error}
                loading={monitor?.companies?.loading}
                onClickTryAgain={() => dispatch(getMonitorListAction(actions, monitor?.dates?.startDate, monitor?.dates?.endDate, monitor?.companies?.data?.page, "10", "COMPANIES"))}
            >
                <MonitorCompaniesTable
                    data={createStableCompaniesData()}
                    companiesTableHeads={state.companiesTableHeads}
                    onCompaniesSorting={(sortBy, isAscending, isActive) => monitorCompaniesSorting(sortBy, isAscending, isActive)}
                />
                <Grid container justifyContent="space-between" alignItems="center" style={{ marginTop: "30px" }}>
                    <Grid item xs={12} sm={4} md={6}>
                        <PaginationCount
                            name="companies"
                            total={monitor?.companies?.data?.totalDocs}
                            start={monitor?.companies?.data?.offset}
                            end={monitor?.companies?.data?.docs?.length}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8} md={6}>
                        <CustomPagination
                            count={monitor?.companies?.data?.totalPages}
                            page={monitor?.companies?.data?.page}
                            onChange={handleArtistPageChange}
                        />
                    </Grid>
                </Grid>
            </CommonDataLoadErrorSuccess>
        </MainContainer>
    )
}
