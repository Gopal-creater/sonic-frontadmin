import React from 'react'
import { Grid } from '@material-ui/core';
import theme from '../../../../theme';
import { CalendarTodayOutlined } from '@material-ui/icons'
import styled from 'styled-components';

const DateInput = styled.div`
    display: flex;
    align-items: center;
`;

export const CustomDate = React.forwardRef((props, ref) => (
    <DateInput>
        {props?.calender ? <CalendarTodayOutlined className="me-3 mt-2" style={{ color: theme.colors.secondary.mediumGrey }} /> : null}
        <Grid style={{ width: '120px' }}>
            <span style={{ fontSize: '12px', fontFamily: theme.fontFamily.nunitoSansBold, color: theme.colors.secondary.mediumGrey }}>
                {props?.title || "Date"}
            </span>
            <input
                {...props}
                style={{
                    display: 'block',
                    outline: 'none',
                    border: 'none',
                    borderBottom: `1px solid ${theme.colors.secondary.mediumGrey}`,
                    color: theme.colors.secondary.grey,
                    fontFamily: theme.fontFamily.nunitoSansBold,
                    fontSize: theme.fontSize.h4,
                    width: '100%',
                }}
            />
        </Grid>
    </DateInput>
)
)
