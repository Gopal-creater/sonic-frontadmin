import { Grid, Table, TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import { useTheme } from 'styled-components';
import { AlternateStyledTableData, StyledTableData, StyledTableHead } from '../../../../StyledComponents/StyledTable/StyledTable';

export default function RadioStationTable({ data, radioStationTableHeads, onRadioStationSorting }) {
    const theme = useTheme()

    const sorting = (sortBy, isAscending, isActive) => {
        if (isActive) {
            if (isAscending === true) {
                onRadioStationSorting(sortBy, false, false)
            }
            else if (isAscending === false) {
                onRadioStationSorting(sortBy, true, false)
            }
            else if (isAscending === null) {
                onRadioStationSorting(sortBy, true, false)
            }
        } else {
            if (isAscending === true) {
                onRadioStationSorting(sortBy, false, true)
            }
            else if (isAscending === false) {
                onRadioStationSorting(sortBy, true, true)
            }
            else if (isAscending === null) {
                onRadioStationSorting(sortBy, true, true)
            }
        }
    }

    return (
        <Grid>
            <TableContainer >
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {
                                radioStationTableHeads?.map((data, index) => {
                                    return (
                                        <StyledTableHead
                                            key={index}
                                            onClick={() => sorting(data?.orderBy)}
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
                                            <TableRow key={index} >
                                                <AlternateStyledTableData
                                                    style={{
                                                        color: theme.colors.primary.navy,
                                                        fontSize: theme.fontSize.h4,
                                                        fontFamily: theme.fontFamily.nunitoSansBold
                                                    }}
                                                >
                                                    {row?.radioStation || "---"}
                                                </AlternateStyledTableData>
                                                <AlternateStyledTableData >{`${row?.country}` || "---"}</AlternateStyledTableData>
                                                <AlternateStyledTableData >{`${row?.playsCount}` || "---"}</AlternateStyledTableData>
                                                <AlternateStyledTableData >{`${row?.uniquePlays}` || "---"}</AlternateStyledTableData>
                                                <AlternateStyledTableData >{`${row?.artistsCount}` || "---"}</AlternateStyledTableData>
                                            </TableRow>
                                        )
                                    }
                                    return (
                                        <TableRow key={index}>
                                            <StyledTableData
                                                style={{
                                                    color: theme.colors.primary.navy,
                                                    fontSize: theme.fontSize.h4,
                                                    fontFamily: theme.fontFamily.nunitoSansBold
                                                }}
                                            >
                                                {row?.radioStation || "---"}
                                            </StyledTableData>
                                            <StyledTableData >{`${row?.country}` || "---"}</StyledTableData>
                                            <StyledTableData >{`${row?.playsCount}` || "---"}</StyledTableData>
                                            <StyledTableData >{`${row?.uniquePlays}` || "---"}</StyledTableData>
                                            <StyledTableData >{`${row?.artistsCount}` || "---"}</StyledTableData>
                                        </TableRow>
                                    )
                                })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );
}
