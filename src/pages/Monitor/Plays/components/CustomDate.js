import React from 'react'
import "./CustomDate.scss"
import { Grid } from '@material-ui/core';
import { CalendarTodayOutlined } from '@material-ui/icons';

export default function CustomDate(props) {
    return (
        <Grid className="customDate-container">
            {props?.calender ? <CalendarTodayOutlined className="me-3" /> : null}
            <Grid>
                <span className="date-title">{props?.title || "Date"}</span>
                <input {...props} className="date-input" />
            </Grid>
        </Grid>
    )
}