import { Grid } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/styles";
import { log } from "../../../utils/app.debug";
import { useDispatch, useSelector } from "react-redux";
import MetaDataDialog from "../../../components/common/MetaDataDialog";
import * as actionTypes from "../../../stores/actions/actionTypes"
// import ExportIcon from '@material-ui/icons/GetApp';
import "./Dashboard.scss"
import WelcomeBack from "./Components/WelcomeBack/WelcomeBack";
import Stats from "./Components/Stats/Stats";
import radio from "../../../assets/icons/icon-teal-radio.png"
import FilterComponent from "../../../components/common/FilterComponent/FilterComponent";
import DashboardTable from "./Components/DashboardTable";
import { H3 } from "../../../StyledComponents/StyledHeadings";

const useStyles = makeStyles((theme) => ({
  menuItems: {
    "& ul": {
      backgroundColor: "#FFFFFF",
    },
    "& li": {
      fontSize: "14px",
      fontFamily: "NunitoSans-Bold",
      color: "#757575"
    },
  }
}));

export function Dashboard() {
  const classes = useStyles();
  // const [values, setValues] = React.useState({
  //   dayWeekMonth: "Month",
  //   sonicKeyModal: false,
  //   selectedSonicKey: {},
  // })

  const tableHeaders = [
    "Items",
    "Order #",
    "Amount",
    "Status",
    "Delivery Driver"
  ];

  const dashboard = useSelector(state => state.dashboard)
  const plays = useSelector(state => state.playsList)
  log("Dashboard Data", dashboard)

  const dispatch = useDispatch()

  return (
    <Grid className="dashboard-container">

      <WelcomeBack totalRadioStations={956} />

      <Grid>
        <FilterComponent
          startDate={plays?.dates?.startDate}
          onChangeStartDate={(date) => dispatch({ type: actionTypes.SET_PLAYS_DATES, data: { ...plays.dates, startDate: date } })}
          endDate={plays?.dates?.endDate}
          onChangeEndDate={(date) => dispatch({ type: actionTypes.SET_PLAYS_DATES, data: { ...plays.dates, endDate: date } })}
        />
      </Grid>

      <Grid container spacing={3}>
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

      {/* <Grid style={{ backgroundColor: "white", marginTop: "30px", padding: "45px" }}>
        <H3>10 Most Recent Plays</H3>
        <DashboardTable
          headers={tableHeaders}
          minCellWidth={140}
        />
      </Grid> */}

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

