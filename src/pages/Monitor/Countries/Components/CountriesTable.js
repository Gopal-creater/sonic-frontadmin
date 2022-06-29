import { Grid, Table, TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';
import * as actionTypes from "../../../../stores/actions/actionTypes"
import { StyledTableData, StyledTableHead, StyledTableRow } from '../../../../StyledComponents/StyledTable/StyledTable';

export default function CountriesTable({ data, countriesTableHeads, onCountriesSorting }) {
    const theme = useTheme()
    const dispatch = useDispatch()
    const monitor = useSelector(state => state.monitor)
    const navigate = useNavigate()

    const sorting = (sortBy, isAscending, isActive) => {
        if (isActive) {
            if (isAscending === true) {
                onCountriesSorting(sortBy, false, false)
            }
            else if (isAscending === false) {
                onCountriesSorting(sortBy, true, false)
            }
            else if (isAscending === null) {
                onCountriesSorting(sortBy, true, false)
            }
        } else {
            if (isAscending === true) {
                onCountriesSorting(sortBy, false, true)
            }
            else if (isAscending === false) {
                onCountriesSorting(sortBy, true, true)
            }
            else if (isAscending === null) {
                onCountriesSorting(sortBy, true, true)
            }
        }
    }

    const onPlaysClick = (countryName) => {
        dispatch({ type: actionTypes.SET_MONITOR_FILTERS, data: { ...monitor?.filters, country: countryName } })
        navigate("/monitor/plays")
    }

    return (
        <Grid >
            <TableContainer style={{ padding: '0rem 1rem 1rem 1rem' }}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {
                                countriesTableHeads?.map((data, index) => {
                                    return (
                                        <StyledTableHead
                                            align={index == 0 ? 'left' : 'center'}
                                            key={index}
                                            onClick={() => sorting(data?.sortBy, data?.isAscending, data?.isActive)}
                                        >
                                            {data?.title} <i className="fa fa-sort" style={{ marginLeft: "5px" }}></i>
                                        </StyledTableHead>
                                    )
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data?.length === 0 ?
                                <TableRow key={0}>
                                    <StyledTableData colSpan={5} style={{ textAlign: "center" }}>
                                        No Data
                                    </StyledTableData>
                                </TableRow> :

                                data?.map((row, index) => {
                                    return (
                                        <StyledTableRow
                                            key={row.name}
                                            style={{ cursor: "pointer" }}
                                            onClick={() => onPlaysClick(row.country)}
                                            bgColor={index % 2 !== 0 && theme.colors.secondary.tableColor}
                                        >
                                            <StyledTableData
                                                style={{
                                                    color: theme.colors.primary.navy,
                                                    fontSize: theme.fontSize.h4,
                                                    fontFamily: theme.fontFamily.nunitoSansBold
                                                }}
                                                align='left'
                                            >
                                                {row.country}
                                            </StyledTableData>
                                            <StyledTableData align="center">{row.plays}</StyledTableData>
                                            <StyledTableData align="center">{row.tracks}</StyledTableData>
                                            <StyledTableData align="center">{row.artists}</StyledTableData>
                                            <StyledTableData align="center">{row.radioStations}</StyledTableData>

                                        </StyledTableRow>
                                    )
                                })}
                    </TableBody>
                </Table >
            </TableContainer >
        </Grid >
    );
}
