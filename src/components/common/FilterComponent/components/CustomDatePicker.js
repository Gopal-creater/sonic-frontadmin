import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Grid } from "@material-ui/core";
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
  return (
    <div>
      <DatePicker
        wrapperClassName="date-picker"
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
