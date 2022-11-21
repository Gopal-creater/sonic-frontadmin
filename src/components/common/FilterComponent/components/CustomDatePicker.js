import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Grid, makeStyles } from "@material-ui/core";
import styled, { useTheme } from "styled-components";
import "./DatePicker.css";
import { CalendarTodayOutlined } from "@material-ui/icons";
import { StyledTextField } from "../../../../StyledComponents/StyledAppTextInput/StyledAppTextInput";

const DateInput = styled.div`
  display: flex;
  align-items: center;
`;

const CustomDate = React.forwardRef((props, ref) => {
  const theme = useTheme();
  return (
    <DateInput>
      {props?.calender ? (
        <CalendarTodayOutlined
          className="me-3 mt-3"
          style={{ color: theme.colors.grey.main }}
          fontSize="small"
        />
      ) : null}
      <Grid style={{ width: props?.fullWidth ? "100%" : "120px" }}>
        <span
          style={{
            fontSize: theme.fontSize.caption,
            fontFamily: theme.fontFamily.robotoRegular,
            color: theme.colors.grey.main,
          }}
        >
          {props?.title || "Date"}
        </span>
        <StyledTextField {...props} />
      </Grid>
    </DateInput>
  );
});

export default function CustomDatePicker({
  title,
  selected,
  onChange,
  calender = false,
  dateRange = false,
  startDate,
  endDate,
  ...props
}) {
  const classes = useStyles();
  return (
    <div>
      <DatePicker
        calendarClassName={classes.calendarClassName}
        selected={selected}
        onChange={onChange}
        customInput={
          <CustomDate calender={calender} dateRange={dateRange} {...props} />
        }
        dateFormat="MMM d, yyyy"
        title={title || ""}
        startDate={startDate || null}
        endDate={endDate || null}
        placeholderText="MM/DD/YYYY"
        {...props}
        // showYearDropdown
        // showMonthDropdown
      />
    </div>
  );
}

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    calendarClassName: {
      backgroundColor: `${theme.background.dark4} !important`,
      color: `${theme.background.contrastText} !important`,
      fontFamily: theme.fontFamily.robotoRegular,
      "& .react-datepicker__day": {
        color: theme.background.contrastText,
        "&:hover": {
          color: theme.background.dark1,
        },
      },
      "& .react-datepicker__day--today": {
        backgroundColor: `${theme.background.dark1} !important`,
        outline: `2px solid ${theme.colors.primary.main} !important`,
      },
    },
  };
});
