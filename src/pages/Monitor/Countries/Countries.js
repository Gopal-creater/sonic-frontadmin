import { Grid } from "@material-ui/core";
import React, { useEffect, useRef } from "react";
import { Heading, SubHeading } from "../../../StyledComponents/StyledHeadings";
import { useTheme } from "styled-components";
import FilterComponent from "../../../components/common/FilterComponent/FilterComponent";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../../stores/actions/actionTypes";
import PaginationCount from "../../../components/common/Pagination/PaginationCount";
import { log } from "../../../utils/app.debug";
import CommonDataLoadErrorSuccess from "../../../components/common/CommonDataLoadErrorSuccess/CommonDataLoadErrorSuccess";
import CustomPagination from "../../../components/common/Pagination/CustomPagination";
import {
  getMonitorExportAction,
  getMonitorListAction,
} from "../../../stores/actions/monitorActions/monitorActions";
import MonitorFilter from "../Components/MonitorFilter/MonitorFilter";
import { useReactToPrint } from "react-to-print";
import { countryTableHeads } from "../../../constants/constants";
import { MainContainer } from "../../../StyledComponents/StyledPageContainer";
import AppTable from "../../../components/common/AppTable";

export default function Countries() {
  const theme = useTheme();

  const dispatch = useDispatch();
  const monitor = useSelector((state) => state.monitor);

  const [state, setState] = React.useState({
    countriesTableHeads: countryTableHeads,
    currentSortBy: "",
    currentIsAscending: "",
  });

  const countriesTableRef = useRef();
  const handlePrintToPdf = useReactToPrint({
    content: () => countriesTableRef.current,
  });

  const actions = {
    loading: actionTypes.SET_COUNTRIES_LOADING,
    success: actionTypes.SET_COUNTRIES_SUCCESS,
    error: actionTypes.SET_COUNTRIES_ERROR,
  };

  useEffect(() => {
    dispatch(
      getMonitorListAction(
        actions,
        monitor?.dates?.startDate,
        monitor?.dates?.endDate,
        monitor?.track?.data?.page,
        "10",
        "COUNTRIES"
      )
    );
  }, [monitor?.dates?.startDate, monitor?.dates?.endDate]);

  const handleExport = (format) => {
    if (format === "pdf") {
      handlePrintToPdf();
    } else {
      dispatch(
        getMonitorExportAction(
          monitor?.dates?.startDate,
          monitor?.dates?.endDate,
          format,
          2000,
          "COUNTRIES",
          state?.currentSortBy,
          state?.currentIsAscending
        )
      );
    }
  };

  const handleCountriesPageChange = (event, value) => {
    dispatch(
      getMonitorListAction(
        actions,
        monitor?.dates?.startDate,
        monitor?.dates?.endDate,
        value,
        "10",
        "COUNTRIES",
        state?.currentSortBy,
        state?.currentIsAscending
      )
    );
  };

  const createStableCountryData = () => {
    const trackData = monitor?.country?.data?.docs?.map((data) => {
      return {
        country: data?.country,
        plays: data?.playsCount,
        tracks: data?.uniquePlaysCount,
        artists: data?.artistsCount,
        radioStations: data?.radioStationCount,
      };
    });
    return trackData;
  };

  let columns = [
    {
      name: "country",
      label: "COUNTRY",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "plays",
      label: "PLAYS",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "tracks",
      label: "TRACKS",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "artists",
      label: "ARTISTS",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "radioStations",
      label: "RADIO STATIONS",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
  ];

  return (
    <MainContainer ref={countriesTableRef}>
      <Grid container justifyContent="space-between">
        <SubHeading>Countries</SubHeading>
      </Grid>

      {/* Filter------------------------------------------------------- */}
      <Grid>
        <FilterComponent
          startDate={monitor?.dates?.startDate}
          onChangeStartDate={(date) =>
            dispatch({
              type: actionTypes.SET_MONITOR_DATES,
              data: { ...monitor?.dates, startDate: date },
            })
          }
          endDate={monitor?.dates?.endDate}
          onChangeEndDate={(date) =>
            dispatch({
              type: actionTypes.SET_MONITOR_DATES,
              data: { ...monitor?.dates, endDate: date },
            })
          }
          filterComponent={
            <MonitorFilter open={true} playsBy="COUNTRIES" actions={actions} />
          }
          exportData={(value) => handleExport(value)}
          // pdf={true}
        />
      </Grid>
      {/* Filter------------------------------------------------------- */}

      <CommonDataLoadErrorSuccess
        error={monitor?.country?.error}
        loading={monitor?.country?.loading}
        onClickTryAgain={() => {
          dispatch(
            getMonitorListAction(
              actions,
              monitor?.dates?.startDate,
              monitor?.dates?.endDate,
              monitor?.track?.data?.page,
              "10",
              "COUNTRIES"
            )
          );
        }}
      >
        <>
          {/* Table------------------------------------------------ */}
          <AppTable
            title={
              <PaginationCount
                name="COUNTRIES"
                total={monitor?.country?.data?.totalDocs}
                start={monitor?.country?.data?.offset}
                end={monitor?.country?.data?.docs?.length}
              />
            }
            columns={columns}
            data={createStableCountryData()}
            options={{
              count: monitor?.plays?.data?.docs?.length || 0,
              customFooter: () => {
                return null;
              },
            }}
          />
          {/* Table------------------------------------------------ */}

          {/* Pagination-------------------------------------------- */}
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            style={{ marginTop: "30px" }}
          >
            <Grid item xs={12} sm={6} md={6}>
              <PaginationCount
                name="COUNTRIES"
                total={monitor?.country?.data?.totalDocs}
                start={monitor?.country?.data?.offset}
                end={monitor?.country?.data?.docs?.length}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <CustomPagination
                count={monitor?.country?.data?.totalPages}
                page={monitor?.country?.data?.page}
                onChange={handleCountriesPageChange}
              />
            </Grid>
          </Grid>
          {/* Pagination-------------------------------------------- */}
        </>
      </CommonDataLoadErrorSuccess>
    </MainContainer>
  );
}
