import { Grid } from "@material-ui/core";
import React from "react";
import { log } from "../../../utils/app.debug";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../../stores/actions/actionTypes"
import WelcomeBack from "./Components/WelcomeBack/WelcomeBack";
import Stats from "./Components/Stats/Stats";
import radio from "../../../assets/icons/icon-teal-radio.png"
import FilterComponent from "../../../components/common/FilterComponent/FilterComponent";
import { H3 } from "../../../StyledComponents/StyledHeadings";
import CommonDataLoadErrorSuccess from "../../../components/common/CommonDataLoadErrorSuccess/CommonDataLoadErrorSuccess";
import DashboardTable from "./Components/DashboardTable/DashboardTable";
import { CardContainer, TableContainer } from "./DashboardStyles";
import { getMonitorDashboardDataAction } from "../../../stores/actions/dashboardActions.js/dashboardActions";
import MonitorFilter from "../Components/MonitorFilter/MonitorFilter";
import { getMonitorExportAction } from "../../../stores/actions/monitorActions/monitorActions";

export function Dashboard() {
  const dispatch = useDispatch()

  const dashboard = useSelector(state => state.dashboard)
  const monitor = useSelector(state => state.monitor)
  const radioStation = useSelector(state => state.radioStations)

  React.useEffect(() => {
    dispatch(getMonitorDashboardDataAction(monitor?.dates?.startDate, monitor?.dates?.endDate))
  }, [monitor?.dates?.startDate, monitor?.dates?.endDate])

  const actions = {
    loading: actionTypes.SET_DASHBOARD_LOADING,
    success: actionTypes.SET_DASHBOARD_SUCCESS,
    error: actionTypes.SET_DASHBOARD_ERROR
  }

  const createStableTableData = () => {
    let stableTableData = dashboard?.data?.mostRecentPlays?.map((data) => {
      return {
        contentOwner: data?.sonicKey?.contentOwner,
        contentFileName: data?.sonicKey?.contentFileName,
        channel: data?.sonicKey?.channel,
        createdAt: data?.sonicKey?.createdAt,
        time: "33:44",
        contentDuration: data?.sonicKey?.contentDuration,
        country: data?.sonicKey?.country || "United Kingdom",
        sonicKey: data?.sonicKey?.sonicKey,
        isrcCode: data?.sonicKey?.isrcCode || "1234fghj",
        isrcCode: data?.sonicKey?.isrcCode || "1234fghj",
        isrcCode: data?.sonicKey?.isrcCode || "1234fghj"
      }
    })
    return stableTableData
  }

  const handleDashboardExport = (format) => {
    dispatch(getMonitorExportAction(monitor?.dates?.startDate, monitor?.dates?.endDate, format, 2000))
  }

  log("Dashboard", dashboard)
  log("Radios", radioStation)

  return (
    <Grid >

      <WelcomeBack
        error={radioStation?.error}
        loading={radioStation?.loading}
        totalRadioStations={radioStation?.data?.length}
      />

      <FilterComponent
        startDate={monitor?.dates?.startDate}
        onChangeStartDate={(date) => dispatch({ type: actionTypes.SET_MONITOR_DATES, data: { ...monitor.dates, startDate: date } })}
        endDate={monitor?.dates?.endDate}
        onChangeEndDate={(date) => dispatch({ type: actionTypes.SET_MONITOR_DATES, data: { ...monitor.dates, endDate: date } })}
        filterComponent={<MonitorFilter open={true} actions={actions} />}
        exportData={(value) => handleDashboardExport(value)}
      />

      <CardContainer >
        <Stats
          imgSrc={radio}
          title={"My Plays"}
          loading={dashboard?.loading}
          data={dashboard?.data?.myPlaysCount || "0"}
          error={dashboard?.error}
        />
        <Stats
          imgSrc={radio}
          title={"My Tracks"}
          ownerShipTitle="from"
          loading={dashboard?.loading}
          data={dashboard?.data?.myTracksCount || "0"}
          error={dashboard?.error}
        />
        <Stats
          imgSrc={radio}
          title={"Artists"}
          ownerShipTitle="by"
          loading={dashboard?.loading}
          data={dashboard?.data?.myArtistsCount || "0"}
          error={dashboard?.error}
        />
        <Stats
          imgSrc={radio}
          title={"Radio Stations"}
          ownerShipTitle="At"
          loading={dashboard?.loading}
          data={dashboard?.data?.myRadioStationCount || "0"}
          error={dashboard?.error}
        />
        <Stats
          imgSrc={radio}
          title={"Countries"}
          ownerShipTitle="In"
          loading={dashboard?.loading}
          data={dashboard?.data?.myCountriesCount || "0"}
          error={dashboard?.error}
        />
      </CardContainer>

      <TableContainer>
        <H3>10 Most Recent Plays</H3>
        <CommonDataLoadErrorSuccess
          error={dashboard?.error}
          loading={dashboard?.loading}
          onClickTryAgain={() => {
            dispatch(getMonitorDashboardDataAction(monitor?.dates?.startDate, monitor?.dates?.endDate))
          }}
        >
          <DashboardTable
            data={createStableTableData()}
          />
        </CommonDataLoadErrorSuccess>
      </TableContainer>

      {/* {values?.sonicKeyModal && (
        <MetaDataDialog
          sonicKey={values?.selectedSonicKey}
          open={true}
          setOpenTable={(flag) => setValues({ ...values, sonicKeyModal: flag })}
          updateMetaData={(key) => {
            dispatch({ type: actionTypes.UPDATE_EDITED_PLAYSLIST, data: key })
          }}
        />
      )} */}
    </Grid >
  );
}

