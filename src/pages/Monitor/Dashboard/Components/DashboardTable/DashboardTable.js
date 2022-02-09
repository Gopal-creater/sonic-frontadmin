import React from 'react';
import {
    TableWrapper, ResizableTable, StyledTableHead, StyledTableRow,
    StyledTableHeadColumn, StyledTableBody, TableResizer, TableDataColumn, AlternateDataColumn
} from './TableStyle';
import { useRef } from "react";
import { log } from '../../../../../utils/app.debug';
import { dashboardPlaysTableHeads } from '../../../../../constants/constants';
import { useTheme } from 'styled-components';
import Dropdown from "../../../../../assets/icons/dropdown.png"

const createHeaders = (headers) => {
    return headers.map((item) => ({
        text: item.title,
        ref: useRef(),
        orderBy: item.orderBy
    }));
};

export default function DashboardTable({ data }) {
    log("Dashboard Table Data", data)

    const theme = useTheme()

    const [state, setState] = React.useState({
        tableHeight: "auto",
        activeColumnIndex: null,
        data: data || [],
    })

    const [sortOrder, setSortOrder] = React.useState("ASC")

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

    const sorting = (col) => {
        if (sortOrder === "ASC") {
            let sorted = state.data.sort((a, b) => {
                if (a[col] > b[col]) {
                    return 1
                }
                if (a[col] < b[col]) {
                    return -1
                }
                return 0
            })
            setState({ ...state, data: sorted })
            setSortOrder("DSC")
        }
        if (sortOrder === "DSC") {
            let sorted = state.data.sort((a, b) => {
                if (a[col] < b[col]) {
                    return 1
                }
                if (a[col] > b[col]) {
                    return -1
                }
                return 0
            })
            setState({ ...state, data: sorted })
            setSortOrder("ASC")
        }
    }

    return (
        <TableWrapper>
            <ResizableTable ref={tableElement}>
                <StyledTableHead>
                    <StyledTableRow>
                        {columns.map(({ ref, text, orderBy }, index) => {
                            return (
                                <StyledTableHeadColumn
                                    ref={ref}
                                    onClick={() => sorting(orderBy)}
                                >
                                    {text}
                                    <img src={Dropdown} height={15} alt="dropdown" />
                                    <TableResizer onMouseDown={() => setState({ ...state, activeColumnIndex: index })} style={{ height: state.tableHeight }} />
                                </StyledTableHeadColumn>
                            )
                        })}
                    </StyledTableRow>
                </StyledTableHead>
                <StyledTableBody>
                    {state.data?.map((row, index) => {
                        if (index % 2 !== 0) {
                            return (
                                <StyledTableRow key={index}>
                                    <AlternateDataColumn
                                        style={{
                                            color: theme.colors.primary.navy,
                                            fontSize: theme.fontSize.h4,
                                            fontFamily: theme.fontFamily.nunitoSansMediumBold
                                        }}
                                    >
                                        {row?.contentOwner || "---"}
                                    </AlternateDataColumn>
                                    <AlternateDataColumn
                                        style={{
                                            color: theme.colors.primary.graphite,
                                            fontSize: theme.fontSize.h4,
                                            fontFamily: theme.fontFamily.nunitoSansMediumBold
                                        }}
                                    >
                                        {row?.contentFileName || "---"}
                                    </AlternateDataColumn>
                                    <AlternateDataColumn>{row?.channel || "---"}</AlternateDataColumn>
                                    <AlternateDataColumn>{row?.createdAt || "---"}</AlternateDataColumn>
                                    <AlternateDataColumn>{row?.time}</AlternateDataColumn>
                                    <AlternateDataColumn>{row?.contentDuration || "---"}</AlternateDataColumn>
                                    <AlternateDataColumn>{row?.country}</AlternateDataColumn>
                                    <AlternateDataColumn
                                        style={{
                                            color: theme.colors.primary.navy,
                                            fontSize: theme.fontSize.h5,
                                            fontFamily: theme.fontFamily.nunitoSansMediumBold
                                        }}
                                    >
                                        {row?.sonicKey || "---"}
                                    </AlternateDataColumn>
                                    <AlternateDataColumn>{row?.isrcCode || "---"}</AlternateDataColumn>
                                </StyledTableRow>
                            )
                        }
                        return (
                            <StyledTableRow key={index}>
                                <TableDataColumn
                                    style={{
                                        color: theme.colors.primary.navy,
                                        fontSize: theme.fontSize.h4,
                                        fontFamily: theme.fontFamily.nunitoSansMediumBold
                                    }}
                                >
                                    {row?.contentOwner || "---"}
                                </TableDataColumn>
                                <TableDataColumn
                                    style={{
                                        color: theme.colors.primary.graphite,
                                        fontSize: theme.fontSize.h4,
                                        fontFamily: theme.fontFamily.nunitoSansMediumBold
                                    }}
                                >
                                    {row?.contentFileName || "---"}
                                </TableDataColumn>
                                <TableDataColumn>{row?.channel || "---"}</TableDataColumn>
                                <TableDataColumn>{row?.createdAt || "---"}</TableDataColumn>
                                <TableDataColumn>{row?.time}</TableDataColumn>
                                <TableDataColumn>{row?.contentDuration || "---"}</TableDataColumn>
                                <TableDataColumn>{row?.country}</TableDataColumn>
                                <TableDataColumn
                                    style={{
                                        color: theme.colors.primary.navy,
                                        fontSize: theme.fontSize.h5,
                                        fontFamily: theme.fontFamily.nunitoSansMediumBold
                                    }}
                                >
                                    {row?.sonicKey || "---"}
                                </TableDataColumn>
                                <TableDataColumn>{row?.isrcCode || "---"}</TableDataColumn>
                            </StyledTableRow>
                        )
                    })}
                </StyledTableBody>
            </ResizableTable>
        </TableWrapper>
    );
}
