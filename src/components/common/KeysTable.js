import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import VisibilityIcon from "@material-ui/icons/Visibility";

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
  key: {
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

export default function KeysTable({ type, head, body }) {
  const classes = useStyles();

  return (
    <TableContainer>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          {head?.map((head, index) => (
            <TableRow key={index}>
              <StyledTableCell>
                <div className={classes.tableCellIcon}>{head.h1}</div>
              </StyledTableCell>
              <StyledTableCell>
                <div className={classes.tableCellIcon}>{head.h2}</div>
              </StyledTableCell>
              <StyledTableCell>
                <div className={classes.tableCellIcon}>{head.h3}</div>
              </StyledTableCell>
              <StyledTableCell>
                <div className={classes.tableCellIcon}>{head.h4}</div>
              </StyledTableCell>
              <StyledTableCell>
                <div className={classes.tableCellIcon}>{head.h5}</div>
              </StyledTableCell>
              <StyledTableCell>
                <div className={classes.tableCellIcon}>{head.h6}</div>
              </StyledTableCell>
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {body?.map((body, index) => (
            <TableRow className={classes.tableRow} key={index}>
              <TableCell
                className={type ? classes.key : classes.tableCellNormalText}
              >
                {body.h1}
              </TableCell>
              <TableCell
                className={type ? classes.tableCellNormalText : classes.key}
              >
                {body.h2}
              </TableCell>
              <TableCell className={classes.tableCellNormalText}>
                {body.h3}
              </TableCell>
              <TableCell className={classes.tableCellNormalText}>
                {body.h4}
              </TableCell>
              <TableCell className={classes.tableCellNormalText}>
                {body.h5}
              </TableCell>
              <TableCell className={classes.tableCellColor}>
                {type ? (
                  <div className={classes.tableCellIcon}>
                    <VisibilityIcon />
                    &nbsp;View
                  </div>
                ) : (
                  body.h6
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
