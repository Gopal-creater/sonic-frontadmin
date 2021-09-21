import {
  Badge,
  Button,
  Dialog,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  Input,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@material-ui/core";
import React, { forwardRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { tableStyle } from "../../globalStyle";
import UnfoldMoreSharpIcon from "@material-ui/icons/UnfoldMoreSharp";
import { log } from "../../utils/app.debug";
import queryString from "query-string";
import Communication from "../../services/https/Communication";
import LoadingSpinner from "./Components/LoadingSpinner";
import ErrorModal from "./Components/ErrorModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchThirdPartySonicKeys } from "../../stores/actions/thirdPartySonicKey";
import { cloneDeep } from "lodash";
import { isValid,format } from "date-fns";
import { converstionOfKb} from '../../utils/HelperMethods';
import DailogTable from "../../components/common/DialogTable";
import CloseIcon from '@material-ui/icons/Close';
import DialogLogo from "../../../src/assets/images/key-logo.png";

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
  dialogPaper: {
    minHeight: '75vh',
    maxHeight: '75vh',
    margin: 'auto',
},
tableCellOne: {
    padding: '5px',
    fontWeight: 'bold',
    fontSize: '12px',
    color: '#ACACAC',
},
tableCellTwo: {
    padding: '5px',
    fontWeight: '700',
    fontSize: '14px',
    color: '#757575',
},
table: {
}
}));

export const SonicStreamPlays = (props) => {
  const classes = useStyles();
  const [hitDetail, setHitDetail] = useState();
  const [openDetectionTable, setDetectionTable] = React.useState(false)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [tableData, setTableData] = React.useState([]);
  const theme = useTheme()
  const [sonicKey, setSonicKey] = React.useState({
    sonicKey: "",
    contentName: "",
    contentOwner: "",
    contentValidation: "",
    contentQuality: "",
    contentDescription: "",
    contentFileName: "",
    contentFileType: "",
    createdAt: new Date(),
    contentDuration: "",
    encodingStrength: "",
    contentSize: "",
    contentSamplingFrequency: "",
    additionalMetadata: {},
    iswcCode: "",
    isrcCode: "",
    tuneCode: "",
    contentType: ""
  })
  const [openTable, setOpenTable] = React.useState(false)
  const columns = [
    "ID",
    "SONICKEY",
    "NAME",
    "ARTIST",
    "QUALITY",
    "DESCRIPTION",
    "HITS",
  ];


  function handleCloseTable() {
    setDetectionTable(false)
  };
  
  function openPopUp(index) {
    // let key = tableData[index]._id
    Communication.fetchThirdPartyDetectedDetails(index)
      .then((response) => {
        log('Response',response)
        setHitDetail(response)
        setDetectionTable(true)
      })
  }

  const fetchThirdPartyKeys = (_offset = 0, _limit = 10) => {
    Communication.fetchThirdPartySonicKeys(_limit, _offset).then((res) => {
      console.log("res", res);
      setTableData(res)
      // setTotalCount(res.totalDocs)
      // setError('')
    }).catch(err => {
      setError(err)
    })
  }
  
  useEffect(() => {
    // if(props.thirdPartyKeys.data.length <= 0)
    if (tableData.length <= 0)
      // fetchKeys(100,0);
      fetchThirdPartyKeys(0, 10)
  }, []);
  function fetchSonicKeyById(response) {
    log('Response',response)
    setSonicKey({
      ...sonicKey,
      sonicKey: response.sonicKey,
      contentName: response.contentName,
      contentOwner: response.contentOwner,
      contentValidation: response.contentValidation ? "YES" : "NO",
      contentQuality: response.contentQuality,
      contentDescription: response.contentDescription,
      contentFileName: response.contentFileName,
      contentFileType: response.contentFileType,
      createdAt: isValid(new Date(response.createdAt)) ? `${format(new Date(response.createdAt), 'dd/MM/yyyy')}` : "--",
      contentDuration: response?.contentDuration.toFixed(2),
      encodingStrength: response.encodingStrength,
      contentSize: converstionOfKb(response.contentSize),
      contentSamplingFrequency: response?.contentSamplingFrequency?.replace('Hz', ''),
      additionalMetadata: response?.additionalMetadata?.message || '',
      iswcCode: response.iswcCode ? response.iswcCode.toUpperCase() : '',
      isrcCode: response.isrcCode ? response.isrcCode.toUpperCase() : '',
      tuneCode: response.tuneCode ? response.tuneCode.toUpperCase() : '',
      contentType: response?.contentType
    });
    setOpenTable(true)
  }

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <Input placeholder='Start Date' 
    style={{borderBottom:'1px black'}} onClick={onClick} ref={ref}>
      {startDate}
    </Input>
  ));
  return (
    <Grid className={classes.container} elevation={8}>
      <Grid style={{ display: "flex", justifyContent: "space-between" }}>
      </Grid>
      <Grid item className={classes.header}>
        <div>
          <Typography className={classes.heading}>
            Plays
          </Typography>
          <Typography className={classes.subHeading}>
            See history of SonicKey plays
          </Typography>
        </div>
      </Grid>
      <Paper
          maxWidth="lg"
          style={{
            marginTop: 15,
            padding: 10,
            margin: 20,
            display: "flex",
            flexGrow: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
            {/* <div style={{width:500,marginTop:10,marginLeft:10,
              display:'flex',alignItems:'row',}}>

            <DatePicker 
             name="startDate"  
             dateFormat="MMMM d, yyyy"
             popperClassName="some-custom-class" 
     //        customInput={<ExampleCustomInput />}
             label="Start Date"
             selected={startDate} onChange={(date) => setStartDate(date)} 
             />
            </div> */}
            <Grid>
            <FormControl style={styles.formControl}>
              <Select
                id="drop-down"
                //onChange={(e) => setKeysDetected(e.target.value)}
                className="form-control mb-0"
                autoWidth={false}
                style={styles.dropdownButton}
              >
                <MenuItem disabled selected hidden>
                  Radio Station
                </MenuItem>
                <MenuItem value="sonicreader">StreamReader</MenuItem>
                <MenuItem value="sonicportal">SonicPortal</MenuItem>
                <MenuItem value="sonicapp">SonicApp</MenuItem>
              </Select>
            </FormControl>
            <FormControl style={styles.formControl}>
              <Select
                id="drop-down"
                //onChange={(e) => setKeysDetected(e.target.value)}
                className="form-control mb-0"
                autoWidth={false}
                style={styles.dropdownButton}
              >
                <MenuItem disabled selected hidden>
                  Radio Station
                </MenuItem>
                <MenuItem value="sonicreader">StreamReader</MenuItem>
                <MenuItem value="sonicportal">SonicPortal</MenuItem>
                <MenuItem value="sonicapp">SonicApp</MenuItem>
              </Select>
            </FormControl>
            <FormControl>            
            <Button
              variant="contained"
              color="primary"
              style={{
                padding: 12,
                borderRadius: 5,
                background: "rgb(52, 63, 132)",
                marginTop:5
              }}
            >
              Filter
            </Button></FormControl>
            
            </Grid>

        </Paper>
        
      {!loading && !error ? (
        <TableContainer style={{ ...tableStyle.container }}>
          <Table aria-label="Detail table">
            <TableHead>
              <TableRow hover>
                {columns?.map((col) => {
                  return (
                    <TableCell style={{ ...tableStyle.head }}>
                      {col}
                      <UnfoldMoreSharpIcon
                        style={{ fontSize: 12, fontWeight: "bold" }}
                        //   onClick={handleSort("id", prop.propFrom)}
                        className="sortIcon"
                      />
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData?.docs?.map((file, index) => {
                
                return (
                  <TableRow hover className={classes.tableRow}>
                    <TableCell style={{ ...tableStyle.body }}>
                      {index + 1}
                    </TableCell>
                    <TableCell style={{ ...tableStyle.body, fontSize: 15,
                    cursor:'pointer' }}
                    onClick={() => fetchSonicKeyById(file?.sonicKey)}>
                      {file?.sonicKey?.sonicKey}
                    </TableCell>
                    <TableCell style={{ ...tableStyle.body, color: "#757575" }}>
                      {file?.sonicKey?.contentName}
                    </TableCell>
                    <TableCell style={{ ...tableStyle.body, color: "#757575" }}>
                      {file?.sonicKey?.contentOwner}
                    </TableCell>
                    <TableCell style={{ ...tableStyle.body, color: "#757575" }}>
                      {file?.sonicKey?.contentQuality}
                    </TableCell>
                    <TableCell style={{ ...tableStyle.body, color: "#757575" }}>
                      {file?.sonicKey?.contentDescription}
                    </TableCell>
                    <TableCell
                    onClick={() => openPopUp(file?.sonicKey?._id)}
                      style={{ ...tableStyle.body, cursor: "pointer" }}
                    >
                      {file?.totalHits}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : loading ? (
        <LoadingSpinner
          multipleGrow={true}
          containerStyle={{ height: window.innerHeight / 2 }}
        />
      ) : (
        <ErrorModal
          errorData={error}
          additionalStyle={{ height: window.innerHeight / 2 }}
        />
      )}
      {openTable &&
        <DailogTable sonicKey={sonicKey} open={true} setOpenTable={setOpenTable} />
      }

      {/*Update Table Detail on row click Up */}
      {openDetectionTable && <div>
        <Dialog open={true} fullWidth={true} className={classes.dialogPaper}>
          <IconButton aria-label="close" style={{
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: '#343F84'
          }} onClick={handleCloseTable}
            data-toggle="tooltip" data-placement="top" title='Close'>
            <CloseIcon />
          </IconButton>
          <DialogTitle id="form-dialog-title">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img style={{ width: '30px' }} src={DialogLogo} />
                    <div style={{ fontSize: '18px',display:'flex'
                  ,flexDirection:'column' }}>
                    <Grid item style={{ fontWeight: 'bold', color: '#343F84', fontSize: '18px',display:'flex'
                  ,flexDirection:'column' }}>  &nbsp; &nbsp;SonicKey: {hitDetail?.docs[0]?.sonicKey?.sonicKey}</Grid>
        <Grid item style={{color:'grey'}}>  &nbsp; &nbsp;{hitDetail.docs[0].sonicKey.contentName},
        {hitDetail?.totalDocs} hits</Grid>
                      </div>
                </div>
            </DialogTitle>
          <TableContainer component={Paper}style={{ marginTop: 10, padding: '10px 25px', border: 'none' }} elevation={0} >
            <Table size="small"
              stickyHeader aria-label="sticky table" fullWidth>
              <TableHead align="center" style={{ background: '#ADD8E6' }}>
                
                <TableRow>
                  <TableCell align="center">
                    <b>DATE</b></TableCell>
                  <TableCell align="center">
                    <b>TIME</b></TableCell>
                </TableRow>
              </TableHead>
              {/* Changes for multiple keys */}
              {hitDetail.docs.map((hitData) => {
                return (
                  <>
                    <TableRow>
                      <TableCell align="center">
                        {
                          isValid(new Date(hitData.detectedAt))
                            ? `${format(new Date(hitData.detectedAt), 'dd/MM/yyyy')}` : "--"
                        }
                      </TableCell>
                      <TableCell align="center">
                        {
                          isValid(new Date(hitData.detectedAt))
                            ? `${format(new Date(hitData.detectedAt), 'hh:mm:ss')}` : "--"
                        }
                      </TableCell>
                    </TableRow>
                  </>
                )
              }
              )
              }
            </Table>

          </TableContainer>
        </Dialog>
      </div>
      }
    </Grid>
  );
};

const styles = {
  homeContainer: {},
  IconStyle: {
    height: 70,
    width: 70,
    color: "white",
  },
  cardStyle: {
    marginTop: 10,
    padding: 10,
    // backgroundColor: 'rgba(0,0,0,0.1)'
    // borderRadius: 10,
    // boxShadow : '0px 0px 8px 2px #000000;',
  },
  actionContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  tableStyle: {
    backgroundColor: "#ADD8E6",
    // color:'#0269A4',
    // opacity:0.9,
    // fontWeight: 'bold',
    whiteSpace: "nowrap",
    wordWrap: "break-word",
  },
  submitButton: {
    marginLeft: 10,
    height: "30px",
    color: "black",
    fontWeight: "bold",
    width: 80,
    border: "none",
    borderRadius: "50px",
    backgroundColor: "transparent",
    boxShadow: "0px 0px 8px 2px #000000;",
  },
  dropdownButton: {
    color: "black",
    backgroundColor: "transparent",
    outline: "none",
    border: "none",
    boxShadow: "none",
    width: 160,
    margin: "0px 30px 0px 20px",
  },
};

const mapStateToProps = (state) => {
  log('State',state)
  return {
    thirdPartyKeys: state.thirdPartyKeys,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchThirdPartyKeys: (limit, index) => dispatch(fetchThirdPartySonicKeys(limit, index)),
  };}

export default connect(mapStateToProps, mapDispatchToProps)(SonicStreamPlays);
