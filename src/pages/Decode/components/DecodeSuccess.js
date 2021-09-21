import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Grid, Typography } from "@material-ui/core";
import Icon from "../../../assets/images/icon-success-graphic.png";
import { log } from "../../../utils/app.debug";

const useStyles = makeStyles((theme) => ({
  successContainer: {
    marginBottom: 40,
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
  tableHead: {
    color: "#ACACAC",
    fontSize: 12,
    fontWeight: "700",
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
  failedIcon: {
    backgroundColor: "#E5F5F4",
    height: 180,
    padding: "1% 5%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  failed: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: 700,
    color: "#393F5B",
  },
}));

const tableHead = ["SONICKEY", "FILE TYPE", "NAME", "FREQUENCY", "OWNER", "ACTION"];

export default function DecodeSuccess({ audioName, title, decodeKeys }) {
  const classes = useStyles();
  const [sonicKeyData, setSonicKeyData] = useState([]);
  const [keysFound, setKeysFound] = useState(0);

  useEffect(() => {
    const len = decodeKeys.data.length;
    setKeysFound(len)
    const data = decodeKeys?.data;
    setSonicKeyData(data);
  }, [decodeKeys])

  return (
    <Grid className={classes.successContainer}>
      <Grid container className={classes.header}>
        <Grid item>
          <Typography className={classes.heading}>Well done!</Typography>
          <Typography className={classes.subHeading}>
            {title} of <b>{audioName}</b> successfully done.
          </Typography>
          <Typography className={classes.found}>
            We found <b>{keysFound}</b> SonicKeys.
          </Typography>
        </Grid>
        <Grid item className={classes.failedIcon}>
          <img src={Icon} alt="Failed" style={{ height: 80, width: 80 }} />
          <Typography className={classes.failed}>{title} done</Typography>
        </Grid>
      </Grid>

      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableHead.map((head, index) => (
                <TableCell className={classes.tableHead} key={index}>
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sonicKeyData?.map((data) => (
              <TableRow className={classes.tableRow} key={data._id}>
                <TableCell className={classes.key}>{data.sonicKey}</TableCell>
                <TableCell className={classes.tableCellNormalText}>
                  {data.contentFileType}
                </TableCell>
                <TableCell className={classes.tableCellNormalText}>
                  {data.contentFileName}
                </TableCell>
                <TableCell className={classes.tableCellNormalText}>
                  {data.contentSamplingFrequency}
                </TableCell>
                <TableCell className={classes.tableCellNormalText}>
                  {data.contentOwner}
                </TableCell>
                <TableCell className={classes.tableCellColor}>
                  <div className={classes.tableCellIcon}>
                    <VisibilityIcon fontSize="small" />
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
