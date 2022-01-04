import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import VisibilityOutlinedIcon from "@material-ui/icons/Visibility";
import { Grid, Typography } from "@material-ui/core";
import Icon from "../../../assets/images/icon-success-graphic.png";
import MetaDataDialog from "../../../components/common/MetaDataDialog";

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
    fontFamily: 'NunitoSans-Bold',
    color: "#343F84",
  },
  subHeading: {
    fontSize: 18,
    fontFamily: 'NunitoSans-Regular',
    color: "#00A19A",
  },
  found: {
    padding: "30px 0px 0px 0px",
    fontSize: 18,
    fontFamily: 'NunitoSans-Regular',
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
    fontFamily: 'NunitoSans-Bold',
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
    fontFamily: 'NunitoSans-Bold',
    paddingTop: 25,
    paddingBottom: 25,
  },
  tableCellColor: {
    color: "#343F84",
    fontSize: 14,
    fontFamily: 'NunitoSans-Bold',
  },
  tableCellIcon: {
    display: "flex",
    alignItems: "center",
  },
  tableCellNormalText: {
    fontSize: 14,
    fontFamily: 'NunitoSans-Bold',
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
    fontFamily: 'NunitoSans-ExtraBold',
    color: "#393F5B",
  },
}));

const tableHead = [
  "SONICKEY",
  "FILE TYPE",
  "NAME",
  "FREQUENCY",
  "OWNER",
  "ACTION",
];

export default function DecodeSuccess(props) {
  const classes = useStyles();

  const [values, setValues] = useState({
    openTable: false,
    selectedSonicKey: {},
    sonickeys: props?.decodeKeys
  })

  React.useEffect(() => {
    setValues({ ...values, sonickeys: props?.decodeKeys })
  }, [props])

  const handleClickOpenTable = async (data) => {
    setValues({ ...values, openTable: true, selectedSonicKey: data })
  };

  return (
    <Grid className={classes.successContainer}>
      <Grid container className={classes.header}>
        <Grid item>
          <Typography className={classes.heading}>Well done!</Typography>
          <Typography className={classes.subHeading}>
            {props?.title} of <b>{props?.audioName}</b> successfully done.
          </Typography>
          <Typography className={classes.found}>
            We found <b>{props?.decodeKeys?.data?.length}</b> SonicKeys.
          </Typography>
        </Grid>
        <Grid item className={classes.failedIcon}>
          <img src={Icon} alt="Failed" style={{ height: 80, width: 80 }} />
          <Typography className={classes.failed}>{props?.title} done</Typography>
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
            {values?.sonickeys?.data?.map((data) => (
              <TableRow className={classes.tableRow} key={data._id}>
                <TableCell className={classes.key}>{data?.sonicKey}</TableCell>
                <TableCell className={classes.tableCellNormalText}>
                  {data?.contentFileType}
                </TableCell>
                <TableCell className={classes.tableCellNormalText}>
                  {data?.originalFileName || data?.contentFileName}
                </TableCell>
                <TableCell className={classes.tableCellNormalText}>
                  {data?.contentSamplingFrequency}
                </TableCell>
                <TableCell className={classes.tableCellNormalText}>
                  {data?.contentOwner}
                </TableCell>
                <TableCell className={classes.tableCellColor}>
                  <div
                    className={classes.tableCellIcon}
                    onClick={() => handleClickOpenTable(data)}
                  >
                    <VisibilityOutlinedIcon fontSize="small" />
                    &nbsp;View
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {values?.openTable &&
          <MetaDataDialog
            sonicKey={values?.selectedSonicKey}
            open={true}
            setOpenTable={(flag) => { setValues({ ...values, openTable: flag }) }}
            updateMetaData={(newData) => {
              let newSonicData = values?.sonickeys?.data?.map((data) => {
                if (data?._id === newData?.sonicKey) {
                  return newData
                }
                return data
              })
              setValues({ ...values, selectedSonicKey: newData, soincKeys: { ...values?.sonickeys, data: newSonicData } })
            }}
          />}
      </TableContainer>
    </Grid>
  );
}
