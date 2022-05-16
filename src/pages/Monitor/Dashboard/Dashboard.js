import { Grid } from "@material-ui/core";
import React, { useRef } from "react";
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
import { useReactToPrint } from 'react-to-print';
import { helpText } from "./Constants";
// import AppCheckBox from "../../../components/common/AppCheckBox";
// import { CustomRadioButton } from "../../../components/common/AppRadioButton/AppRadioButton";
// import AppAutoComplete from "../../../components/common/AutoComplete/AppAutoComplete";
// import { getTrackTitleAction } from "../../../stores/actions/picker/titlePicker.action";
// import AppToggleSwitch from "../../../components/common/AppToggleSwitch/AppToggleSwitch";

export function Dashboard() {
  const dispatch = useDispatch()
  // const picker = useSelector(state => state.picker);

  const dashboard = useSelector(state => state.dashboard)
  const monitor = useSelector(state => state.monitor)
  const radioStation = useSelector(state => state.radioStations)
  const dashboardTableRef = useRef();

  const handlePrintToPdf = useReactToPrint({
    content: () => dashboardTableRef.current,
  });

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
        artist: data?.sonicKey?.contentOwner,
        title: data?.sonicKey?.contentFileName,
        radioStation: data?.radioStation?.name,
        date: data?.detectedAt,
        time: data?.detectedAt,
        duration: data?.sonicKey?.contentDuration,
        country: data?.radioStation?.country,
        sonicKey: data?.sonicKey?.sonicKey,
        isrcCode: data?.sonicKey?.isrcCode,
        version: data?.sonicKey?.version,
        distributor: data?.sonicKey?.distributor,
        label: data?.sonicKey?.label,
        iswc: data?.sonicKey?.iswcCode,
        tuneCode: data?.sonicKey?.tuneCode,
        modal: data?.sonicKey
      }
    })
    return stableTableData
  }


  const handleDashboardExport = (format) => {
    if (format === 'pdf') {
      handlePrintToPdf();
    } else {
      dispatch(getMonitorExportAction(monitor?.dates?.startDate, monitor?.dates?.endDate, format, 2000))
    }
  }

  log("Dashboard", dashboard)
  log("Radios", radioStation)
  log(" monitor filter data titltle", monitor.filters)

  return (
    <Grid ref={dashboardTableRef}>

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
        filterComponent={<MonitorFilter open={true} actions={actions} dashboard={true} />}
        exportData={(value) => handleDashboardExport(value)}
        pdf={false}
      />

      <CardContainer >
        <Stats
          imgSrc={radio}
          title={"My Plays"}
          loading={dashboard?.loading}
          data={dashboard?.data?.myPlaysCount || "0"}
          error={dashboard?.error}
          pageLink="/plays"
          helpText={helpText.plays}
        />
        <Stats
          imgSrc={radio}
          title={"My Tracks"}
          ownerShipTitle="from"
          loading={dashboard?.loading}
          data={dashboard?.data?.myTracksCount || "0"}
          error={dashboard?.error}
          pageLink="/tracks"
          helpText={helpText.tracks}
        />
        <Stats
          imgSrc={radio}
          title={"Artists"}
          ownerShipTitle="by"
          loading={dashboard?.loading}
          data={dashboard?.data?.myArtistsCount || "0"}
          error={dashboard?.error}
          pageLink="/artists"
          helpText={helpText.artists}
        />
        <Stats
          imgSrc={radio}
          title={"Radio Stations"}
          ownerShipTitle="At"
          loading={dashboard?.loading}
          data={dashboard?.data?.myRadioStationCount || "0"}
          error={dashboard?.error}
          pageLink="/radio-stations"
          helpText={helpText.radioStation}
        />
        <Stats
          imgSrc={radio}
          title={"Countries"}
          ownerShipTitle="In"
          loading={dashboard?.loading}
          data={dashboard?.data?.myCountriesCount || "0"}
          error={dashboard?.error}
          pageLink="/countries"
          helpText={helpText.countries}
        />
      </CardContainer>

      <TableContainer >
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
          {/* <AppCheckBox />
          <CustomRadioButton /> */}

        </CommonDataLoadErrorSuccess>
      </TableContainer>

      {/* import ControlPointIcon from '@material-ui/icons/ControlPoint'; */}
      {/* <AppAutoComplete
        loading={picker.title.loading}
        error={picker.title.error}
        data={picker.title.data?.docs}
        onInputChange={(title) => dispatch(getTrackTitleAction(title))}
        onChange={(artist) => dispatch({ type: actionTypes.SET_MONITOR_FILTERS, data: { ...monitor?.filters, artist: artist?.sonicKey?.contentFileName } })}
        optionLabel={(option) => option?.sonicKey?.contentFileName || ""}
      />
      <AppToggleSwitch /> */}
    </Grid >
  );
}
