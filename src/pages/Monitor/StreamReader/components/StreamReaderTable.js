import { Badge, Table, TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core';
import moment from 'moment';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { SelectedColumn } from '../../../../components/common/Columns/component/SelectedColumn';
import TableMenu from '../../../../components/common/Table/components/TableMenu';
import { ActionMenuItem } from '../../../../components/common/Table/TableStyled';
import { StyledTableData, StyledTableHead, StyledTableRow } from '../../../../StyledComponents/StyledTable/StyledTable';
import theme from '../../../../theme';
import RadioPlays from './RadioPlays';

export default function StreamReaderTable({ data, tableHeads }) {
    const navigate = useNavigate()

    return (
        <div>
            <TableContainer style={{ padding: '0rem 1rem 1rem 1rem' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {
                                tableHeads?.map((data, index) => {
                                    const isChecked = SelectedColumn(data?.title);
                                    if (isChecked) {
                                        return (
                                            <StyledTableHead key={index}>
                                                {data?.title}
                                            </StyledTableHead>
                                        )
                                    }
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data?.docs?.length === 0 ?
                                <TableRow key={0}>
                                    <StyledTableData colSpan={8} style={{ textAlign: "center" }}>
                                        No Data
                                    </StyledTableData>
                                </TableRow> :
                                data?.docs?.map((row, index) => {
                                    const favIconUrl = `https://s2.googleusercontent.com/s2/favicons?domain_url=${row?.website || row?.streamingUrl || row?.logo}`;
                                    return (
                                        <StyledTableRow key={index}>
                                            {
                                                SelectedColumn("ID") &&
                                                <StyledTableData>{data?.offset + index + 1}</StyledTableData>
                                            }
                                            {
                                                SelectedColumn("LOGO") &&
                                                <StyledTableData><img src={favIconUrl} /></StyledTableData>
                                            }
                                            {
                                                SelectedColumn("RADIO NAME") &&
                                                <StyledTableData
                                                    style={{
                                                        color: theme.colors.primary.navy,
                                                        fontSize: theme.fontSize.h5,
                                                        fontFamily: theme.fontFamily.nunitoSansMediumBold
                                                    }}
                                                >
                                                    {row?.name || "---"}
                                                </StyledTableData>
                                            }
                                            {
                                                SelectedColumn("RADIO URL") &&
                                                <StyledTableData >{row?.website || "---"}</StyledTableData>
                                            }
                                            {
                                                SelectedColumn("ADDED DATE") &&
                                                <StyledTableData >{moment(row?.createdAt).format("DD/MM/YYYY") || "---"}</StyledTableData>
                                            }
                                            {
                                                SelectedColumn("PLAYS") &&
                                                <StyledTableData ><RadioPlays radioId={row?._id} key={row?._id} /></StyledTableData>
                                            }
                                            {
                                                SelectedColumn("STATUS") &&
                                                <StyledTableData>
                                                    {row?.isStreamStarted === true && (
                                                        <Badge style={{ background: "rgb(229, 245, 244)", color: "rgb(72, 187, 183)", padding: 5, fontWeight: "lighter" }}>
                                                            LISTENING
                                                        </Badge>
                                                    )}
                                                    {row?.isStreamStarted === false && row?.error === null && (
                                                        <Badge style={{ background: "rgb(244, 237, 151)", color: "rgb(183, 170, 53)", padding: 5 }}>
                                                            NOT LISTENING
                                                        </Badge>
                                                    )}
                                                    {row?.isStreamStarted === false && row?.error !== null && (
                                                        <Badge style={{ background: "rgb(242, 125, 162)", color: "rgb(130, 24, 13)", padding: 5 }}>
                                                            ERROR
                                                        </Badge>
                                                    )}
                                                </StyledTableData>
                                            }
                                            {
                                                SelectedColumn("ACTION") &&
                                                <StyledTableData >
                                                    <TableMenu>
                                                        <ActionMenuItem onClick={() => { }}>View Details</ActionMenuItem>
                                                    </TableMenu>
                                                </StyledTableData>
                                            }
                                        </StyledTableRow>
                                    )
                                })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
