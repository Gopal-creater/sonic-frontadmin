import { Grid, Table, TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import { useTheme } from 'styled-components';
import { radioStationTableHeads } from '../../../../constants/constants';
import { AlternateStyledTableData, StyledTableData, StyledTableHead } from '../../../../StyledComponents/StyledTable/StyledTable';
import dropdown from "../../../../assets/icons/dropdown.png"

export default function RadioStationTable({ data }) {
    const theme = useTheme()

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