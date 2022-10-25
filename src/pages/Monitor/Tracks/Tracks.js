import { Grid } from "@material-ui/core";
import React from "react";
import { useTheme } from "styled-components";
import CommonDataLoadErrorSuccess from "../../../components/common/CommonDataLoadErrorSuccess/CommonDataLoadErrorSuccess";
import FilterComponent from "../../../components/common/FilterComponent/FilterComponent";
import {  Heading, SubHeading } from "../../../StyledComponents/StyledHeadings";
import PaginationCount from "../../../components/common/Pagination/PaginationCount";
import CustomPagination from "../../../components/common/Pagination/CustomPagination";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../../stores/actions/actionTypes";
import {
  getMonitorExportAction,
  getMonitorListAction,
} from "../../../stores/actions/monitorActions/monitorActions";
import MonitorFilter from "../Components/MonitorFilter/MonitorFilter";
import { trackTableHeads } from "../../../constants/constants";
import { MainContainer } from "../../../StyledComponents/StyledPageContainer";
import AppTable from "../../../components/common/AppTable";

export default function Tracks() {
  const theme = useTheme();
  const monitor = useSelector((state) => state.monitor);
  const dispatch = useDispatch();

  const [state, setState] = React.useState({
    trackTableHeads: trackTableHeads,
    currentSortBy: "",
    currentIsAscending: "",
  });

  React.useEffect(() => {
    dispatch(
      getMonitorListAction(
        actions,
        monitor?.dates?.startDate,
        monitor?.dates?.endDate,
        monitor?.track?.data?.page,
        "10",
        "TRACKS"
      )
    );
  }, [monitor?.dates?.startDate, monitor?.dates?.endDate]);

  const actions = {
    loading: actionTypes.SET_TRACK_LOADING,
    success: actionTypes.SET_TRACK_SUCCESS,
    error: actionTypes.SET_TRACK_ERROR,
  };

  const handleExport = (format) => {
    dispatch(
      getMonitorExportAction(
        monitor?.dates?.startDate,
        monitor?.dates?.endDate,
        format,
        2000,
        "TRACKS",
        state?.currentSortBy,
        state?.currentIsAscending
      )
    );
  };

  const createStableTrackData = () => {
    const trackData = monitor?.track?.data?.docs?.map((data) => {
      return {
        title: data?.trackName,
        plays: data?.playsCount,
        radioStation: data?.radioStationCount,
        country: data?.countriesCount,
      };
    });
    return trackData;
  };

  const handleTrackPageChange = (event, value) => {
    dispatch(
      getMonitorListAction(
        actions,
        monitor?.dates?.startDate,
        monitor?.dates?.endDate,
        value,
        "10",
        "TRACKS",
        state?.currentSortBy,
        state.currentIsAscending
      )
    );
  };

  let columns = [
    {
      name: "title",
      label: "TITLE",
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
      name: "radioStation",
      label: "RADIO STATION",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "country",
      label: "COUNTRY",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
  ];

  return (
    <MainContainer>
      {/* Header----------------------------------------------------------- */}
      <Grid container justifyContent="space-between" alignItems="center">
        <SubHeading >My Tracks</SubHeading>
        
      </Grid>
      {/* Header----------------------------------------------------------- */}

      {/* Filter---------------------------------------------------------------- */}
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
            <MonitorFilter open={true} playsBy="TRACKS" actions={actions} />
          }
          exportData={(value) => handleExport(value)}
        />
      </Grid>
      {/* Filter---------------------------------------------------------------- */}

      <CommonDataLoadErrorSuccess
        error={monitor?.track?.error}
        loading={monitor?.track?.loading}
        onClickTryAgain={() => {
          dispatch(
            getMonitorListAction(
              actions,
              monitor?.dates?.startDate,
              monitor?.dates?.endDate,
              monitor?.track?.data?.page,
              "10",
              "TRACKS"
            )
          );
        }}
      >
        <>
          {/* Table------------------------------------------------------ */}
          <AppTable
            title={
              <PaginationCount
                name="Tracks"
                total={monitor?.track?.data?.totalDocs}
                start={monitor?.track?.data?.offset}
                end={monitor?.track?.data?.docs?.length}
              />
            }
            columns={columns}
            data={createStableTrackData()}
            options={{
              count: monitor?.track?.data?.docs?.length || 0,
              customFooter: () => {
                return null;
              },
            }}
          />
          {/* Table------------------------------------------------------ */}

          {/* Pagination------------------------------------------------------ */}
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            style={{ marginTop: "30px" }}
          >
            <Grid item xs={12} sm={6} md={6}>
              <PaginationCount
                name="Tracks"
                total={monitor?.track?.data?.totalDocs}
                start={monitor?.track?.data?.offset}
                end={monitor?.track?.data?.docs?.length}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <CustomPagination
                count={monitor?.track?.data?.totalPages}
                page={monitor?.track?.data?.page}
                onChange={handleTrackPageChange}
              />
            </Grid>
          </Grid>
          {/* Pagination------------------------------------------------------ */}
        </>
      </CommonDataLoadErrorSuccess>
    </MainContainer>
  );
}
