import React from "react";
import "./Plays.scss";
import { Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../../stores/actions/actionTypes";
import { SubHeading } from "../../../StyledComponents/StyledHeadings";
import FilterComponent from "../../../components/common/FilterComponent/FilterComponent";
import PaginationCount from "../../../components/common/Pagination/PaginationCount";
import CommonDataLoadErrorSuccess from "../../../components/common/CommonDataLoadErrorSuccess/CommonDataLoadErrorSuccess";
import CustomPagination from "../../../components/common/Pagination/CustomPagination";
import {
  getMonitorExportAction,
  getMonitorListAction,
} from "../../../stores/actions/monitorActions/monitorActions";
import MonitorFilter from "../Components/MonitorFilter/MonitorFilter";
import { tags, userRoles } from "../../../constants/constants";
import { MainContainer } from "../../../StyledComponents/StyledPageContainer";
import AppTable from "../../../components/common/AppTable";
import { getSKSIDFromDetectionOrigin } from "../../../utils/HelperMethods";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { useTheme } from "styled-components";
import PlaysMetaData from "../../../components/common/PlaysMetaData";
import Tooltip from "@material-ui/core/Tooltip";

export default function Plays() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const monitor = useSelector((state) => state.monitor);
  const user = useSelector((state) => state.user);
  const [state, setState] = React.useState({
    sonicKeyModal: false,
    selectedSonicKey: {},
  });

  React.useEffect(() => {
    dispatch(
      getMonitorListAction(
        actions,
        monitor?.dates?.startDate,
        monitor?.dates?.endDate,
        monitor?.plays?.data?.page,
        10
      )
    );
  }, [monitor?.dates?.startDate, monitor?.dates?.endDate]);

  const actions = {
    loading: actionTypes.SET_PLAYS_LOADING,
    success: actionTypes.SET_PLAYS_SUCCESS,
    error: actionTypes.SET_PLAYS_ERROR,
  };

  const createStableTableData = () => {
    let stableTableData = monitor?.plays?.data?.docs?.map((data) => {
      return {
        company: data?.sonicKey?.company?.name,
        companyType: data?.sonicKey?.company?.companyType,
        artist: data?.sonicKey?.contentOwner,
        title: data?.sonicKey?.contentName,
        version: data?.sonicKey?.version,
        radioStation: data?.radioStation?.name,
        date: data?.detectedAt,
        time: data?.detectedAt,
        duration: data?.sonicKey?.contentDuration,
        country: data?.radioStation?.country,
        sonicKey: data?.sonicKey?.sonicKey,
        isrcCode: data?.sonicKey?.isrcCode,
        distributor: data?.sonicKey?.distributor,
        label: data?.sonicKey?.label,
        iswcCode: data?.sonicKey?.iswcCode,
        tuneCode: data?.sonicKey?.tuneCode,
        modal: data,
        trackId: data?.sonicKey?.track?._id,
        fileType: data?.sonicKey?.contentFileType,
        description: data?.sonicKey?.contentDescription,
        detectionOrigins: data?.detectionOrigins,
      };
    });
    return stableTableData;
  };

  const handleExport = (format) => {
    dispatch(
      getMonitorExportAction(
        monitor?.dates?.startDate,
        monitor?.dates?.endDate,
        format,
        2000,
        "",
        state?.currentSortBy,
        state?.currentIsAscending
      )
    );
  };

  const handlePlaysPageChange = (event, value) => {
    dispatch(
      getMonitorListAction(
        actions,
        monitor?.dates?.startDate,
        monitor?.dates?.endDate,
        value,
        "10",
        "",
        state?.currentSortBy,
        state.currentIsAscending
      )
    );
  };

  let columns = [
    {
      name: "company",
      label: "COMPANY",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "companyType",
      label: "COMPANY TYPE",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "artist",
      label: "ARTIST",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
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
      name: "radioStation",
      label: "RADIO STATION",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "date",
      label: "DATE",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "time",
      label: "TIME",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "duration",
      label: "DURATION",
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
    {
      name: "trackId",
      label: "TRACK ID",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "sonicKey",
      label: `${tags.companyTag}`,
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "detectionOrigins",
      label: "SK/SID",
      options: {
        filter: false,
        customBodyRender: (value) => {
          return getSKSIDFromDetectionOrigin(value);
        },
      },
    },
    {
      name: "version",
      label: "VERSION",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "distributor",
      label: "DISTRIBUTOR",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "label",
      label: "LABEL",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "isrcCode",
      label: "ISRC",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "iswcCode",
      label: "ISWC",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "tuneCode",
      label: "TUNE CODE",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "description",
      label: "DESCRIPTION",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "fileType",
      label: "FILE TYPE",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "modal",
      label: "ACTION",
      options: {
        customBodyRender: (value) => {
          return (
            <Tooltip title="View">
              <VisibilityIcon
                fontSize={"small"}
                style={{
                  color: theme.colors.secondary.main,
                  cursor: "pointer",
                }}
                onClick={() =>
                  setState({
                    ...state,
                    sonicKeyModal: true,
                    selectedSonicKey: value,
                  })
                }
              />
            </Tooltip>
          );
        },
      },
    },
  ];

  const getStableTableColumnHead = () => {
    if (user?.userProfile?.data?.userRole !== userRoles.PARTNER_ADMIN) {
      return columns.filter(
        (itm) => itm?.label !== "COMPANY" && itm?.label !== "COMPANY TYPE"
      );
    }
    return columns;
  };

  return (
    <MainContainer>
      {/* Header------------------------------------------ */}
      <Grid
        container
        justifyContent="space-between"
        className="plays-title-container"
      >
        <SubHeading>My Plays</SubHeading>
      </Grid>
      {/* Header------------------------------------------ */}

      {/* Filter-------------------------------------------------------------------------- */}

      <FilterComponent
        startDate={monitor?.dates?.startDate}
        onChangeStartDate={(date) =>
          dispatch({
            type: actionTypes.SET_MONITOR_DATES,
            data: { ...monitor.dates, startDate: date },
          })
        }
        endDate={monitor?.dates?.endDate}
        onChangeEndDate={(date) =>
          dispatch({
            type: actionTypes.SET_MONITOR_DATES,
            data: { ...monitor.dates, endDate: date },
          })
        }
        filterComponent={<MonitorFilter open={true} actions={actions} />}
        exportData={(value) => handleExport(value)}
      />
      {/* Filter-------------------------------------------------------------------------- */}

      <CommonDataLoadErrorSuccess
        error={monitor?.plays?.error}
        loading={monitor?.plays?.loading}
        onClickTryAgain={() =>
          dispatch(
            getMonitorListAction(
              actions,
              monitor?.dates?.startDate,
              monitor?.dates?.endDate,
              monitor?.plays?.data?.page,
              10
            )
          )
        }
      >
        {/* Table------------------------------------------------ */}
        <AppTable
          title={
            <PaginationCount
              name="plays"
              start={monitor?.plays?.data?.offset}
              end={monitor?.plays?.data?.docs?.length}
              total={monitor?.plays?.data?.totalDocs}
            />
          }
          columns={getStableTableColumnHead()}
          data={createStableTableData()}
          options={{
            count: monitor?.plays?.data?.docs?.length || 0,
            customFooter: () => {
              return null;
            },
          }}
        />
        {/* Table------------------------------------------------ */}

        {/* Pagination---------------------------------------------------- */}
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          style={{ marginTop: "30px" }}
        >
          <Grid item xs={12} sm={4} md={6}>
            <PaginationCount
              name="plays"
              start={monitor?.plays?.data?.offset}
              end={monitor?.plays?.data?.docs?.length}
              total={monitor?.plays?.data?.totalDocs}
            />
          </Grid>
          <Grid item xs={12} sm={8} md={6}>
            <CustomPagination
              count={monitor?.plays?.data?.totalPages}
              page={monitor?.plays?.data?.page}
              onChange={handlePlaysPageChange}
            />
          </Grid>
        </Grid>
        {/* Pagination---------------------------------------------------- */}
      </CommonDataLoadErrorSuccess>

      {/* MetaData popup ------------------------------------------------------*/}
      {state?.sonicKeyModal && (
        <PlaysMetaData
          playsData={state?.selectedSonicKey}
          open={true}
          setOpenTable={(flag) => setState({ ...state, sonicKeyModal: flag })}
        />
      )}
      {/* MetaData popup ------------------------------------------------------*/}
    </MainContainer>
  );
}
