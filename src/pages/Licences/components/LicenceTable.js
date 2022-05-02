import { Grid, Table, TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { format } from 'date-fns';
import React from 'react';
import { useTheme } from 'styled-components';
import { SelectedColumn } from '../../../components/common/Columns/component/SelectedColumn';
import { AlternateStyledTableData, StyledTableData, StyledTableHead } from '../../../StyledComponents/StyledTable/StyledTable';

export default function LicenceTable({ data, licenseTableHead }) {
    const theme = useTheme()

    return (
        <Grid>
            <TableContainer >
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
                        {data.map((data, index) => {
                            if (index % 2 !== 0) {
                                return (
                                    <TableRow key={data._id}>
                                        <AlternateStyledTableData
                                            style={{
                                                color: theme.colors.primary.navy,
                                                // fontSize: theme.fontSize.h4,
                                                fontFamily: theme.fontFamily.nunitoSansBold
                                            }}
                                        >
                                            {SelectedColumn("ID") && (index + 1)}
                                        </AlternateStyledTableData>
                                        <AlternateStyledTableData>{SelectedColumn("LICENCE KEY") && (data.key)}</AlternateStyledTableData>
                                        <AlternateStyledTableData> {SelectedColumn("USAGE COUNT") && (data.encodeUses)}</AlternateStyledTableData>
                                        <AlternateStyledTableData> {SelectedColumn("MAX COUNT") && (data.maxEncodeUses)}</AlternateStyledTableData>
                                        <AlternateStyledTableData>
                                            {SelectedColumn("NO OF RADIO STATIONS") &&
                                                (data.isUnlimitedMonitor === true
                                                    ? "Unlimited"
                                                    : data.monitoringUses
                                                )
                                            }
                                        </AlternateStyledTableData>
                                        <AlternateStyledTableData> {SelectedColumn("EXPIRY DATE") && (format(new Date(data.validity), "dd.MM.yyyy"))}</AlternateStyledTableData>
                                        <AlternateStyledTableData> {SelectedColumn("SUSPENDED") && (data.suspended === true ? "Yes" : "No")}</AlternateStyledTableData>

                                    </TableRow>
                                )
                            }
                            return (
                                <TableRow key={data._id}>
                                    <StyledTableData
                                        style={{
                                            color: theme.colors.primary.navy,
                                            // fontSize: theme.fontSize.h4,
                                            fontFamily: theme.fontFamily.nunitoSansBold
                                        }}
                                    >
                                        {SelectedColumn("ID") && (index + 1)}
                                    </StyledTableData>
                                    <StyledTableData>{SelectedColumn("LICENCE KEY") && (data.key)}</StyledTableData>
                                    <StyledTableData> {SelectedColumn("USAGE COUNT") && (data.encodeUses)}</StyledTableData>
                                    <StyledTableData> {SelectedColumn("MAX COUNT") && (data.maxEncodeUses)}</StyledTableData>
                                    <StyledTableData>
                                        {SelectedColumn("NO OF RADIO STATIONS") &&
                                            (data.isUnlimitedMonitor === true
                                                ? "Unlimited"
                                                : data.monitoringUses
                                            )
                                        }
                                    </StyledTableData>
                                    <StyledTableData> {SelectedColumn("EXPIRY DATE") && (format(new Date(data.validity), "dd.MM.yyyy"))}</StyledTableData>
                                    <StyledTableData> {SelectedColumn("SUSPENDED") && (data.suspended === true ? "Yes" : "No")}</StyledTableData>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );
}
