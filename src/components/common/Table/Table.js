import React from 'react'
import { TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { AlternateStyledTableData, StyledAlternateTableRow, StyledTableData, StyledTableHead, StyledTableRow } from '../../../StyledComponents/StyledTable/StyledTable';
import { SelectedColumn } from '../Columns/component/SelectedColumn';

export default function Table({ columns, data }) {
    return (
        <TableContainer style={{ padding: '0rem 1rem 1rem 1rem' }}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {
                            columns?.map((data, index) => {
                                const isChecked = SelectedColumn(data?.title);
                                return (
                                    <StyledTableHead align='left' key={index}>
                                        {isChecked && data?.title}
                                    </StyledTableHead>
                                )
                            })
                        }

                    </TableRow>
                </TableHead>

                <TableBody>
                    {data?.length === 0 ?
                        <TableRow key={0}>
                            <StyledTableData colSpan={7} style={{ textAlign: "center" }}>
                                No Data
                            </StyledTableData>
                        </TableRow> :
                        data?.map((data, index) => {
                            if (index % 2 !== 0) {
                                return (
                                    <StyledAlternateTableRow key={index}>
                                        <AlternateStyledTableData>
                                            {SelectedColumn("ACCOUNT TYPE") && (data?.type || "---")}
                                        </AlternateStyledTableData>
                                    </StyledAlternateTableRow>
                                )
                            }
                            return (
                                <StyledTableRow key={data?._id}>
                                    <StyledTableData>
                                        {SelectedColumn("ACCOUNT TYPE") && (data?.type || "---")}
                                    </StyledTableData>
                                </StyledTableRow>
                            )
                        })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
