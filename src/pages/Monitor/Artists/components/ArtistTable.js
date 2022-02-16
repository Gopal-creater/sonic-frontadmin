import { Grid, Table, TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import { useTheme } from 'styled-components';
import { AlternateStyledTableData, StyledTableData, StyledTableHead } from '../../../../StyledComponents/StyledTable/StyledTable';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as actionTypes from "../../../../stores/actions/actionTypes"

export default function ArtistTable({ data, artistTableHeads, onArtistSorting }) {
    const theme = useTheme()
    const dispatch = useDispatch()
    const history = useHistory()
    const monitor = useSelector(state => state.monitor)

    const sorting = (sortBy, isAscending, isActive) => {
        if (isActive) {
            if (isAscending === true) {
                onArtistSorting(sortBy, false, false)
            }
            else if (isAscending === false) {
                onArtistSorting(sortBy, true, false)
            }
            else if (isAscending === null) {
                onArtistSorting(sortBy, true, false)
            }
        } else {
            if (isAscending === true) {
                onArtistSorting(sortBy, false, true)
            }
            else if (isAscending === false) {
                onArtistSorting(sortBy, true, true)
            }
            else if (isAscending === null) {
                onArtistSorting(sortBy, true, true)
            }
        }
    }

    const onPlaysClick = (artistName) => {
        dispatch({ type: actionTypes.SET_MONITOR_FILTERS, data: { ...monitor?.filters, artist: artistName } })
        history.push("/plays")
    }

    return (
        <Grid>
            <TableContainer >
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {
                                artistTableHeads?.map((data, index) => {
                                    return (
                                        <StyledTableHead
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
                                            <TableRow key={index}
                                                onClick={() => onPlaysClick(row?.artistName)}
                                                style={{ cursor: "pointer" }}
                                            >
                                                <AlternateStyledTableData
                                                    style={{
                                                        color: theme.colors.primary.navy,
                                                        fontSize: theme.fontSize.h4,
                                                        fontFamily: theme.fontFamily.nunitoSansBold
                                                    }}
                                                >
                                                    {row?.artistName || "---"}
                                                </AlternateStyledTableData>
                                                <AlternateStyledTableData >
                                                    {row?.plays || "---"}
                                                </AlternateStyledTableData>
                                                <AlternateStyledTableData >
                                                    {row?.uniquePlaysCount || "---"}
                                                </AlternateStyledTableData>
                                                <AlternateStyledTableData >{row?.radioStation || "---"}</AlternateStyledTableData>
                                                <AlternateStyledTableData >{row?.country || "---"}</AlternateStyledTableData>
                                            </TableRow>
                                        )
                                    }
                                    return (
                                        <TableRow key={index}
                                            onClick={() => onPlaysClick(row?.artistName)}
                                            style={{ cursor: "pointer" }}
                                        >
                                            <StyledTableData
                                                style={{
                                                    color: theme.colors.primary.navy,
                                                    fontSize: theme.fontSize.h4,
                                                    fontFamily: theme.fontFamily.nunitoSansBold
                                                }}
                                            >
                                                {row?.artistName || "---"}
                                            </StyledTableData>
                                            <StyledTableData >
                                                {row?.plays || "---"}
                                            </StyledTableData>
                                            <StyledTableData>
                                                {row?.uniquePlaysCount || "---"}
                                            </StyledTableData>
                                            <StyledTableData >{row?.radioStation || "---"}</StyledTableData>
                                            <StyledTableData >{row?.country || "---"}</StyledTableData>
                                        </TableRow>
                                    )
                                })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );
}
