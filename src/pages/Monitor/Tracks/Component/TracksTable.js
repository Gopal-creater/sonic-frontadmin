import { Grid, Table, TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { AlternateStyledTableData, StyledTableData, StyledTableHead } from '../../../../StyledComponents/StyledTable/StyledTable';
import * as actionTypes from "../../../../stores/actions/actionTypes"

export default function TracksTable({ data, trackTableHeads, onTrackSorting }) {
    const theme = useTheme()
    const history = useHistory()
    const dispatch = useDispatch()
    const monitor = useSelector(state => state.monitor)

    const sorting = (sortBy, isAscending, isActive) => {
        if (isActive) {
            if (isAscending === true) {
                onTrackSorting(sortBy, false, false)
            }
            else if (isAscending === false) {
                onTrackSorting(sortBy, true, false)
            }
            else if (isAscending === null) {
                onTrackSorting(sortBy, true, false)
            }
        } else {
            if (isAscending === true) {
                onTrackSorting(sortBy, false, true)
            }
            else if (isAscending === false) {
                onTrackSorting(sortBy, true, true)
            }
            else if (isAscending === null) {
                onTrackSorting(sortBy, true, true)
            }
        }
    }

    const onPlaysClick = (trackName) => {
        dispatch({ type: actionTypes.SET_MONITOR_FILTERS, data: { ...monitor?.filters, song: trackName } })
        history.push("/plays")
    }

    return (
        <Grid>
            <TableContainer >
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {
                                trackTableHeads?.map((data, index) => {
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
                                    <StyledTableData colSpan={4} style={{ textAlign: "center" }}>
                                        No Data
                                    </StyledTableData>
                                </TableRow> :
                                data?.map((row, index) => {
                                    if (index % 2 !== 0) {
                                        return (
                                            <TableRow
                                                key={index}
                                                style={{ cursor: "pointer" }}
                                                onClick={() => onPlaysClick(row?.trackName)}
                                            >
                                                <AlternateStyledTableData
                                                    style={{
                                                        color: theme.colors.primary.navy,
                                                        fontSize: theme.fontSize.h4,
                                                        fontFamily: theme.fontFamily.nunitoSansBold
                                                    }}
                                                >
                                                    {row?.trackName || "---"}
                                                </AlternateStyledTableData>
                                                <AlternateStyledTableData >
                                                    {row?.plays || "---"}
                                                </AlternateStyledTableData>
                                                <AlternateStyledTableData >{row?.radioStation || "---"}</AlternateStyledTableData>
                                                <AlternateStyledTableData >{row?.country || "---"}</AlternateStyledTableData>
                                            </TableRow>
                                        )
                                    }
                                    return (
                                        <TableRow
                                            key={index}
                                            style={{ cursor: "pointer" }}
                                            onClick={() => onPlaysClick(row?.trackName)}
                                        >
                                            <StyledTableData
                                                style={{
                                                    color: theme.colors.primary.navy,
                                                    fontSize: theme.fontSize.h4,
                                                    fontFamily: theme.fontFamily.nunitoSansBold
                                                }}
                                            >
                                                {row?.trackName || "---"}
                                            </StyledTableData>
                                            <StyledTableData >
                                                {row?.plays || "---"}
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
