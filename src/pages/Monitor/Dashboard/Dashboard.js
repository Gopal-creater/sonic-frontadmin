import { Grid } from "@material-ui/core";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../../stores/actions/actionTypes";
import WelcomeBack from "./Components/WelcomeBack/WelcomeBack";
import Stats from "./Components/Stats/Stats";
// import radio from "../../../assets/icons/icon-teal-radio.png";
import music from "../../../assets/icons/icon-black-music.png"
import note from "../../../assets/icons/icon-black-musicnote.png"
import artist from "../../../assets/icons/icon-black-artist.png"
import radio from "../../../assets/icons/icon-black-radio.png"
import country from "../../../assets/icons/icon-black-globe.png"
import FilterComponent from "../../../components/common/FilterComponent/FilterComponent";
import { H3 } from "../../../StyledComponents/StyledHeadings";
import CommonDataLoadErrorSuccess from "../../../components/common/CommonDataLoadErrorSuccess/CommonDataLoadErrorSuccess";
import DashboardTable from "./Components/DashboardTable/DashboardTable";
import {

  CardContainer,

  TableContainer,
} from "./DashboardStyles";
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
import { playsTableHeads, userRoles } from "../../../constants/constants";
import Columns from "../../../components/common/Columns/Columns";

export function Dashboard() {
  const dispatch = useDispatch();

  const dashboard = useSelector((state) => state.dashboard);
  const monitor = useSelector((state) => state.monitor);
  const radioStation = useSelector((state) => state.radioStations);
  const users = useSelector((state) => state.user);
  const dashboardTableRef = useRef();
  const carousel = useRef(null);

  const handlePrintToPdf = useReactToPrint({
    content: () => dashboardTableRef.current,
  });

  React.useEffect(() => {
    dispatch(
      getMonitorDashboardDataAction(
        monitor?.dates?.startDate,
        monitor?.dates?.endDate
      )
    );
  }, [monitor?.dates?.startDate, monitor?.dates?.endDate]);

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
        iswc: data?.sonicKey?.iswcCode,
        tuneCode: data?.sonicKey?.tuneCode,
        modal: data,
        trackId: data?.sonicKey?.track,
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


  const getStableTableColumnHead = () => {
    let tableHead = playsTableHeads;
    if (users?.userProfile?.data?.userRole !== userRoles.PARTNER_ADMIN) {
      return tableHead.filter(
        (itm) => itm?.title !== "COMPANY" && itm?.title !== "COMPANY TYPE"
      );
    }
    return tableHead;
  };

  return (
    <Grid ref={dashboardTableRef}>
      <WelcomeBack
        error={radioStation?.error}
        loading={radioStation?.loading}
        totalRadioStations={radioStation?.data?.length}
      />

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

      <CardContainer>
        <Grid container spacing={4}>
          {users?.userProfile?.data?.userRole === userRoles.PARTNER_ADMIN && (
            <Grid item xs={12} sm={6} md={4}style>
              <Stats
                imgSrc={radio}
                title={"Companies"}
                loading={dashboard?.loading}
                data={dashboard?.data?.myCompaniesCount || "0"}
                error={dashboard?.error}
                pageLink="/monitor/companies"
                helpText={helpText.companies}
              />
            </Grid>
          )}

          <Grid item xs={12} sm={6} md={4}>
            <Stats
              imgSrc={music}
              title={"My Plays"}
              loading={dashboard?.loading}
              data={dashboard?.data?.myPlaysCount || "0"}
              error={dashboard?.error}
              pageLink="/monitor/plays"
              helpText={helpText.plays}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Stats
              imgSrc={note}
              title={"My Tracks"}
              ownerShipTitle="from"
              loading={dashboard?.loading}
              data={dashboard?.data?.myTracksCount || "0"}
              error={dashboard?.error}
              pageLink="/monitor/tracks"
              helpText={helpText.tracks}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Stats
              imgSrc={artist}
              title={"Artists"}
              ownerShipTitle="by"
              loading={dashboard?.loading}
              data={dashboard?.data?.myArtistsCount || "0"}
              error={dashboard?.error}
              pageLink="/monitor/artists"
              helpText={helpText.artists}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Stats
              imgSrc={radio}
              title={"Radio Stations"}
              ownerShipTitle="At"
              loading={dashboard?.loading}
              data={dashboard?.data?.myRadioStationCount || "0"}
              error={dashboard?.error}
              pageLink="/monitor/radio-stations"
              helpText={helpText.radioStation}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Stats
              imgSrc={country}
              title={"Countries"}
              ownerShipTitle="In"
              loading={dashboard?.loading}
              data={dashboard?.data?.myCountriesCount || "0"}
              error={dashboard?.error}
              pageLink="/monitor/countries"
              helpText={helpText.countries}
            />
          </Grid>

          <div style={{ width: "10px !important" }}></div>
        </Grid>

      </CardContainer>

      <TableContainer>
        <Grid container justifyContent="space-between">
          <Grid item>
            <H3>10 Most Recent Plays</H3>
          </Grid>
          <Grid item>
            <Columns columns={getStableTableColumnHead()} />
          </Grid>
        </Grid>

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
          <DashboardTable
            data={createStableTableData()}
            stableTableHead={getStableTableColumnHead()}
          />
        </CommonDataLoadErrorSuccess>
      </TableContainer>
    </Grid>
  );
}
