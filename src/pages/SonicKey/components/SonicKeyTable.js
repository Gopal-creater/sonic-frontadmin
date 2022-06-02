import { Grid, Table, TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { format } from 'date-fns';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SelectedColumn } from '../../../components/common/Columns/component/SelectedColumn';
import TableMenu from '../../../components/common/Table/components/TableMenu';
import { ActionMenuItem } from '../../../components/common/Table/TableStyled';
import { AlternateStyledTableData, StyledAlternateTableRow, StyledTableData, StyledTableHead, StyledTableRow } from '../../../StyledComponents/StyledTable/StyledTable';

export default function SonicKeyTable({ data, sonicKeyTableHead }) {
    const navigate = useNavigate()

    return (
        <Grid>
            <TableContainer style={{ padding: '0rem 1rem 1rem 1rem' }}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {
                                sonicKeyTableHead?.map((data, index) => {
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
                                            {SelectedColumn("ID") &&
                                                <AlternateStyledTableData>
                                                    {1}
                                                </AlternateStyledTableData>
                                            }
                                            {SelectedColumn("SONICKEY") &&
                                                <AlternateStyledTableData>
                                                    {data?.sonicKey || "---"}
                                                </AlternateStyledTableData>
                                            }
                                            {SelectedColumn("ORIGINAL FILENAME") &&
                                                <AlternateStyledTableData>
                                                    {data?.originalFileName || data?.contentFileName || "---"}
                                                </AlternateStyledTableData>
                                            }
                                            {SelectedColumn("ARTIST") &&
                                                <AlternateStyledTableData>
                                                    {data?.contentOwner || "---"}
                                                </AlternateStyledTableData>
                                            }
                                            {SelectedColumn("ENCODED DATE") &&
                                                <AlternateStyledTableData>
                                                    {format(new Date(data?.createdAt), 'dd/MM/yyyy') || "---"}
                                                </AlternateStyledTableData>
                                            }
                                            {SelectedColumn("DESCRIPTION") &&
                                                <AlternateStyledTableData>{data?.contentDescription || "---"}</AlternateStyledTableData>
                                            }
                                            {SelectedColumn("ACTION") &&
                                                <AlternateStyledTableData>
                                                    <TableMenu>
                                                        <ActionMenuItem onClick={() => navigate(`/company-profile/${data?._id}`, { state: data })}>View Company</ActionMenuItem>
                                                    </TableMenu>
                                                </AlternateStyledTableData>
                                            }
                                        </StyledAlternateTableRow>
                                    )
                                }
                                return (
                                    <StyledTableRow key={data?._id}>
                                        {SelectedColumn("ID") &&
                                            <StyledTableData>
                                                {2}
                                            </StyledTableData>
                                        }
                                        {SelectedColumn("SONICKEY") &&
                                            <StyledTableData>
                                                {data?.sonicKey || "---"}
                                            </StyledTableData>
                                        }
                                        {SelectedColumn("ORIGINAL FILENAME") &&
                                            <StyledTableData>
                                                {data?.originalFileName || data?.contentFileName || "---"}
                                            </StyledTableData>
                                        }
                                        {SelectedColumn("ARTIST") &&
                                            <StyledTableData>{data?.contentOwner || "---"}</StyledTableData>
                                        }
                                        {SelectedColumn("ENCODED DATE") &&
                                            <StyledTableData>{format(new Date(data?.createdAt), 'dd/MM/yyyy') || "---"}</StyledTableData>
                                        }
                                        {SelectedColumn("DESCRIPTION") &&
                                            <StyledTableData>{data?.contentDescription || "---"}</StyledTableData>
                                        }
                                        {SelectedColumn("ACTION") &&
                                            <StyledTableData>
                                                <TableMenu>
                                                    <ActionMenuItem onClick={() => navigate(`/company-profile/${data?._id}`, { state: data })}>View details</ActionMenuItem>
                                                    <ActionMenuItem onClick={() => navigate(`/company-profile/${data?._id}`, { state: data })}>Download</ActionMenuItem>
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
