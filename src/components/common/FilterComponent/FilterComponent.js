import React from "react";
import { Grid } from "@material-ui/core";
import FilterDialog from "./components/FilterDialog";
import {
  // Container,
  ContainerItem,
  CustomMenuItem,
  CustomPopup,
  FilterExport,
} from "./Filter.styled";
import CustomDatePicker from "./components/CustomDatePicker";
import AppButton from "../AppButton/AppButton";
import { ArrowDownward } from "@material-ui/icons";
import Timezone from "./components/Timezone";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../../stores/actions/actionTypes";
import { useTheme } from "styled-components";
import { Content } from "../../../StyledComponents/StyledHeadings";

export default function FilterComponent(props) {
  const {
    filterComponent,
    openFilter = true,
    exportData,
    timezone = true,
  } = props;
  const monitor = useSelector((state) => state.monitor);
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    exportAnchorEl: null,
  });
  const openExport = Boolean(state.exportAnchorEl);
  const theme = useTheme();

  const handleExportData = (value) => {
    exportData(value);
    setState({ ...state, exportAnchorEl: null });
  };

  return (
    <>
      <Grid container>
        {/*  Date-pickers---------------------------------*/}
        <Grid item container alignItems="center" lg={6} md={12}>
          <CustomDatePicker
            selected={props?.startDate}
            onChange={props?.onChangeStartDate}
            calender={true}
            dateFormat="MMM d,yyyy"
            title="Start Date"
            startDate={props?.startDate}
            endDate={props?.endDate}
            dateRange={true}
          />

          <Content style={{ marginLeft: "10px", marginRight: "20px" }}>
            to
          </Content>

          <CustomDatePicker
            selected={props?.endDate}
            onChange={props?.onChangeEndDate}
            dateFormat="MMM d,yyyy"
            title="End Date"
            startDate={props?.startDate}
            endDate={props?.endDate}
            dateRange={true}
          />
        </Grid>
        {/*  Date-pickers---------------------------------*/}

        {/* TimeZone, filter and export ------------------------------ */}
        <Grid
          item
          container
          alignItems="center"
          justifyContent="flex-end"
          lg={6}
          md={12}
        >
          <Grid item>
            {timezone && (
              <Timezone
                id="timezone"
                labelText="Timezone"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: monitor?.filters?.timezone,
                  onChange: (e) =>
                    dispatch({
                      type: actionTypes.SET_MONITOR_FILTERS,
                      data: { ...monitor?.filters, timezone: e.target.value },
                    }),
                }}
              />
            )}
          </Grid>

          <Grid item>
            {filterComponent && openFilter ? (
              <FilterDialog>
                {({ close }) => {
                  var componentInsideDialogMoreProps = React.cloneElement(
                    filterComponent,
                    { closeDialog: close }
                  );
                  return <Grid>{componentInsideDialogMoreProps}</Grid>;
                }}
              </FilterDialog>
            ) : null}
          </Grid>

          <Grid item>
            {exportData ? (
              <FilterExport
                onClick={(e) =>
                  setState({ ...state, exportAnchorEl: e.currentTarget })
                }
              >
                <AppButton
                  variant="none"
                  fontSize={theme.fontSize.h4}
                  startIcon={<ArrowDownward />}
                >
                  Export
                </AppButton>
              </FilterExport>
            ) : null}
          </Grid>
        </Grid>
        {/* TimeZove filter and export ------------------------------ */}
      </Grid>

      <CustomPopup
        anchorEl={state.exportAnchorEl}
        open={openExport}
        onClose={() => setState({ ...state, exportAnchorEl: null })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <CustomMenuItem value="csv" onClick={() => handleExportData("csv")}>
          .csv file
        </CustomMenuItem>
        <CustomMenuItem value="xlsx" onClick={() => handleExportData("xlsx")}>
          .xlsx file
        </CustomMenuItem>
        {props.pdf && (
          <CustomMenuItem value="pdf" onClick={() => handleExportData("pdf")}>
            .pdf file
          </CustomMenuItem>
        )}
      </CustomPopup>
    </>
  );
}
