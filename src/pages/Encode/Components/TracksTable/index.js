import { Grid, Table, TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React from 'react'
import { StyledTableData, StyledTableHead, StyledTableRow } from '../../../../StyledComponents/StyledTable/StyledTable';
import theme from '../../../../theme';

export default function TracksTable({ data, tableHeads, sorting }) {
    return (
        <Grid>
            <TableContainer >
                <Table aria-label="customized table" style={{ minWidth: "1030px" }}>
                    <TableHead>
                        <TableRow>
                            {
                                tableHeads?.map((data, index) => {
                                    return (
                                        <StyledTableHead
                                            key={index}
                                        // onClick={() => sorting(data?.sortBy, data?.isAscending, data?.isActive)}
                                        >
                                            {data?.title}
                                            {/* <i className="fa fa-sort" style={{ marginLeft: "5px" }}></i> */}
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
                                    <StyledTableData colSpan={8} style={{ textAlign: "center" }}>
                                        No Data
                                    </StyledTableData>
                                </TableRow> :
                                data?.map((row, index) => {
                                    return (
                                        <StyledTableRow
                                            key={index}
                                            style={{ cursor: "pointer" }}
                                        >
                                            <StyledTableData
                                                style={{
                                                    color: theme.colors.primary.navy,
                                                    fontSize: theme.fontSize.h4,
                                                    fontFamily: theme.fontFamily.nunitoSansBold
                                                }}
                                            >
                                                {row?._id || "---"}
                                            </StyledTableData>
                                            <StyledTableData >
                                                {row?.trackMetaData?.contentName || row?.originalFileName || "---"}
                                            </StyledTableData>
                                            <StyledTableData >{row?.trackMetaData?.version || "---"}</StyledTableData>
                                            <StyledTableData >{row?.trackMetaData?.contentOwner || "---"}</StyledTableData>
                                            <StyledTableData >{row?.trackMetaData?.distributor || "---"}</StyledTableData>
                                            <StyledTableData >{row?.trackMetaData?.contentFileType || "---"}</StyledTableData>
                                            <StyledTableData >{row?.createdAt || "---"}</StyledTableData>
                                            <StyledTableData >{row?.owner?._id || row?.company?._id || row?.partner?._id || "---"}</StyledTableData>
                                            <StyledTableData >...</StyledTableData>
                                        </StyledTableRow>
                                    )
                                })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    )
}
