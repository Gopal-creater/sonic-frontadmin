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
import { ButtonContainer, CardContainer, StyledIconButton, TableContainer } from "./DashboardStyles";
import { getMonitorDashboardDataAction, getMonitorDashboardExportAction } from "../../../stores/actions/dashboardActions.js/dashboardActions";
import MonitorFilter from "../Components/MonitorFilter/MonitorFilter";
import { getMonitorExportAction } from "../../../stores/actions/monitorActions/monitorActions";
import { useReactToPrint } from 'react-to-print';
import { helpText } from "./Constants";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./Dashboard.css"
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { userRoles } from "../../../constants/constants";

export function Dashboard() {
  const dispatch = useDispatch()

  const dashboard = useSelector(state => state.dashboard)
  const monitor = useSelector(state => state.monitor)
  const radioStation = useSelector(state => state.radioStations)
  const users = useSelector(state => state.user)
  const dashboardTableRef = useRef();
  const carousel = useRef(null)

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
        company: data?.sonicKey?.company?.name,
        companyType: data?.sonicKey?.company?.companyType,
        artist: data?.sonicKey?.contentOwner,
        title: data?.sonicKey?.contentFileName,
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
        modal: data?.sonicKey,
        trackId: data?.sonicKey?.track,
        fileType: data?.sonicKey?.contentFileType
      }
    })
    return stableTableData
  }


  const handleDashboardExport = (format) => {
    if (format === 'pdf') {
      handlePrintToPdf();
    } else {
      dispatch(getMonitorDashboardExportAction(format, monitor?.dates?.startDate, monitor?.dates?.endDate, 2000))
    }
  }

  const carouselSetting = {
    slidesToShow: 4.99,
    slidesToScroll: 1,
    speed: 300,
    arrows: false,
    infinite: true,
    centerPadding: 0,

    responsive: [
      {
        breakpoint: 1750,
        settings: {
          slidesToShow: 4.99,
          slidesToScroll: 1
        },
      },
      {
        breakpoint: 1470,
        settings: {
          slidesToShow: 3.99,
          slidesToScroll: 1
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2.99,
          slidesToScroll: 1
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1.99,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 0.99,
          slidesToScroll: 1,
        },
      }
    ],
  }

  const handleCarouselLeftClick = (e) => {
    e.preventDefault()
    carousel.current.slickPrev()
  }

  const handleCarouselRightClick = (e) => {
    e.preventDefault()
    carousel.current.slickNext()
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
        <Slider
          className="carousel"
          ref={carousel}
          {...carouselSetting}
        >
          <Stats
            imgSrc={radio}
            title={"Countries"}
            ownerShipTitle="In"
            loading={dashboard?.loading}
            data={dashboard?.data?.myCountriesCount || "0"}
            error={dashboard?.error}
            pageLink="/monitor/countries"
            helpText={helpText.countries}
          />
          {users?.userProfile?.data?.userRole === userRoles.PARTNER_ADMIN &&
            <Stats
              imgSrc={radio}
              title={"Companies"}
              loading={dashboard?.loading}
              data={dashboard?.data?.myCompaniesCount || "0"}
              error={dashboard?.error}
              pageLink="/monitor/companies"
              helpText={helpText.companies}
            />}
          <Stats
            imgSrc={radio}
            title={"My Plays"}
            loading={dashboard?.loading}
            data={dashboard?.data?.myPlaysCount || "0"}
            error={dashboard?.error}
            pageLink="/monitor/plays"
            helpText={helpText.plays}
          />
          <Stats
            imgSrc={radio}
            title={"My Tracks"}
            ownerShipTitle="from"
            loading={dashboard?.loading}
            data={dashboard?.data?.myTracksCount || "0"}
            error={dashboard?.error}
            pageLink="/monitor/tracks"
            helpText={helpText.tracks}
          />
          <Stats
            imgSrc={radio}
            title={"Artists"}
            ownerShipTitle="by"
            loading={dashboard?.loading}
            data={dashboard?.data?.myArtistsCount || "0"}
            error={dashboard?.error}
            pageLink="/monitor/artists"
            helpText={helpText.artists}
          />
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
        </Slider>

        <ButtonContainer>
          <StyledIconButton disableRipple onClick={handleCarouselLeftClick} style={{ marginRight: '10px' }}>
            <ArrowBackIosIcon style={{ height: '10px', width: '10px' }} />
          </StyledIconButton>
          <StyledIconButton disableRipple onClick={handleCarouselRightClick}>
            <ArrowForwardIosIcon style={{ height: '10px', width: '10px' }} />
          </StyledIconButton>
        </ButtonContainer>
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
        </CommonDataLoadErrorSuccess>
      </TableContainer>
    </Grid >
  );
}
