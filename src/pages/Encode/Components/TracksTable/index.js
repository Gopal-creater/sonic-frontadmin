import { Grid, Table, TableBody, TableContainer, TableHead, TableRow, TableCell } from '@material-ui/core';
import React from 'react'
import PopUp from '../../../../components/common/PopUp';
import TableMenu from '../../../../components/common/Table/components/TableMenu';
import { ActionMenuItem } from '../../../../components/common/Table/TableStyled';
import { StyledTableData, StyledTableHead, StyledTableRow } from '../../../../StyledComponents/StyledTable/StyledTable';
import theme from '../../../../theme';
import { log } from '../../../../utils/app.debug';
import CloseIcon from '@material-ui/icons/Close';
import { H3, H4, H6 } from '../../../../StyledComponents/StyledHeadings';
import AppButton from '../../../../components/common/AppButton/AppButton';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import * as actionTypes from "../../../../stores/actions/actionTypes"
import cogoToast from 'cogo-toast';
import fileDownload from 'js-file-download'
import axios from 'axios';
import DownloadProgressModal from '../DownloadProgressModal';
import { downloadAnyFile } from '../../../../services/https/resources/EncodeApi/encodeApi';
import { SelectedColumn } from '../../../../components/common/Columns/component/SelectedColumn';
import CustomToolTip from '../../../../components/common/CustomToolTip';
import { useNavigate } from 'react-router-dom';

export default function TracksTable({ data, tableHeads, trackSorting }) {
    const [state, setState] = React.useState({
        openViewTrackPopUp: false,
        selectedTrack: null,
        selectedEncodeAgainTrack: null,
        openDownloadingModal: false,
        percentComplete: "0",
    })

    const encodeReducer = useSelector(state => state.encode)
    const sonickey = useSelector(state => state.sonickey)
    const navigation = useNavigate()

    const dispatch = useDispatch()

    const encodeAgain = (track) => {
        log("Encode Again track", track)

        let metaData = {
            ...encodeReducer?.metaData,
            contentName: track?.trackMetaData?.contentName || track?.title || "",
            contentFileType: track?.trackMetaData?.contentFileType || track?.fileType || "",
            contentOwner: track?.trackMetaData?.contentOwner || track?.artist || "",
            contentDuration: track?.trackMetaData?.contentDuration || track?.duration || "",
            contentSize: track?.trackMetaData?.contentSize || track?.fileSize || "",
            contentEncoding: track?.trackMetaData?.contentEncoding || track?.encoding || "",
            contentSamplingFrequency: track?.trackMetaData?.contentSamplingFrequency || track?.samplingFrequency || "",
        }
        dispatch({ type: actionTypes.SET_SELECTED_EXISTING_FILE, data: { file: track, metaData: metaData } })
    }

    const closePopUp = () => {
        setState({ ...state, openViewTrackPopUp: false, selectedTrack: null })
    }

    const download = (track) => {
        log("Download track", track)
        setState({ ...state, openDownloadingModal: true })
        downloadAnyFile(track?.s3OriginalFileMeta?.Key).then((response) => {
            axios({
                url: response,
                responseType: 'blob',
                onDownloadProgress: function (progressEvent) {
                    let percent = Math.floor(progressEvent?.loaded / progressEvent?.total * 100)
                    setState({ ...state, percentComplete: percent, openDownloadingModal: true })
                }
            }).then(res => {
                fileDownload(res.data, track?.originalFileName);
                setState({ ...state, openDownloadingModal: false })
            }).catch(error => {
                log("Download error", error)
                cogoToast.error(error?.message)
                setState({ ...state, openDownloadingModal: false })
            });
        }).catch((error) => {
            log("Download error", error)
            cogoToast.error(error?.message)
            setState({ ...state, openDownloadingModal: false })
        })
    }

    const sorting = (sortBy, isAscending, isActive) => {
        if (isActive) {
            if (isAscending === true) {
                trackSorting(sortBy, false, false)
            }
            else if (isAscending === false) {
                trackSorting(sortBy, true, false)
            }
            else if (isAscending === null) {
                trackSorting(sortBy, true, false)
            }
        } else {
            if (isAscending === true) {
                trackSorting(sortBy, false, true)
            }
            else if (isAscending === false) {
                trackSorting(sortBy, true, true)
            }
            else if (isAscending === null) {
                trackSorting(sortBy, true, true)
            }
        }
    }

    const viewSonicKeys = (track) => {
        log("View SonicKeys", track)
        dispatch({ type: actionTypes.SONIC_KEY_FILTERS, data: { ...sonickey?.filters, track: track?._id } })
        navigation("/sonic-keys")
    }

    return (
        <Grid>
            <TableContainer >
                <Table aria-label="customized table" style={{ minWidth: "1200px" }}>
                    <TableHead>
                        <TableRow>
                            {
                                tableHeads?.map((data, index) => {
                                    const isChecked = SelectedColumn(data?.title);
                                    if (isChecked) {
                                        return (
                                            <StyledTableHead
                                                key={index}
                                                onClick={() => data?.title !== "ACTION" && sorting(data?.sortBy, data?.isAscending, data?.isActive)}
                                            >
                                                {data?.title}
                                                {data?.title !== "ACTION" && <i className="fa fa-sort" style={{ marginLeft: "5px" }}></i>}
                                            </StyledTableHead>
                                        )
                                    }
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data?.length === 0 ?
                                <TableRow key={0}>
                                    <StyledTableData colSpan={8} style={{ textAlign: "center" }}>
                                        No Data
                                    </StyledTableData>
                                </TableRow> :
                                data?.map((row, index) => {
                                    return (
                                        <StyledTableRow
                                            key={index}
                                            bgColor={index % 2 !== 0 && theme.colors.secondary.tableColor}
                                        >
                                            {
                                                SelectedColumn("TRACK ID") &&
                                                <CustomToolTip title={row?._id || "---"} placement={"bottom-start"}>
                                                    <StyledTableData
                                                        style={{
                                                            color: theme.colors.primary.navy,
                                                            fontSize: theme.fontSize.h4,
                                                            fontFamily: theme.fontFamily.nunitoSansBold
                                                        }}
                                                    >
                                                        {row?._id || "---"}
                                                    </StyledTableData>
                                                </CustomToolTip>
                                            }
                                            {
                                                SelectedColumn("TITLE") &&
                                                <CustomToolTip title={row?.trackMetaData?.contentName || "---"} placement={"bottom-start"}>
                                                    <StyledTableData >
                                                        {row?.trackMetaData?.contentName || "---"}
                                                    </StyledTableData>
                                                </CustomToolTip>
                                            }
                                            {
                                                SelectedColumn("VERSION") &&
                                                <CustomToolTip title={row?.trackMetaData?.version || "---"} placement={"bottom-start"}>
                                                    <StyledTableData >
                                                        {row?.trackMetaData?.version || "---"}
                                                    </StyledTableData>
                                                </CustomToolTip>
                                            }
                                            {
                                                SelectedColumn("ARTIST") &&
                                                <CustomToolTip title={row?.trackMetaData?.contentOwner || "---"} placement={"bottom-start"}>
                                                    <StyledTableData >
                                                        {row?.trackMetaData?.contentOwner || "---"}
                                                    </StyledTableData>
                                                </CustomToolTip>
                                            }
                                            {
                                                SelectedColumn("DISTRIBUTOR") &&
                                                <CustomToolTip title={row?.trackMetaData?.distributor || "---"} placement={"bottom-start"}>
                                                    <StyledTableData >
                                                        {row?.trackMetaData?.distributor || "---"}
                                                    </StyledTableData>
                                                </CustomToolTip>
                                            }
                                            {
                                                SelectedColumn("FILE TYPE") &&
                                                <CustomToolTip title={row?.trackMetaData?.contentFileType || "---"} placement={"bottom-start"}>
                                                    <StyledTableData >
                                                        {row?.trackMetaData?.contentFileType || "---"}
                                                    </StyledTableData>
                                                </CustomToolTip>
                                            }
                                            {
                                                SelectedColumn("ENCODED DATE") &&
                                                <CustomToolTip title={moment(row?.createdAt).format("DD/MM/YYYY") || "---"} placement={"bottom-start"}>
                                                    <StyledTableData >
                                                        {moment(row?.createdAt).format("DD/MM/YYYY") || "---"}
                                                    </StyledTableData>
                                                </CustomToolTip>
                                            }
                                            {
                                                SelectedColumn("SYSTEM/PARTNER ID") &&
                                                <CustomToolTip title={row?.owner?._id || row?.company?._id || row?.partner?._id || "---"} placement={"bottom-start"}>
                                                    <StyledTableData >
                                                        {row?.owner?._id || row?.company?._id || row?.partner?._id || "---"}
                                                    </StyledTableData>
                                                </CustomToolTip>
                                            }
                                            {
                                                SelectedColumn("ACTION") &&
                                                <StyledTableData >
                                                    <TableMenu>
                                                        <ActionMenuItem onClick={() => setState({ ...state, openViewTrackPopUp: true, selectedTrack: row })}>View</ActionMenuItem>
                                                        <ActionMenuItem onClick={() => download(row)}>Download</ActionMenuItem>
                                                        <ActionMenuItem onClick={() => encodeAgain(row)}>Encode again</ActionMenuItem>
                                                        <ActionMenuItem onClick={() => viewSonicKeys(row)}>View Sonickeys</ActionMenuItem>
                                                    </TableMenu>
                                                </StyledTableData>
                                            }
                                        </StyledTableRow>
                                    )
                                })}
                    </TableBody>
                </Table>
            </TableContainer>

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
                        <Table>
                            <TableRow>
                                <TCell cell1={true}>TRACK ID</TCell>
                                <TCell cell1={false}>{state?.selectedTrack?._id || "---"}</TCell>
                            </TableRow>
                            <TableRow>
                                <TCell cell1={true}>TITLE</TCell>
                                <TCell cell1={false}>{state?.selectedTrack?.trackMetaData?.contentName || "---"}</TCell>
                            </TableRow>
                            <TableRow>
                                <TCell cell1={true}>ORIGINAL FILENAME</TCell>
                                <TCell cell1={false}>{state?.selectedTrack?.originalFileName || "---"}</TCell>
                            </TableRow>
                            <TableRow>
                                <TCell cell1={true}>VERSION</TCell>
                                <TCell cell1={false}>{state?.selectedTrack?.trackMetaData?.version || "---"}</TCell>
                            </TableRow>
                            <TableRow>
                                <TCell cell1={true}>LABEL</TCell>
                                <TCell cell1={false}>{state?.selectedTrack?.trackMetaData?.label || "---"}</TCell>
                            </TableRow>
                            <TableRow>
                                <TCell cell1={true}>ARTIST</TCell>
                                <TCell cell1={false}>{state?.selectedTrack?.trackMetaData?.contentOwner || "---"}</TCell>
                            </TableRow>
                            <TableRow>
                                <TCell cell1={true}>DISTRIBUTOR</TCell>
                                <TCell cell1={false}>{state?.selectedTrack?.trackMetaData?.distributor || "---"}</TCell>
                            </TableRow>
                            <TableRow>
                                <TCell cell1={true}>FILE TYPE</TCell>
                                <TCell cell1={false}>{state?.selectedTrack?.trackMetaData?.contentFileType || "---"}</TCell>
                            </TableRow>
                            <TableRow>
                                <TCell cell1={true}>ENCODED DATE</TCell>
                                <TCell cell1={false}>{moment(state?.selectedTrack?.createdAt).format("DD/MM/YYYY") || "---"}</TCell>
                            </TableRow>
                            <TableRow>
                                <TCell cell1={true}>SYSTEM/PARTNER ID</TCell>
                                <TCell cell1={false}>{state?.selectedTrack?.owner?._id || state?.selectedTrack?.company?._id || state?.selectedTrack?.partner?._id || "---"}</TCell>
                            </TableRow>
                        </Table>
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

            <DownloadProgressModal open={state.openDownloadingModal} percentage={state.percentComplete} />
        </Grid>
    )
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