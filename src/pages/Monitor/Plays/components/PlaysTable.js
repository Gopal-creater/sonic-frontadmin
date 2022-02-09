import { Grid } from '@material-ui/core';
import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { useTheme } from 'styled-components';
import CustomPagination from '../../../../components/common/Pagination/CustomPagination';
import PaginationCount from '../../../../components/common/Pagination/PaginationCount';
import { playsTableHeads } from '../../../../constants/constants';
import { getPlaysListsAction } from '../../../../stores/actions';
import { AlternateDataColumn, ResizableTable, StyledTableBody, StyledTableHead, StyledTableHeadColumn, StyledTableRow, TableDataColumn, TableResizer, TableWrapper } from '../../Dashboard/Components/DashboardTable/TableStyle';

const createHeaders = (headers) => {
    return headers.map((item) => ({
        text: item,
        ref: React.useRef()
    }));
};

export default function PlaysTable({ data }) {
    const theme = useTheme()
    const [state, setState] = React.useState({
        tableHeight: "auto",
        activeColumnIndex: null
    })
    const tableElement = React.useRef(null)
    const columns = createHeaders(playsTableHeads)
    const dispatch = useDispatch();
    const playsList = useSelector(state => state.playsList);

    const mouseMove = React.useCallback(
        (e) => {
            const gridColumns = columns.map((col, i) => {
                if (i === state.activeColumnIndex) {
                    const width = e.clientX - col.ref.current.offsetLeft;

                    if (width >= 120) {
                        return `${width}px`;
                    }
                }
                return `${col.ref.current.offsetWidth}px`;
            });

            tableElement.current.style.gridTemplateColumns = `${gridColumns.join(" ")}`;
        },
        [state.activeColumnIndex, columns, 120]
    );

    const removeListeners = React.useCallback(() => {
        window.removeEventListener("mousemove", mouseMove);
        window.removeEventListener("mouseup", removeListeners);
    }, [mouseMove]);

    const mouseUp = React.useCallback(() => {
        setState({ ...state, activeColumnIndex: null })
        removeListeners();
    }, [state.activeColumnIndex, removeListeners]);


    React.useEffect(() => {
        setState({ ...state, tableHeight: tableElement.current.offsetHeight })
    }, [])

    React.useEffect(() => {
        if (state.activeColumnIndex !== null) {
            window.addEventListener("mousemove", mouseMove);
            window.addEventListener("mouseup", mouseUp);
        }

        return () => {
            removeListeners();
        };
    }, [state.activeColumnIndex, mouseMove, mouseUp, removeListeners]);

    return (
        <Grid>
            <TableWrapper>
                <ResizableTable ref={tableElement}>
                    <StyledTableHead>
                        <StyledTableRow>
                            {columns.map(({ ref, text }, index) => {
                                return (
                                    <StyledTableHeadColumn ref={ref} onMouseDown={() => setState({ ...state, activeColumnIndex: index })}>
                                        {text} <TableResizer style={{ height: state.tableHeight }} />
                                    </StyledTableHeadColumn>
                                )
                            })}
                        </StyledTableRow>
                    </StyledTableHead>
                    <StyledTableBody>
                        {data?.map((row, index) => {
                            if (index % 2 !== 0) {
                                return (
                                    <StyledTableRow key={row?._id}>
                                        <AlternateDataColumn
                                            style={{
                                                color: theme.colors.primary.navy,
                                                fontSize: theme.fontSize.h4,
                                                fontFamily: theme.fontFamily.nunitoSansMediumBold
                                            }}
                                        >
                                            {row?.sonicKey?.contentOwner || "---"}
                                        </AlternateDataColumn>
                                        <AlternateDataColumn
                                            style={{
                                                color: theme.colors.primary.graphite,
                                                fontSize: theme.fontSize.h4,
                                                fontFamily: theme.fontFamily.nunitoSansMediumBold
                                            }}
                                        >
                                            {row?.sonicKey?.contentFileName || "---"}
                                        </AlternateDataColumn>
                                        <AlternateDataColumn>{moment(row?.detectedAt).utc().format("HH:mm:SS") || "---"}</AlternateDataColumn>
                                        <AlternateDataColumn>{moment.utc(row?.sonicKey?.contentDuration * 1000).format("mm:ss") || "---"}</AlternateDataColumn>
                                        <AlternateDataColumn>{row?.radioStation?.country || "---"}</AlternateDataColumn>
                                        <AlternateDataColumn
                                            style={{
                                                color: theme.colors.primary.navy,
                                                fontSize: theme.fontSize.h5,
                                                fontFamily: theme.fontFamily.nunitoSansMediumBold
                                            }}
                                        >
                                            {row?.sonicKey?.sonicKey || "---"}
                                        </AlternateDataColumn>
                                        <AlternateDataColumn
                                            style={{
                                                color: theme.colors.primary.graphite,
                                                fontSize: theme.fontSize.h5,
                                                fontFamily: theme.fontFamily.nunitoSansMediumBold
                                            }}
                                        >
                                            {row?.sonicKey?.isrcCode || "---"}
                                        </AlternateDataColumn>
                                        <AlternateDataColumn>{row?.sonicKey?.label || "---"}</AlternateDataColumn>
                                        <AlternateDataColumn>{row?.sonicKey?.distributor || "---"}</AlternateDataColumn>
                                    </StyledTableRow>
                                )
                            }
                            return (
                                <StyledTableRow key={row?._id}>
                                    <TableDataColumn
                                        style={{
                                            color: theme.colors.primary.navy,
                                            fontSize: theme.fontSize.h4,
                                            fontFamily: theme.fontFamily.nunitoSansMediumBold
                                        }}
                                    >
                                        {row?.sonicKey?.contentOwner || "---"}
                                    </TableDataColumn>
                                    <TableDataColumn
                                        style={{
                                            color: theme.colors.primary.graphite,
                                            fontSize: theme.fontSize.h4,
                                            fontFamily: theme.fontFamily.nunitoSansMediumBold
                                        }}
                                    >
                                        {row?.sonicKey?.contentFileName || "---"}
                                    </TableDataColumn>
                                    <TableDataColumn>{moment(row?.detectedAt).utc().format("HH:mm:SS") || "---"}</TableDataColumn>
                                    <TableDataColumn>{moment.utc(row?.sonicKey?.contentDuration * 1000).format("mm:ss") || "---"}</TableDataColumn>
                                    <TableDataColumn>{row?.radioStation?.country || "---"}</TableDataColumn>
                                    <TableDataColumn
                                        style={{
                                            color: theme.colors.primary.navy,
                                            fontSize: theme.fontSize.h5,
                                            fontFamily: theme.fontFamily.nunitoSansMediumBold
                                        }}
                                    >
                                        {row?.sonicKey?.sonicKey || "---"}
                                    </TableDataColumn>
                                    <AlternateDataColumn
                                        style={{
                                            color: theme.colors.primary.graphite,
                                            fontSize: theme.fontSize.h5,
                                            fontFamily: theme.fontFamily.nunitoSansMediumBold
                                        }}
                                    >
                                        {row?.sonicKey?.isrcCode || "---"}
                                    </AlternateDataColumn>
                                    <AlternateDataColumn>{row?.sonicKey?.label || "---"}</AlternateDataColumn>
                                    <AlternateDataColumn>{row?.sonicKey?.distributor || "---"}</AlternateDataColumn>
                                </StyledTableRow>
                            )
                        })}
                    </StyledTableBody>
                </ResizableTable>
            </TableWrapper>

            <Grid container alignItems="center" className='mt-3'>
                <Grid item xs={12} sm={4} md={6}>
                    <PaginationCount
                        name="plays"
                        start={playsList?.data?.offset}
                        end={playsList?.data?.docs?.length}
                        total={playsList?.data?.totalDocs}
                    />
                </Grid>
                <Grid item xs={12} sm={8} md={6}>
                    <CustomPagination
                        count={playsList?.data?.totalPages}
                        page={playsList?.data?.page}
                        onChange={(event, value) => dispatch(getPlaysListsAction(
                            playsList?.dates?.startDate,
                            playsList?.dates?.endDate,
                            playsList?.filters?.channel,
                            value,
                            10
                        ))}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
}
