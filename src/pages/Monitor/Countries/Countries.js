import { Grid } from '@material-ui/core';
import React from 'react';
import { H1, H4, H2 } from '../../../StyledComponents/StyledHeadings';
import Search from '../../SonicKeys/Components/Search';
import viewFilter from '../../../assets/images/view.png'
import { useTheme } from 'styled-components';
import FilterComponent from '../../../components/common/FilterComponent/FilterComponent';
import { useDispatch, useSelector } from 'react-redux';
import * as actionTypes from "../../../stores/actions/actionTypes";
import PlaysFilter from '../Plays/components/PlaysFilter';

export default function Countries() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const playsList = useSelector(state => state.playsList)

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
                    <H4 color={theme.colors.primary.teal} fontFamily={theme.fontFamily.nunitoSansRegular}>
                        Showing 1-4 of 4 countries
                    </H4>
                </Grid>
                <Grid style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ marginRight: '10px' }} >
                        <Search
                        // searchData={onSearchChange} 
                        // dataSearch={dataSearch} 
                        // setDataSearch={setDataSearch} 
                        // setDefaultData={setDefaultData}
                        />
                    </div>
                    <div>
                        <img src={viewFilter} style={{ cursor: 'pointer' }} />
                    </div>
                </Grid>
            </Grid>

            <Grid>
                <FilterComponent
                    startDate={playsList?.dates?.startDate}
                    onChangeStartDate={(date) => dispatch({ type: actionTypes.SET_PLAYS_DATES, data: { ...playsList.dates, startDate: date } })}
                    endDate={playsList?.dates?.endDate}
                    onChangeEndDate={(date) => dispatch({ type: actionTypes.SET_PLAYS_DATES, data: { ...playsList.dates, endDate: date } })}
                    filterComponent={<PlaysFilter open={true} />}
                    exportData={(value) => handleExport(value)}
                />
            </Grid>
        </Grid>
    );
}
