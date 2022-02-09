import { Grid, Table, TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import { useTheme } from 'styled-components';
import { AlternateStyledTableData, StyledTableData, StyledTableHead } from '../../../../StyledComponents/StyledTable/StyledTable';

export default function CountriesTable({ data }) {
    const theme = useTheme()
    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];
    return (
        <Grid>
            <TableContainer >
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableHead align='left'>RADIO STATION</StyledTableHead>
                            <StyledTableHead align='center'>PLAYS</StyledTableHead>
                            <StyledTableHead align='center'>TRACKS</StyledTableHead>
                            <StyledTableHead align='center'>ARTIST</StyledTableHead>
                            <StyledTableHead align='center'>RADIO STATIONS</StyledTableHead>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => {
                            if (index % 2 !== 0) {
                                return (
                                    <TableRow key={row.name}>
                                        <AlternateStyledTableData
                                            style={{
                                                color: theme.colors.primary.navy,
                                                fontSize: theme.fontSize.h4,
                                                fontFamily: theme.fontFamily.nunitoSansBold
                                            }}
                                            align="left"
                                        >
                                            {row.name}
                                        </AlternateStyledTableData>
                                        <AlternateStyledTableData align="center">{row.calories}</AlternateStyledTableData>
                                        <AlternateStyledTableData align="center">{row.fat}</AlternateStyledTableData>
                                        <AlternateStyledTableData align="center">{row.carbs}</AlternateStyledTableData>
                                        <AlternateStyledTableData align="center">{row.protein}</AlternateStyledTableData>

                                    </TableRow>
                                )
                            }
                            return (
                                <TableRow key={row.name}>
                                    <StyledTableData
                                        style={{
                                            color: theme.colors.primary.navy,
                                            fontSize: theme.fontSize.h4,
                                            fontFamily: theme.fontFamily.nunitoSansBold
                                        }}
                                        align='left'
                                    >
                                        {row.name}
                                    </StyledTableData>
                                    <StyledTableData align="center">{row.calories}</StyledTableData>
                                    <StyledTableData align="center">{row.fat}</StyledTableData>
                                    <StyledTableData align="center">{row.carbs}</StyledTableData>
                                    <StyledTableData align="center">{row.protein}</StyledTableData>

                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );
}
