import { Badge, Table, TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React from 'react'
import { SelectedColumn } from '../../../../components/common/Columns/component/SelectedColumn';
import { StyledTableData, StyledTableHead, StyledTableRow } from '../../../../StyledComponents/StyledTable/StyledTable';
import theme from '../../../../theme';

export default function StreamDetailsTable({ data, tableHeads }) {
    return (
        <div>
            <TableContainer style={{ padding: '0rem 1rem 1rem 1rem' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {
                                tableHeads?.map((data, index) => {
                                    const isChecked = SelectedColumn(data?.title);
                                    if (isChecked) {
                                        return (
                                            <StyledTableHead key={index}>
                                                {data?.title}
                                            </StyledTableHead>
                                        )
                                    }
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data?.docs?.length === 0 ?
                                <TableRow key={0}>
                                    <StyledTableData colSpan={8} style={{ textAlign: "center" }}>
                                        No Data
                                    </StyledTableData>
                                </TableRow> :
                                data?.docs?.map((row, index) => {
                                    return (
                                        <StyledTableRow key={index}>
                                            {
                                                SelectedColumn("ID") &&
                                                <StyledTableData>{data?.offset + index + 1}</StyledTableData>
                                            }
                                            {
                                                SelectedColumn("SONICKEY") &&
                                                <StyledTableData
                                                    style={{
                                                        color: theme.colors.primary.navy,
                                                        fontSize: theme.fontSize.h5,
                                                        fontFamily: theme.fontFamily.nunitoSansMediumBold
                                                    }}
                                                >
                                                    {row?.sonicKey?.sonicKey || "---"}
                                                </StyledTableData>
                                            }
                                            {
                                                SelectedColumn("NAME") &&
                                                <StyledTableData >{row?.sonicKey?.contentName || "---"}</StyledTableData>
                                            }
                                            {
                                                SelectedColumn("ARTIST") &&
                                                <StyledTableData >{row?.sonicKey?.contentOwner || "---"}</StyledTableData>
                                            }
                                            {
                                                SelectedColumn("QUALITY") &&
                                                <StyledTableData >{row?.sonicKey?.contentQuality || "---"}</StyledTableData>
                                            }
                                            {
                                                SelectedColumn("DESCRIPTION") &&
                                                <StyledTableData>
                                                    {row?.sonicKey?.contentDescription || "---"}
                                                </StyledTableData>
                                            }
                                            {
                                                SelectedColumn("PLAYS") &&
                                                <StyledTableData>{row?.totalHits || "---"}</StyledTableData>
                                            }
                                        </StyledTableRow>
                                    )
                                })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
