import { Grid, Table, TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SelectedColumn } from '../../../components/common/Columns/component/SelectedColumn';
import TableMenu from '../../../components/common/Table/components/TableMenu';
import { ActionMenuItem } from '../../../components/common/Table/TableStyled';
import { ActiveBox, AlternateStyledTableData, StyledAlternateTableRow, StyledTableData, StyledTableHead, StyledTableRow, SuspendedBox } from '../../../StyledComponents/StyledTable/StyledTable';

export default function UsersTable({ data, usersTableHead }) {
    const navigate = useNavigate()

    return (
        <Grid>
            <TableContainer style={{ padding: '0rem 1rem 1rem 1rem' }}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {
                                usersTableHead?.map((data, index) => {
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
                                <StyledTableData colSpan={9} style={{ textAlign: "center" }}>
                                    No Data
                                </StyledTableData>
                            </TableRow> :
                            data?.map((data, index) => {
                                if (index % 2 !== 0) {
                                    return (
                                        <StyledAlternateTableRow key={data?._id}>
                                            {SelectedColumn("USERNAME") &&
                                                <AlternateStyledTableData>{data?.username || "---"}</AlternateStyledTableData>
                                            }
                                            {SelectedColumn("ID") &&
                                                <AlternateStyledTableData>{data?._id || "---"}</AlternateStyledTableData>
                                            }
                                            {SelectedColumn("EMAIL") &&
                                                <AlternateStyledTableData>{data?.email || "---"}</AlternateStyledTableData>
                                            }
                                            {SelectedColumn("PHONE NUMBER") &&
                                                <AlternateStyledTableData>{data?.phone_number || "---"}</AlternateStyledTableData>
                                            }
                                            {SelectedColumn("ACCOUNT TYPE") &&
                                                <AlternateStyledTableData>
                                                    {data?.partner && "Partner" || data?.company && "Company" || "---"}
                                                </AlternateStyledTableData>
                                            }
                                            {SelectedColumn("ACCOUNT NAME") &&
                                                <AlternateStyledTableData>{"---"}</AlternateStyledTableData>
                                            }
                                            {SelectedColumn("USER TYPE") &&
                                                <AlternateStyledTableData>
                                                    {data?.userRole === "PartnerAdmin" || "CompanyAdmin" ? "Admin" : "Standard"}
                                                </AlternateStyledTableData>
                                            }
                                            {SelectedColumn("STATUS") &&
                                                <AlternateStyledTableData>
                                                    {data?.enabled === true
                                                        ? <ActiveBox>ACTIVE</ActiveBox>
                                                        : <SuspendedBox>SUSPENDED</SuspendedBox>
                                                    }
                                                </AlternateStyledTableData>
                                            }
                                            {SelectedColumn("ACTION") &&
                                                <AlternateStyledTableData>
                                                    <TableMenu>
                                                        <ActionMenuItem onClick={() => navigate(`/user-profile/${data?._id}`, { state: data })}>Edit User</ActionMenuItem>
                                                    </TableMenu>
                                                </AlternateStyledTableData>
                                            }
                                        </StyledAlternateTableRow>
                                    )
                                }
                                return (
                                    <StyledTableRow key={data?._id}>
                                        {SelectedColumn("USERNAME") &&
                                            <StyledTableData>{data?.username || "---"}</StyledTableData>
                                        }
                                        {SelectedColumn("ID") &&
                                            <StyledTableData>{data?._id || "---"}</StyledTableData>
                                        }
                                        {SelectedColumn("EMAIL") &&
                                            <StyledTableData>{data?.email || "---"}</StyledTableData>
                                        }
                                        {SelectedColumn("PHONE NUMBER") &&
                                            <StyledTableData>{data?.phone_number || "---"}</StyledTableData>
                                        }
                                        {SelectedColumn("ACCOUNT TYPE") &&
                                            <StyledTableData>
                                                {data?.partner && "Partner" || data?.company && "Company" || "---"}
                                            </StyledTableData>
                                        }
                                        {SelectedColumn("ACCOUNT NAME") &&
                                            <StyledTableData>{"---"}</StyledTableData>
                                        }
                                        {SelectedColumn("USER TYPE") &&
                                            <StyledTableData>
                                                {data?.userRole === "PartnerAdmin" || "CompanyAdmin" ? "Admin" : "Standard"}
                                            </StyledTableData>
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
                                                    <ActionMenuItem onClick={() => navigate(`/user-profile/${data?._id}`, { state: data })}>Edit User</ActionMenuItem>
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
