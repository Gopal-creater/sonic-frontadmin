import React from 'react';
import {
    TableWrapper, ResizableTable, StyledTableHead, StyledTableRow,
    StyledTableHeadColumn, StyledTableBody, TableResizer, TableDataColumn
} from './TableStyle';
import { useRef } from "react";
import { log } from '../../../../../utils/app.debug';
import { playsTableHeads } from '../../../../../constants/constants';
import { useTheme } from 'styled-components';
import moment from 'moment';
import MetaDataDialog from '../../../../../components/common/MetaDataDialog';
import { useSelector } from 'react-redux';
import CustomToolTip from '../../../../../components/common/CustomToolTip';
import { Grid, TableCell, TableRow } from '@material-ui/core';
import { StyledTableData } from '../../../../../StyledComponents/StyledTable/StyledTable';
import TableMenu from '../../../../../components/common/Table/components/TableMenu';
import { ActionMenuItem } from '../../../../../components/common/Table/TableStyled';
import PopUp from '../../../../../components/common/PopUp';
import { H3, H4, H6 } from '../../../../../StyledComponents/StyledHeadings';
import { Table } from 'react-bootstrap';
import AppButton from '../../../../../components/common/AppButton/AppButton';
import theme from '../../../../../theme';
import CloseIcon from '@material-ui/icons/Close';

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
        sonicKeyModal: false,
        selectedSonicKey: {},
        openViewTrackPopUp: false,
        selectedTrack: null,
    })

    const closePopUp = () => {
        setState({ ...state, openViewTrackPopUp: false, selectedTrack: null })
    }

    const [sortOrder, setSortOrder] = React.useState("ASC")

    const monitor = useSelector(state => state.monitor)
    const tableElement = useRef(null)
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
    log("state ", state?.data)

    return (
        <TableWrapper>
            {
                state?.data?.length === 0 ?
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
                                                    <TableResizer onMouseDown={() => setState({ ...state, activeColumnIndex: index })} style={{ height: state.tableHeight, }} />
                                            }
                                        </StyledTableHeadColumn>
                                    )
                                })}
                            </StyledTableRow>
                        </StyledTableHead>

                        <StyledTableBody>
                            {
                                state?.data?.length === 0 ?
                                    <TableRow key={0}>
                                        <StyledTableData colSpan={5} style={{ textAlign: "center" }}>
                                            No Data
                                        </StyledTableData>
                                    </TableRow> :
                                    state.data?.map((row, index) => {
                                        return (
                                            <StyledTableRow key={index}>
                                                <CustomToolTip title={row?.modal?.company?.name || "---"} placement={"bottom-start"}>
                                                    <TableDataColumn
                                                        style={{
                                                            color: theme.colors.primary.navy,
                                                            fontSize: theme.fontSize.h4,
                                                            fontFamily: theme.fontFamily.nunitoSansMediumBold,
                                                            position: "sticky",
                                                            // backgroundColor: "yellow",
                                                            width: "130px",
                                                            left: 0,
                                                        }}
                                                        bgColor={index % 2 !== 0 && theme.colors.secondary.tableColor}
                                                    >
                                                        {row?.modal?.company?.name || "---"}
                                                    </TableDataColumn>
                                                </CustomToolTip>

                                                <CustomToolTip title={row?.modal?.company?.companyType || "---"} placement={"bottom-start"}>
                                                    <TableDataColumn
                                                        style={{
                                                            color: theme.colors.primary.graphite,
                                                            fontSize: theme.fontSize.h4,
                                                            // backgroundColor: "red",
                                                            fontFamily: theme.fontFamily.nunitoSansMediumBold,
                                                            position: "sticky",
                                                            width: "130px",
                                                            left: "130px",
                                                        }}
                                                        bgColor={index % 2 !== 0 && theme.colors.secondary.tableColor}
                                                    >
                                                        {row?.modal?.company?.companyType || "---"}
                                                    </TableDataColumn>
                                                </CustomToolTip>

                                                <TableDataColumn bgColor={index % 2 !== 0 && theme.colors.secondary.tableColor}>
                                                    {row?.artist || "---"}
                                                </TableDataColumn>

                                                <TableDataColumn bgColor={index % 2 !== 0 && theme.colors.secondary.tableColor}>
                                                    {row?.title || "---"}
                                                </TableDataColumn>

                                                <TableDataColumn bgColor={index % 2 !== 0 && theme.colors.secondary.tableColor}>
                                                    {row?.version || "---"}
                                                </TableDataColumn>

                                                <TableDataColumn bgColor={index % 2 !== 0 && theme.colors.secondary.tableColor}>
                                                    {row?.trackId || "---"}
                                                </TableDataColumn>

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
                                                    {row?.label || "---"}
                                                </TableDataColumn>

                                                <TableDataColumn bgColor={index % 2 !== 0 && theme.colors.secondary.tableColor}>
                                                    {row?.distributor || "---"}
                                                </TableDataColumn>

                                                <TableDataColumn bgColor={index % 2 !== 0 && theme.colors.secondary.tableColor}>
                                                    {row?.fileType || "---"}
                                                </TableDataColumn>

                                                <TableDataColumn
                                                    bgColor={index % 2 !== 0 && theme.colors.secondary.tableColor}
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
                                                <TableDataColumn>
                                                    <TableMenu>
                                                        <ActionMenuItem onClick={() => setState({ ...state, openViewTrackPopUp: true, selectedTrack: row })}>View</ActionMenuItem>
                                                    </TableMenu>
                                                </TableDataColumn>

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

            <PopUp key="view track popup" open={state.openViewTrackPopUp} maxWidth="sm" fullWidth>
                <Grid style={{ padding: "30px" }}>
                    <Grid container justifyContent='space-between'>
                        <Grid >
                            <H3 fontFamily={theme.fontFamily.nunitoSansMediumBold}>{state?.selectedTrack?.trackMetaData?.contentName || state?.selectedTrack?.title || "---"}</H3>
                            <H4 color={theme.colors.primary.teal}>by {state?.selectedTrack?.trackMetaData?.contentOwner || state?.selectedTrack?.artist || "---"}</H4>
                        </Grid>
                        <CloseIcon onClick={closePopUp} style={{ cursor: "pointer" }} />
                    </Grid>

                    <Grid style={{ height: "300px", marginTop: "20px", overflow: "auto" }}>
                        {state.data?.map((row, index) => {
                            return (
                                <Table key={index}>
                                    <TableRow>
                                        <TCell cell1={true}>COMPANY</TCell>
                                        <TCell cell1={false}>{row?.modal?.company?.name || "---"}</TCell>
                                    </TableRow>
                                    <TableRow>
                                        <TCell cell1={true}>COMPANY TYPE</TCell>
                                        <TCell cell1={false}>{row?.modal?.company?.companyType || "---"}</TCell>
                                    </TableRow>
                                    <TableRow>
                                        <TCell cell1={true}>ARTIST</TCell>
                                        <TCell cell1={false}>{row?.artist || "---"}</TCell>
                                    </TableRow>
                                    <TableRow>
                                        <TCell cell1={true}>TITLE</TCell>
                                        <TCell cell1={false}>{row?.title || "---"}</TCell>
                                    </TableRow>
                                    <TableRow>
                                        <TCell cell1={true}>RADIO STATION</TCell>
                                        <TCell cell1={false}>{row?.radioStation || "---"}</TCell>
                                    </TableRow>
                                    <TableRow>
                                        <TCell cell1={true}>DATE</TCell>
                                        <TCell cell1={false}>{moment(row?.date).utc().format("DD/MM/YYYY") || "---"}</TCell>
                                    </TableRow>
                                    <TableRow>
                                        <TCell cell1={true}>TIME</TCell>
                                        <TCell cell1={false}>{monitor?.filters?.timezone === "GMT" ? moment(row?.time).utc().format("HH:mm:ss") : moment(row?.time).format("HH:mm:ss") || "---"}</TCell>
                                    </TableRow>
                                    <TableRow>
                                        <TCell cell1={true}>DURATION</TCell>
                                        <TCell cell1={false}>{moment.utc(row?.duration * 1000).format("mm:ss") || "---"}</TCell>
                                    </TableRow>
                                    <TableRow>
                                        <TCell cell1={true}>COUNTRY</TCell>
                                        <TCell cell1={false}>{row?.country || "---"}</TCell>
                                    </TableRow>
                                    <TableRow>
                                        <TCell cell1={true}>TRACK ID</TCell>
                                        <TCell cell1={false}>{row?.trackId || "---"}</TCell>
                                    </TableRow>
                                    <TableRow>
                                        <TCell cell1={true}>SONICKEY</TCell>
                                        <TCell cell1={false}>{row?.sonicKey || "---"}</TCell>
                                    </TableRow>
                                    <TableRow>
                                        <TCell cell1={true}>SK/SID</TCell>
                                        <TCell cell1={false}>{row || "---"}</TCell>
                                    </TableRow>
                                    <TableRow>
                                        <TCell cell1={true}>VERSION</TCell>
                                        <TCell cell1={false}>{row?.version || "---"}</TCell>
                                    </TableRow>
                                    <TableRow>
                                        <TCell cell1={true}>DISTRIBUTOR</TCell>
                                        <TCell cell1={false}>{row?.distributor || "---"}</TCell>
                                    </TableRow>
                                    <TableRow>
                                        <TCell cell1={true}>LABEL</TCell>
                                        <TCell cell1={false}>{row?.label || "---"}</TCell>
                                    </TableRow>
                                    <TableRow>
                                        <TCell cell1={true}>ISRC</TCell>
                                        <TCell cell1={false}>{row?.isrcCode || "---"}</TCell>
                                    </TableRow>
                                    <TableRow>
                                        <TCell cell1={true}>ISWC</TCell>
                                        <TCell cell1={false}>{row?.iswc || "---"}</TCell>
                                    </TableRow>
                                    <TableRow>
                                        <TCell cell1={true}>TUNE CODE</TCell>
                                        <TCell cell1={false}>{row?.tuneCode || "---"}</TCell>
                                    </TableRow>
                                    <TableRow>
                                        <TCell cell1={true}>FILE TYPE</TCell>
                                        <TCell cell1={false}>{row?.fileType || "---"}</TCell>
                                    </TableRow>

                                </Table>
                            )
                        })}
                    </Grid>

                    <Grid container justifyContent='flex-end' className='mt-2'>
                        <AppButton
                            variant={"outline"}
                            onClick={closePopUp}
                            fontSize={"15px"}
                            fontFamily={theme.fontFamily.nunitoSansBlack}
                        >
                            Cancel
                        </AppButton>
                    </Grid>
                </Grid>
            </PopUp>
        </TableWrapper >
    );
}

const TCell = ({ children, cell1, ...props }) => {
    if (cell1) {
        return (
            <TableCell size='small' width="35%" {...props}>
                <H6 fontSize={"12px"} color={theme.colors.secondary.mediumGrey}>{children}</H6>
            </TableCell>
        )
    }
    else {
        return (
            <TableCell size='small' width="65%"{...props}>
                <H6 fontSize={"14px"} fontFamily={theme.fontFamily.nunitoSansMediumBold}>{children}</H6>
            </TableCell>
        )
    }
}