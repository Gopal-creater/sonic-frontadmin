import { Grid, Table, TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { format } from 'date-fns';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SelectedColumn } from '../../../components/common/Columns/component/SelectedColumn';
import TableMenu from '../../../components/common/Table/components/TableMenu';
import { ActionMenuItem } from '../../../components/common/Table/TableStyled';
import { ActiveBox, AlternateStyledTableData, StyledAlternateTableRow, StyledTableData, StyledTableHead, StyledTableRow, SuspendedBox } from '../../../StyledComponents/StyledTable/StyledTable';

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
                                if (index % 2 !== 0) {
                                    return (
                                        <StyledAlternateTableRow key={data?._id}>
                                            {SelectedColumn("COMPANY") &&
                                                <AlternateStyledTableData>
                                                    {data?.isUnlimitedEncode === true
                                                        ? "Unlimited"
                                                        : data?.encodeUses
                                                    }
                                                </AlternateStyledTableData>
                                            }
                                            {SelectedColumn("COMPANY TYPE") &&
                                                <AlternateStyledTableData>
                                                    {data?.isUnlimitedEncode === true
                                                        ? "Unlimited"
                                                        : data?.encodeUses
                                                    }
                                                </AlternateStyledTableData>
                                            }
                                            {SelectedColumn("ID") &&
                                                <AlternateStyledTableData>
                                                    {data?.isUnlimitedMonitor === true
                                                        ? "Unlimited"
                                                        : data?.monitoringUses
                                                    }
                                                </AlternateStyledTableData>
                                            }
                                            {SelectedColumn("EMAIL") &&
                                                <AlternateStyledTableData>{format(new Date(data?.validity), "dd/MM/yyyy")}</AlternateStyledTableData>
                                            }
                                            {SelectedColumn("PHONE NUMBER") &&
                                                <AlternateStyledTableData>{data?.name}</AlternateStyledTableData>
                                            }
                                            {SelectedColumn("ADMIN") &&
                                                <AlternateStyledTableData>{data?.type || "---"}</AlternateStyledTableData>
                                            }
                                            {SelectedColumn("STATUS") &&
                                                <AlternateStyledTableData>
                                                    {data?.suspended === true
                                                        ? <SuspendedBox>SUSPENDED</SuspendedBox>
                                                        : <ActiveBox>ACTIVE</ActiveBox>
                                                    }
                                                </AlternateStyledTableData>
                                            }
                                            {SelectedColumn("ACTION") &&
                                                <AlternateStyledTableData>
                                                    <TableMenu>
                                                        <ActionMenuItem onClick={() => navigate('/company-profile')}>Edit Company</ActionMenuItem>
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
                                                {data?.isUnlimitedEncode === true
                                                    ? "Unlimited"
                                                    : data?.encodeUses
                                                }
                                            </StyledTableData>
                                        }
                                        {SelectedColumn("COMPANY TYPE") &&
                                            <StyledTableData>
                                                {data?.isUnlimitedEncode === true
                                                    ? "Unlimited"
                                                    : data?.encodeUses
                                                }
                                            </StyledTableData>
                                        }
                                        {SelectedColumn("ID") &&
                                            <StyledTableData>
                                                {data?.isUnlimitedMonitor === true
                                                    ? "Unlimited"
                                                    : data?.monitoringUses
                                                }
                                            </StyledTableData>
                                        }
                                        {SelectedColumn("EMAIL") &&
                                            <StyledTableData>{format(new Date(data?.validity), "dd/MM/yyyy")}</StyledTableData>
                                        }
                                        {SelectedColumn("PHONE NUMBER") &&
                                            <StyledTableData>{data?.name}</StyledTableData>
                                        }
                                        {SelectedColumn("ADMIN") &&
                                            <StyledTableData>{data?.type || "---"}</StyledTableData>
                                        }
                                        {SelectedColumn("STATUS") &&
                                            <StyledTableData>
                                                {data?.suspended === true
                                                    ? <SuspendedBox>INACTIVE</SuspendedBox>
                                                    : <ActiveBox>ACTIVE</ActiveBox>
                                                }
                                            </StyledTableData>
                                        }
                                        {SelectedColumn("ACTION") &&
                                            <StyledTableData>
                                                <TableMenu>
                                                    <ActionMenuItem onClick={() => navigate('/company-profile')}>Edit Company</ActionMenuItem>
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
