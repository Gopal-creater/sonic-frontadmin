import { Grid, Table, TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { format } from 'date-fns';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SelectedColumn } from '../../../components/common/Columns/component/SelectedColumn';
import TableMenu from '../../../components/common/Table/components/TableMenu';
import { ActionMenuItem } from '../../../components/common/Table/TableStyled';
import { ActiveBox, AlternateStyledTableData, StyledAlternateTableRow, StyledTableData, StyledTableHead, StyledTableRow, SuspendedBox } from '../../../StyledComponents/StyledTable/StyledTable';
import theme from '../../../theme';

export default function LicenceTable({ data, licenseTableHead }) {
    const navigate = useNavigate()
    const user = useSelector(state => state.user)

    return (
        <Grid>
            <TableContainer style={{ padding: '0rem 1rem 1rem 1rem' }}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {
                                licenseTableHead?.map((data, index) => {
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
                                <StyledTableData colSpan={user?.userProfile?.data?.userRole === "PartnerAdmin" ? 10 : 9} style={{ textAlign: "center" }}>
                                    No Data
                                </StyledTableData>
                            </TableRow> :
                            data.map((data, index) => {
                                if (index % 2 !== 0) {
                                    return (
                                        <StyledAlternateTableRow key={data?._id}>
                                            {SelectedColumn("ACCOUNT NAME") && user?.userProfile?.data?.userRole === "PartnerAdmin" &&
                                                <AlternateStyledTableData
                                                    style={{
                                                        color: theme.colors.primary.navy,
                                                        fontSize: theme.fontSize.h4,
                                                        fontFamily: theme.fontFamily.nunitoSansBold
                                                    }}
                                                >
                                                    {"---"}
                                                </AlternateStyledTableData>
                                            }
                                            {SelectedColumn("MAX USES ENCODE") &&
                                                <AlternateStyledTableData>
                                                    {data?.isUnlimitedEncode === true
                                                        ? "Unlimited"
                                                        : data?.encodeUses
                                                    }
                                                </AlternateStyledTableData>
                                            }
                                            {SelectedColumn("MAX USES MONITOR") &&
                                                <AlternateStyledTableData>
                                                    {data?.isUnlimitedMonitor === true
                                                        ? "Unlimited"
                                                        : data?.monitoringUses
                                                    }
                                                </AlternateStyledTableData>
                                            }
                                            {SelectedColumn("ACCOUNT TYPE") &&
                                                <AlternateStyledTableData>{data?.type || "---"}</AlternateStyledTableData>
                                            }
                                            {SelectedColumn("USERS") &&
                                                <AlternateStyledTableData> {"---"}</AlternateStyledTableData>
                                            }
                                            {SelectedColumn("RENEWAL DATE") &&
                                                <AlternateStyledTableData>{format(new Date(data?.validity), "dd/MM/yyyy")}</AlternateStyledTableData>
                                            }
                                            {SelectedColumn("LICENSE NAME") &&
                                                <AlternateStyledTableData>{data?.name}</AlternateStyledTableData>
                                            }
                                            {SelectedColumn("KEY") &&
                                                <AlternateStyledTableData>{data?.key}</AlternateStyledTableData>
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
                                                        <ActionMenuItem onClick={() => navigate('/edit-licences')}>Edit License</ActionMenuItem>
                                                    </TableMenu>
                                                </AlternateStyledTableData>
                                            }
                                        </StyledAlternateTableRow>
                                    )
                                }
                                return (
                                    <StyledTableRow key={data?._id}>
                                        {SelectedColumn("ACCOUNT NAME") && user?.userProfile?.data?.userRole === "PartnerAdmin" &&
                                            <StyledTableData
                                                style={{
                                                    color: theme.colors.primary.navy,
                                                    fontSize: theme.fontSize.h4,
                                                    fontFamily: theme.fontFamily.nunitoSansBold
                                                }}
                                            >
                                                {"---"}
                                            </StyledTableData>
                                        }
                                        {SelectedColumn("MAX USES ENCODE") &&
                                            <StyledTableData>
                                                {data?.isUnlimitedEncode === true
                                                    ? "Unlimited"
                                                    : data?.encodeUses
                                                }
                                            </StyledTableData>
                                        }
                                        {SelectedColumn("MAX USES MONITOR") &&
                                            <StyledTableData>
                                                {data?.isUnlimitedMonitor === true
                                                    ? "Unlimited"
                                                    : data?.monitoringUses
                                                }
                                            </StyledTableData>
                                        }
                                        {SelectedColumn("ACCOUNT TYPE") &&
                                            <StyledTableData>{data?.type || "---"}</StyledTableData>
                                        }
                                        {SelectedColumn("USERS") &&
                                            <StyledTableData> {"---"}</StyledTableData>
                                        }
                                        {SelectedColumn("RENEWAL DATE") &&
                                            <StyledTableData>{format(new Date(data?.validity), "dd/MM/yyyy")}</StyledTableData>
                                        }
                                        {SelectedColumn("LICENSE NAME") &&
                                            <StyledTableData>{data?.name}</StyledTableData>
                                        }
                                        {SelectedColumn("KEY") &&
                                            <StyledTableData>{data?.key}</StyledTableData>
                                        }
                                        {SelectedColumn("STATUS") &&
                                            <StyledTableData>
                                                {data?.suspended === true
                                                    ? <SuspendedBox>SUSPENDED</SuspendedBox>
                                                    : <ActiveBox>ACTIVE</ActiveBox>
                                                }
                                            </StyledTableData>
                                        }
                                        {SelectedColumn("ACTION") &&
                                            <StyledTableData>
                                                <TableMenu>
                                                    <ActionMenuItem onClick={() => navigate('/edit-licences')}>Edit License</ActionMenuItem>
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
