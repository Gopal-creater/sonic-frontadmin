import {
  Badge,
  Button,
  Checkbox,
  Dialog,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Input,
  InputLabel,
  makeStyles,
  Menu,
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
import { converstionOfKb, monthRange} from '../../utils/HelperMethods';
import DailogTable from "../../components/common/DialogTable";
import CloseIcon from '@material-ui/icons/Close';
import DialogLogo from "../../../src/assets/images/key-logo.png";
import CalendarLogo from "../../../src/assets/icons/icon-calendar.png";
import cogoToast from "cogo-toast";
import * as actionCreators from "../../stores/actions/index";
import moment from "moment";
import Search from "../SonicKeys/Components/Search";
import viewFilter from "../../../src/assets/images/view.png";

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
placeholder: {
  color: "#aaa"
},
columnFilter: {
  position: "absolute",
  marginTop: 10,
  display: "none",
  backgroundColor: "#ffffff",
  borderRadius: "5px",
  minWidth: "100px",
  padding: "10px",
  maxWidth: "400px",
  width: "fit-content",
  right:50,
  boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 1px 5px rgba(0,0,0,0.22)",
  "&.active": {
    display: "block",
  },
},
closeDiv: {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  cursor: "pointer",
},
}));

export const SonicStreamPlays = (props) => {
  const classes = useStyles();
  const [hitDetail, setHitDetail] = useState();
  const [openDetectionTable, setDetectionTable] = React.useState(false)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  var date = new Date()
  const [startDate, setStartDate] = useState(moment(monthRange(true,false).split(',')[1]).toDate());
  const [endDate, setEndDate] = useState(new Date());
  const [tableData, setTableData] = React.useState([]);
  const [defaultData, setDefaultData] = useState(false);
  const [dataSearch, setDataSearch] = React.useState("");
  const [searchValue, setSearchValue] = useState("");
  const [page, setTotalPage] = React.useState(0);
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
  const [keysDetected, setKeysDetected] = React.useState('STREAMREADER')
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
  const [filterColumn, setFilterColumn] = useState([
    "ID",
    "SONICKEY",
    "NAME",
    "ARTIST",
    "QUALITY",
    "DESCRIPTION",
    "HITS",
  ]);


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
      }).catch(err=>{
        log('Error',err)
        cogoToast.error(err.message)
      })
  }

  const fetchThirdPartyKeys = (_offset = 0, _limit = 10,channel='STREAMREADER') => {
    Communication.fetchThirdPartySonicKeys(_limit, _offset,channel).then((res) => {
      console.log("res", res);
      //setTableData(res)
      // setTotalCount(res.totalDocs)
      // setError('')
    }).catch(err => {
      log('Error',err)
      // setError(err)
    })
  }

  const searchMethod = (_offset, rowPerPage, searchText) =>{
    Communication.searchRadioStation(0, 5, "Jo").then((res) =>{
      log("Result", res)
      setTableData(res.docs);
      setTotalCount(res.totalDocs);
      setTotalPage(res.totalPages);
      setError("");
    }
    ).catch(err=>log('Error',err));
  }
  
  const openColumnFilter = () => {
    document.getElementById("columnFilter").classList.add("active");
  };
  const closeColumnFilter = () => {
    document.getElementById("columnFilter").classList.remove("active");
  };

  const onSearchChange = (searchText) => {
    console.log("Search Change", searchText);
    setSearchValue(searchText);
    // searchMethod(0,5,searchValue)  
  };

  useEffect(() => {
    log('Use Effect')
    if (tableData.length <= 0)
      fetchThirdPartyKeys(0, 10)
  }, []);

  useEffect(() => {
    if (defaultData === true) {
      fetchThirdPartyKeys(0, 10)
      setDefaultData(false);
    }
  }, [defaultData]);

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

  const isSelected = (radiostation_id) => {
    return filterColumn.includes(radiostation_id);
  };
  
  const checkBox = (event, _id) => {
    console.log(_id, event.target.checked);
    if (event.target.checked) {
      console.log("column1:", event, _id);
      setFilterColumn([...filterColumn, _id]);
    } else {
      const index = filterColumn.indexOf(_id);
      filterColumn.splice(index, 1);
      setFilterColumn([...filterColumn]);
    }
  };

  const Placeholder = ({ children }) => {
    return <div className={classes.placeholder}>{children}</div>;
  };
  
  const StartDateInput = forwardRef(({value, onClick }, ref) => (
    <>
    <div style={{display:'flex',flexDirection:'column'}}>
    <label style={{fontSize:12,color:'grey',fontWeight:'bold'}}>
      Start Date 
    </label>
    <Input value={value} 
    style={{color:'grey',fontSize:20, fontWeight:'lighter',width:140,cursor:'pointer'}}
    className="input-date-picker" onClick={onClick} ref={ref}/>
  </div>
  </>));

  const EndDateInput = forwardRef(({value, onClick }, ref) => (
    <>
    <Grid style={{display:'flex',flexDirection:'column'}}>
    <label style={{fontSize:12,color:'grey',fontWeight:'bold'}}>
      End Date 
    </label>
    <Input value={value} 
    style={{color:'grey',fontSize:20, fontWeight:'lighter',width:140}}
    className="input-date-picker" onClick={onClick} ref={ref}/>
  </Grid>
  </>));
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
        <Grid style={{ display: 'flex', backgroundColor: '', }}>
        {/* <div style={{ backgroundColor: '', marginRight: '25px' }} >
        <Search  searchData={onSearchChange} 
          dataSearch={dataSearch} 
          setDataSearch={setDataSearch} 
          setDefaultData={setDefaultData} /></div> */}
          <div>
          <div>
            <img
              src={viewFilter}
              style={{ cursor: "pointer" }}
              onClick={openColumnFilter}
            />
            <div id="columnFilter" className={classes.columnFilter}>
              <div className={classes.closeDiv}>
                <div>Show Columns</div>
                <div>
                  <CloseIcon onClick={closeColumnFilter} />
                </div>
              </div>
              <FormGroup column>
                {columns?.map((col) => {
                  const isItemSelected = isSelected(col);
                  return (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isItemSelected}
                          onChange={(e) => checkBox(e, col)}
                          className={classes.checkBoxSytle}
                          color="default"
                        />
                      }
                      label={col}
                    />
                  );
                })}
              </FormGroup>
            </div>
          </div>
        </div>
                </Grid>
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
            <Grid style={{width:'95%',
              display:'flex',alignItems:'row',justifyContent:'space-between'}}>
                <Grid item style={{width:500,
              display:'flex',alignItems:'row'}}>
            <img src={CalendarLogo} style={{width:20,height:18,
              margin:15,marginTop:28}}/>    
            <Grid item style={{width:140}}>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              customInput={<StartDateInput/>}
              dateFormat='MMM d,yyyy'
            />
            </Grid>
            <label style={{marginTop:20,marginLeft:10,marginRight:10,
               fontSize:20,color:'grey'}}>
              to
            </label>
            <Grid item style={{width:140}}>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              customInput={<EndDateInput />}
              dateFormat='MMM d,yyyy'
            />
            </Grid>
            </Grid>
            <Grid item style={{marginTop:12}}>
            <FormControl style={styles.formControl}>
              <InputLabel
                id="mutiple-checkbox-label"
                style={{ paddingLeft: 30, color: "grey",paddingBottom:50,
              marginBottom:20 }}
              >
                Filter by channel
              </InputLabel>
              <Select
                id="drop-down"
                onChange={(e) => setKeysDetected(e.target.value)}
              className="form-control mb-0"
              //defaultValue={keysDetected}
              value={keysDetected}
                displayEmpty
                
                autoWidth={false}
                style={{
                  color: "black",
                  backgroundColor: "transparent",
                  outline: "none",
                  border: "none",
                  boxShadow: "none",
                  margin: "10px 30px 0px 20px",
                  width: 220,
                }}
              >
                <MenuItem value="STREAMREADER"
              >
                    StreamReader</MenuItem>
                  <MenuItem value="PORTAL"
                  >
                    SonicPortal</MenuItem>
                  <MenuItem value="MOBILEAPP"
                  >
                    SonicApp</MenuItem>
              </Select>
            </FormControl>
            
          <Button
              variant="contained"
              color="primary"
              style={{
                padding: 12,
                borderRadius: 5,
                background: "rgb(52, 63, 132)",
                marginTop:5,
                marginLeft:30
              }}
            >
              Filter
            </Button>
            
            </Grid>
            </Grid>
        </Paper>
        
      {!props.loading && !props.error ? (
        <TableContainer style={{ ...tableStyle.container }}>
          <Table aria-label="Detail table">
            <TableHead>
              <TableRow hover>
                {columns?.map((col) => {
                  const isItemSelected = isSelected(col);
                  return (
                    <TableCell style={{ ...tableStyle.head }}>
                      {isItemSelected && <>{col}
                      <UnfoldMoreSharpIcon
                        style={{ fontSize: 12, fontWeight: "bold" }}
                        //   onClick={handleSort("id", prop.propFrom)}
                        className="sortIcon"
                      /></>
                }
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData?.docs?.length >0 ?(
                 tableData?.docs?.map((file, index) => { 
                return (
                  <TableRow hover className={classes.tableRow}>
                    <TableCell style={{ ...tableStyle.body }}>
                      {isSelected("ID") && index + 1}
                    </TableCell>
                    <TableCell style={{ ...tableStyle.body, fontSize: 15,
                    cursor:'pointer' }}
                    onClick={() => fetchSonicKeyById(file?.sonicKey)}>
                      {isSelected("SONICKEY") && file?.sonicKey?.sonicKey}
                    </TableCell>
                    <TableCell style={{ ...tableStyle.body, color: "#757575" }}>
                      {isSelected("NAME") && file?.sonicKey?.contentName}
                    </TableCell>
                    <TableCell style={{ ...tableStyle.body, color: "#757575" }}>
                      {isSelected("ARTIST") && file?.sonicKey?.contentOwner}
                    </TableCell>
                    <TableCell style={{ ...tableStyle.body, color: "#757575" }}>
                      {isSelected("QUALITY") && file?.sonicKey?.contentQuality}
                    </TableCell>
                    <TableCell style={{ ...tableStyle.body, color: "#757575" }}>
                      {isSelected("DESCRIPTION") && file?.sonicKey?.contentDescription}
                    </TableCell>
                    <TableCell
                    onClick={() => openPopUp(file?.sonicKey?._id)}
                      style={{ ...tableStyle.body, cursor: "pointer" }}
                    >
                      {isSelected("HITS") && file?.totalHits}
                    </TableCell>
                  </TableRow>
                );
              })):<TableRow>
                <TableCell colSpan={7}align={'center'}>
                No Data
                    </TableCell></TableRow>}
            </TableBody>
          </Table>
        </TableContainer>
      ) : props.loading ? (
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
    loading : state.thirdPartyKeys.loading,
    error : state.thirdPartyKeys.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchThirdPartyKeys: (limit, index,channel) => dispatch(fetchThirdPartySonicKeys(limit, index,channel)),
  };}

export default connect(mapStateToProps, mapDispatchToProps)(SonicStreamPlays);
