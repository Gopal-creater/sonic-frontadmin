import { Grid, Table, TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { format } from 'date-fns';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SelectedColumn } from '../../../components/common/Columns/component/SelectedColumn';
import CustomToolTip from '../../../components/common/CustomToolTip';
import TableMenu from '../../../components/common/Table/components/TableMenu';
import { ActionMenuItem } from '../../../components/common/Table/TableStyled';
import { userRoles } from '../../../constants/constants';
import { ActiveBox, StyledTableData, StyledTableHead, StyledTableRow, SuspendedBox } from '../../../StyledComponents/StyledTable/StyledTable';
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
                                <StyledTableData colSpan={user?.userProfile?.data?.userRole === userRoles.PARTNER_ADMIN ? 10 : 9} style={{ textAlign: "center" }}>
                                    No Data
                                </StyledTableData>
                            </TableRow> :
                            data.map((data, index) => {
                                return (
                                    <StyledTableRow key={index} bgColor={index % 2 !== 0 && theme.colors.secondary.tableColor}>
                                        {SelectedColumn("ACCOUNT NAME") && user?.userProfile?.data?.userRole === userRoles.PARTNER_ADMIN &&
                                            <CustomToolTip title={data?.company?.name || data?.users?.map(u => u.username) || "---"}>
                                                <StyledTableData
                                                    style={{
                                                        color: theme.colors.primary.navy,
                                                        fontSize: theme.fontSize.h4,
                                                        fontFamily: theme.fontFamily.nunitoSansBold
                                                    }}
                                                >
                                                    {data?.company?.name || data?.users?.map(u => u.username) || "---"}
                                                </StyledTableData>
                                            </CustomToolTip>
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
                                            <StyledTableData> {data?.users?.length || "0"}</StyledTableData>
                                        }
                                        {SelectedColumn("RENEWAL DATE") &&
                                            <StyledTableData>{format(new Date(data?.validity), "dd/MM/yyyy")}</StyledTableData>
                                        }
                                        {SelectedColumn("LICENSE NAME") &&
                                            <CustomToolTip title={data?.name || "---"}>
                                                <StyledTableData>{data?.name}</StyledTableData>
                                            </CustomToolTip>
                                        }
                                        {SelectedColumn("KEY") &&
                                            <CustomToolTip title={data?.key || "---"}>
                                                <StyledTableData>{data?.key}</StyledTableData>
                                            </CustomToolTip>
                                        }
                                        {SelectedColumn("STATUS") &&
                                            <StyledTableData>
                                                {data?.suspended === true
                                                    ? <SuspendedBox>SUSPENDED</SuspendedBox>
                                                    : <ActiveBox>ACTIVE</ActiveBox>
                                                }
                                            </StyledTableData>
                                        }
                                        {SelectedColumn("ACTION") && (user?.userProfile?.data?.userRole === userRoles.PARTNER_ADMIN || user?.userProfile?.data?.userRole === userRoles.COMPANY_ADMIN) &&
                                            <StyledTableData>
                                                <TableMenu>
                                                    <ActionMenuItem onClick={() => navigate(`/edit-licences/${data?._id}`, { state: data })}>View License</ActionMenuItem>
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
