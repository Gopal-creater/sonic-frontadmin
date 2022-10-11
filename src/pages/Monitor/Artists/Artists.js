import { Grid } from "@material-ui/core";
import React from "react";
import { useTheme } from "styled-components";
import PaginationCount from "../../../components/common/Pagination/PaginationCount";
import { H1 } from "../../../StyledComponents/StyledHeadings";
import FilterComponent from "../../../components/common/FilterComponent/FilterComponent";
import CustomPagination from "../../../components/common/Pagination/CustomPagination";
import CommonDataLoadErrorSuccess from "../../../components/common/CommonDataLoadErrorSuccess/CommonDataLoadErrorSuccess";
import ArtistTable from "./components/ArtistTable";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../../stores/actions/actionTypes";
import { log } from "../../../utils/app.debug";
import {
  getMonitorExportAction,
  getMonitorListAction,
} from "../../../stores/actions/monitorActions/monitorActions";
import MonitorFilter from "../Components/MonitorFilter/MonitorFilter";
import { artistTableHeads } from "../../../constants/constants";
import { MainContainer } from "../../../StyledComponents/StyledPageContainer";
import AppTable from "../../../components/common/AppTable";

export default function Artists() {
  const theme = useTheme();
  const monitor = useSelector((state) => state.monitor);
  const dispatch = useDispatch();

  const [state, setState] = React.useState({
    artistTableHeads: artistTableHeads,
    currentSortBy: "",
    currentIsAscending: "",
  });

  React.useEffect(() => {
    dispatch(
      getMonitorListAction(
        actions,
        monitor?.dates?.startDate,
        monitor?.dates?.endDate,
        monitor?.artist?.data?.page,
        "10",
        "ARTISTS"
      )
    );
  }, [monitor?.dates?.startDate, monitor?.dates?.endDate]);

  const actions = {
    loading: actionTypes.SET_ARTIST_LOADING,
    success: actionTypes.SET_ARTIST_SUCCESS,
    error: actionTypes.SET_ARTIST_ERROR,
  };

  const createStableArtistData = () => {
    const artistData = monitor?.artist?.data?.docs?.map((data) => {
      return {
        artistName: data?.artist,
        plays: data?.playsCount,
        uniquePlaysCount: data?.uniquePlaysCount,
        radioStation: data?.radioStationCount,
        country: data?.countriesCount,
      };
    });
    return artistData;
  };

  const handleExport = (format) => {
    dispatch(
      getMonitorExportAction(
        monitor?.dates?.startDate,
        monitor?.dates?.endDate,
        format,
        2000,
        "ARTISTS",
        state?.currentSortBy,
        state?.currentIsAscending
      )
    );
  };

  const handleArtistPageChange = (event, value) => {
    dispatch(
      getMonitorListAction(
        actions,
        monitor?.dates?.startDate,
        monitor?.dates?.endDate,
        value,
        "10",
        "ARTISTS",
        state?.currentSortBy,
        state?.currentIsAscending
      )
    );
  };

  let columns = [
    {
      name: "artistName",
      label: "ARTIST NAME",
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
      name: "uniquePlaysCount",
      label: "TRACKS",
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
      label: "COUNTRIES",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
  ];

  return (
    <MainContainer>
      <H1 fontFamily={theme.fontFamily.nunitoSansBold}>My Artist</H1>

      {/* Filter-------------------------------------------------------- */}
      <Grid style={{ marginTop: "40px" }}>
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
            <MonitorFilter open={true} playsBy="ARTISTS" actions={actions} />
          }
          exportData={(value) => handleExport(value)}
        />
      </Grid>
      {/* Filter-------------------------------------------------------- */}

      <CommonDataLoadErrorSuccess
        error={monitor?.artist?.error}
        loading={monitor?.artist?.loading}
        onClickTryAgain={() =>
          dispatch(
            getMonitorListAction(
              actions,
              monitor?.dates?.startDate,
              monitor?.dates?.endDate,
              monitor?.artist?.data?.page,
              "10",
              "ARTISTS"
            )
          )
        }
      >
        {/* Table------------------------------------------------------ */}
        <AppTable
          title={
            <PaginationCount
              name="artists"
              total={monitor?.artist?.data?.totalDocs}
              start={monitor?.artist?.data?.offset}
              end={monitor?.artist?.data?.docs?.length}
            />
          }
          columns={columns}
          data={createStableArtistData()}
          options={{
            count: monitor?.track?.data?.docs?.length || 0,
            customFooter: () => {
              return null;
            },
          }}
        />
        {/* Table------------------------------------------------------ */}

        {/* Pagination-------------------------------------------- */}
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          style={{ marginTop: "30px" }}
        >
          <Grid item xs={12} sm={4} md={6}>
            <PaginationCount
              name="artists"
              total={monitor?.artist?.data?.totalDocs}
              start={monitor?.artist?.data?.offset}
              end={monitor?.artist?.data?.docs?.length}
            />
          </Grid>
          <Grid item xs={12} sm={8} md={6}>
            <CustomPagination
              count={monitor?.artist?.data?.totalPages}
              page={monitor?.artist?.data?.page}
              onChange={handleArtistPageChange}
            />
          </Grid>
        </Grid>
        {/* Pagination-------------------------------------------- */}
      </CommonDataLoadErrorSuccess>
    </MainContainer>
  );
}
