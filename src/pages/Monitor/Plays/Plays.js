import React from 'react';
import "./Plays.scss";
import { Grid, TableContainer, TableHead, TableRow, Table, TableBody, TableCell, Button, Popover, Tooltip } from '@material-ui/core';
import { tableStyle } from '../../../globalStyle';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomDate from './components/CustomDate';
import { FilterList } from '@material-ui/icons';
import Filter from './components/Filter';
import { Pagination } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import SonicSpinner from '../../../components/common/SonicSpinner';
import moment from 'moment';
import { playsTableHeads } from '../../../constants/constants';
import { getPlaysListsAction } from '../../../stores/actions/playsList';
import DailogTable from '../../../components/common/DialogTable';

export default function Plays() {
    const [values, setValues] = React.useState({
        startDate: new Date().setMonth(new Date().getMonth() - 1),
        endDate: new Date(),
        anchorFilter: false,
        sonicKeyModal: false,
        selectedSonicKey: {},
        channel: "STREAMREADER"
    })
    const openFilter = Boolean(values.anchorFilter);

    const dispatch = useDispatch();
    const playsList = useSelector(state => state.playsList)

    React.useEffect(() => {
        dispatch(getPlaysListsAction(values?.startDate, values?.endDate, values?.channel, playsList?.data?.page, 10));
    }, [values?.startDate, values?.endDate])

    return (
        <Grid className="plays-container">
            <Grid container justifyContent="space-between" className="plays-title-container">
                <Grid>
                    <span className="plays-title">Plays - List</span><br />
                    <p className="plays-subTitle">See history of sonickeys</p>
                </Grid>
                {/* <Grid>
                    <IconButton>
                        <img src={view} alt="filter-icon" />
                    </IconButton>
                </Grid> */}
            </Grid>

            <Grid className="plays-filter-container">
                <Grid className="filter-dates">
                    <Grid className="filter-startDate">
                        <DatePicker
                            selected={values?.startDate}
                            onChange={(date) => setValues({ ...values, startDate: date })}
                            customInput={<CustomDate calender />}
                            dateFormat="MMM d,yyyy"
                            title="Start Date"
                            showYearDropdown
                            showMonthDropdown
                        />
                    </Grid>

                    <Grid className="mt-4 mx-3">
                        <p style={{ fontSize: '18px' }}>to</p>
                    </Grid>

                    <Grid className="filter-endDate">
                        <DatePicker
                            selected={values?.endDate}
                            onChange={(date) => setValues({ ...values, endDate: date })}
                            customInput={<CustomDate />}
                            dateFormat="MMM d,yyyy"
                            title="End Date"
                            showYearDropdown
                            showMonthDropdown
                        />
                    </Grid>
                </Grid>

                <Grid className="filter-dialog">
                    <Button
                        aria-describedby="open-filter"
                        variant="text"
                        className="filter-btn"
                        onClick={(e) => setValues({ ...values, anchorFilter: e.currentTarget })}
                    >
                        <span style={{ lineHeight: 0, marginRight: 5 }}>Filter</span>
                        <FilterList fontSize="medium" />
                    </Button>

                    <Popover
                        id="open-filter"
                        open={openFilter}
                        anchorEl={values.anchorFilter}
                        onClose={() => setValues({ ...values, anchorFilter: null })}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <Filter
                            onClose={() => setValues({ ...values, anchorFilter: null })}
                        />
                    </Popover>
                </Grid>
            </Grid>

            <TableContainer style={{ ...tableStyle.container, width: "100%" }} className="plays-table">
                {/* {playsList?.loading ?
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', height: '200px' }}>
                        <SonicSpinner title="Loading Sonic Keys..." containerStyle={{ height: '100%', display: 'flex', justifyContent: 'center' }} />
                    </div>
                    :  */}
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
                                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', height: '200px' }}>
                                        <SonicSpinner title="Loading Sonic Keys..." containerStyle={{ height: '100%', display: 'flex', justifyContent: 'center' }} />
                                    </div>
                                </TableCell>
                            </TableRow>
                            : playsList?.data?.docs?.length > 0 ? (
                                playsList?.data?.docs?.map((data) => (
                                    <TableRow key={data?._id} hover className="plays-table-row">
                                        <Tooltip title={data?.sonicKey?.sonicKey}>
                                            <TableCell
                                                style={{ ...tableStyle.body, color: "#00A19A", fontSize: '14px' }}
                                                onClick={() => setValues({ ...values, sonicKeyModal: true, selectedSonicKey: data?.sonicKey })}
                                            >
                                                {data?.sonicKey?.sonicKey}
                                            </TableCell>
                                        </Tooltip>
                                        <TableCell style={{ ...tableStyle.body, fontSize: '14px' }}>
                                            {data?.radioStation?.name?.length > 20 ? data?.radioStation?.name?.slice(0, 20) + "..." : data?.radioStation?.name}
                                        </TableCell>
                                        <TableCell style={{ ...tableStyle.body, fontSize: '14px' }}>
                                            {moment(data?.detectedAt).utc().format("DD/MM/YYYY")}
                                        </TableCell>
                                        <TableCell style={{ ...tableStyle.body, fontSize: '14px' }}>
                                            {moment(data?.detectedAt).utc().format("HH:mm")}
                                        </TableCell>
                                        <TableCell style={{ ...tableStyle.body, fontSize: '14px' }}>
                                            {moment.utc(data?.sonicKey?.contentDuration * 1000).format("mm:ss")}
                                        </TableCell>
                                        <Tooltip title={data?.sonicKey?.originalFileName || data?.sonicKey?.contentFileName}>
                                            <TableCell style={{ ...tableStyle.body, fontSize: '14px' }}>
                                                {(data?.sonicKey?.originalFileName?.length > 20 ? data?.sonicKey?.originalFileName?.slice(0, 20) + "..." : data?.sonicKey?.originalFileName) || (data?.sonicKey?.contentFileName?.length > 20 ? data?.sonicKey?.contentFileName?.slice(0, 20) + "..." : data?.sonicKey?.contentFileName)}
                                            </TableCell>
                                        </Tooltip>
                                        <Tooltip title={data?.sonicKey?.contentOwner}>
                                            <TableCell style={{ ...tableStyle.body, fontSize: '14px' }}>
                                                {(data?.sonicKey?.contentOwner === "" ? "-" : (data?.sonicKey?.contentOwner?.length > 20 ? data?.sonicKey?.contentOwner?.slice(0, 20) + "..." : data?.sonicKey?.contentOwner))}
                                            </TableCell>
                                        </Tooltip>
                                        <TableCell style={{ ...tableStyle.body, fontSize: '14px' }}>
                                            {data?.radioStation?.country}
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
                    <DailogTable
                        sonicKey={values?.selectedSonicKey}
                        open={true}
                        setOpenTable={(flag) => setValues({ ...values, sonicKeyModal: flag })}
                    />
                )}

                {!playsList?.loading ? <Pagination
                    count={playsList?.data?.totalPages}
                    page={playsList?.data?.page}
                    variant="outlined"
                    shape="rounded"
                    onChange={(event, value) => dispatch(getPlaysListsAction(values?.startDate, values?.endDate, values?.channel, value, 10))}
                /> : ""}
            </TableContainer>
        </Grid>
    )
}
