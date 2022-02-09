import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Grid } from '@material-ui/core';
import styled from 'styled-components';
import './DatePicker.css';
import theme from '../../../../theme';
import { CalendarTodayOutlined } from '@material-ui/icons';

const DateInput = styled.div`
    display: flex;
    align-items: center;
`;

const CustomDate = React.forwardRef((props, ref) => (
    <DateInput>
        {props?.calender ?
            <CalendarTodayOutlined className="me-3 mt-3" style={{ color: theme.colors.secondary.grey }} fontSize='small' />
            : null
        }
        <Grid style={{ width: '120px' }}>
            <span style={{
                fontSize: theme.fontSize.h6,
                fontFamily: theme.fontFamily.nunitoSansBold,
                color: theme.colors.secondary.mediumGrey
            }}
            >
                {props?.title || "Date"}
            </span>
            <input
                {...props}
                style={{
                    display: 'block',
                    outline: 'none',
                    border: 'none',
                    borderBottom: `1px solid ${theme.colors.secondary.mediumGrey}`,
                    color: props?.filter ? theme.colors.secondary.lightNavy : theme.colors.secondary.mediumGrey,
                    fontFamily: props?.filter ? theme.fontFamily.nunitoSansRegular : theme.fontFamily.nunitoSansBold,
                    fontSize: theme.fontSize.h4,
                    width: '100%',
                }}
            />
        </Grid>
    </DateInput>
)
)

export default function CustomDatePicker({ title, selected, onChange, calender = false, filter = false, startDate, endDate, ...props }) {
    return <div>
        <DatePicker
            wrapperClassName='date-picker'
            selected={selected}
            onChange={onChange}
            customInput={<CustomDate calender={calender} filter={filter} />}
            dateFormat="MMM d,yyyy"
            title={title || ""}
            startDate={startDate || null}
            endDate={endDate || null}
            {...props}
        // showYearDropdown
        // showMonthDropdown
        />
    </div>;
}
