import { Grid, Table, TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { format } from 'date-fns';
import React from 'react';
import { useTheme } from 'styled-components';
import { AlternateStyledTableData, StyledTableData, StyledTableHead } from '../../../StyledComponents/StyledTable/StyledTable';

export default function LicenceTable({ data, ...props }) {
    const theme = useTheme()
    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    // const rows = [
    //     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    //     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    //     createData('Eclair', 262, 16.0, 24, 6.0),
    //     createData('Cupcake', 305, 3.7, 67, 4.3),
    //     createData('Gingerbread', 356, 16.0, 49, 3.9),
    // ];

    // const tableHead = [
    //     "ID",
    //     "LICENCE KEY",
    //     "USAGE COUNT",
    //     "MAX COUNT",
    //     "NO OF RADIO STATIONS",
    //     "EXPIRY DATE",
    //     "SUSPENDED",
    // ];
    return (
        <Grid>
            <TableContainer >
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableHead align='left'>ID</StyledTableHead>
                            <StyledTableHead align='center'>LICENCE KEY</StyledTableHead>
                            <StyledTableHead align='center'>USAGE COUNT</StyledTableHead>
                            <StyledTableHead align='center'>MAX COUNT</StyledTableHead>
                            <StyledTableHead align='center'>NO OF RADIO STATIONSS</StyledTableHead>
                            <StyledTableHead align='center'>EXPIRY DATE</StyledTableHead>
                            <StyledTableHead align='center'>SUSPENDED</StyledTableHead>

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
                                                fontSize: theme.fontSize.h4,
                                                fontFamily: theme.fontFamily.nunitoSansBold
                                            }}
                                            align="left"
                                        >
                                            {index + 1}
                                        </AlternateStyledTableData>
                                        <AlternateStyledTableData align="center">{data.key}</AlternateStyledTableData>
                                        <AlternateStyledTableData align="center"> {data.encodeUses}</AlternateStyledTableData>
                                        <AlternateStyledTableData align="center"> {data.maxEncodeUses}</AlternateStyledTableData>
                                        <AlternateStyledTableData align="center">
                                            {data.isUnlimitedMonitor === true
                                                ? "Unlimited"
                                                : data.monitoringUses
                                            }
                                        </AlternateStyledTableData>
                                        <AlternateStyledTableData align="center"> {format(new Date(data.validity), "dd.MM.yyyy")}</AlternateStyledTableData>
                                        <AlternateStyledTableData align="center"> {data.suspended === true ? "Yes" : "No"}</AlternateStyledTableData>

                                    </TableRow>
                                )
                            }
                            return (
                                <TableRow key={data._id}>
                                    <StyledTableData
                                        style={{
                                            color: theme.colors.primary.navy,
                                            fontSize: theme.fontSize.h4,
                                            fontFamily: theme.fontFamily.nunitoSansBold
                                        }}
                                        align="left"
                                    >
                                        {index + 1}
                                    </StyledTableData>
                                    <StyledTableData align="center">{data.key}</StyledTableData>
                                    <StyledTableData align="center"> {data.encodeUses}</StyledTableData>
                                    <StyledTableData align="center"> {data.maxEncodeUses}</StyledTableData>
                                    <StyledTableData align="center">
                                        {data.isUnlimitedMonitor === true
                                            ? "Unlimited"
                                            : data.monitoringUses
                                        }
                                    </StyledTableData>
                                    <StyledTableData align="center"> {format(new Date(data.validity), "dd.MM.yyyy")}</StyledTableData>
                                    <StyledTableData align="center"> {data.suspended === true ? "Yes" : "No"}</StyledTableData>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );
}
