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
import { getPlaysListsAction } from "../../../stores/actions";
import DashboardTable from "./Components/DashboardTable/DashboardTable";

export function Dashboard() {
  const dispatch = useDispatch()

  const dashboard = useSelector(state => state.dashboard)
  const plays = useSelector(state => state.playsList)

  React.useEffect(() => {
    dispatch(getPlaysListsAction(plays?.dates?.startDate, plays?.dates?.endDate, "ALL", 1, 10, false))
  }, [])

  log("Dashboard plays", plays)

  return (
    <Grid >

      <WelcomeBack totalRadioStations={956} />

      <Grid>
        <FilterComponent
          startDate={plays?.dates?.startDate}
          onChangeStartDate={(date) => dispatch({ type: actionTypes.SET_PLAYS_DATES, data: { ...plays.dates, startDate: date } })}
          endDate={plays?.dates?.endDate}
          onChangeEndDate={(date) => dispatch({ type: actionTypes.SET_PLAYS_DATES, data: { ...plays.dates, endDate: date } })}
        />
      </Grid>

      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item lg={3} sm={6} xs={12} >
          <Stats
            imgSrc={radio}
            title={"My Artist"}
            ownerShipTitle="from"
            loading={false}
            data={"37"}
            error={null}
          />
        </Grid>
        <Grid item lg={3} sm={6} xs={12} >
          <Stats
            imgSrc={radio}
            title={"My Artist"}
            ownerShipTitle="from"
            loading={false}
            data={"37"}
            error={null}
          />        </Grid>
        <Grid item lg={3} sm={6} xs={12} >
          <Stats
            imgSrc={radio}
            title={"My Artist"}
            ownerShipTitle="from"
            loading={false}
            data={"37"}
            error={null}
          />        </Grid>
        <Grid item lg={3} sm={6} xs={12}>
          <Stats
            imgSrc={radio}
            title={"My Artist"}
            ownerShipTitle="from"
            loading={false}
            data={"37"}
            error={null}
          />
        </Grid>
      </Grid>

      <Grid style={{ backgroundColor: "white", marginTop: "30px", padding: "45px" }}>
        <H3>10 Most Recent Plays</H3>
        <CommonDataLoadErrorSuccess
          error={plays?.error}
          loading={plays?.loading}
          onClickTryAgain={() => { dispatch(getPlaysListsAction(plays?.dates?.startDate, plays?.dates?.endDate, "ALL", 1, 10, false)) }}
        >
          <DashboardTable />
        </CommonDataLoadErrorSuccess>
      </Grid>

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

