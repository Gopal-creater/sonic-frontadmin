import { Grid } from '@material-ui/core';
import React, { useEffect, useRef } from 'react';
import { H1, H4, H2 } from '../../../StyledComponents/StyledHeadings';
import Search from '../../SonicKeys/Components/Search';
import viewFilter from '../../../assets/images/view.png'
import { useTheme } from 'styled-components';
import FilterComponent from '../../../components/common/FilterComponent/FilterComponent';
import { useDispatch, useSelector } from 'react-redux';
import * as actionTypes from "../../../stores/actions/actionTypes";
// import PlaysFilter from '../Plays/components/PlaysFilter';
import PaginationCount from '../../../components/common/Pagination/PaginationCount';
import { log } from '../../../utils/app.debug';
import CommonDataLoadErrorSuccess from '../../../components/common/CommonDataLoadErrorSuccess/CommonDataLoadErrorSuccess';
import CountriesTable from './Components/CountriesTable';
import CustomPagination from '../../../components/common/Pagination/CustomPagination';
// import CountriesFilterModal from './Components/CountriesFilterModal';
import { getMonitorExportAction, getMonitorListAction } from '../../../stores/actions/monitorActions/monitorActions';
import MonitorFilter from '../Components/MonitorFilter/MonitorFilter';
import { useReactToPrint } from 'react-to-print';
import { countryTableHeads } from '../../../constants/constants';

export default function Countries() {
    const theme = useTheme();

    const dispatch = useDispatch();
    const monitor = useSelector(state => state.monitor);

    const [state, setState] = React.useState({
        countriesTableHeads: countryTableHeads,
        currentSortBy: "",
        currentIsAscending: ""
    })

    const countriesTableRef = useRef();
    const handlePrintToPdf = useReactToPrint({
        content: () => countriesTableRef.current,
    });

    const actions = {
        loading: actionTypes.SET_COUNTRIES_LOADING,
        success: actionTypes.SET_COUNTRIES_SUCCESS,
        error: actionTypes.SET_COUNTRIES_ERROR
    }
    log("countries state", monitor?.country);

    useEffect(() => {
        dispatch(getMonitorListAction(actions, monitor?.dates?.startDate, monitor?.dates?.endDate, monitor?.track?.data?.page, "10", "COUNTRIES"))
    }, [monitor?.dates?.startDate, monitor?.dates?.endDate])

    const handleExport = (format) => {
        if (format === 'pdf') {
            handlePrintToPdf();
        } else {
            dispatch(getMonitorExportAction(
                monitor?.dates?.startDate,
                monitor?.dates?.endDate,
                format,
                2000,
                "COUNTRIES",
                state?.currentSortBy,
                state?.currentIsAscending
            ))
        }
    };

    const handleCountriesPageChange = (event, value) => {
        dispatch(getMonitorListAction(
            actions,
            monitor?.dates?.startDate,
            monitor?.dates?.endDate,
            value,
            "10",
            "COUNTRIES",
            state?.currentSortBy,
            state?.currentIsAscending
        ))
    }

    const createStableCountryData = () => {
        const trackData = monitor?.country?.data?.docs?.map((data) => {
            return (
                {
                    country: data?.country,
                    plays: data?.playsCount,
                    tracks: data?.uniquePlaysCount,
                    artists: data?.artistsCount,
                    radioStations: data?.radioStationCount,
                }
            )
        })
        return trackData
    }

    const countriesSorting = (sortBy, isAscending, isActive) => {
        // log("sortBy, isAscending, isActive", sortBy, isAscending, isActive)
        var newCountriesTableHeads = state.countriesTableHeads.map((data, i) => {
            if (data.sortBy === sortBy) {
                data.isActive = isActive
                data.isAscending = isAscending
                dispatch(getMonitorListAction(
                    actions,
                    monitor?.dates?.startDate,
                    monitor?.dates?.endDate,
                    monitor?.country?.data?.page,
                    "10",
                    "COUNTRIES",
                    sortBy,
                    isAscending
                ))
                return data
            }
            data.isActive = false
            data.isAscending = null
            return data
        })

        return setState({ ...state, countriesTableHeads: newCountriesTableHeads, currentSortBy: sortBy, currentIsAscending: isAscending })
    }

    return (
        <Grid className="countries-container" style={{ backgroundColor: 'white', padding: '2% 2.5%' }} ref={countriesTableRef}>
            <Grid container justifyContent='space-between'>
                <Grid>
                    <H1>Countries</H1>
                    <PaginationCount
                        heading={true}
                        name="Countries"
                        total={monitor?.country?.data?.totalDocs}
                        start={monitor?.country?.data?.offset}
                        end={monitor?.country?.data?.docs?.length}
                    />
                </Grid>
                {/* <Grid style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ marginRight: '10px' }} >
                        <Search
                            searchData={onSearchChange}
                            dataSearch={dataSearch}
                            setDataSearch={setDataSearch}
                            setDefaultData={setDefaultData}
                        />
                    </div>
                    <div>
                        <img src={viewFilter} style={{ cursor: 'pointer' }} />
                    </div>
                </Grid> */}
            </Grid>

            <Grid>
                <FilterComponent
                    startDate={monitor?.dates?.startDate}
                    onChangeStartDate={(date) => dispatch({ type: actionTypes.SET_MONITOR_DATES, data: { ...monitor?.dates, startDate: date } })}
                    endDate={monitor?.dates?.endDate}
                    onChangeEndDate={(date) => dispatch({ type: actionTypes.SET_MONITOR_DATES, data: { ...monitor?.dates, endDate: date } })}
                    filterComponent={<MonitorFilter open={true} playsBy="COUNTRIES" actions={actions} />}
                    exportData={(value) => handleExport(value)}
                // pdf={true}
                />
            </Grid>

            <CommonDataLoadErrorSuccess
                error={monitor?.country?.error}
                loading={monitor?.country?.loading}
                onClickTryAgain={() => { dispatch(getMonitorListAction(actions, monitor?.dates?.startDate, monitor?.dates?.endDate, monitor?.track?.data?.page, "10", "COUNTRIES")) }}
            >
                <>
                    <CountriesTable
                        data={createStableCountryData}
                        countriesTableHeads={state.countriesTableHeads}
                        onCountriesSorting={(sortBy, isAscending, isActive) => countriesSorting(sortBy, isAscending, isActive)}
                    />
                    <Grid container justifyContent="space-between" alignItems="center" style={{ marginTop: "30px" }}>
                        <Grid item xs={12} sm={6} md={6}>
                            <PaginationCount
                                name="COUNTRIES"
                                total={monitor?.country?.data?.totalDocs}
                                start={monitor?.country?.data?.offset}
                                end={monitor?.country?.data?.docs?.length}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <CustomPagination
                                count={monitor?.country?.data?.totalPages}
                                page={monitor?.country?.data?.page}
                                onChange={handleCountriesPageChange}
                            />
                        </Grid>
                    </Grid>
                </>
            </CommonDataLoadErrorSuccess>
        </Grid>
    );
}
