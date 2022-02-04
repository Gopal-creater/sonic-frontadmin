import { Grid, TableCell } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/styles";
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
import { ResizableTable, StyledTableBody, StyledTableHead, StyledTableHeadColumn, StyledTableRow, TableResizer, TableWrapper } from "./Style";
import { useRef } from "react";

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

const createHeaders = (headers) => {
  return headers.map((item) => ({
    text: item,
    ref: useRef()
  }));
};

export function Dashboard() {
  const classes = useStyles();
  const dispatch = useDispatch()

  const dashboard = useSelector(state => state.dashboard)
  const plays = useSelector(state => state.playsList)

  React.useEffect(() => {
    dispatch(getPlaysListsAction(plays?.dates?.startDate, plays?.dates?.endDate, "ALL", 1, 10, false))
  }, [])

  log("Dashboard plays", plays)

  //Creating table----------------------------------------------------------------------
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  const [state, setState] = React.useState({
    tableHeight: "auto",
    activeColumnIndex: null
  })

  const tableElement = useRef(null)
  const columns = createHeaders(["Dessert", "Calories", "Fat", "Carbs", "Protein"])

  const mouseMove = React.useCallback(
    (e) => {
      const gridColumns = columns.map((col, i) => {
        if (i === state.activeColumnIndex) {
          const width = e.clientX - col.ref.current.offsetLeft;

          if (width >= 120) {
            return `${width}px`;
          }
        }
        return `${col.ref.current.offsetWidth}px`;
      });

      tableElement.current.style.gridTemplateColumns = `${gridColumns.join(
        " "
      )}`;
    },
    [state.activeColumnIndex, columns, 120]
  );

  const removeListeners = React.useCallback(() => {
    window.removeEventListener("mousemove", mouseMove);
    window.removeEventListener("mouseup", removeListeners);
  }, [mouseMove]);

  const mouseUp = React.useCallback(() => {
    setState({ ...state, activeColumnIndex: null })
    removeListeners();
  }, [state.activeColumnIndex, removeListeners]);


  React.useEffect(() => {
    setState({ ...state, tableHeight: tableElement.current.offsetHeight })
  }, [])

  React.useEffect(() => {
    if (state.activeColumnIndex !== null) {
      window.addEventListener("mousemove", mouseMove);
      window.addEventListener("mouseup", mouseUp);
    }

    return () => {
      removeListeners();
    };
  }, [state.activeColumnIndex, mouseMove, mouseUp, removeListeners]);

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
          <TableWrapper>
            <ResizableTable ref={tableElement}>
              <StyledTableHead>
                <StyledTableRow>
                  {columns.map(({ ref, text }, index) => {
                    return (
                      <StyledTableHeadColumn ref={ref} onMouseDown={() => setState({ ...state, activeColumnIndex: index })}>
                        {text} <TableResizer style={{ height: state.tableHeight }} />
                      </StyledTableHeadColumn>
                    )
                  })}
                </StyledTableRow>
              </StyledTableHead>
              <StyledTableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.name}>
                    <TableCell>
                      {row.name}
                    </TableCell>
                    <TableCell>{row.calories}</TableCell>
                    <TableCell>{row.fat}</TableCell>
                    <TableCell>{row.carbs}</TableCell>
                    <TableCell>{row.protein}</TableCell>
                  </StyledTableRow>
                ))}
              </StyledTableBody>
            </ResizableTable>
          </TableWrapper>
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

