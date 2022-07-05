import { Grid, TableContainer, TableRow, Table, TableHead, TableBody } from '@material-ui/core'
import React from 'react'
import { StyledTableData, StyledTableHead, StyledTableRow } from '../../../../StyledComponents/StyledTable/StyledTable'
import theme from '../../../../theme'
import { log } from '../../../../utils/app.debug'

export default function EncodesByCompanyTable({ data, encodesByCompanyTableHeads, companyEncodesSorting }) {
    const sorting = (sortBy, isAscending, isActive) => {
        if (isActive) {
            if (isAscending === true) {
                companyEncodesSorting(sortBy, false, false)
            }
            else if (isAscending === false) {
                companyEncodesSorting(sortBy, true, false)
            }
            else if (isAscending === null) {
                companyEncodesSorting(sortBy, true, false)
            }
        } else {
            if (isAscending === true) {
                companyEncodesSorting(sortBy, false, true)
            }
            else if (isAscending === false) {
                companyEncodesSorting(sortBy, true, true)
            }
            else if (isAscending === null) {
                companyEncodesSorting(sortBy, true, true)
            }
        }
    }

    return (
        <Grid>
            <TableContainer style={{ padding: '0rem 1rem 1rem 1rem' }}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {
                                encodesByCompanyTableHeads?.map((data, index) => {
                                    return (
                                        <StyledTableHead
                                            align='left'
                                            key={index}
                                            onClick={() => sorting(data?.sortBy, data?.isAscending, data?.isActive)}
                                        >
                                            {data?.title}<i className="fa fa-sort" style={{ marginLeft: "5px" }}></i>
                                        </StyledTableHead>
                                    )

                                })
                            }

                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data?.length === 0 ?
                            <TableRow key={0}>
                                <StyledTableData colSpan={8} style={{ textAlign: "center" }}>
                                    No Data
                                </StyledTableData>
                            </TableRow> :
                            data?.map((data, index) => {
                                return (
                                    <StyledTableRow key={index} bgColor={index % 2 !== 0 && theme.colors.secondary.tableColor}>
                                        <StyledTableData>
                                            {data?.name || "---"}
                                        </StyledTableData>

                                        <StyledTableData>
                                            {data?.encodesCount || "---"}
                                        </StyledTableData>
                                    </StyledTableRow>
                                )
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid >
    )
}
