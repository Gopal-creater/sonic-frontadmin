import { Grid, Table, TableBody, TableContainer, TableHead, TableRow, TableCell } from '@material-ui/core';
import React from 'react'
import PopUp from '../../../../components/common/PopUp';
import TableMenu from '../../../../components/common/Table/components/TableMenu';
import { ActionMenuItem } from '../../../../components/common/Table/TableStyled';
import { StyledTableData, StyledTableHead, StyledTableRow } from '../../../../StyledComponents/StyledTable/StyledTable';
import theme from '../../../../theme';
import { log } from '../../../../utils/app.debug';
import CloseIcon from '@material-ui/icons/Close';
import { H3, H4, H5, H6 } from '../../../../StyledComponents/StyledHeadings';
import AppButton from '../../../../components/common/AppButton/AppButton';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { encodeAgainFromTrackAction } from '../../../../stores/actions/EncodeActions';
import { Anchor, PopUpContainer, TitleContainer } from '../MetaDataDetails/indexStyles';
import * as actionTypes from "../../../../stores/actions/actionTypes"
import encode_progress from "../../../../assets/icons/encode_progress.png"
import sonic_preloader from "../../../../assets/icons/sonic_preloader.gif"
import iconSuccess from "../../../../assets/images/icon-success-graphic.png"
import errorEncodeIcon from "../../../../assets/images/icon-fail-graphic.png"
import cogoToast from 'cogo-toast';
import fileDownload from 'js-file-download'
import axios from 'axios';
import DownloadProgressModal from '../DownloadProgressModal';
import { downloadAnyFile } from '../../../../services/https/resources/EncodeApi/encodeApi';

export default function TracksTable({ data, tableHeads, sorting }) {
    const [state, setState] = React.useState({
        openViewTrackPopUp: false,
        selectedTrack: null,
        openDownloadingModal: false,
        percentComplete: "0"
    })
    const encodeReducer = useSelector(state => state.encode)

    const dispatch = useDispatch()

    const encodeAgain = (track) => {
        log("Encode Again track", track)
        let encodePayload = {
            track: track?._id,
            data: track?.trackMetaData || {}
        }
        dispatch(encodeAgainFromTrackAction(encodePayload))
        setState({ ...state, selectedTrack: track })
    }

    const closePopUp = () => {
        setState({ ...state, openViewTrackPopUp: false, selectedTrack: null })
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
            });
        }).catch((error) => {
            log("Download error", error)
            cogoToast.error(error?.message)
            setState({ ...state, openDownloadingModal: false })
        })
    }

    return (
        <Grid>
            <TableContainer >
                <Table aria-label="customized table" style={{ minWidth: "1030px" }}>
                    <TableHead>
                        <TableRow>
                            {
                                tableHeads?.map((data, index) => {
                                    return (
                                        <StyledTableHead
                                            key={index}
                                        // onClick={() => sorting(data?.sortBy, data?.isAscending, data?.isActive)}
                                        >
                                            {data?.title}
                                            {/* <i className="fa fa-sort" style={{ marginLeft: "5px" }}></i> */}
                                        </StyledTableHead>
                                    )
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
                                        >
                                            <StyledTableData
                                                style={{
                                                    color: theme.colors.primary.navy,
                                                    fontSize: theme.fontSize.h4,
                                                    fontFamily: theme.fontFamily.nunitoSansBold
                                                }}
                                            >
                                                {row?._id || "---"}
                                            </StyledTableData>
                                            <StyledTableData >
                                                {row?.trackMetaData?.contentName || row?.originalFileName || "---"}
                                            </StyledTableData>
                                            <StyledTableData >{row?.trackMetaData?.version || "---"}</StyledTableData>
                                            <StyledTableData >{row?.trackMetaData?.contentOwner || "---"}</StyledTableData>
                                            <StyledTableData >{row?.trackMetaData?.distributor || "---"}</StyledTableData>
                                            <StyledTableData >{row?.trackMetaData?.contentFileType || "---"}</StyledTableData>
                                            <StyledTableData >{moment(row?.createdAt).format("YYYY/MM/DD") || "---"}</StyledTableData>
                                            <StyledTableData >{row?.owner?._id || row?.company?._id || row?.partner?._id || "---"}</StyledTableData>
                                            <StyledTableData >
                                                <TableMenu>
                                                    <ActionMenuItem onClick={() => setState({ ...state, openViewTrackPopUp: true, selectedTrack: row })}>View</ActionMenuItem>
                                                    <ActionMenuItem onClick={() => download(row)}>Download</ActionMenuItem>
                                                    <ActionMenuItem onClick={() => encodeAgain(row)}>Encode again</ActionMenuItem>
                                                </TableMenu>
                                            </StyledTableData>
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
                                <TCell cell1={false}>{state?.selectedTrack?.trackMetaData?.contentName || state?.selectedTrack?.title || "---"}</TCell>
                            </TableRow>
                            <TableRow>
                                <TCell cell1={true}>VERSION</TCell>
                                <TCell cell1={false}>{state?.selectedTrack?.trackMetaData?.version || "---"}</TCell>
                            </TableRow>
                            <TableRow>
                                <TCell cell1={true}>ARTIST</TCell>
                                <TCell cell1={false}>{state?.selectedTrack?.trackMetaData?.contentOwner || state?.selectedTrack?.artist || "---"}</TCell>
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
                                <TCell cell1={false}>{moment(state?.selectedTrack?.createdAt).format("YYYY/MM/DD") || "---"}</TCell>
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

            <PopUp
                id="loadingPopUp"
                open={encodeReducer?.loadingPopUp}
                maxWidth="sm"
                fullWidth
            >
                <PopUpContainer>
                    <TitleContainer container direction='column' alignItems='center'>
                        <img src={encode_progress} style={{ width: "140px", height: "140px", zIndex: 1 }} />
                        <H4
                            className='mt-4'
                            fontFamily={theme.fontFamily.nunitoSansBlack}
                            style={{ textAlign: "center", zIndex: 1 }}
                        >
                            Encoding of {state?.selectedTrack?.trackMetaData?.contentName || state?.selectedTrack?.title || "---"} in progress
                        </H4>
                    </TitleContainer>
                    <H5
                        style={{ textAlign: "center", padding: "25px" }}
                    >
                        Depending on your internet connection and a size of an audio file, encoding may take longer at times
                    </H5>
                    <Grid container justifyContent='center'>
                        <img src={sonic_preloader} alt="sonic preloader" />
                    </Grid>
                </PopUpContainer>
            </PopUp>

            <PopUp
                id="successPopUp"
                open={encodeReducer?.successPopUp}
                maxWidth="sm"
                fullWidth
            >
                <PopUpContainer padding="20px 40px 25px 40px">
                    <Grid container justifyContent='flex-end'>
                        <CloseIcon
                            onClick={() => {
                                dispatch({ type: actionTypes.CLOSE_SUCCESS_POPUP })
                            }}
                            style={{ cursor: "pointer" }} />
                    </Grid>
                    <TitleContainer container direction='column' alignItems='center'>
                        <img src={iconSuccess} style={{ width: "140px", height: "140px", zIndex: 1 }} />
                        <H3
                            className='mt-4'
                            fontFamily={theme.fontFamily.nunitoSansBlack}
                            style={{ textAlign: "center", zIndex: 1 }}
                        >
                            Well done! Encoding successful
                        </H3>
                    </TitleContainer>
                    <Grid container justifyContent='center' className='mt-1'>
                        <AppButton
                            onClick={() => {
                                dispatch({ type: actionTypes.CLOSE_SUCCESS_POPUP })
                            }}
                            fontSize={"15px"}
                            fontFamily={theme.fontFamily.nunitoSansBlack}
                        >
                            Encode another file
                        </AppButton>
                    </Grid>
                </PopUpContainer>
            </PopUp>

            <PopUp
                id="errorPopUp"
                open={encodeReducer?.errorPopUp}
                maxWidth="sm"
                fullWidth
            >
                <PopUpContainer padding="20px 40px 25px 40px">
                    <Grid container justifyContent='flex-end'>
                        <CloseIcon
                            onClick={() => { dispatch({ type: actionTypes.CLOSE_ERROR_POPUP }) }}
                            style={{ cursor: "pointer" }} />
                    </Grid>
                    <TitleContainer container direction='column' alignItems='center' backgroundColor={theme.colors.secondary.lightGrey}>
                        <img src={errorEncodeIcon} style={{ width: "140px", height: "140px", zIndex: 1 }} />
                        <H3
                            className='mt-4'
                            fontFamily={theme.fontFamily.nunitoSansBlack}
                            style={{ textAlign: "center", zIndex: 1 }}
                        >
                            Ooops! Encoding failed
                        </H3>
                    </TitleContainer>
                    <Grid container justifyContent='center' className='mt-1'>
                        <AppButton
                            onClick={() => {
                                dispatch({ type: actionTypes.CLOSE_ERROR_POPUP })
                                encodeAgain()
                            }}
                            fontFamily={theme.fontFamily.nunitoSansBlack}
                        >
                            Try to encode again
                        </AppButton>
                    </Grid>
                    <Grid className='mt-5'>
                        <H5 fontFamily={theme.fontFamily.nunitoSansBlack}>Do you need help?</H5>
                        <H4 fontFamily={theme.fontFamily.nunitoSansRegular}>Use <Anchor>HelpCenter</Anchor> or email our <Anchor>Support Team</Anchor></H4>
                    </Grid>
                </PopUpContainer>
            </PopUp>

            <DownloadProgressModal open={state.openDownloadingModal} percentage={state.percentComplete} />
        </Grid>
    )
}
