import React from 'react';
import "./Plays.scss";
import { Grid, TableContainer, TableHead, TableRow, Table, TableBody, TableCell, Button, Popover, Tooltip, Box, MenuItem } from '@material-ui/core';
import { tableStyle } from '../../../globalStyle';
import { Pagination } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import SonicSpinner from '../../../components/common/SonicSpinner';
import moment from 'moment';
import { playsTableHeads } from '../../../constants/constants';
import { getPlaysListsAction, getAllRadioStationsAction, getSonickeyHistoryDataAction } from '../../../stores/actions/playsList';
import MetaDataDialog from '../../../components/common/MetaDataDialog';
import * as actionTypes from "../../../stores/actions/actionTypes";
import ExportIcon from '@material-ui/icons/GetApp';
import { getExportDataAction } from '../../../stores/actions/dashboard.action';
import { H1, H4 } from '../../../StyledComponents/StyledHeadings';
import theme from '../../../theme';
import FilterComponent from '../../../components/common/FilterComponent/FilterComponent';
import Search from '../../SonicKeys/Components/Search';
import viewFilter from '../../../assets/images/view.png'

export default function Plays() {
    const [values, setValues] = React.useState({
        anchorFilter: false,
        sonicKeyModal: false,
        selectedSonicKey: {},
        format: "",
    })
    const openFilter = Boolean(values.anchorFilter);

    const dispatch = useDispatch();
    const playsList = useSelector(state => state.playsList)

    React.useEffect(() => {
        dispatch(getPlaysListsAction(
            playsList?.dates?.startDate,
            playsList?.dates?.endDate,
            playsList?.filters?.channel,
            playsList?.data?.page,
            10,
        ));
    }, [playsList?.dates?.startDate, playsList?.dates?.endDate])

    React.useEffect(() => {
        dispatch(getAllRadioStationsAction())
    }, [])

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const dataExportHandleClick = (event) => {
        setAnchorEl(event.currentTarget)
    };

    const handleExport = (value) => {
        setValues({ ...values, format: value })
        if (playsList?.filters?.sonicKey) {
            dispatch(getSonickeyHistoryDataAction(playsList?.dates?.startDate, playsList?.dates?.endDate, playsList?.filters?.channel, value))
        } else {
            dispatch(getExportDataAction(playsList?.dates?.startDate, playsList?.dates?.endDate, playsList?.filters?.channel, 2000, value))
        }
        setAnchorEl(null);
    };

    return (
        <Grid className="plays-container">
            <Grid container justifyContent="space-between" className="plays-title-container">
                <Grid>
                    <H1>My Plays</H1>
                    <H4 color={theme.colors.primary.teal} fontFamily={theme.fontFamily.nunitoSansRegular}>
                        Showing 1-10 of 42 plays
                    </H4>
                </Grid>
                <Grid style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ marginRight: '10px' }} >
                        <Search
                        // searchData={onSearchChange} 
                        // dataSearch={dataSearch} 
                        // setDataSearch={setDataSearch} 
                        // setDefaultData={setDefaultData}
                        />
                    </div>
                    <div>
                        <img src={viewFilter} style={{ cursor: 'pointer' }} />
                    </div>
                </Grid>
            </Grid>

            <Grid>
                <FilterComponent
                    startDate={playsList?.dates?.startDate}
                    onChangeStartDate={(date) => dispatch({ type: actionTypes.SET_PLAYS_DATES, data: { ...playsList.dates, startDate: date } })}
                    endDate={playsList?.dates?.endDate}
                    onChangeEndDate={(date) => dispatch({ type: actionTypes.SET_PLAYS_DATES, data: { ...playsList.dates, endDate: date } })}
                />
            </Grid>

            <TableContainer style={{ ...tableStyle.container, width: "100%" }} className="plays-table">
                <Table aria-label="Detail table">
                    <TableHead>
                        <TableRow hover>
                            {playsTableHeads?.map((col) => (
                                <TableCell key={col} style={{ ...tableStyle.head, fontSize: '14px' }}>
                                    {col}
                                </TableCell>
                            )
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {playsList?.loading ?
                            <TableRow>
                                <TableCell colSpan={8} align={"center"} style={{ ...tableStyle.body, fontSize: '14px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', height: '100px' }}>
                                        <SonicSpinner title="Loading Sonic Keys..." containerStyle={{ height: '100%', display: 'flex', justifyContent: 'center' }} />
                                    </div>
                                </TableCell>
                            </TableRow>
                            : playsList?.data?.docs?.length > 0 ? (
                                playsList?.data?.docs?.map((data) => (
                                    <TableRow key={data?._id} hover className="plays-table-row">
                                        <Tooltip title={data?.sonicKey?.sonicKey}>
                                            <TableCell
                                                style={{ ...tableStyle.body, color: "#00A19A", fontSize: '14px', cursor: "pointer" }}
                                                onClick={() => setValues({ ...values, sonicKeyModal: true, selectedSonicKey: data?.sonicKey })}
                                            >
                                                {data?.sonicKey?.sonicKey || "---"}
                                            </TableCell>
                                        </Tooltip>
                                        <TableCell style={{ ...tableStyle.body, fontSize: '14px' }}>
                                            {data?.radioStation?.name?.length > 20 ? data?.radioStation?.name?.slice(0, 20) + "..." : data?.radioStation?.name || "---"}
                                        </TableCell>
                                        <TableCell style={{ ...tableStyle.body, fontSize: '14px' }}>
                                            {moment(data?.detectedAt).utc().format("DD/MM/YYYY") || "---"}
                                        </TableCell>
                                        <TableCell style={{ ...tableStyle.body, fontSize: '14px' }}>
                                            {moment(data?.detectedAt).utc().format("HH:mm") || "---"}
                                        </TableCell>
                                        <TableCell style={{ ...tableStyle.body, fontSize: '14px' }}>
                                            {data?.detectedDuration ? moment.utc(data?.detectedDuration * 1000).format("mm:ss") : moment.utc(data?.sonicKey?.contentDuration * 1000).format("mm:ss") || "---"}
                                        </TableCell>
                                        <Tooltip title={data?.sonicKey?.originalFileName || data?.sonicKey?.contentFileName}>
                                            <TableCell style={{ ...tableStyle.body, fontSize: '14px' }}>
                                                {(data?.sonicKey?.originalFileName?.length > 20 ? data?.sonicKey?.originalFileName?.slice(0, 20) + "..." : data?.sonicKey?.originalFileName) || (data?.sonicKey?.contentFileName?.length > 20 ? data?.sonicKey?.contentFileName?.slice(0, 20) + "..." : data?.sonicKey?.contentFileName) || "---"}
                                            </TableCell>
                                        </Tooltip>
                                        <Tooltip title={data?.sonicKey?.contentOwner}>
                                            <TableCell style={{ ...tableStyle.body, fontSize: '14px' }}>
                                                {(data?.sonicKey?.contentOwner === "" ? "---" : (data?.sonicKey?.contentOwner?.length > 20 ? data?.sonicKey?.contentOwner?.slice(0, 20) + "..." : data?.sonicKey?.contentOwner))}
                                            </TableCell>
                                        </Tooltip>
                                        <TableCell style={{ ...tableStyle.body, fontSize: '14px' }}>
                                            {data?.radioStation?.country || "---"}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={8} align={"center"} style={{ ...tableStyle.body, fontSize: '14px' }}>
                                        No Data
                                    </TableCell>
                                </TableRow>
                            )}
                    </TableBody>
                </Table>

                {values?.sonicKeyModal && (
                    <MetaDataDialog
                        sonicKey={values?.selectedSonicKey}
                        open={true}
                        setOpenTable={(flag) => setValues({ ...values, sonicKeyModal: flag })}
                        updateMetaData={(key) => {
                            setValues({ ...values, selectedSonicKey: key })
                            dispatch({ type: actionTypes.UPDATE_EDITED_PLAYSLIST, data: key })
                        }}
                    />
                )}

                {!playsList?.loading ?
                    <Pagination
                        count={playsList?.data?.totalPages}
                        page={playsList?.data?.page}
                        variant="outlined"
                        shape="rounded"
                        onChange={(event, value) => dispatch(getPlaysListsAction(
                            playsList?.dates?.startDate,
                            playsList?.dates?.endDate,
                            playsList?.filters?.channel,
                            value,
                            10
                        ))}
                    /> : ""}
            </TableContainer>
        </Grid>
    )
}
