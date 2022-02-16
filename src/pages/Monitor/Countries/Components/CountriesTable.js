import { Grid, Table, TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import { useTheme } from 'styled-components';
import { AlternateStyledTableData, StyledTableData, StyledTableHead } from '../../../../StyledComponents/StyledTable/StyledTable';

export default function CountriesTable({ data, countriesTableHeads, onCountriesSorting }) {
    const theme = useTheme()

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

    return (
        <Grid >
            <TableContainer >
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
                                    if (index % 2 !== 0) {
                                        return (
                                            <TableRow key={row.name}>
                                                <AlternateStyledTableData
                                                    style={{
                                                        color: theme.colors.primary.navy,
                                                        fontSize: theme.fontSize.h4,
                                                        fontFamily: theme.fontFamily.nunitoSansBold
                                                    }}
                                                    align="left"
                                                >
                                                    {row.radioStationName}
                                                </AlternateStyledTableData>
                                                <AlternateStyledTableData align="center">{row.plays}</AlternateStyledTableData>
                                                <AlternateStyledTableData align="center">{row.tracks}</AlternateStyledTableData>
                                                <AlternateStyledTableData align="center">{row.artists}</AlternateStyledTableData>
                                                <AlternateStyledTableData align="center">{row.radioStations}</AlternateStyledTableData>

                                            </TableRow>
                                        )
                                    }
                                    return (
                                        <TableRow key={row.name}>
                                            <StyledTableData
                                                style={{
                                                    color: theme.colors.primary.navy,
                                                    fontSize: theme.fontSize.h4,
                                                    fontFamily: theme.fontFamily.nunitoSansBold
                                                }}
                                                align='left'
                                            >
                                                {row.radioStationName}
                                            </StyledTableData>
                                            <StyledTableData align="center">{row.plays}</StyledTableData>
                                            <StyledTableData align="center">{row.tracks}</StyledTableData>
                                            <StyledTableData align="center">{row.artists}</StyledTableData>
                                            <StyledTableData align="center">{row.radioStations}</StyledTableData>

                                        </TableRow>
                                    )
                                })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );
}
