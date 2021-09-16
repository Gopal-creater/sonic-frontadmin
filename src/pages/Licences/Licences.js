import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Card, Grid, Typography, Button } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

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
  licenceContainer: {
    marginBottom: 40,
    backgroundColor: "white",
    padding: "2% 2.5%",
    // boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  },
  heading: {
    fontSize: 24,
    fontWeight: 700,
    color: "#343F84",
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 500,
    color: "#00A19A",
  },
  card: {
    padding: 20,
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 20,
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  },
  button: {
    height: 45,
    padding: "0px 20px",
    textTransform: "initial",
    fontSize: 15,
    fontWeight: 700,
    borderRadius: 8,
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
    fontWeight: 500,
    color: "#757575",
  },
}));

export default function Licences() {
  const classes = useStyles();

  const rows = [1, 2];

  return (
    <Grid className={classes.licenceContainer}>
      <Typography className={classes.heading}>Licences</Typography>
      <Typography className={classes.subHeading}>
        Add a new licence key.
      </Typography>
      <Card className={classes.card}>
        <Button
          variant="contained"
          component="span"
          color="primary"
          className={classes.button}
          //   onClick={handleDecode}
        >
          Add licence
        </Button>
      </Card>

      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <div className={classes.tableCellIcon}>ID</div>
              </StyledTableCell>
              <StyledTableCell>
                <div className={classes.tableCellIcon}>LICENCE KEY</div>
              </StyledTableCell>
              <StyledTableCell>
                <div className={classes.tableCellIcon}>USAGE COUNT</div>
              </StyledTableCell>
              <StyledTableCell>
                <div className={classes.tableCellIcon}>MAX COUNT</div>
              </StyledTableCell>
              <StyledTableCell>
                <div className={classes.tableCellIcon}>EXPIRY DATE</div>
              </StyledTableCell>
              <StyledTableCell>
                <div className={classes.tableCellIcon}>SUSPENDED</div>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow className={classes.tableRow} key={row}>
                <TableCell className={classes.tableCellNormalText}>1</TableCell>
                <TableCell className={classes.sonicKeyText}>
                  1592343-B234-324A-AEH2-234DFS84RG
                </TableCell>
                <TableCell className={classes.tableCellNormalText}>
                  113
                </TableCell>
                <TableCell className={classes.tableCellNormalText}>
                  1000
                </TableCell>
                <TableCell className={classes.tableCellNormalText}>
                  14.09.2021
                </TableCell>
                <TableCell className={classes.tableCellColor}></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
