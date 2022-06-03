import { Grid, Table, TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SelectedColumn } from '../../../components/common/Columns/component/SelectedColumn';
import TableMenu from '../../../components/common/Table/components/TableMenu';
import { ActionMenuItem } from '../../../components/common/Table/TableStyled';
import { userRoles } from '../../../constants/constants';
import { ActiveBox, AlternateStyledTableData, StyledAlternateTableRow, StyledTableData, StyledTableHead, StyledTableRow, SuspendedBox } from '../../../StyledComponents/StyledTable/StyledTable';
import { CustomTooltip } from '../../../StyledComponents/StyledToolTip/CustomTooltip';
import theme from '../../../theme';

export default function UsersTable({ data, usersTableHead }) {
    const users = useSelector(state => state.user)
    const navigate = useNavigate()

    const getAccountType = (roles) => {
        if (roles === userRoles.PARTNER_ADMIN || roles === userRoles.PARTNER_USER) {
            return "Partner"
        } else if (roles === userRoles.COMPANY_ADMIN || roles === userRoles.COMPANY_USER) {
            return "Company"
        }
        return null
    }

    const getAccountName = (data) => {
        if (data?.userRole === userRoles.PARTNER_ADMIN || data?.userRole === userRoles.PARTNER_USER) {
            return data?.partner?.name
        } else if (data?.userRole === userRoles.COMPANY_ADMIN || data?.userRole === userRoles.COMPANY_USER) {
            return data?.company?.name
        }
        return null
    }

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
                                                <CustomTooltip title={data?.username || "---"}>
                                                    <AlternateStyledTableData
                                                        style={{
                                                            color: theme.colors.primary.navy,
                                                            fontSize: theme.fontSize.h4,
                                                            fontFamily: theme.fontFamily.nunitoSansBold
                                                        }}
                                                    >
                                                        {data?.username || "---"}
                                                    </AlternateStyledTableData>
                                                </CustomTooltip>
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
                                            {SelectedColumn("ACCOUNT TYPE") && users?.userProfile?.data?.userRole === userRoles.PARTNER_ADMIN &&
                                                <AlternateStyledTableData>
                                                    {getAccountType(data?.userRole)}
                                                </AlternateStyledTableData>
                                            }
                                            {SelectedColumn("ACCOUNT NAME") && users?.userProfile?.data?.userRole === userRoles.PARTNER_ADMIN &&
                                                <AlternateStyledTableData>
                                                    {getAccountName(data)}
                                                </AlternateStyledTableData>
                                            }
                                            {SelectedColumn("COMPANY NAME") && users?.userProfile?.data?.userRole === userRoles.COMPANY_ADMIN &&
                                                <AlternateStyledTableData>{data?.company?.name || "---"}</AlternateStyledTableData>
                                            }
                                            {SelectedColumn("USER TYPE") &&
                                                <AlternateStyledTableData>
                                                    {(data?.userRole === userRoles.PARTNER_ADMIN || data?.userRole === userRoles.COMPANY_ADMIN) ? "Admin" : "Standard"}
                                                </AlternateStyledTableData>
                                            }
                                            {SelectedColumn("STATUS") &&
                                                <AlternateStyledTableData>
                                                    {data?.enabled === true
                                                        ? <ActiveBox>ACTIVE</ActiveBox>
                                                        : <SuspendedBox>INACTIVE</SuspendedBox>
                                                    }
                                                </AlternateStyledTableData>
                                            }
                                            {SelectedColumn("ACTION") &&
                                                <AlternateStyledTableData>
                                                    <TableMenu>
                                                        <ActionMenuItem onClick={() => navigate(`/user-profile/${data?._id}`, { state: data })}>View User</ActionMenuItem>
                                                    </TableMenu>
                                                </AlternateStyledTableData>
                                            }
                                        </StyledAlternateTableRow>
                                    )
                                }
                                return (
                                    <StyledTableRow key={data?._id}>
                                        {SelectedColumn("USERNAME") &&
                                            <CustomTooltip title={data?.username || "---"}>
                                                <StyledTableData
                                                    style={{
                                                        color: theme.colors.primary.navy,
                                                        fontSize: theme.fontSize.h4,
                                                        fontFamily: theme.fontFamily.nunitoSansBold
                                                    }}
                                                >
                                                    {data?.username || "---"}
                                                </StyledTableData>
                                            </CustomTooltip>
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
                                        {SelectedColumn("ACCOUNT TYPE") && users?.userProfile?.data?.userRole === userRoles.PARTNER_ADMIN &&
                                            <StyledTableData>
                                                {getAccountType(data?.userRole)}
                                            </StyledTableData>
                                        }
                                        {SelectedColumn("ACCOUNT NAME") && users?.userProfile?.data?.userRole === userRoles.PARTNER_ADMIN &&
                                            <StyledTableData>
                                                {getAccountName(data)}
                                            </StyledTableData>
                                        }
                                        {SelectedColumn("COMPANY NAME") && users?.userProfile?.data?.userRole === userRoles.COMPANY_ADMIN &&
                                            <AlternateStyledTableData>{data?.company?.name || "---"}</AlternateStyledTableData>
                                        }
                                        {SelectedColumn("USER TYPE") &&
                                            <StyledTableData>
                                                {(data?.userRole === userRoles.PARTNER_ADMIN || data?.userRole === userRoles.COMPANY_ADMIN) ? "Admin" : "Standard"}
                                            </StyledTableData>
                                        }
                                        {SelectedColumn("STATUS") &&
                                            <StyledTableData>
                                                {data?.enabled === true
                                                    ? <ActiveBox>ACTIVE</ActiveBox>
                                                    : <SuspendedBox>INACTIVE</SuspendedBox>
                                                }
                                            </StyledTableData>
                                        }
                                        {SelectedColumn("ACTION") &&
                                            <StyledTableData>
                                                <TableMenu>
                                                    <ActionMenuItem onClick={() => navigate(`/user-profile/${data?._id}`, { state: data })}>View User</ActionMenuItem>
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
