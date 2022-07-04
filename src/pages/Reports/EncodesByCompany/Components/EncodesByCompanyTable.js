import { Grid, TableContainer, TableRow, Table, TableHead, TableBody } from '@material-ui/core'
import React from 'react'
import { StyledTableData, StyledTableHead, StyledTableRow } from '../../../../StyledComponents/StyledTable/StyledTable'
import theme from '../../../../theme'
import { log } from '../../../../utils/app.debug'
import CompanyEncodes from './CompanyEncodes'

export default function EncodesByCompanyTable({ data, encodesByCompanyTableHeads }) {
    log("Encodes by company table", data)
    return (
        <Grid>
            <TableContainer style={{ padding: '0rem 1rem 1rem 1rem' }}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {
                                encodesByCompanyTableHeads?.map((data, index) => {
                                    return (
                                        <StyledTableHead align='left' key={index}>
                                            {data?.title}
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
                                            <CompanyEncodes companyId={data?._id} />
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
