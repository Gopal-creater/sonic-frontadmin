import { Grid, Table, TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SelectedColumn } from '../../../components/common/Columns/component/SelectedColumn';
import TableMenu from '../../../components/common/Table/components/TableMenu';
import { ActionMenuItem } from '../../../components/common/Table/TableStyled';
import { ActiveBox, StyledTableData, StyledTableHead, StyledTableRow, SuspendedBox } from '../../../StyledComponents/StyledTable/StyledTable';
import theme from '../../../theme';

export default function CompanyTable({ data, companyTableHead }) {
    const navigate = useNavigate()

    return (
        <Grid>
            <TableContainer style={{ padding: '0rem 1rem 1rem 1rem' }}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {
                                companyTableHead?.map((data, index) => {
                                    const isChecked = SelectedColumn(data?.title);
                                    if (isChecked)
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
                                        {SelectedColumn("COMPANY") &&
                                            <StyledTableData>
                                                {data?.name || "---"}
                                            </StyledTableData>
                                        }
                                        {SelectedColumn("COMPANY TYPE") &&
                                            <StyledTableData>
                                                {data?.companyType || "---"}
                                            </StyledTableData>
                                        }
                                        {SelectedColumn("ID") &&
                                            <StyledTableData>
                                                {data?._id || "---"}
                                            </StyledTableData>
                                        }
                                        {SelectedColumn("EMAIL") &&
                                            <StyledTableData>{data?.owner?.email || "---"}</StyledTableData>
                                        }
                                        {SelectedColumn("PHONE NUMBER") &&
                                            <StyledTableData>{data?.owner?.phone_number || "---"}</StyledTableData>
                                        }
                                        {SelectedColumn("ADMIN") &&
                                            <StyledTableData>{data?.owner?.name || "---"}</StyledTableData>
                                        }
                                        {SelectedColumn("STATUS") &&
                                            <StyledTableData>
                                                {data?.enabled === true
                                                    ? <ActiveBox>ACTIVE</ActiveBox>
                                                    : <SuspendedBox>SUSPENDED</SuspendedBox>
                                                }
                                            </StyledTableData>
                                        }
                                        {SelectedColumn("ACTION") &&
                                            <StyledTableData>
                                                <TableMenu>
                                                    <ActionMenuItem onClick={() => navigate(`/company-profile/${data?._id}`, { state: data })}>View Company</ActionMenuItem>
                                                </TableMenu>
                                            </StyledTableData>
                                        }
                                    </StyledTableRow>
                                )
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );
}
