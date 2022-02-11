import moment from 'moment';
import React from 'react';
import styled, { useTheme } from 'styled-components';
import { playsTableHeads } from '../../../../constants/constants';
import { AlternateDataColumn, ResizableTable, StyledTableBody, StyledTableHead, StyledTableHeadColumn, StyledTableRow, TableDataColumn, TableResizer, TableWrapper } from '../../Dashboard/Components/DashboardTable/TableStyle';
import Dropdown from "../../../../assets/icons/dropdown.png";
import * as actionTypes from "../../../../stores/actions/actionTypes";
import MetaDataDialog from "../../../../components/common/MetaDataDialog";
import { Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { log } from '../../../../utils/app.debug';
import { CustomTooltip } from '../../../../StyledComponents/StyledToolTip/CustomTooltip';

const createHeaders = (headers) => {
    return headers.map((item) => ({
        text: item.title,
        ref: React.useRef(),
        orderBy: item.orderBy
    }));
};

export default function PlaysTable({ data }) {
    const theme = useTheme()
    const [state, setState] = React.useState({
        tableHeight: "auto",
        activeColumnIndex: null,
        data: data || [],
        sonicKeyModal: false,
        selectedSonicKey: {},
    })
    const dispatch = useDispatch();
    const [sortOrder, setSortOrder] = React.useState("ASC");
    const tableElement = React.useRef(null)
    const columns = createHeaders(playsTableHeads)

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
            {state?.data?.length === 0 ?
                <ResizableTable
                    ref={tableElement}
                    style={{ display: "flex", justifyContent: "center" }}
                >
                    No Data
                </ResizableTable>
                :
                <ResizableTable ref={tableElement}>
                    <StyledTableHead>
                        <StyledTableRow>
                            {columns.map(({ ref, text, orderBy }, index) => {
                                return (
                                    <StyledTableHeadColumn
                                        ref={ref}
                                        onClick={() => sorting(orderBy)}
                                        style={{
                                            width: index === 0 || index === 1 ? "90px" : "",
                                            position: index === 0 || index === 1 ? "sticky" : "",
                                            left: index === 0 ? 0 : index === 1 ? "90px" : "",
                                            background: index === 0 || index === 1 ? "white" : "",
                                            zIndex: index === 0 || index === 1 ? 1 : ""
                                        }}
                                    >
                                        {text}
                                        <img src={Dropdown} height={15} alt="dropdown" />
                                        {
                                            index === 0 || index === 1 ?
                                                "" :
                                                <TableResizer onMouseDown={() => setState({ ...state, activeColumnIndex: index })} style={{ height: state.tableHeight }} />
                                        }
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
                                        <CustomTooltip title={row?.artist || "---"}>
                                            <AlternateDataColumn
                                                style={{
                                                    color: theme.colors.primary.navy,
                                                    fontSize: theme.fontSize.h4,
                                                    fontFamily: theme.fontFamily.nunitoSansMediumBold,
                                                    position: "sticky",
                                                    width: "90px",
                                                    left: 0,
                                                    background: theme.colors.secondary.tableColor
                                                }}
                                            >
                                                {row?.artist || "---"}
                                            </AlternateDataColumn>
                                        </CustomTooltip>
                                        <CustomTooltip title={row?.title || "---"}>
                                            <AlternateDataColumn
                                                style={{
                                                    color: theme.colors.primary.graphite,
                                                    fontSize: theme.fontSize.h4,
                                                    fontFamily: theme.fontFamily.nunitoSansMediumBold,
                                                    position: "sticky",
                                                    width: "90px",
                                                    left: "90px",
                                                    background: theme.colors.secondary.tableColor
                                                }}
                                            >
                                                {row?.title || "---"}
                                            </AlternateDataColumn>
                                        </CustomTooltip>
                                        <AlternateDataColumn>{row?.radioStation || "---"}</AlternateDataColumn>
                                        <AlternateDataColumn>{moment(row?.date).utc().format("DD/MM/YYYY") || "---"}</AlternateDataColumn>
                                        <AlternateDataColumn>{moment(row?.time).utc().format("HH:mm:SS") || "---"}</AlternateDataColumn>
                                        <AlternateDataColumn>{moment.utc(row?.duration * 1000).format("mm:ss") || "---"}</AlternateDataColumn>
                                        <AlternateDataColumn>{row?.country || "---"}</AlternateDataColumn>
                                        <AlternateDataColumn
                                            style={{
                                                color: theme.colors.primary.navy,
                                                fontSize: theme.fontSize.h5,
                                                fontFamily: theme.fontFamily.nunitoSansMediumBold,
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => setState({ ...state, sonicKeyModal: true, selectedSonicKey: row?.modal })}
                                        >
                                            {row?.sonicKey || "---"}
                                        </AlternateDataColumn>
                                        <AlternateDataColumn
                                            style={{
                                                color: theme.colors.primary.graphite,
                                                fontSize: theme.fontSize.h5,
                                                fontFamily: theme.fontFamily.nunitoSansMediumBold
                                            }}
                                        >
                                            {row?.isrcCode || "---"}
                                        </AlternateDataColumn>
                                        <AlternateDataColumn>{row?.label || "---"}</AlternateDataColumn>
                                        <AlternateDataColumn>{row?.distributor || "---"}</AlternateDataColumn>
                                    </StyledTableRow>
                                )
                            }
                            return (
                                <StyledTableRow key={index}>
                                    <CustomTooltip title={row?.artist || "---"}>
                                        <TableDataColumn
                                            style={{
                                                color: theme.colors.primary.navy,
                                                fontSize: theme.fontSize.h4,
                                                fontFamily: theme.fontFamily.nunitoSansMediumBold,
                                                position: "sticky",
                                                width: "90px",
                                                left: 0,
                                                background: "white"
                                            }}
                                        >
                                            {row?.artist || "---"}
                                        </TableDataColumn>
                                    </CustomTooltip>

                                    <CustomTooltip title={row?.title || "---"}>
                                        <TableDataColumn
                                            style={{
                                                color: theme.colors.primary.graphite,
                                                fontSize: theme.fontSize.h4,
                                                fontFamily: theme.fontFamily.nunitoSansMediumBold,
                                                position: "sticky",
                                                width: "90px",
                                                left: "90px",
                                                background: "white"
                                            }}
                                        >
                                            {row?.title || "---"}
                                        </TableDataColumn>
                                    </CustomTooltip>
                                    <TableDataColumn>{row?.radioStation || "---"}</TableDataColumn>
                                    <TableDataColumn>{moment(row?.date).utc().format("DD/MM/YYYY") || "---"}</TableDataColumn>
                                    <TableDataColumn>{moment(row?.time).utc().format("HH:mm:SS") || "---"}</TableDataColumn>
                                    <TableDataColumn>{moment.utc(row?.duration * 1000).format("mm:ss") || "---"}</TableDataColumn>
                                    <TableDataColumn>{row?.country || "---"}</TableDataColumn>
                                    <TableDataColumn
                                        style={{
                                            color: theme.colors.primary.navy,
                                            fontSize: theme.fontSize.h5,
                                            fontFamily: theme.fontFamily.nunitoSansMediumBold,
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => setState({ ...state, sonicKeyModal: true, selectedSonicKey: row?.modal })}
                                    >
                                        {row?.sonicKey || "---"}
                                    </TableDataColumn>
                                    <TableDataColumn
                                        style={{
                                            color: theme.colors.primary.graphite,
                                            fontSize: theme.fontSize.h5,
                                            fontFamily: theme.fontFamily.nunitoSansMediumBold
                                        }}
                                    >
                                        {row?.isrcCode || "---"}
                                    </TableDataColumn>
                                    <TableDataColumn>{row?.label || "---"}</TableDataColumn>
                                    <TableDataColumn>{row?.distributor || "---"}</TableDataColumn>
                                </StyledTableRow>
                            )
                        })}
                    </StyledTableBody>

                    {state?.sonicKeyModal && (
                        <MetaDataDialog
                            sonicKey={state?.selectedSonicKey}
                            open={true}
                            setOpenTable={(flag) => setState({ ...state, sonicKeyModal: flag })}
                            updateMetaData={(key) => {
                                setState({ ...state, selectedSonicKey: key })
                                dispatch({ type: actionTypes.UPDATE_EDITED_PLAYSLIST, data: key })
                            }}
                        />
                    )}
                </ResizableTable>
            }
        </TableWrapper>
    );
}
