import React, { useEffect, useState } from "react";
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
import DailogTable from "../../../components/common/DialogTable";
import { format, isValid } from "date-fns";
import { converstionOfKb } from "../../../utils/HelperMethods";

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

export default function DecodeSuccess({ audioName, title, decodeKeys }) {
  const classes = useStyles();
  const [sonicKeyData, setSonicKeyData] = useState([]);
  const [keysFound, setKeysFound] = useState(0);
  const [openTable, setOpenTable] = React.useState(false);
  const [sonicKeys, setSonicKeys] = useState({
    //sonicKey: "",
    contentName: "",
    contentOwner: "",
    contentValidation: "",
    contentQuality: "",
    contentDescription: "",
    additionalMetadata: {},
    isrcCode: "",
    iswcCode: "",
    tuneCode: "",
});

  useEffect(() => {
    const len = decodeKeys.data.length;
    setKeysFound(len);
    const data = decodeKeys?.data;
    setSonicKeyData(data);
  }, [decodeKeys]);

  const handleClickOpenTable = async (data) => {
    setSonicKeys({
        ...sonicKeys,
        sonicKey: data.sonicKey,
        contentName: data.contentName,
        contentOwner: data.contentOwner,
        contentValidation: data.contentValidation ? "YES" : "NO",
        contentQuality: data.contentQuality,
        contentDescription: data.contentDescription,
        contentFileName: data.contentFileName,
        contentFileType: data.contentFileType,
        createdAt: isValid(new Date(data.createdAt)) ? `${format(new Date(data.createdAt), 'dd/MM/yyyy')}` : "--",
        contentDuration: data?.contentDuration?.toFixed(2),
        encodingStrength: data.encodingStrength,
        contentSize: converstionOfKb(data.contentSize),
        contentSamplingFrequency: data?.contentSamplingFrequency?.replace('Hz', ''),
        iswcCode: (data.iswcCode ? data.iswcCode : 'Not Specified'),
        isrcCode: (data.isrcCode ? data.isrcCode : 'Not Specified'),
        tuneCode: (data.tuneCode ? data.tuneCode : 'Not Specified'),
        contentFilePath: data.contentFilePath,
        job: data?.job,
        additionalMetadata: data?.additionalMetadata?.message ? data.additionalMetadata?.message : ''
    })
    setOpenTable(true);
  };

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
        {openTable && <DailogTable sonicKey={sonicKeys} open={true} setOpenTable={setOpenTable} />}
      </TableContainer>
    </Grid>
  );
}
