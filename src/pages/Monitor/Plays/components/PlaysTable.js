import moment from 'moment';
import React from 'react';
import styled, { useTheme } from 'styled-components';
import { AlternateDataColumn, ResizableTable, StyledTableBody, StyledTableHead, StyledTableHeadColumn, StyledTableRow, TableDataColumn, TableResizer, TableWrapper } from '../../Dashboard/Components/DashboardTable/TableStyle';
import MetaDataDialog from "../../../../components/common/MetaDataDialog";
import { useSelector } from 'react-redux';
import CustomToolTip from '../../../../components/common/CustomToolTip';
import { SelectedColumn } from '../../../../components/common/Columns/component/SelectedColumn';

const createHeaders = (headers) => {
    return headers.map((item) => ({
        text: item.title,
        ref: React.useRef(),
        sortBy: item.sortBy,
        isAscending: item.isAscending,
        isActive: item.isActive
    }));
};

export default function PlaysTable({ data, playsTableHeads, onPlaysSorting }) {
    const theme = useTheme()
    const [state, setState] = React.useState({
        tableHeight: "auto",
        activeColumnIndex: null,
        sonicKeyModal: false,
        selectedSonicKey: {},
    })
    const tableElement = React.useRef(null)
    const columns = createHeaders(playsTableHeads)
    const monitor = useSelector(state => state.monitor)

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

    const sorting = (sortBy, isAscending, isActive) => {
        if (isActive) {
            if (isAscending === true) {
                onPlaysSorting(sortBy, false, false)
            }
            else if (isAscending === false) {
                onPlaysSorting(sortBy, true, false)
            }
            else if (isAscending === null) {
                onPlaysSorting(sortBy, true, false)
            }
        } else {
            if (isAscending === true) {
                onPlaysSorting(sortBy, false, true)
            }
            else if (isAscending === false) {
                onPlaysSorting(sortBy, true, true)
            }
            else if (isAscending === null) {
                onPlaysSorting(sortBy, true, true)
            }
        }
    }

    return (
        <TableWrapper>
            {data?.length === 0 ?
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
                            {columns.map(({ ref, text, sortBy, isAscending, isActive }, index) => {
                                const isChecked = SelectedColumn(text);
                                if (isChecked) {
                                    return (
                                        <StyledTableHeadColumn
                                            key={index}
                                            ref={ref}
                                            onClick={() => sorting(sortBy, isAscending, isActive)}
                                            style={{
                                                position: index === 0 || index === 1 ? "sticky" : "",
                                                left: index === 0 ? 0 : index === 1 ? "130px" : "",
                                                background: index === 0 || index === 1 ? "white" : "",
                                                zIndex: index === 0 || index === 1 ? 1 : ""
                                            }}
                                        >
                                            {text}
                                            <i className="fa fa-sort" style={{ marginLeft: "5px" }}></i>
                                            {
                                                index === 0 || index === 1 ?
                                                    "" :
                                                    <TableResizer onMouseDown={() => setState({ ...state, activeColumnIndex: index })} style={{ height: state.tableHeight }} />
                                            }
                                        </StyledTableHeadColumn>
                                    )
                                }
                            })}
                        </StyledTableRow>
                    </StyledTableHead>
                    <StyledTableBody>
                        {data?.map((row, index) => {
                            return (
                                <StyledTableRow key={index}>
                                    {SelectedColumn("COMPANY") &&
                                        <CustomToolTip title={row?.artist || "---"} placement={"bottom-start"}>
                                            <AlternateDataColumn
                                                style={{
                                                    color: theme.colors.primary.navy,
                                                    fontSize: theme.fontSize.h4,
                                                    fontFamily: theme.fontFamily.nunitoSansMediumBold,
                                                    position: "sticky",
                                                    left: 0,
                                                    background: theme.colors.secondary.tableColor
                                                }}
                                            >
                                                {row?.modal?.company?.name || "---"}
                                            </AlternateDataColumn>
                                        </CustomToolTip>
                                    }

                                    {SelectedColumn("COMPANY TYPE") &&
                                        <CustomToolTip title={row?.title || "---"} placement={"bottom-start"}>
                                            <AlternateDataColumn
                                                style={{
                                                    color: theme.colors.primary.graphite,
                                                    fontSize: theme.fontSize.h4,
                                                    fontFamily: theme.fontFamily.nunitoSansMediumBold,
                                                    position: "sticky",
                                                    left: "130px",
                                                    background: theme.colors.secondary.tableColor
                                                }}
                                            >
                                                {row?.modal?.company?.companyType || "---"}
                                            </AlternateDataColumn>
                                        </CustomToolTip>
                                    }

                                    {SelectedColumn("ARTIST") &&
                                        <AlternateDataColumn>{row?.artist || "---"}</AlternateDataColumn>
                                    }

                                    {SelectedColumn("TITLE") &&
                                        <AlternateDataColumn>{row?.title || "---"}</AlternateDataColumn>
                                    }

                                    {SelectedColumn("VERSION") &&
                                        <AlternateDataColumn>{row?.version || "---"}</AlternateDataColumn>
                                    }

                                    {SelectedColumn("TRACK ID") &&
                                        <AlternateDataColumn>{row?.trackId?._id || "---"}</AlternateDataColumn>
                                    }

                                    {SelectedColumn("RADIO STATION") &&
                                        <AlternateDataColumn>{row?.radioStation || "---"}</AlternateDataColumn>
                                    }

                                    {SelectedColumn("DATE") &&
                                        <AlternateDataColumn>{moment(row?.date).utc().format("DD/MM/YYYY") || "---"}</AlternateDataColumn>
                                    }

                                    {SelectedColumn("TIME") &&
                                        <AlternateDataColumn>
                                            {monitor?.filters?.timezone === "GMT" ? moment(row?.time).utc().format("HH:mm:ss") : moment(row?.time).format("HH:mm:ss") || "---"}
                                        </AlternateDataColumn>
                                    }

                                    {SelectedColumn("DURATION") &&
                                        <AlternateDataColumn>{moment.utc(row?.duration * 1000).format("mm:ss") || "---"}</AlternateDataColumn>
                                    }

                                    {SelectedColumn("COUNTRY") &&
                                        <AlternateDataColumn>{row?.country || "---"}</AlternateDataColumn>
                                    }


                                    {SelectedColumn("ISRC") &&
                                        <AlternateDataColumn
                                            style={{
                                                color: theme.colors.primary.graphite,
                                                fontSize: theme.fontSize.h5,
                                                fontFamily: theme.fontFamily.nunitoSansMediumBold
                                            }}
                                        >
                                            {row?.isrcCode || "---"}
                                        </AlternateDataColumn>
                                    }

                                    {SelectedColumn("ISWC") &&
                                        <AlternateDataColumn>{row?.iswc || "---"}</AlternateDataColumn>
                                    }

                                    {SelectedColumn("TUNE CODE") &&
                                        <AlternateDataColumn>{row?.tuneCode || "---"}</AlternateDataColumn>
                                    }

                                    {SelectedColumn("LABEL") &&
                                        <AlternateDataColumn>{row?.label || "---"}</AlternateDataColumn>
                                    }

                                    {SelectedColumn("DISTRIBUTOR") &&
                                        <AlternateDataColumn>{row?.distributor || "---"}</AlternateDataColumn>
                                    }

                                    {SelectedColumn("FILE TYPE") &&
                                        <AlternateDataColumn>{row?.fileType || "---"}</AlternateDataColumn>
                                    }

                                    {SelectedColumn("SONICKEY") &&
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
                                    }
                                </StyledTableRow>
                            )
                        })}
                    </StyledTableBody>

                    {state?.sonicKeyModal && (
                        <MetaDataDialog
                            sonicKey={state?.selectedSonicKey}
                            open={true}
                            setOpenTable={(flag) => setState({ ...state, sonicKeyModal: flag })}
                        />
                    )}
                </ResizableTable>
            }
        </TableWrapper>
    );
}
