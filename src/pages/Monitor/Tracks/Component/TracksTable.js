import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import styled, { useTheme } from 'styled-components';

const StyledTableHead = styled(TableCell)`
    color: ${props => props.theme.colors.secondary.mediumGrey};
    font-family:${props => props.theme.fontFamily.nunitoSansBold};
    font-size:12px;
    border-bottom:none;
`
const StyledTableData = styled(TableCell)`
    color: ${props => props.theme.colors.secondary.grey};
    font-family:${props => props.theme.fontFamily.nunitoSansBold};
    border-bottom:none;
`
const AlternateStyledTableData = styled(TableCell)`
    color: ${props => props.theme.colors.secondary.grey};
    font-family:${props => props.theme.fontFamily.nunitoSansBold};
    background-color:${props => props.theme.colors.secondary.tableColor};
    border-bottom:none;
`

export default function TracksTable({ data }) {
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
                            <StyledTableHead>TRACK NAME</StyledTableHead>
                            <StyledTableHead >PLAYS</StyledTableHead>
                            <StyledTableHead >RADIO STATION</StyledTableHead>
                            <StyledTableHead >COUNTRY</StyledTableHead>
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
                                        >
                                            {row.name}
                                        </AlternateStyledTableData>
                                        <AlternateStyledTableData >{row.calories}</AlternateStyledTableData>
                                        <AlternateStyledTableData >{row.fat}</AlternateStyledTableData>
                                        <AlternateStyledTableData >{row.carbs}</AlternateStyledTableData>
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
                                    >
                                        {row.name}
                                    </StyledTableData>
                                    <StyledTableData >{row.calories}</StyledTableData>
                                    <StyledTableData >{row.fat}</StyledTableData>
                                    <StyledTableData >{row.carbs}</StyledTableData>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );
}
