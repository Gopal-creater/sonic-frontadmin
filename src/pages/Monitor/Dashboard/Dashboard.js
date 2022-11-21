import { Grid } from "@material-ui/core";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../../stores/actions/actionTypes";
import WelcomeBack from "./Components/WelcomeBack/WelcomeBack";
import Stats from "./Components/Stats/Stats";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import PublicIcon from "@material-ui/icons/Public";
import RadioIcon from "@material-ui/icons/Radio";
import AlbumIcon from "@material-ui/icons/Album";
import PersonIcon from "@material-ui/icons/Person";
import BusinessIcon from "@material-ui/icons/Business";
import FilterComponent from "../../../components/common/FilterComponent/FilterComponent";
import CommonDataLoadErrorSuccess from "../../../components/common/CommonDataLoadErrorSuccess/CommonDataLoadErrorSuccess";
import { CardContainer, TableContainer } from "./DashboardStyles";
import {
  getMonitorDashboardDataAction,
  getMonitorDashboardExportAction,
} from "../../../stores/actions/dashboardActions.js/dashboardActions";
import MonitorFilter from "../Components/MonitorFilter/MonitorFilter";
import { useReactToPrint } from "react-to-print";
import { helpText } from "./Constants";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Dashboard.css";
import { tags, userRoles } from "../../../constants/constants";
import AppTable from "../../../components/common/AppTable";
import { getSKSIDFromDetectionOrigin } from "../../../utils/HelperMethods";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { useTheme } from "styled-components";
import PlaysMetaData from "../../../components/common/PlaysMetaData";
import Tooltip from "@material-ui/core/Tooltip";
import moment from "moment";

export function Dashboard() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const dashboard = useSelector((state) => state.dashboard);
  const monitor = useSelector((state) => state.monitor);
  const radioStation = useSelector((state) => state.radioStations);
  const users = useSelector((state) => state.user);
  const dashboardTableRef = useRef();

  const handlePrintToPdf = useReactToPrint({
    content: () => dashboardTableRef.current,
  });

  const [state, setState] = React.useState({
    sonicKeyModal: false,
    selectedSonicKey: {},
  });

  React.useEffect(() => {
    dispatch(
      getMonitorDashboardDataAction(
        monitor?.dates?.startDate,
        monitor?.dates?.endDate
      )
    );
  }, [monitor?.dates?.startDate, monitor?.dates?.endDate]); // eslint-disable-line react-hooks/exhaustive-deps

  const actions = {
    loading: actionTypes.SET_DASHBOARD_LOADING,
    success: actionTypes.SET_DASHBOARD_SUCCESS,
    error: actionTypes.SET_DASHBOARD_ERROR,
  };

  const createStableTableData = () => {
    let stableTableData = dashboard?.data?.mostRecentPlays?.map((data) => {
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

  const handleDashboardExport = (format) => {
    if (format === "pdf") {
      handlePrintToPdf();
    } else {
      dispatch(
        getMonitorDashboardExportAction(
          format,
          monitor?.dates?.startDate,
          monitor?.dates?.endDate,
          2000
        )
      );
    }
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
          return moment(value).utc().format("DD/MM/YYYY") || "--";
        },
      },
    },
    {
      name: "time",
      label: "TIME",
      options: {
        customBodyRender: (value) => {
          return monitor?.filters?.timezone === "GMT"
            ? moment(value).utc().format("HH:mm:ss")
            : moment(value).format("HH:mm:ss") || "---";
        },
      },
    },
    {
      name: "duration",
      label: "DURATION",
      options: {
        customBodyRender: (value) => {
          return moment.utc(value * 1000).format("mm:ss") || "--";
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
    if (users?.userProfile?.data?.userRole !== userRoles.PARTNER_ADMIN) {
      return columns.filter(
        (itm) => itm?.label !== "COMPANY" && itm?.label !== "COMPANY TYPE"
      );
    }
    return columns;
  };

  return (
    <Grid ref={dashboardTableRef}>
      <WelcomeBack
        error={radioStation?.error}
        loading={radioStation?.loading}
        totalRadioStations={radioStation?.data?.length}
      />

      {/* Filter--------------------------------------------------------- */}
      <Grid>
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
          filterComponent={
            <MonitorFilter open={true} actions={actions} dashboard={true} />
          }
          exportData={(value) => handleDashboardExport(value)}
          pdf={false}
        />
      </Grid>
      {/* Filter--------------------------------------------------------- */}

      {/* Cards-------------------------------------------------------------------- */}
      <CardContainer>
        {users?.userProfile?.data?.userRole === userRoles.PARTNER_ADMIN && (
          <Stats
            imgSrc={
              <BusinessIcon
                style={{ fontSize: 30, color: theme.colors.primary.main }}
              />
            }
            title={"Companies"}
            loading={dashboard?.loading}
            data={dashboard?.data?.myCompaniesCount || "0"}
            error={dashboard?.error}
            pageLink="/monitor/companies"
            helpText={helpText.companies}
          />
        )}

        <Stats
          imgSrc={
            <MusicNoteIcon
              style={{ fontSize: 30, color: theme.colors.primary.main }}
            />
          }
          title={"My Plays"}
          loading={dashboard?.loading}
          data={dashboard?.data?.myPlaysCount || "0"}
          error={dashboard?.error}
          pageLink="/monitor/plays"
          helpText={helpText.plays}
        />

        <Stats
          imgSrc={
            <AlbumIcon
              style={{ fontSize: 30, color: theme.colors.primary.main }}
            />
          }
          title={"My Tracks"}
          ownerShipTitle="from"
          loading={dashboard?.loading}
          data={dashboard?.data?.myTracksCount || "0"}
          error={dashboard?.error}
          pageLink="/monitor/tracks"
          helpText={helpText.tracks}
        />

        <Stats
          imgSrc={
            <PersonIcon
              style={{ fontSize: 30, color: theme.colors.primary.main }}
            />
          }
          title={"Artists"}
          ownerShipTitle="by"
          loading={dashboard?.loading}
          data={dashboard?.data?.myArtistsCount || "0"}
          error={dashboard?.error}
          pageLink="/monitor/artists"
          helpText={helpText.artists}
        />

        <Stats
          imgSrc={
            <RadioIcon
              style={{ fontSize: 30, color: theme.colors.primary.main }}
            />
          }
          title={"Radio Stations"}
          ownerShipTitle="At"
          loading={dashboard?.loading}
          data={dashboard?.data?.myRadioStationCount || "0"}
          error={dashboard?.error}
          pageLink="/monitor/companies"
          helpText={helpText.companies}
        />

        <Stats
          imgSrc={
            <PublicIcon
              style={{ fontSize: 30, color: theme.colors.primary.main }}
            />
          }
          title={"Countries"}
          ownerShipTitle="In"
          loading={dashboard?.loading}
          data={dashboard?.data?.myCountriesCount || "0"}
          error={dashboard?.error}
          pageLink="/monitor/countries"
          helpText={helpText.countries}
        />
      </CardContainer>
      {/* Cards-------------------------------------------------------------------- */}

      {/* Table------------------------------------------------------- */}
      <TableContainer>
        <CommonDataLoadErrorSuccess
          error={dashboard?.error}
          loading={dashboard?.loading}
          onClickTryAgain={() => {
            dispatch(
              getMonitorDashboardDataAction(
                monitor?.dates?.startDate,
                monitor?.dates?.endDate
              )
            );
          }}
        >
          <AppTable
            title={"10 Most Recent Plays"}
            columns={getStableTableColumnHead()}
            data={createStableTableData()}
            options={{
              count: dashboard?.data?.mostRecentPlays?.length || 0,
              customFooter: () => {
                return null;
              },
            }}
          />
        </CommonDataLoadErrorSuccess>
      </TableContainer>
      {/* Table--------------------------------------------------------- */}

      {/* MetaData popup ------------------------------------------------------*/}
      {state?.sonicKeyModal && (
        <PlaysMetaData
          playsData={state?.selectedSonicKey}
          open={true}
          setOpenTable={(flag) => setState({ ...state, sonicKeyModal: flag })}
        />
      )}
      {/* MetaData popup ------------------------------------------------------*/}
    </Grid>
  );
}
