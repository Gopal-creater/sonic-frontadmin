import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Icon from "../../../assets/images/Logo-colour-simple.png";

const StyledTableCell = withStyles((theme) => ({
  head: {
    color: "#ACACAC",
    fontSize: 12,
    fontWeight: "700",
  },
  body: {
    color: "#424C8C",
  },
}))(TableCell);

const useStyles = makeStyles((theme) => ({
  successContainer: {
    marginBottom: 40,
    backgroundColor: "white",
    padding: "30px 40px",
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
    fontSize: 18,
    fontWeight: 500,
    color: "#00A19A",
  },
  found: {
    padding: "30px 0px 0px 0px",
    fontSize: 18,
    fontWeight: 500,
    color: "#393F5B",
  },

  //TABLE
  table: {
    minWidth: 700,
    marginTop: 30,
    width: "100%",
  },
  tableRow: {
    "&:hover": {
      boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 1px 5px rgba(0,0,0,0.22)",
      cursor: "pointer",
    },
  },
  sonicKeyText: {
    color: "#343F84",
    fontSize: 18,
    fontWeight: 700,
    paddingTop: 25,
    paddingBottom: 25,
  },
  tableCellColor: {
    color: "#343F84",
    fontSize: 14,
    fontWeight: 700,
  },
  tableCellIcon: {
    display: "flex",
    alignItems: "center",
  },
  tableCellNormalText: {
    fontSize: 14,
    fontWeight: 700,
    color: "#757575",
  },
}));

export default function DecodeSuccess() {
  const classes = useStyles();

  const rows = [1, 2];

  return (
    <Grid className={classes.successContainer}>
      <Grid item className={classes.header}>
        <div>
          <Typography className={classes.heading}>Well done!</Typography>
          <Typography className={classes.subHeading}>
            Decoding of <b>RADIO_SONIC.wav</b> successfully done.
          </Typography>
          <Typography className={classes.found}>
            We found <b>2</b> SonicKeys.
          </Typography>
        </div>
        <img src={Icon} alt="Success" style={{ width: 150 }} />
      </Grid>

      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <div className={classes.tableCellIcon}>SONICKEY</div>
              </StyledTableCell>
              <StyledTableCell>
                <div className={classes.tableCellIcon}>FILE TYPE</div>
              </StyledTableCell>
              <StyledTableCell>
                <div className={classes.tableCellIcon}>NAME</div>
              </StyledTableCell>
              <StyledTableCell>
                <div className={classes.tableCellIcon}>FREQUENCY</div>
              </StyledTableCell>
              <StyledTableCell>
                <div className={classes.tableCellIcon}>OWNER</div>
              </StyledTableCell>
              <StyledTableCell>
                <div className={classes.tableCellIcon}>ACTION</div>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow className={classes.tableRow} key={row}>
                <TableCell className={classes.sonicKeyText}>
                  WD3mg0z9QL7
                </TableCell>
                <TableCell className={classes.tableCellNormalText}>
                  audio/wav
                </TableCell>
                <TableCell className={classes.tableCellNormalText}>
                  Test
                </TableCell>
                <TableCell className={classes.tableCellNormalText}>
                  44100
                </TableCell>
                <TableCell className={classes.tableCellNormalText}>
                  SG
                </TableCell>
                <TableCell className={classes.tableCellColor}>
                  <div className={classes.tableCellIcon}>
                    <VisibilityIcon />
                    &nbsp;View
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
