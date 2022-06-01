import { Grid, Table, TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { format } from 'date-fns';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SelectedColumn } from '../../../components/common/Columns/component/SelectedColumn';
import TableMenu from '../../../components/common/Table/components/TableMenu';
import { ActionMenuItem } from '../../../components/common/Table/TableStyled';
import { ActiveBox, AlternateStyledTableData, StyledAlternateTableRow, StyledTableData, StyledTableHead, StyledTableRow, SuspendedBox } from '../../../StyledComponents/StyledTable/StyledTable';
import { log } from '../../../utils/app.debug';

export default function CompanyTable({ data, companyTableHead }) {
    const navigate = useNavigate()
    log("data of table company", data)
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
                                if (index % 2 !== 0) {
                                    return (
                                        <StyledAlternateTableRow key={data?._id}>
                                            {SelectedColumn("COMPANY") &&
                                                <AlternateStyledTableData>
                                                    {data?.name || "---"}
                                                </AlternateStyledTableData>
                                            }
                                            {SelectedColumn("COMPANY TYPE") &&
                                                <AlternateStyledTableData>
                                                    {data?.companyType || "---"}
                                                </AlternateStyledTableData>
                                            }
                                            {SelectedColumn("ID") &&
                                                <AlternateStyledTableData>
                                                    {data?._id || "---"}
                                                </AlternateStyledTableData>
                                            }
                                            {SelectedColumn("EMAIL") &&
                                                <AlternateStyledTableData>
                                                    {data?.owner?.email || "---"}
                                                </AlternateStyledTableData>
                                            }
                                            {SelectedColumn("PHONE NUMBER") &&
                                                <AlternateStyledTableData>
                                                    {data?.owner?.phone_number || "---"}
                                                </AlternateStyledTableData>
                                            }
                                            {SelectedColumn("ADMIN") &&
                                                <AlternateStyledTableData>{data?.owner?.name || "---"}</AlternateStyledTableData>
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
                                                        <ActionMenuItem onClick={() => navigate(`/company-profile/${data?._id}`, { state: data })}>Edit Company</ActionMenuItem>
                                                    </TableMenu>
                                                </AlternateStyledTableData>
                                            }
                                        </StyledAlternateTableRow>
                                    )
                                }
                                return (
                                    <StyledTableRow key={data?._id}>
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
                                                    <ActionMenuItem onClick={() => navigate(`/company-profile/${data?._id}`, { state: data })}>Edit Company</ActionMenuItem>
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
