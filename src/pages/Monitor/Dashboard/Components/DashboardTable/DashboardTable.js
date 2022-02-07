import React from 'react';
import {
    TableWrapper, ResizableTable, StyledTableHead, StyledTableRow,
    StyledTableHeadColumn, StyledTableBody, TableResizer, TableDataColumn, AlternateDataColumn
} from './TableStyle';
import { useRef } from "react";
import { log } from '../../../../../utils/app.debug';
import { dashboardPlaysTableHeads } from '../../../../../constants/constants';
import { useTheme } from 'styled-components';

const createHeaders = (headers) => {
    return headers.map((item) => ({
        text: item,
        ref: useRef()
    }));
};

export default function DashboardTable({ data }) {
    log("Dashboard Table Data", data)
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

    const [state, setState] = React.useState({
        tableHeight: "auto",
        activeColumnIndex: null
    })

    const tableElement = useRef(null)
    const columns = createHeaders(dashboardPlaysTableHeads)

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

            tableElement.current.style.gridTemplateColumns = `${gridColumns.join(
                " "
            )}`;
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
                                <StyledTableRow key={row?.sonicKey?._id}>
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
                                    <AlternateDataColumn>{row?.sonicKey?.channel || "---"}</AlternateDataColumn>
                                    <AlternateDataColumn>{row?.sonicKey?.createdAt || "---"}</AlternateDataColumn>
                                    <AlternateDataColumn>33:44:10</AlternateDataColumn>
                                    <AlternateDataColumn>{row?.sonicKey?.contentDuration || "---"}</AlternateDataColumn>
                                    <AlternateDataColumn>United Kingdom</AlternateDataColumn>
                                    <AlternateDataColumn
                                        style={{
                                            color: theme.colors.primary.navy,
                                            fontSize: theme.fontSize.h5,
                                            fontFamily: theme.fontFamily.nunitoSansMediumBold
                                        }}
                                    >
                                        {row?.sonicKey?.sonicKey || "---"}
                                    </AlternateDataColumn>
                                    <AlternateDataColumn>{row?.sonicKey?.isrcCode || "---"}</AlternateDataColumn>
                                </StyledTableRow>
                            )
                        }
                        return (
                            <StyledTableRow key={row?.sonicKey?._id}>
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
                                <TableDataColumn>{row?.sonicKey?.channel || "---"}</TableDataColumn>
                                <TableDataColumn>{row?.sonicKey?.createdAt || "---"}</TableDataColumn>
                                <TableDataColumn>33:44:10</TableDataColumn>
                                <TableDataColumn>{row?.sonicKey?.contentDuration || "---"}</TableDataColumn>
                                <TableDataColumn>United Kingdom</TableDataColumn>
                                <TableDataColumn
                                    style={{
                                        color: theme.colors.primary.navy,
                                        fontSize: theme.fontSize.h5,
                                        fontFamily: theme.fontFamily.nunitoSansMediumBold
                                    }}
                                >
                                    {row?.sonicKey?.sonicKey || "---"}
                                </TableDataColumn>
                                <TableDataColumn>{row?.sonicKey?.isrcCode || "---"}</TableDataColumn>
                            </StyledTableRow>
                        )
                    })}
                </StyledTableBody>
            </ResizableTable>
        </TableWrapper>
    );
}
