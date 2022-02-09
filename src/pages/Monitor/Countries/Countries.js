import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { H1, H4, H2 } from '../../../StyledComponents/StyledHeadings';
import Search from '../../SonicKeys/Components/Search';
import viewFilter from '../../../assets/images/view.png'
import { useTheme } from 'styled-components';
import FilterComponent from '../../../components/common/FilterComponent/FilterComponent';
import { useDispatch, useSelector } from 'react-redux';
import * as actionTypes from "../../../stores/actions/actionTypes";
import PlaysFilter from '../Plays/components/PlaysFilter';
import PaginationCount from '../../../components/common/Pagination/PaginationCount';
import { log } from '../../../utils/app.debug';
import { getCountriesAction } from '../../../stores/actions/countires.action';
import CommonDataLoadErrorSuccess from '../../../components/common/CommonDataLoadErrorSuccess/CommonDataLoadErrorSuccess';
import CountriesTable from './Components/CountriesTable';
import CustomPagination from '../../../components/common/Pagination/CustomPagination';
import CountriesFilterModal from './Components/CountriesFilterModal';

export default function Countries() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const countries = useSelector(state => state.country);
    log("countries state", countries);

    useEffect(() => {
        dispatch(getCountriesAction());
    }, []);

    const handleExport = (value) => {
        // setValues({ ...values, format: value })
        // if (playsList?.filters?.sonicKey) {
        //     dispatch(getSonickeyHistoryDataAction(
        //         playsList?.dates?.startDate,
        //         playsList?.dates?.endDate,
        //         playsList?.filters?.channel,
        //         value
        //     ))
        // } else {
        //     dispatch(getExportDataAction(
        //         playsList?.dates?.startDate,
        //         playsList?.dates?.endDate,
        //         playsList?.filters?.channel,
        //         2000,
        //         value
        //     ))
        // }
    };

    return (
        <Grid className="countries-container" style={{ backgroundColor: 'white', padding: '2% 2.5%' }}>
            <Grid container justifyContent='space-between'>
                <Grid>
                    <H1>Countries</H1>
                    {/* <H4 color={theme.colors.primary.teal} fontFamily={theme.fontFamily.nunitoSansRegular}>
                        Showing 1-4 of 4 countries
                    </H4> */}
                    <PaginationCount
                        heading={true}
                        name="countries"
                        start={countries?.data?.offset}
                        end={countries?.data?.docs?.length}
                        total={countries?.data?.totalDocs}
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
                    startDate={countries?.dates?.startDate}
                    onChangeStartDate={(date) => dispatch({ type: actionTypes.SET_COUNTRIES_DATE, data: { ...countries.dates, startDate: date } })}
                    endDate={countries?.dates?.endDate}
                    onChangeEndDate={(date) => dispatch({ type: actionTypes.SET_COUNTRIES_DATE, data: { ...countries.dates, endDate: date } })}
                    filterComponent={<CountriesFilterModal open={true} />}
                    exportData={(value) => handleExport(value)}
                />
            </Grid>

            <CommonDataLoadErrorSuccess
                error={null}
                loading={false}
                onClickTryAgain={() => { dispatch(getCountriesAction()) }}
            >
                <CountriesTable />
            </CommonDataLoadErrorSuccess>

            <Grid container justifyContent="space-between" alignItems="center" style={{ marginTop: "30px" }}>
                <Grid item xs={12} sm={6} md={8}>
                    <PaginationCount
                        // heading={false}
                        name="plays"
                        start={countries?.data?.offset}
                        end={countries?.data?.docs?.length}
                        total={countries?.data?.totalDocs}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <CustomPagination
                        count={2}
                        page={20}
                        onChange={() => { }}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
}
