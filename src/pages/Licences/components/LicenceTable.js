import { Grid, Table, TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { format } from 'date-fns';
import React from 'react';
import { useTheme } from 'styled-components';
import { SelectedColumn } from '../../../components/common/Columns/component/SelectedColumn';
import { ActiveBox, AlternateStyledTableData, StyledAlternateTableRow, StyledTableData, StyledTableHead, StyledTableRow, SuspendedBox } from '../../../StyledComponents/StyledTable/StyledTable';

export default function LicenceTable({ data, licenseTableHead }) {
    const theme = useTheme()

    return (
        <Grid>
            <TableContainer style={{ padding: '0rem 1rem 1rem 1rem' }}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {
                                licenseTableHead?.map((data, index) => {
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
                            data.map((data, index) => {
                                if (index % 2 !== 0) {
                                    return (
                                        <StyledAlternateTableRow key={data?._id}>
                                            {/* <AlternateStyledTableData
                                                style={{
                                                    color: theme.colors.primary.navy,
                                                    fontSize: theme.fontSize.h4,
                                                    fontFamily: theme.fontFamily.nunitoSansBold
                                                }}
                                            >
                                                {SelectedColumn("ACCOUNT NAME") && (index + 1)}
                                            </AlternateStyledTableData> */}
                                            <AlternateStyledTableData>
                                                {SelectedColumn("MAX USES ENCODE") &&
                                                    (
                                                        data?.isUnlimitedEncode === true
                                                            ? "Unlimited"
                                                            : data?.encodeUses
                                                    )
                                                }
                                            </AlternateStyledTableData>
                                            <AlternateStyledTableData>
                                                {SelectedColumn("MAX USES MONITOR") &&
                                                    (
                                                        data?.isUnlimitedMonitor === true
                                                            ? "Unlimited"
                                                            : data?.monitoringUses
                                                    )
                                                }
                                            </AlternateStyledTableData>
                                            <AlternateStyledTableData>{SelectedColumn("ACCOUNT TYPE") && (data?.type || "---")}</AlternateStyledTableData>
                                            {/* <AlternateStyledTableData> {SelectedColumn("USERS") && (data?.type)}</AlternateStyledTableData> */}
                                            <AlternateStyledTableData>{SelectedColumn("RENEWAL DATE") && (format(new Date(data?.validity), "dd.MM.yyyy"))}</AlternateStyledTableData>
                                            <AlternateStyledTableData>{SelectedColumn("LICENSE NAME") && (data?.name)}</AlternateStyledTableData>
                                            <AlternateStyledTableData>{SelectedColumn("KEY") && (data?.key)}</AlternateStyledTableData>
                                            <AlternateStyledTableData>
                                                {SelectedColumn("STATUS") &&
                                                    (data?.suspended === true
                                                        ? <SuspendedBox>SUSPENDED</SuspendedBox>
                                                        : <ActiveBox>ACTIVE</ActiveBox>
                                                    )
                                                }
                                            </AlternateStyledTableData>
                                            {/* <AlternateStyledTableData>{SelectedColumn("ACTION") && (data?.key)}</AlternateStyledTableData> */}
                                        </StyledAlternateTableRow>
                                    )
                                }
                                return (
                                    <StyledTableRow key={data?._id}>
                                        {/* <StyledTableData
                                            style={{
                                                color: theme.colors.primary.navy,
                                                fontSize: theme.fontSize.h4,
                                                fontFamily: theme.fontFamily.nunitoSansBold
                                            }}
                                        >
                                            {SelectedColumn("ACCOUNT NAME") && (index + 1)}
                                        </StyledTableData> */}
                                        <StyledTableData>
                                            {SelectedColumn("MAX USES ENCODE") &&
                                                (
                                                    data?.isUnlimitedEncode === true
                                                        ? "Unlimited"
                                                        : data?.encodeUses
                                                )
                                            }
                                        </StyledTableData>
                                        <StyledTableData>
                                            {SelectedColumn("MAX USES MONITOR") &&
                                                (
                                                    data?.isUnlimitedMonitor === true
                                                        ? "Unlimited"
                                                        : data?.monitoringUses
                                                )
                                            }
                                        </StyledTableData>
                                        <StyledTableData>{SelectedColumn("ACCOUNT TYPE") && (data?.type || "---")}</StyledTableData>
                                        {/* <AlternateStyledTableData> {SelectedColumn("USERS") && (data?.type)}</AlternateStyledTableData> */}
                                        <StyledTableData>{SelectedColumn("RENEWAL DATE") && (format(new Date(data?.validity), "dd.MM.yyyy"))}</StyledTableData>
                                        <StyledTableData>{SelectedColumn("LICENSE NAME") && (data?.name)}</StyledTableData>
                                        <StyledTableData>{SelectedColumn("KEY") && (data?.key)}</StyledTableData>
                                        <StyledTableData>
                                            {SelectedColumn("STATUS") &&
                                                (data?.suspended === true
                                                    ? <SuspendedBox>SUSPENDED</SuspendedBox>
                                                    : <ActiveBox>ACTIVE</ActiveBox>
                                                )
                                            }
                                        </StyledTableData>
                                        {/* <StyledTableData>{SelectedColumn("ACTION") && (data?.key)}</StyledTableData> */}
                                    </StyledTableRow>
                                )
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );
}
