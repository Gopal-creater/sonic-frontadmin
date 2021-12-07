import React from 'react';
import "./Plays.scss";
import { Grid, TableContainer, TableHead, TableRow, Table, TableBody, TableCell, Button, Dialog } from '@material-ui/core';
import { tableStyle } from '../../../globalStyle';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomDate from './components/CustomDate';
import { FilterList } from '@material-ui/icons';
import Filter from './components/Filter';

const columns = [
    "SonicKey",
    "Radio Station",
    "Date",
    "Time",
    "Duration",
    "Audio Filename",
    "Artist",
    "Country"
];

const dummy = [1, 2, 3, 4, 5];

export default function Plays() {
    const [values, setValues] = React.useState({
        startDate: new Date().setMonth(new Date().getMonth() - 1),
        endDate: new Date(),
        openFilter: false,
    })

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

            <Grid container className="plays-filter-container">
                <Grid item className="filter-dates">
                    <Grid>
                        <DatePicker
                            selected={values?.startDate}
                            onChange={(date) => setValues({ ...values, startDate: date })}
                            customInput={<CustomDate calender />}
                            dateFormat="MMM d,yyyy"
                            title="Start Date"
                        />
                    </Grid>

                    <Grid className="mt-4 mx-3">
                        <p style={{ fontSize: '18px' }}>to</p>
                    </Grid>

                    <Grid>
                        <DatePicker
                            selected={values?.endDate}
                            onChange={(date) => setValues({ ...values, endDate: date })}
                            customInput={<CustomDate />}
                            dateFormat="MMM d,yyyy"
                            title="End Date"
                        />
                    </Grid>
                </Grid>

                <Grid item className="filter-dialog">
                    <Button variant="text" className="filter-btn" onClick={() => setValues({...values, openFilter: true})}>
                        <span>Filter</span>
                        <FilterList fontSize="medium" />
                    </Button>
                </Grid>

                <Dialog open={values?.openFilter} onClose={() => setValues({...values, openFilter: false})}>
                    <Filter />
                </Dialog>
            </Grid>

            <TableContainer style={{ ...tableStyle.container, width: "100%" }} className="plays-table">
                <Table aria-label="Detail table">
                    <TableHead>
                        <TableRow hover>
                            {columns?.map((col) => {
                                return (
                                    <TableCell style={{ ...tableStyle.head, fontSize: '14px' }}>
                                        {col}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dummy.map((index) => (
                            <TableRow key={index} hover className="plays-table-row">
                                <TableCell style={{ ...tableStyle.body, fontSize: '14px' }}>ugGmojtz0XW</TableCell>
                                <TableCell style={{ ...tableStyle.body, fontSize: '14px' }}>BBC London</TableCell>
                                <TableCell style={{ ...tableStyle.body, fontSize: '14px' }}>06/12/2021</TableCell>
                                <TableCell style={{ ...tableStyle.body, fontSize: '14px' }}>11:53</TableCell>
                                <TableCell style={{ ...tableStyle.body, fontSize: '14px' }}>03:43</TableCell>
                                <TableCell style={{ ...tableStyle.body, fontSize: '14px' }}>My Universe</TableCell>
                                <TableCell style={{ ...tableStyle.body, fontSize: '14px' }}>Coldplay</TableCell>
                                <TableCell style={{ ...tableStyle.body, fontSize: '14px' }}>UK</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    )
}
