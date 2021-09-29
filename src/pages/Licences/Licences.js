import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Card, Grid, Typography, Button } from "@material-ui/core";
import AddLicence from "./components/AddLicence";
import { fetchLicenceKeys } from "../../stores/actions/licenceKey";
import { connect } from "react-redux";
import { format } from "date-fns";

const useStyles = makeStyles((theme) => ({
  licenceContainer: {
    marginBottom: 40,
    backgroundColor: "white",
    padding: "2% 2.5%",
  },
  heading: {
    fontSize: 24,
    fontFamily: 'NunitoSans-ExtraBold',
    color: "#343F84",
  },
  subHeading: {
    fontSize: 18,
    fontFamily: 'NunitoSans-Regular',
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
    padding: "0px 30px",
    textTransform: "initial",
    fontSize: 15,
    fontFamily: 'NunitoSans-Bold',
    borderRadius: 8,
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
  tableCellNormalText: {
    fontSize: 14,
    fontFamily: 'NunitoSans-Regular',
    color: "#757575",
  },
}));

const tableHead = [
  "ID",
  "LICENCE KEY",
  "USAGE COUNT",
  "MAX COUNT",
  "NO OF RADIO STATIONS",
  "EXPIRY DATE",
  "SUSPENDED",
];

function Licences(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [licenceData, setLicenceData] = useState([]);

  function fetchLicence() {
    props.fetchLicenceKey();
  }

  useEffect(() => {
    if (props.licenceKey.data.length <= 0) {
      fetchLicence();
    }
  }, []);

  useEffect(() => {
    const data = props.licenceKey.data.docs;
    setLicenceData(data);
  }, [props]);

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
          onClick={() => setOpen(true)}
        >
          Add licence
        </Button>
      </Card>

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
            {licenceData?.map((data, index) => (
              <TableRow className={classes.tableRow} key={data._id}>
                <TableCell className={classes.tableCellNormalText}>
                  {index + 1}
                </TableCell>
                <TableCell className={classes.key}>{data.key}</TableCell>
                <TableCell className={classes.tableCellNormalText}>
                  {data.encodeUses}
                </TableCell>
                <TableCell className={classes.tableCellNormalText}>
                  {data.maxEncodeUses}
                </TableCell>
                <TableCell className={classes.tableCellNormalText}>
                  {data.isUnlimitedMonitor === true ? "Unlimited" : data.monitoringUses}
                </TableCell>
                <TableCell className={classes.tableCellNormalText}>
                  {format(new Date(data.validity), "dd.MM.yyyy")}
                </TableCell>
                <TableCell className={classes.tableCellColor}>
                  {data.suspended === true ? "Yes" : "No"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddLicence open={open} setOpen={setOpen} fetchLicence={fetchLicence} />
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    licenceKey: state.licenceKey,
    user: state.session.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchLicenceKey: () => dispatch(fetchLicenceKeys()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Licences);
