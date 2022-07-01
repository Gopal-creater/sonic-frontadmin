import moment from 'moment';
import React from 'react';
import styled, { useTheme } from 'styled-components';
import { AlternateDataColumn, ResizableTable, StyledTableBody, StyledTableHead, StyledTableHeadColumn, StyledTableRow, TableDataColumn, TableResizer, TableWrapper } from '../../Dashboard/Components/DashboardTable/TableStyle';
import MetaDataDialog from "../../../../components/common/MetaDataDialog";
import { useSelector } from 'react-redux';
import CustomToolTip from '../../../../components/common/CustomToolTip';
import { userRoles } from '../../../../constants/constants';
import TableMenu from '../../../../components/common/Table/components/TableMenu';
import { ActionMenuItem } from '../../../../components/common/Table/TableStyled';
import PlaysMetaData from '../../../../components/common/PlaysMetaData';
import { log } from '../../../../utils/app.debug';

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
        columnsCount: playsTableHeads.length,
    })
    const tableElement = React.useRef(null)
    const columns = createHeaders(playsTableHeads)
    const monitor = useSelector(state => state.monitor)
    const user = useSelector(state => state.user)

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
                <ResizableTable length={state.columnsCount} ref={tableElement}>
                    <StyledTableHead>
                        <StyledTableRow>
                            {columns.map(({ ref, text, sortBy, isAscending, isActive }, index) => {
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
                            })}
                        </StyledTableRow>
                    </StyledTableHead>
                    <StyledTableBody>
                        {data?.map((row, index) => {
                            log("row data hai ye", row)
                            return (
                                <StyledTableRow key={index}>
                                    {user?.userProfile?.data?.userRole === userRoles.PARTNER_ADMIN &&
                                        <CustomToolTip title={row?.company || "---"} placement={"bottom-start"}>
                                            <TableDataColumn
                                                style={{
                                                    color: theme.colors.primary.navy,
                                                    fontSize: theme.fontSize.h4,
                                                    fontFamily: theme.fontFamily.nunitoSansMediumBold,
                                                    position: "sticky",
                                                    left: 0,
                                                }}
                                                bgColor={index % 2 !== 0 && theme.colors.secondary.tableColor}
                                            >
                                                {row?.company || "---"}
                                            </TableDataColumn>
                                        </CustomToolTip>
                                    }

                                    {user?.userProfile?.data?.userRole === userRoles.PARTNER_ADMIN &&
                                        <CustomToolTip title={row?.companyType || "---"} placement={"bottom-start"}>
                                            <TableDataColumn
                                                style={{
                                                    color: theme.colors.primary.graphite,
                                                    fontSize: theme.fontSize.h4,
                                                    fontFamily: theme.fontFamily.nunitoSansMediumBold,
                                                    position: "sticky",
                                                    left: "130px",
                                                }}
                                                bgColor={index % 2 !== 0 && theme.colors.secondary.tableColor}
                                            >
                                                {row?.companyType || "---"}
                                            </TableDataColumn>
                                        </CustomToolTip>
                                    }

                                    <CustomToolTip title={row?.artist || "---"} placement={"bottom-start"}>
                                        <TableDataColumn
                                            style={{
                                                color: user?.userProfile?.data?.userRole !== userRoles.PARTNER_ADMIN && theme.colors.primary.navy,
                                                fontSize: user?.userProfile?.data?.userRole !== userRoles.PARTNER_ADMIN && theme.fontSize.h4,
                                                fontFamily: user?.userProfile?.data?.userRole !== userRoles.PARTNER_ADMIN && theme.fontFamily.nunitoSansMediumBold,
                                                position: user?.userProfile?.data?.userRole !== userRoles.PARTNER_ADMIN ? "sticky" : "",
                                                left: user?.userProfile?.data?.userRole !== userRoles.PARTNER_ADMIN ? "0" : "",
                                            }}
                                            bgColor={index % 2 !== 0 && theme.colors.secondary.tableColor}
                                        >
                                            {row?.artist || "---"}
                                        </TableDataColumn>
                                    </CustomToolTip>

                                    <CustomToolTip title={row?.title || "---"} placement={"bottom-start"}>
                                        <TableDataColumn
                                            style={{
                                                color: user?.userProfile?.data?.userRole !== userRoles.PARTNER_ADMIN && theme.colors.primary.navy,
                                                fontSize: user?.userProfile?.data?.userRole !== userRoles.PARTNER_ADMIN && theme.fontSize.h4,
                                                fontFamily: user?.userProfile?.data?.userRole !== userRoles.PARTNER_ADMIN && theme.fontFamily.nunitoSansMediumBold,
                                                position: user?.userProfile?.data?.userRole !== userRoles.PARTNER_ADMIN ? "sticky" : "",
                                                left: user?.userProfile?.data?.userRole !== userRoles.PARTNER_ADMIN ? "130px" : "",
                                            }}
                                            bgColor={index % 2 !== 0 && theme.colors.secondary.tableColor}
                                        >
                                            {row?.title || "---"}
                                        </TableDataColumn>
                                    </CustomToolTip>

                                    <TableDataColumn bgColor={index % 2 !== 0 && theme.colors.secondary.tableColor}>
                                        {row?.radioStation || "---"}
                                    </TableDataColumn>

                                    <TableDataColumn bgColor={index % 2 !== 0 && theme.colors.secondary.tableColor}>
                                        {moment(row?.date).utc().format("DD/MM/YYYY") || "---"}
                                    </TableDataColumn>

                                    <TableDataColumn bgColor={index % 2 !== 0 && theme.colors.secondary.tableColor}>
                                        {monitor?.filters?.timezone === "GMT" ? moment(row?.time).utc().format("HH:mm:ss") : moment(row?.time).format("HH:mm:ss") || "---"}
                                    </TableDataColumn>

                                    <TableDataColumn bgColor={index % 2 !== 0 && theme.colors.secondary.tableColor}>
                                        {moment.utc(row?.duration * 1000).format("mm:ss") || "---"}
                                    </TableDataColumn>

                                    <TableDataColumn bgColor={index % 2 !== 0 && theme.colors.secondary.tableColor}>
                                        {row?.country || "---"}
                                    </TableDataColumn>

                                    <TableDataColumn bgColor={index % 2 !== 0 && theme.colors.secondary.tableColor}>
                                        {row?.trackId?._id || "---"}
                                    </TableDataColumn>

                                    <TableDataColumn
                                        bgColor={index % 2 !== 0 && theme.colors.secondary.tableColor}
                                        style={{
                                            color: theme.colors.primary.navy,
                                            fontSize: theme.fontSize.h5,
                                            fontFamily: theme.fontFamily.nunitoSansMediumBold,
                                            cursor: 'pointer'
                                        }}

                                    >
                                        {row?.sonicKey || "---"}
                                    </TableDataColumn>

                                    {/* <TableDataColumn bgColor={index % 2 !== 0 && theme.colors.secondary.tableColor}>
                                        {0}
                                    </TableDataColumn> */}

                                    <TableDataColumn bgColor={index % 2 !== 0 && theme.colors.secondary.tableColor}>
                                        {row?.version || "---"}
                                    </TableDataColumn>

                                    <TableDataColumn bgColor={index % 2 !== 0 && theme.colors.secondary.tableColor}>
                                        {row?.distributor || "---"}
                                    </TableDataColumn>

                                    <TableDataColumn bgColor={index % 2 !== 0 && theme.colors.secondary.tableColor}>
                                        {row?.label || "---"}
                                    </TableDataColumn>

                                    <TableDataColumn
                                        style={{
                                            color: theme.colors.primary.graphite,
                                            fontSize: theme.fontSize.h5,
                                            fontFamily: theme.fontFamily.nunitoSansMediumBold
                                        }}
                                        bgColor={index % 2 !== 0 && theme.colors.secondary.tableColor}
                                    >
                                        {row?.isrcCode || "---"}
                                    </TableDataColumn>

                                    <TableDataColumn bgColor={index % 2 !== 0 && theme.colors.secondary.tableColor}>
                                        {row?.iswc || "---"}
                                    </TableDataColumn>

                                    <TableDataColumn bgColor={index % 2 !== 0 && theme.colors.secondary.tableColor}>
                                        {row?.tuneCode || "---"}
                                    </TableDataColumn>

                                    <TableDataColumn bgColor={index % 2 !== 0 && theme.colors.secondary.tableColor}>
                                        {row?.description || "---"}
                                    </TableDataColumn>

                                    <TableDataColumn bgColor={index % 2 !== 0 && theme.colors.secondary.tableColor}>
                                        {row?.fileType || "---"}
                                    </TableDataColumn>

                                    <TableDataColumn>
                                        <TableMenu>
                                            <ActionMenuItem onClick={() => setState({ ...state, sonicKeyModal: true, selectedSonicKey: row?.modal })}>View</ActionMenuItem>
                                        </TableMenu>
                                    </TableDataColumn>

                                </StyledTableRow>
                            )
                        }
                        )}
                    </StyledTableBody>

                    {state?.sonicKeyModal && (
                        <PlaysMetaData
                            playsData={state?.selectedSonicKey}
                            open={true}
                            setOpenTable={(flag) => setState({ ...state, sonicKeyModal: flag })}
                        />
                    )}
                </ResizableTable>
            }
        </TableWrapper>
    );
}
