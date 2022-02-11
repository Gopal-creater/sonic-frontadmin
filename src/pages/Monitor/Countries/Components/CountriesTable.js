import { Grid, Table, TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useTheme } from 'styled-components';
import { AlternateStyledTableData, StyledTableData, StyledTableHead } from '../../../../StyledComponents/StyledTable/StyledTable';
import { countryTableHeads } from '../../../../constants/constants';
import dropdown from "../../../../assets/icons/dropdown.png"

export default function CountriesTable({ data }) {
    const theme = useTheme()
    const [state, setState] = React.useState({
        data: data || [],
    })
    const [sortOrder, setSortOrder] = React.useState("ASC");

    const sorting = (col) => {
        if (sortOrder === "ASC") {
            let sorted = state.data.sort((a, b) => {
                if (a[col] > b[col]) {
                    return 1
                }
                if (a[col] < b[col]) {
                    return -1
                }
                return 0
            })
            setState({ ...state, data: sorted })
            setSortOrder("DSC")
        }
        if (sortOrder === "DSC") {
            let sorted = state.data.sort((a, b) => {
                if (a[col] < b[col]) {
                    return 1
                }
                if (a[col] > b[col]) {
                    return -1
                }
                return 0
            })
            setState({ ...state, data: sorted })
            setSortOrder("ASC")
        }
    }


    return (
        <Grid >
            <TableContainer >
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {
                                countryTableHeads?.map((data, index) => {
                                    return (
                                        <StyledTableHead
                                            align={index == 0 ? 'left' : 'center'}
                                            key={index}
                                            onClick={() => sorting(data?.orderBy)}
                                        >
                                            {data?.title} <img src={dropdown} alt="dropdown" height={15} />
                                        </StyledTableHead>
                                    )
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            state?.data?.length === 0 ?
                                <TableRow key={0}>
                                    <StyledTableData colSpan={5} style={{ textAlign: "center" }}>
                                        No Data
                                    </StyledTableData>
                                </TableRow> :

                                state?.data?.map((row, index) => {
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
