import { Grid, Table, TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';
import { AlternateStyledTableData, StyledTableData, StyledTableHead, StyledTableRow, StyledAlternateTableRow } from '../../../../StyledComponents/StyledTable/StyledTable';
import * as actionTypes from "../../../../stores/actions/actionTypes"
import { log } from '../../../../utils/app.debug';
import { useNavigate } from 'react-router-dom';
import { SelectedColumn } from '../../../../components/common/Columns/component/SelectedColumn';

export default function TracksTable({ data, trackTableHeads, onTrackSorting }) {
    const theme = useTheme()
    const dispatch = useDispatch()
    const monitor = useSelector(state => state.monitor)
    const navigate = useNavigate()

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
        navigate("/plays")
    }

    return (
        <Grid>
            <TableContainer style={{ padding: '0rem 1rem 1rem 1rem' }}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {
                                trackTableHeads?.map((data, index) => {
                                    const isChecked = SelectedColumn(data?.title);
                                    return (
                                        <StyledTableHead
                                            key={index}
                                            onClick={() => sorting(data?.sortBy, data?.isAscending, data?.isActive)}
                                        >
                                            {isChecked && <>
                                                {data?.title} <i className="fa fa-sort" style={{ marginLeft: "5px" }}></i>
                                            </>}
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
                                            <StyledAlternateTableRow
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
                                                    {SelectedColumn("TRACK NAME") && (row?.trackName || "---")}
                                                </AlternateStyledTableData>
                                                <AlternateStyledTableData >
                                                    {SelectedColumn("PLAYS") && (row?.plays || "---")}
                                                </AlternateStyledTableData>
                                                <AlternateStyledTableData >{SelectedColumn("RADIO STATION") && (row?.radioStation || "---")}</AlternateStyledTableData>
                                                <AlternateStyledTableData >{SelectedColumn("COUNTRY") && (row?.country || "---")}</AlternateStyledTableData>
                                            </StyledAlternateTableRow>
                                        )
                                    }
                                    return (
                                        <StyledTableRow
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
                                                {SelectedColumn("TRACK NAME") && (row?.trackName || "---")}
                                            </StyledTableData>
                                            <StyledTableData >
                                                {SelectedColumn("PLAYS") && (row?.plays || "---")}
                                            </StyledTableData>
                                            <StyledTableData >{SelectedColumn("RADIO STATION") && (row?.radioStation || "---")}</StyledTableData>
                                            <StyledTableData >{SelectedColumn("COUNTRY") && (row?.country || "---")}</StyledTableData>
                                        </StyledTableRow>
                                    )
                                })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );
}
