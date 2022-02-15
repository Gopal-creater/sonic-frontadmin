import { Grid, Table, TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import { useTheme } from 'styled-components';
import { artistTableHeads } from '../../../../constants/constants';
import { AlternateStyledTableData, StyledTableData, StyledTableHead } from '../../../../StyledComponents/StyledTable/StyledTable';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as actionTypes from "../../../../stores/actions/actionTypes"

export default function ArtistTable({ data }) {
    const theme = useTheme()
    const dispatch = useDispatch()
    const history = useHistory()
    const monitor = useSelector(state => state.monitor)

    const [state, setState] = React.useState({
        data: data || [],
    })
    const [sortOrder, setSortOrder] = React.useState("ASC")

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
                            state?.data?.length === 0 ?
                                <TableRow key={0}>
                                    <StyledTableData colSpan={5} style={{ textAlign: "center" }}>
                                        No Data
                                    </StyledTableData>
                                </TableRow> :
                                state?.data?.map((row, index) => {
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
                                                    {row?.artistName || "---"}
                                                </AlternateStyledTableData>
                                                <AlternateStyledTableData
                                                    onClick={() => onPlaysClick(row?.artistName)}
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    {row?.plays || "---"}
                                                </AlternateStyledTableData>
                                                <AlternateStyledTableData
                                                    onClick={() => onPlaysClick(row?.artistName)}
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    {row?.uniquePlaysCount || "---"}
                                                </AlternateStyledTableData>
                                                <AlternateStyledTableData >{row?.radioStation || "---"}</AlternateStyledTableData>
                                                <AlternateStyledTableData >{row?.country || "---"}</AlternateStyledTableData>
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
                                                {row?.artistName || "---"}
                                            </StyledTableData>
                                            <StyledTableData
                                                onClick={() => onPlaysClick(row?.artistName)}
                                                style={{ cursor: "pointer" }}
                                            >
                                                {row?.plays || "---"}
                                            </StyledTableData>
                                            <StyledTableData
                                                onClick={() => onPlaysClick(row?.artistName)}
                                                style={{ cursor: "pointer" }}
                                            >
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
