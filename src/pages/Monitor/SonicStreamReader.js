// import React,{ useState, useEffect,useRef } from 'react';
// import PropTypes from 'prop-types';
// import clsx from 'clsx';
// import { lighten, makeStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TablePagination from '@material-ui/core/TablePagination';
// import TableRow from '@material-ui/core/TableRow';
// import TableSortLabel from '@material-ui/core/TableSortLabel';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Paper from '@material-ui/core/Paper';
// import Checkbox from '@material-ui/core/Checkbox';
// import IconButton from '@material-ui/core/IconButton';
// import Tooltip from '@material-ui/core/Tooltip';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Switch from '@material-ui/core/Switch';
// import DeleteIcon from '@material-ui/icons/Delete';
// import FilterListIcon from '@material-ui/icons/FilterList';
// import BackgoundCard from './Components/BackgoundCard';
// import { withStyles } from '@material-ui/styles';
// import Hits from './Components/Hits';

// const radiostations = [{
//               "createdAt": "2021-09-01T14:07:57.951Z",
//               "error": null,
//               "isError": false,
//               "isStreamStarted": false,
//               "logo": "https://favicons.githubusercontent.com/109.71.67.102",
//               "name": "Rádio Beta",
//               "notes": "",
//               "owner": "5728f50d-146b-47d2-aa7b-a50bc37d641d",
//               "streamingUrl": "http://109.71.67.102:8000/beta_live_high.mp3",
//               "updatedAt": "2021-09-01T14:07:57.951Z",
//               "website": "https://beta.sk/",
//               "_id": "612f893d4a11109bf4a11392", 
//           }];

// const StyledTableCell = withStyles((theme) => ({
//   head: {
//     color: "#D0D0D0",
//     fontWeight:'bold',
//     fontSize:10,
//   },
//   body: {
//     fontSize: 10,
//     fontWeight:'bold',
//     color: "#424C8C",
//   },
// }))(TableCell);

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort(array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

// const headCells = [
//   { id: 'radio_id', numeric: false, disablePadding: true, label: 'ID' },
//   { id: 'radio_logo', numeric: true, disablePadding: false, label: 'LOGO' },
//   { id: 'radio_name', numeric: true, disablePadding: false, label: 'RADIO NAME' },
//   { id: 'radio_url', numeric: true, disablePadding: false, label: 'RADIO URL' },
//   { id: 'added_date', numeric: true, disablePadding: false, label: 'ADDED DATE' },
//   { id: 'hits', numeric: true, disablePadding: false, label: 'HITS' },
//   { id: 'status', numeric: true, disablePadding: false, label: 'STATUS' },
//   { id: 'action', numeric: true, disablePadding: false, label: 'ACTION' },
// ];

// function EnhancedTableHead(props) {
//   const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
//   const createSortHandler = (property) => (event) => {
//     onRequestSort(event, property);
//   };

//   return (
//     <TableHead>
//       <TableRow>
//         <TableCell padding="checkbox">
//           <Checkbox
//             indeterminate={numSelected > 0 && numSelected < rowCount}
//             checked={rowCount > 0 && numSelected === rowCount}
//             onChange={onSelectAllClick}
//             inputProps={{ 'aria-label': 'select all desserts' }}
//           />
//         </TableCell>
//         {headCells.map((headCell) => (
//           <StyledTableCell
//             key={headCell.id}
//             align={headCell.numeric ? 'right' : 'left'}
//             padding={headCell.disablePadding ? 'none' : 'normal'}
//           //  sortDirection={orderBy === headCell.id ? order : false}
//           >
//             {/* <TableSortLabel
//               active={orderBy === headCell.id}
//               direction={orderBy === headCell.id ? order : 'asc'}
//               onClick={createSortHandler(headCell.id)}
//             > */}
//               {headCell.label}
//               {orderBy === headCell.id ? (
//                 <span className={classes.visuallyHidden}>
//                   {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                 </span>
//               ) : null}
//             {/* </TableSortLabel> */}
//           </StyledTableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }

// EnhancedTableHead.propTypes = {
//   classes: PropTypes.object.isRequired,
//   numSelected: PropTypes.number.isRequired,
//   onRequestSort: PropTypes.func.isRequired,
//   onSelectAllClick: PropTypes.func.isRequired,
//   order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//   orderBy: PropTypes.string.isRequired,
//   rowCount: PropTypes.number.isRequired,
// };

// const useToolbarStyles = makeStyles((theme) => ({
//   root: {
//     paddingLeft: theme.spacing(2),
//     paddingRight: theme.spacing(1),
//   },
//   highlight:
//     theme.palette.type === 'light'
//       ? {
//           color: theme.palette.secondary.main,
//           backgroundColor: lighten(theme.palette.secondary.light, 0.85),
//         }
//       : {
//           color: theme.palette.text.primary,
//           backgroundColor: theme.palette.secondary.dark,
//         },
//   title: {
//     flex: '1 1 100%',
//   },
// }));

// const EnhancedTableToolbar = (props) => {
//   const classes = useToolbarStyles();
//   const { numSelected } = props;

//   return (
//     <Toolbar
//       // className={clsx(classes.root, {
//       //   [classes.highlight]: numSelected > 0,
//       // })}
//     >
      
//         <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
//           <BackgoundCard header='Sonic StreamReader' subheader='List 4 radio stations' />
//         </Typography>

//       {/* {numSelected > 0 ? (
//         <Tooltip title="Delete">
//           <IconButton aria-label="delete">
//             <DeleteIcon />
//           </IconButton>
//         </Tooltip>
//       ) : (
//         <Tooltip title="Filter list">
//           <IconButton aria-label="filter list">
//             <FilterListIcon />
//           </IconButton>
//         </Tooltip>
//       )} */}
//     </Toolbar>
//   );
// };

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//   },
//   paper: {
//     width: '100%',
//     marginBottom: theme.spacing(2),
//   },
//   table: {
//     // minWidth: 750,
//   },
//   visuallyHidden: {
//     border: 0,
//     clip: 'rect(0 0 0 0)',
//     height: 1,
//     margin: -1,
//     overflow: 'hidden',
//     padding: 0,
//     position: 'absolute',
//     top: 20,
//     width: 1,
//   },
// }));

// export default function SonicStreamReader() {
//   const classes = useStyles();
//   const [order, setOrder] = React.useState('asc');
//   const [orderBy, setOrderBy] = React.useState('calories');
//   const [selected, setSelected] = React.useState([]);
//   const [page, setPage] = React.useState(0);
//   const [dense, setDense] = React.useState(false);
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);
//   let componentRef = useRef(null);
//   const handleRequestSort = (event, property) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   };

//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelecteds = radiostations.map((n) => n.name);
//       setSelected(newSelecteds);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleClick = (event, name) => {
//     const selectedIndex = selected.indexOf(name);
//     let newSelected = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, name);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1),
//       );
//     }

//     setSelected(newSelected);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const isSelected = (name) => selected.indexOf(name) !== -1;

//   const emptyRows = rowsPerPage - Math.min(rowsPerPage, radiostations.length - page * rowsPerPage);
  
//   return (
//     <div className={classes.root}>
//       <Paper className={classes.paper}>
//         <EnhancedTableToolbar numSelected={selected.length} />
//         <TableContainer style={{padding:30}}>
//           <Table
//             className={classes.table}
//             aria-labelledby="tableTitle"
//             size={dense ? 'small' : 'medium'}
//             aria-label="enhanced table"
//           >
//             <EnhancedTableHead
//               classes={classes}
//               numSelected={selected.length}
//               order={order}
//               orderBy={orderBy}
//               onSelectAllClick={handleSelectAllClick}
//               onRequestSort={handleRequestSort}
//               rowCount={radiostations.length}
//             />
//             <TableBody>
//               {stableSort(radiostations, getComparator(order, orderBy))
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((row, index) => {
//                   const isItemSelected = isSelected(row.name);
//                   const labelId = `enhanced-table-checkbox-${index}`;

//                   return (
//                                       <TableBody ref={(el) => (componentRef = el)}>
//                     {radiostations?.map((file, index) => {
//                       return (
//                         <TableRow key={file?._id}>
                            
//                           <StyledTableCell>{index + 1}</StyledTableCell>
//                           <StyledTableCell>
//                           <img src={file?.logo} />
//                           </StyledTableCell>
//                             <StyledTableCell>{file?.name}</StyledTableCell>
//                           <StyledTableCell>{file?.streamingUrl}</StyledTableCell>

//                           <StyledTableCell>{file?.createdAt}</StyledTableCell>
//                           <StyledTableCell><Hits/></StyledTableCell>
//                       <StyledTableCell>{file.isStreamStarted===false?'Not Listening':'false'}</StyledTableCell>  
//                       <StyledTableCell>Details</StyledTableCell>
//                         </TableRow>
//                       );
//                     })}
//                     </TableBody>
//                     // <TableRow
//                     //   hover
//                     //   onClick={(event) => handleClick(event, row.name)}
//                     //   role="checkbox"
//                     //   aria-checked={isItemSelected}
//                     //   tabIndex={-1}
//                     //   key={row.name}
//                     //   selected={isItemSelected}
//                     // >
//                     //   <TableCell padding="checkbox">
//                     //     <Checkbox
//                     //       checked={isItemSelected}
//                     //       inputProps={{ 'aria-labelledby': labelId }}
//                     //     />
//                     //   </TableCell>
//                     //   <TableCell component="th" id={labelId} scope="row" padding="none">
//                     //     {row.name}
//                     //   </TableCell>
//                     //   <TableCell align="right">{row.calories}</TableCell>
//                     //   <TableCell align="right">{row.fat}</TableCell>
//                     //   <TableCell align="right">{row.carbs}</TableCell>
//                     //   <TableCell align="right">{row.protein}</TableCell>
//                     // </TableRow>

// );
//                 })}
//               {emptyRows > 0 && (
//                 <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
//                   <TableCell colSpan={6} />
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={radiostations.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>
//       {/* <FormControlLabel
//         control={<Switch checked={dense} onChange={handleChangeDense} />}
//         label="Dense padding"
//       /> */}
//     </div>
//   );
// }

import React, { useState, useEffect,useRef } from 'react';
import Card from 'react-bootstrap/Card';
import { MuiThemeProvider, withStyles, makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import cogoToast from 'cogo-toast';
import InfoIcon from '@material-ui/icons/Info';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import MusicOffIcon from '@material-ui/icons/MusicOff';
import CancelIcon from '@material-ui/icons/Cancel';
import CloseIcon from '@material-ui/icons/Close';
import StorageIcon from '@material-ui/icons/Storage';
import ReorderIcon from '@material-ui/icons/Reorder';
import MUIDataTable from "mui-datatables";
import { Badge } from 'react-bootstrap';
import { cloneDeep } from 'lodash';
import axios from 'axios';
import { Auth } from 'aws-amplify';
import ErrorModal from './Components/ErrorModal';
import CustomButton from './Components/CustomButton';
import Grid from '@material-ui/core/Grid';
import Constant from '../../assets/Constant';
import LoadingSpinner from './Components/LoadingSpinner';
import InfoCard from './Components/InfoCard';
import Graph from './Components/Graph';
import GraphCard from './Components/GraphCard';
import Hits from './Components/Hits';
import * as actionCreators from '../../stores/actions/index';
import { getAccessToken, getUserId,getAdmin } from '../../services/https/AuthHelper';
import httpUrl from '../../services/https/httpUrl';
import { errorCount, getAllRadioStations, unauthorizedRedirection, hitsDataArray, listeningCount, notListeningCount, todayRange, weekRange, monthRange } 
from '../../utils/HelperMethods';
import { log } from '../../utils/app.debug';
import ButtonSpinner from './Components/ButtonSpinner';
import { Box, Button, Container, createMuiTheme, FormControl, MenuItem, Paper, Select, Typography } from '@material-ui/core';
import BackgoundCard from './Components/BackgoundCard';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from '@material-ui/core/Checkbox';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import CreateIcon from '@material-ui/icons/Create';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import Pagination from "@material-ui/lab/Pagination";
import PlayCircleOutlineRoundedIcon from '@material-ui/icons/PlayCircleOutlineRounded';
import StopOutlinedIcon from '@material-ui/icons/StopOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';


const StyledTableCell = withStyles((theme) => ({
    head: {
      color: "rgb(156, 164, 171)",
      fontWeight:'bold',
      fontSize:10,
    },
    body: {
      fontSize: 10,
      fontWeight:'bold',
      color: "rgb(52, 63, 132)",
    },
    tableRow: {
      "&:hover": {
        boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 1px 5px rgba(0,0,0,0.22)",
        cursor: "pointer",
      },
    },
  }))(TableCell);
  

const getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTable: {
          root: {
            backgroundColor: '',
          },
          paper: {
            boxShadow: '',
          },
        },
        MuiTableHead: {   // overriding of MuiTableHead
            root: {  //overriding root
              background: "#ADD8E6",
              fontWeight : 'bold'
            }
          },
        MuiToolbar: {
          root: {
            backgroundColor: '',
          },
        },
        MuiTableCell: {
          head: {
            backgroundColor: '',
          },
        },
        MUIDataTableSelectCell: {
          headerCell: {
            backgroundColor: '',
          },
        },
        MuiTableFooter: {
          root: {
            '& .MuiToolbar-root': {
              backgroundColor: '',
            },
          },
        },
      },
    });
    
    
const useStyles = makeStyles((theme) => ({
  tableRow: {
    "&:hover": {
      boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 1px 5px rgba(0,0,0,0.22)",
      cursor: "pointer",
    },},      
  homeTableDelete: {
          [theme.breakpoints.down('sm')]: {
            marginBottom: 10
          },
        },

        firstCardContainer: {
            [theme.breakpoints.down('sm')]: {
                 display:'flex',
                // border : '1px solid red',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
              },
              [theme.breakpoints.up('md')]: {
                display:'flex',
                // border : '1px solid red',
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
              [theme.breakpoints.up('lg')]: {
                display:'flex',
                // border : '1px solid red',
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
          },
      }));


function SonicStreamReader(props) {
    let hitsArray = [];
    // let radiostations = [];
    let componentRef = useRef(null);
    const classes = useStyles();
    const [ deleteLoading, setDeleteLoading ] = useState(false);
    const [ startLoading, setStartLoading ] = useState(false);
    const [ stopLoading, setStopLoading ] = useState(false);
    const [ show, setShow ] = useState(false);
    const [ showAdd, setShowAdd ] = useState(false);
    const [ selectedRows, setSelectedRows ] = useState([]);

    //for pagination state
    const [page, setPage] = useState(props.radiostationPageNum ? props.radiostationPageNum : 0);
    const [rowsPerPage, setRowsPerPage] = useState(props.radiostationRowsperPage ? props.radiostationRowsperPage : 5);
    // const [totalCount, setTotalCount] = useState(0);
    const [startIndex, setStartIndex] = useState(0);

    //for search logic
    const [searchValue, setSearchValue] = useState('');
    
    const useStyleClasses = useStyles();
    // log("RRRRRRRRradiostations",radiostations)

//    let radiostations = cloneDeep(props.radiostations);
        let radiostations = [{
            "createdAt": "2021-09-01T14:07:57.951Z",
            "error": null,
            "isError": false,
            "isStreamStarted": false,
            "logo": "https://favicons.githubusercontent.com/109.71.67.102",
            "name": "Rádio Beta",
            "notes": "",
            "owner": "5728f50d-146b-47d2-aa7b-a50bc37d641d",
            "streamingUrl": "http://109.71.67.102:8000/beta_live_high.mp3",
            "updatedAt": "2021-09-01T14:07:57.951Z",
            "website": "https://beta.sk/",
            "_id": "612f893d4a11109bf4a11392", 
        },
        {
          "createdAt": "2021-09-01T14:07:57.951Z",
          "error": null,
          "isError": false,
          "isStreamStarted": false,
          "logo": "https://favicons.githubusercontent.com/109.71.67.102",
          "name": "Jovem Pan FM",
          "notes": "",
          "owner": "5728f50d-146b-47d2-aa7b-a50bc37d641d",
          "streamingUrl": "https://18683.live.streamtheworld.com/JP_SP_FM.mp3",
          "updatedAt": "2021-09-01T14:07:57.951Z",
          "website": "https://beta.sk/",
          "_id": "612f893d4a11109bf4a11392", 
      },
      {
        "createdAt": "2021-09-01T14:07:57.951Z",
        "error": null,
        "isError": false,
        "isStreamStarted": true,
        "logo": "https://favicons.githubusercontent.com/109.71.67.102",
        "name": "Sunshine Live",
        "notes": "",
        "owner": "5728f50d-146b-47d2-aa7b-a50bc37d641d",
        "streamingUrl": "https://sunshinelive.hoerradar.de/sunshinelive-live-mp3-hq?sABC=612s290s%231%2339s8rn936s5onqpprrqo191ror82o418%23ubzrcntr&mode=preroll&aw_0_1st.skey=1630460837&cb=231888020&=&aw_0_1st.playerid=sunshine-live_web&aw_0_req.userConsentV2=CPLsWAIPLsWBtAFADCDEBpCsAP_AAH_AAAYgILtf_X__bX9j-_59f_t0eY1P9_r_v-Qzjhfdt-8F2L_W_L0X52E7NF36pq4KuR4Eu3LBIQNlHMHUTUmwaokVrzPsak2Mr6NKJ7LEmnMZO2dYGHtPn91TuZKY7_78__fz3z-v_t___9f3_-3_3__5_X---_f_V399zLv9____393N___9uCCgBJhqXkAXZljgybRpVCiBGFYSHQCgAooBhaJrABgcFOysAj1BCwAQmoCMCIEGIKMGAQACCQBIREBIAWCARAEQCAAEAKkBCAAiYBBYAWBgEAAoBoWIEUAQgSEGRwVHKYEBUi0UE9lYAlF3saYQhlvgRQKP6KjARrNECwMhIWDmOAJAS8AINAnACsAFwAQwAyABlgDUAGyAPwAgABBQCMAFLAKeAVeAtAC0gGsAN4AdUA-QCHQEVAIvASIAmwBOwCkQFyAMCAYSAw8BjADJwGcgM8AZ8A5IBygDrAH4CIEAAVgBDADIAGWANQAbIA_ACAAEYAKWAU8Aq4BrADqgHyAQ6Ai8BIgCbAE7AKRAXIAwIBhIDDwGTgM5AZ8A5IBygDrAH4AA.YAAAAAAAAAAA&aw_0_1st.kuid=wbxdivhqj&aw_0_1st.ksg=[%22vz9c46692%22]&listenerid=39f8ea936f5badcceedb191ebe82b418&amsparams=playerid:homepage;skey:1630480655",
        "updatedAt": "2021-09-01T14:07:57.951Z",
        "website": "https://beta.sk/",
        "_id": "612f893d4a11109bf4a11392", 
    },
    {
      "createdAt": "2021-09-01T14:07:57.951Z",
      "error": null,
      "isError": false,
      "isStreamStarted": false,
      "logo": "https://favicons.githubusercontent.com/109.71.67.102",
      "name": "Radio Rock",
      "notes": "",
      "owner": "5728f50d-146b-47d2-aa7b-a50bc37d641d",
      "streamingUrl": "https://live-bauerno.sharp-stream.com/radiorock_no_mp3",
      "updatedAt": "2021-09-01T14:07:57.951Z",
      "website": "https://beta.sk/",
      "_id": "612f893d4a11109bf4a11392", 
  },
  {
    "createdAt": "2021-09-01T14:07:57.951Z",
    "error": null,
    "isError": false,
    "isStreamStarted": false,
    "logo": "https://favicons.githubusercontent.com/109.71.67.102",
    "name": "Tune1",
    "notes": "",
    "owner": "5728f50d-146b-47d2-aa7b-a50bc37d641d",
    "streamingUrl": "https://streams.radiomast.io/60978a80-2c29-4b03-b3a4-6a8796f7da9d#.mp3",
    "updatedAt": "2021-09-01T14:07:57.951Z",
    "website": "https://beta.sk/",
    "_id": "612f893d4a11109bf4a11392", 
},{
            "createdAt": "2021-09-01T14:07:57.951Z",
            "error": null,
            "isError": false,
            "isStreamStarted": false,
            "logo": "https://favicons.githubusercontent.com/109.71.67.102",
            "name": "Sine FM",
            "notes": "",
            "owner": "5728f50d-146b-47d2-aa7b-a50bc37d641d",
            "streamingUrl": "https://443.sslradio.com/20/stream?DIST=TuneIn&TGT=TuneIn&maxServers=2&gdpr=0&us_privacy=1YNY&partnertok=eyJhbGciOiJIUzI1NiIsImtpZCI6InR1bmVpbiIsInR5cCI6IkpXVCJ9.eyJ0cnVzdGVkX3BhcnRuZXIiOnRydWUsImlhdCI6MTYzMDQ3OTYxNCwiaXNzIjoidGlzcnYifQ.GnagGO6c7sLA7mUrHFOW4DW56KqvKvFdwFA9mBVggMo",
            "updatedAt": "2021-09-01T14:07:57.951Z",
            "website": "https://beta.sk/",
            "_id": "612f893d4a11109bf4a11392", 
        }];
        const columns = ["ID","LOGO","RADIO NAME","RADIO URL","ADDED DATE","HITS","STATUS","ACTION"]
    useEffect(() => {
        if (props.radiostations.length <= 0) {
            props.fetchRadioStations(0,5);
        }
      }, []);

      const onTableChangeFetch = (_offset=0,_limit=5, key1="name", key2="streamingUrl", value = '') => {
        const ownerId = getUserId();
        //   dispatch(fetchRadioStationsBegin());
          return  axios({
            method: 'get', 
            url: `${httpUrl.API_URL}/radiostations/owners/${ownerId}?skip=${_offset}&limit=${_limit}&sort=-createdAt`,
            // url: `${httpUrl.API_URL}/radiostations/owners/${ownerId}?skip=${_offset}&limit=${_limit}&sort=-createdAt&${key1}=/${value}/i`,
            // url: `${httpUrl.API_URL}/radiostations/owners/${ownerId}?filter={"$or":[{${key1}:/${value}/i}]}&skip=${_offset}&limit=${_limit}&sort=-createdAt`,
            // params: {
            //     [`${key1}`]:`/${value}/i`,
            //     [`${key2}`]:`/${value}/i`
            //   },
            // params: {
            //       filter: {
            //         $or: [
            //           { [`${key1}`]:`/${value}/i`},
            //           { [`${key2}`]:`/${value}/i` }
            //         ],
            //       },
            //   }, 

            params: {
                filter: {
                  $or: [
                    { [`name`]: { "$regex": `${value ? value : ""}`, "$options": "i" }},
                    { [`streamingUrl`]: { "$regex": `${value ? value : ""}`, "$options": "i" }},
                  ],
                },
            }, 
            headers: {
                "Authorization":`Bearer ${getAccessToken()}`
                // "Authorization":`Bearer 123`
              }
          })
          .then(res => {
            //  dispatch(fetchRadioStationsSuccess(res.data));
             props.fetchRadioStationsSuccess(res.data);
             log("fetch radiostations response from home page",res.data);
           })
           .catch(err=>{
                    log("fetch radiostations error from home page",err.response);
                    if (err.response) {
                        // log("error status code",err.response.status);
                        // dispatch(fetchRadioStationsFailure(err.response.data.message));
                        unauthorizedRedirection(err.response.status, props.dispatch);
                        props.fetchRadioStationsFailure(err.response.data.message);
                    } else if (err.request) {
                        // dispatch(fetchRadioStationsFailure("Request error for fetch radiostations!!!"));
                        props.fetchRadioStationsFailure("Request error for fetch radiostations!!!");                    
                    } else {
                        // dispatch(fetchRadioStationsFailure("Unexpected error occured while fetching radiostations!!!"));
                        props.fetchRadioStationsFailure("Unexpected error occured while fetching radiostations!!!");        
                    }
                }
           );
    }


      useEffect(() => {
        // log("after row manupulation", selectedRows);
        // log("page countttttttt", page)
     }, [page]);


// ================================FUNCTIONS=====================================================       
        const handlePageChange = async (event, value) => {
        //  const userId = getUserId();
          const limit = 10;
          const page = value;
          // dispatch({ type: "SET-PAGE", data: value });
          // await dispatch(actionGetJobList(userId, limit, page));
        };        
        const onHide = () => {
            setShow(false);
        }

        const onAddHide = () => {
            setShowAdd(false);
        }
        
        const onDelete = () => {
            setDeleteLoading(true)
            onHide();
            // log('selectedRows',selectedRows)
            var selectedRadioStations = selectedRows.map(i => radiostations[i])
            const selectedRadioStationsId = selectedRadioStations.map(station => station._id);
            const payload = {
                ids : selectedRadioStationsId
            }
            axios({
                    method: 'delete',
                    url: `${httpUrl.API_URL}/radiostations/delete/bulk`,
                    data: payload,
                    headers: {
                        "Authorization":`Bearer ${getAccessToken()}`
                    }
                })
                .then(successResponse=>{
                    log('delete response in radiostations', successResponse.data)
                    if(successResponse.data.failedData.length === 0){
                        props.fetchRadioStations(startIndex,rowsPerPage);
                        setSelectedRows([]);
                        setDeleteLoading(false)
                        cogoToast.success("Successfully deleted")
                    }else if(successResponse.data.passedData.length === 0){
                        // props.fetchRadioStations();
                        setSelectedRows([]);
                        setDeleteLoading(false)
                        cogoToast.error("Please try deleting Again")
                    }else{
                        props.fetchRadioStations(startIndex,rowsPerPage);
                        setSelectedRows([]);
                        setDeleteLoading(false)
                        cogoToast.info("Partially deleted, try deleting again for remaining ones")
                    }
                    
                })
                .catch(err=>{
                    setDeleteLoading(false)
                    if (err.response) {
                        log("delete radiostations error",err.response);
                        unauthorizedRedirection(err.response.status, props.dispatch);
                        cogoToast.error(err.response.data.message)
                    } else if (err.request) {
                        cogoToast.error("Request error!!!")                        
                    } else {
                        cogoToast.error("Unexpected error occured!!!")          
                    }
                });
        };

        const onStart = () => {
            setStartLoading(true)
            // log('selectedRows',selectedRows)
            var selectedRadioStations = selectedRows.map(i => radiostations[i])
            const selectedRadioStationsId = selectedRadioStations.map(station => station._id);
            const payload = {
                ids : selectedRadioStationsId
            }
            // return;
            axios({
                    method: 'put',
                    url: `${httpUrl.API_URL}/radiostations/start-listening-stream/bulk`,
                    data: payload,
                    headers: {
                        "Authorization":`Bearer ${getAccessToken()}`
                    }
                })
                .then(successResponse=>{
                    log('start streaming radiostations response', successResponse.data)

                    if(successResponse.data.failedData.length === 0){
                        props.fetchRadioStations(startIndex,rowsPerPage);
                        setSelectedRows([]);
                        setStartLoading(false)
                        cogoToast.success("Successfully started")
                    }else if(successResponse.data.passedData.length === 0){
                        // props.fetchRadioStations();
                        setSelectedRows([]);
                        setStartLoading(false)
                        cogoToast.error("Please try starting Again")
                    }else{
                        props.fetchRadioStations(startIndex,rowsPerPage);
                        setSelectedRows([]);
                        setStartLoading(false)
                        cogoToast.info("Partially started, try starting again for remaining ones")
                    }
                })
                .catch(err=>{
                    setStartLoading(false)
                    if (err.response) {
                        log("start streaming radiostations error",err.response);
                        unauthorizedRedirection(err.response.status, props.dispatch);
                        cogoToast.error(err.response.data.message)
                    } else if (err.request) {
                        cogoToast.error("Request error!!!")                        
                    } else {
                        log("err", err)
                        cogoToast.error("Unexpected error occured!!!")          
                    }
                });
        };


        const onStop = () => {
            setStopLoading(true)
            // log('selectedRows',selectedRows)
            var selectedRadioStations = selectedRows.map(i => radiostations[i])
            const selectedRadioStationsId = selectedRadioStations.map(station => station._id);
            const payload = {
                ids : selectedRadioStationsId
            }
            log('selected rows id after map', selectedRadioStationsId);
            // return;
            axios({
                    method: 'put',
                    url: `${httpUrl.API_URL}/radiostations/stop-listening-stream/bulk`,
                    data: payload,
                    headers: {
                        "Authorization":`Bearer ${getAccessToken()}`
                    }
                })
                .then(successResponse=>{
                    log('stop streaming radiostations response', successResponse.data)

                    if(successResponse.data.failedData.length === 0){
                        props.fetchRadioStations(startIndex,rowsPerPage);
                        setSelectedRows([]);
                        setStopLoading(false)
                        cogoToast.success("Successfully stopped")
                    }else if(successResponse.data.passedData.length === 0){
                        // props.fetchRadioStations();
                        setSelectedRows([]);
                        setStopLoading(false)
                        cogoToast.error("Please try stoping Again")
                    }else{
                        props.fetchRadioStations(startIndex,rowsPerPage);
                        setSelectedRows([]);
                        setStopLoading(false)
                        cogoToast.info("Partially stopped, try stoping again for remaining ones")
                    }
                })
                .catch(err=>{
                    setStopLoading(false)
                    if (err.response) {
                        log("stop radiostations streaming error",err.response);
                        unauthorizedRedirection(err.response.status, props.dispatch);
                        cogoToast.error(err.response.data.message)
                    } else if (err.request) {
                        cogoToast.error("Request error!!!")                        
                    } else {
                        cogoToast.error("Unexpected error occured!!!")          
                    }
                });
        };
    return (
        <>
        <Paper 
        style={{outline:0,marginTop:-25,display:'flex',flexDirection:'column'}}elevation={8}>
            <BackgoundCard header='Sonic StreamReader' subheader='List 4 radio stations' />
            <Paper maxWidth="lg" style={{marginTop:15,padding:10,margin:20,display:'flex',
            flexGrow:1,flexDirection:'row',justifyContent:'space-between'}}>
              <div style={{margin:10}}>
                        {/* <CustomButton 
                            className={useStyleClasses.homeTableDelete} 
                            buttonText="Delete"
                            disabled={selectedRows.length > 0 ? false :true}
                            onClick={ () => {
                                setShow(true)
                                //   onClick function goes here
                            }}
                            style={{ backgroundColor:Constant.color.deleteButtonColor, marginRight: 10 }}
                        /> */}
                        <button 
                            disabled={selectedRows.length > 0 ? false :true}
                        //    className={[useStyleClasses.homeTableDelete, 'customButton'].join(' ')}
                            onClick={() => {
                                onStart()
                            }} 
                            style={{...styles.submitButton, marginRight: 10} }
                        >
                            {startLoading ? <ButtonSpinner grow={true} /> :
                            <div style={{justifyContent:'center',display:'flex',
                            }}>
                              <PlayCircleOutlineRoundedIcon  
                            style={{fontSize:15,marginRight:6}}/>
                             Start 
                            </div>
                            }
                        </button>

                        <button 
                            disabled={selectedRows.length > 0 ? false :true}
                            className={[useStyleClasses.homeTableDelete, 'customButton'].join(' ')}
                            onClick={() => {
                                onStop()
                            }} 
                            style={{...styles.submitButton} }
                        >
                            {stopLoading ? <ButtonSpinner grow={true} /> : 
                            <div style={{justifyContent:'center',display:'flex',
                            }}>
                              <StopOutlinedIcon  
                            style={{fontSize:15,marginRight:6}}/>
                             Stop 
                            </div>
                            }
                        </button>
                        <button 
                            disabled={selectedRows.length > 0 ? false :true}
                            className={[useStyleClasses.homeTableDelete, 'customButton'].join(' ')}
                            onClick={() => {
                                setShow(true)
                            }} 
                            style={{...styles.submitButton, marginRight: 10} }
                        >
                            {deleteLoading ? <ButtonSpinner grow={true} /> : 
                            <div style={{justifyContent:'center',display:'flex',
                            }}>
                              <CancelOutlinedIcon  
                            style={{fontSize:15,marginRight:6}}/>
                             Delete 
                            </div>
                            }
                        </button>
                    </div>
              

              <div>
            <FormControl style={styles.formControl}>
              <Select
                id="drop-down"
                //onChange={(e) => setKeysDetected(e.target.value)}
                className="form-control mb-0"
                autoWidth={false}
                style={styles.dropdownButton}
              >
                <MenuItem disabled selected hidden>Radio Station</MenuItem>
                <MenuItem value="day">Radio Beta</MenuItem>
                <MenuItem value="week">Tune 1</MenuItem>
                <MenuItem value="month">Radio Rock</MenuItem>
              </Select>
            </FormControl>

              <Button variant="contained" color='primary'
              style={{padding:12,borderRadius:5,
              background:'rgb(52, 63, 132)'}} >  Subscribe
              </Button>
              </div>

            </Paper>
            {/* <div style={{flexGrow:'1'}}> */}
            {/* <Grid container spacing={0}> */}
                {/* <div> */}
                    <TableContainer style={{padding:20}}>
                    <Table className={classes.table} aria-label="customized table">
                      <TableHead>
                        <TableRow hover>
                        <TableCell padding="checkbox">
                          <Checkbox
                            // indeterminate={numSelected > 0 && numSelected < rowCount}
                            // checked={rowCount > 0 && numSelected === rowCount}
                            // onChange={onSelectAllClick}
                            // inputProps={{ 'aria-label': 'select all desserts' }}
                          />
                        </TableCell>
                            {columns?.map((col) => {
                                return(<StyledTableCell>{col}</StyledTableCell>)
                            })}
                        </TableRow>
                      </TableHead>

                  <TableBody ref={(el) => (componentRef = el)}>
                    {radiostations?.map((file, index) => {
                      return (
                        <TableRow key={file?._id} hover className={classes.tableRow}>
                          <TableCell padding="checkbox">
                        <Checkbox
                          // checked={isItemSelected}
                          // inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                            
                          <StyledTableCell>{index + 1}</StyledTableCell>
                          <StyledTableCell>
                          <CheckCircleOutlineRoundedIcon style={{fontSize:15}}/>
                          </StyledTableCell>
                          <StyledTableCell style={{fontSize:13}}>
                              {file?.name}
                          </StyledTableCell>
                          <StyledTableCell 
                          style={{maxWidth:400,wordWrap: 'break-word',color:'grey'}}>
                            {file?.streamingUrl}
                          </StyledTableCell>

                          <StyledTableCell style={{color:'grey'}}>
                          {moment(new Date(file?.createdAt)).format('DD-MM-YYYY')}</StyledTableCell>
                          <StyledTableCell><Hits/></StyledTableCell>
                      <StyledTableCell>
                      {file.isStreamStarted===true&&<Badge style={{cursor:'pointer',
                        background:'rgb(229, 245, 244)',padding:5,fontWeight:'lighter' }}
                         variant="warning">LISTENING</Badge>
                        }
                        {file.isStreamStarted===false&&<Badge style={{cursor:'pointer',
                        background:'yellow',padding:5,fontWeight:'lighter' }}
                         variant="warning">NOT LISTENING</Badge>
                        }
                        {!file.isStreamStarted && file.error !== null&&<Badge style={{cursor:'pointer',
                        background:'red',padding:5,fontWeight:'lighter',color:'white' }}
                         variant="warning">ERROR</Badge>
                        }
                      </StyledTableCell>  
                      <StyledTableCell>
                      Details
                        </StyledTableCell>
                        </TableRow>
                      );
                    })}
                    </TableBody>
                    </Table>
                    <Box my={2} display="flex" justifyContent="center">
                      <Pagination count={10}
                      page={1}
                      variant="outlined"
                      shape="rounded"
                      onChange={handlePageChange}/>
                    </Box>
                    </TableContainer>
                {/* </div> */}
        {/* </div> */}
        </Paper>
        </>
    )
};

const styles = {
    homeContainer:{
    },
    // firstCardContainer : {
    //     display:'flex',
    //     // width : '100%',
    //     // border : '1px solid red',
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    // },
    IconStyle: {
        height: 70,
        width: 70,
        color : 'white',
      },
    cardStyle : {
        marginTop: 10,
        padding : 10,
        // backgroundColor: 'rgba(0,0,0,0.1)'
        // borderRadius: 10,
        // boxShadow : '0px 0px 8px 2px #000000;',
    },
    actionContainer : {
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    muiTableHeadStyle : {
        backgroundColor: '#ADD8E6',
        // color:'#0269A4', 
        // opacity:0.9,
        // fontWeight: 'bold',
        whiteSpace: 'nowrap',
        wordWrap: 'break-word'
    },
    submitButton : {
        marginLeft: 10,
        height: '30px',
        color: 'black',
        fontWeight:'bold',
        width: 80,
        border: 'none',
        borderRadius: '50px',
        backgroundColor: 'transparent',
        boxShadow : '0px 0px 8px 2px #000000;'
    },
    dropdownButton: {
      color: 'black',
      backgroundColor: 'transparent',
      outline: 'none',
      border: 'none',
      boxShadow: 'none',
      width: 160,
      margin: '0px 30px 0px 20px',
    },
}

const mapStateToProps = (state) => {
    console.log(state.session);
    return {
        user: state.session, //Role of loginned user 2-sep-2021 
        loading : state.radiostations.loading,
        error : state.radiostations.error,
        radiostations : state.radiostations.radiostations,
        totalRadioStreams : state.radiostations.totalRadioStreams,

        sessionLoading : state.session.loading,
        // selectedRowss : state.global.selectedRows,

        // cardRadiostations : state.cardRadioStaions.cardRadiostations,
        // totalStationsCount : state.cardRadioStaions.totalStationsCount,

        topRadiostations : state.topRadiostation.topRadiostations,
        topRadiostationsLoading : state.topRadiostation.loading,
        topRadiostationsError : state.topRadiostation.error,

        day : state.count.day,
        week : state.count.week,
        month : state.count.month,
        hits : state.count.hits,
        hitsLoading : state.count.hitsLoading,
        hitsError : state.count.hitsError,

        totalRadiostaionCount : state.count.totalRadiostaionCount,
        totalListeningCount : state.count.totalListeningCount,
        totalNotListeningCount : state.count.totalNotListeningCount,
        totalErrorCount : state.count.totalErrorCount,

        radiostationPageNum : state.global.radiostationPageNum,
        radiostationRowsperPage : state.global.radiostationRowsperPage,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // onDeleteResult : (id) => dispatch(actionCreators.deleteResult(id))
        fetchRadioStations : (_offset, _limit) => dispatch(actionCreators.fetchRadioStations(_offset, _limit)),
        setSelectedRows : (rows) => dispatch(actionCreators.setSelectedRowsRadioStationTable(rows)),
        fetchRadioStationsSuccess : (payload) => dispatch(actionCreators.fetchRadioStationsSuccess(payload)),
        fetchRadioStationsFailure : (error) => dispatch(actionCreators.fetchRadioStationsFailure(error)),
        fetchRadiostationSonicKeyCount : (radiostationId) => dispatch(actionCreators.fetchRadiostationSonicKeyCount(radiostationId)),
        
        fetchDaySonicKeyCount : (tommorrow,today) => dispatch(actionCreators.fetchDaySonicKeyCount(tommorrow,today)),
        fetchWeekSonicKeyCount : (tommorrow,weekBack) => dispatch(actionCreators.fetchWeekSonicKeyCount(tommorrow,weekBack)),
        fetchMonthSonicKeyCount : (tommorrow,monthBack) => dispatch(actionCreators.fetchMonthSonicKeyCount(tommorrow,monthBack)),
        fetchTopRadioStation : () => dispatch(actionCreators.fetchTopRadioStation()),

        fetchTotalListeningCount : () => dispatch(actionCreators.fetchTotalListeningCount()),
        fetchTotalNotListeningCount : () => dispatch(actionCreators.fetchTotalNotListeningCount()),
        fetchTotalErrorCount : () => dispatch(actionCreators.fetchTotalErrorCount()),
        fetchTotalRadiostationCount : () => dispatch(actionCreators.fetchTotalRadiostationCount()),

        setRadiostationPageNum : (page) => dispatch(actionCreators.setRadiostationPageNum(page)),
        setRadiostationRowsperPage : (rowsPerPage) => dispatch(actionCreators.setRadiostationRowsperPage(rowsPerPage)),
        dispatch : dispatch,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SonicStreamReader);
// // export default Home;
