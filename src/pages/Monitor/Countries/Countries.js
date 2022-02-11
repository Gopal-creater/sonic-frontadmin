import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
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

export default function Countries() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const monitor = useSelector(state => state.monitor);

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
        dispatch(getMonitorExportAction(monitor?.dates?.startDate, monitor?.dates?.endDate, format, 2000, "COUNTRIES"))
    };

    const handleCountriesPageChange = (event, value) => {
        dispatch(getMonitorListAction(actions, monitor?.dates?.startDate, monitor?.dates?.endDate, value, "10", "COUNTRIES"))
    }


    const createStableCountryData = () => {
        const trackData = monitor?.country?.data?.docs?.map((data) => {
            return (
                {
                    radioStationName: data?.radioStationName,
                    plays: data?.playsCount,
                    tracks: data?.tracksCount,
                    artists: data?.artistsCount,
                    radioStations: data?.radioStationsCount,
                }
            )
        })
        return trackData
    }

    return (
        <Grid className="countries-container" style={{ backgroundColor: 'white', padding: '2% 2.5%' }}>
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
                <Grid style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ marginRight: '10px' }} >
                        {/* <Search
                        searchData={onSearchChange} 
                        dataSearch={dataSearch} 
                        setDataSearch={setDataSearch} 
                        setDefaultData={setDefaultData}
                        /> */}
                    </div>
                    <div>
                        <img src={viewFilter} style={{ cursor: 'pointer' }} />
                    </div>
                </Grid>
            </Grid>

            <Grid>
                <FilterComponent
                    startDate={monitor?.dates?.startDate}
                    onChangeStartDate={(date) => dispatch({ type: actionTypes.SET_MONITOR_DATES, data: { ...monitor?.dates, startDate: date } })}
                    endDate={monitor?.dates?.endDate}
                    onChangeEndDate={(date) => dispatch({ type: actionTypes.SET_MONITOR_DATES, data: { ...monitor?.dates, endDate: date } })}
                    filterComponent={<MonitorFilter open={true} playsBy="COUNTRIES" actions={actions} />}
                    exportData={(value) => handleExport(value)}
                />
            </Grid>

            <CommonDataLoadErrorSuccess
                error={monitor?.track?.error}
                loading={monitor?.track?.loading}
                onClickTryAgain={() => { }}
            >
                <>
                    <CountriesTable data={createStableCountryData} />
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
