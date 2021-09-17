import {
  Badge,
  Grid,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { tableStyle } from "../../globalStyle";
import UnfoldMoreSharpIcon from "@material-ui/icons/UnfoldMoreSharp";
import { log } from "../../utils/app.debug";
import queryString from 'query-string';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "white",
    padding: "2% 2.5%",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
  heading: {
    fontSize: 30,
    fontWeight: 700,
    color: "#343F84",
  },
  subHeading: {
    paddingBottom: 30,
    fontSize: 18,
    fontWeight: 500,
    color: "#00A19A",
  },
  buttons: {
    fontSize: 15,
    marginRight: 6,
    marginTop: 5,
  },
  tableRow: {
    "&:hover": {
      boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 1px 5px rgba(0,0,0,0.22)",
      cursor: "pointer",
    },
  },
}));

const columns = [
  "ID",
  "SONICKEY",
  "NAME",
  "ARTIST",
  "QUALITY",
  "DESCRIPTION",
  "HITS",
];
export const SonicStreamDetail = (props) => {
  const classes = useStyles();
  const parsedQueryString = queryString.parse(props.location.search);
  const passedData = JSON.parse(localStorage.getItem("passedData"));
  log('Props',props);
  return (
    <Grid className={classes.container} elevation={8}>
      <Grid style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{ fontWeight: "bold", color: "navy", cursor: "pointer" }}
          onClick={() => props.history.goBack()}
        >
          <ArrowBackIosIcon style={{ fontSize: 12, margin: "0 5 3 0" }} />
          Back
        </div>
      </Grid>
      <Grid item className={classes.header}>
        <div>
          <Typography className={classes.heading}>
            Detected SonicKeys
          </Typography>
          <Typography className={classes.subHeading}>
            Found 2 SonicKeys in Arba 2 radio station
            {passedData.isStreamStarted === true && (
              <Badge
                style={{
                  cursor: "pointer",
                  background: "rgb(229, 245, 244)",
                  color: "rgb(72, 187, 183)",
                  padding: 5,
                  fontWeight: "lighter",
                }}
              >
                LISTENING
              </Badge>
            )}
            {passedData.isStreamStarted === false && passedData.error === null && (
              <Badge
                style={{
                  fontSize: 15,
                  cursor: "pointer",
                  background: "rgb(244, 237, 151)",
                  color: "rgb(183, 170, 53)",
                  padding: 5,
                  marginLeft: 10,
                }}
              >
                NOT LISTENING
              </Badge>
            )}
            {passedData.isStreamStarted === false && passedData.error !== null && (
              <Badge
                style={{
                  fontSize: 15,
                  cursor: "pointer",
                  background: "rgb(242, 125, 162)",
                  color: "rgb(130, 24, 13)",
                  padding: 5,
                  marginLeft: 10,
                }}
              >
                ERROR
              </Badge>
            )}
          </Typography>
        </div>
      </Grid>

      <TableContainer style={{ ...tableStyle.container }}>
        <Table aria-label="Detail table">
          <TableHead>
            <TableRow hover>
              {columns?.map((col) => {
                return (
                  <TableCell style={{ ...tableStyle.head }}>
                    {col}
                    <UnfoldMoreSharpIcon
                      style={{ fontSize: 15, fontWeight: "bold" }}
                      //   onClick={handleSort("id", prop.propFrom)}
                      className="sortIcon"
                    />
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SonicStreamDetail);
