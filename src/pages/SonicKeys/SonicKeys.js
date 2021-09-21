import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Pagination from "@material-ui/lab/Pagination";
import "../SonicKeys/css/table.scss";
import UnfoldMoreSharpIcon from "@material-ui/icons/UnfoldMoreSharp";
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import GetAppIcon from '@material-ui/icons/GetApp';
import DailogTable from '../../components/common/DialogTable';
import { Box, CircularProgress, Grid, Typography } from '@material-ui/core';
import { tableStyle } from '../../globalStyle';
import FilterListIcon from '@material-ui/icons/FilterList';
import Communication from "../../services/https/Communication";
import { fetchSonicKeys } from "../../stores/actions/sonicKey";
import { connect, useSelector } from 'react-redux';
import { format, isValid } from 'date-fns';
import { converstionOfKb, downloadFile } from '../../utils/HelperMethods';
import download from "../../../src/assets/images/download.png";
import Search from "../SonicKeys/Components/Search";
import viewFilter from "../../../src/assets/images/view.png";



const StyledTableCell = withStyles((theme) => ({
    head: {
        color: "#D0D0D0",
    },
    body: {
        fontSize: 14,
        color: "#424C8C",
    },
}))(TableCell);

const useStyles = makeStyles({
    gridContainer: {
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
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
    table: {
        minWidth: 700,
        marginTop: 20,
        width: "100%",
    },
    tableRow: {
        "&:hover": {
            boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 1px 5px rgba(0,0,0,0.22)",
            cursor: "pointer",
        },
    },
    jobName: {
        fontSize: "large",
        fontWeight: "bolder",
        width: "50%",
    },
    sonicKeyText: {
        color: '#343F84',
        fontWeight: 'bold',
        fontSize: '18px'
    },
    tableCellColor: {
        color: '#343F84',
        fontWeight: 'bold'
    },
    tableCellIcon: {
        display: 'flex',
        alignItems: 'center'
    },
    tableCellNormalText: {
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#757575',
    }
});


const SonicKeys = (props) => {
    const [pageNum, setPage] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const [rowPerPage, setrowPerPage] = React.useState(10)
    const [searchValue, setSearchValue] = React.useState()
    const [openTable, setOpenTable] = React.useState(false)
    const [open, setOpen] = React.useState(false)
    const classes = useStyles();
    const [tableData, setTableData] = React.useState([]);
    const [totalCount, setTotalCount] = React.useState(0);
    const [page, setTotalPage] = React.useState(0);
    const [pagingCount, setTotalPageCount] = React.useState(0);
    const [error, setError] = React.useState('');
    const [restrict, setrestrict] = React.useState(false)
    const [offset, setOffset] = React.useState(0);
    const [pageCount, setPageCount] = useState(1);
    const [dataSearch, setDataSearch] = React.useState();
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

    const firstFetchSonicKey = (_offset = 0, _limit = 10, value = '') => {
        Communication.fetchMySonicKey(_limit, _offset, value).then((res) => {
            console.log("Data Response", res);
            setTableData(res.docs)
            setTotalCount(res.totalDocs)
            setTotalPage(res.totalPages)
            setOffset(res.offset)
            // setTotalPageCount(res.pagingCounter)
            setError('')
        }).catch(err => {
            setError(err)
        })
    }

    // const handleClickOpen = async (row) => {
    //     // const row = await props.sonicKeys.data.docs[(index)]
    //     console.log('Edit Screen Data', row);
    //     setSonicKeys({
    //       ...sonicKeys,
    //       sonicKey: row.sonicKey,
    //       contentName: row.contentName,
    //       contentOwner: row.contentOwner,
    //       contentValidation: row.contentValidation ? "YES" : "NO",
    //       contentQuality: row.contentQuality,
    //       contentDescription: row.contentDescription,
    //       contentFileName: row.contentFileName,
    //       contentFileType: row.contentFileType,
    //       createdAt: isValid(new Date(row.createdAt)) ? `${format(new Date(row.createdAt), 'dd/MM/yyyy')}` : "--",
    //       contentDuration: row?.contentDuration.toFixed(2),
    //       encodingStrength: row.encodingStrength,
    //       contentSize: converstionOfKb(row.contentSize),
    //       contentSamplingFrequency: row?.contentSamplingFrequency.replace('Hz', ''),
    //       additionalMetadata: row?.additionalMetadata.message ? row?.additionalMetadata.message : '',
    //       iswcCode: row.iswcCode ? row.iswcCode.toUpperCase() : '',
    //       isrcCode: row.isrcCode ? row.isrcCode.toUpperCase() : '',
    //       tuneCode: row.tuneCode ? row.tuneCode.toUpperCase() : '',
    //       contentType: row?.contentType
    //     })
    //     setOpen(true);
    //   };

    const handleClickOpenTable = async (data) => {
        // const data = await props.sonicKeys.data.docs[(row)]
        // const data = await tableData[(row)]
        console.log("cheking the data for dialog", data);
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
    const handleClose = () => {
        setOpen(false);
    };

    function fetchKeys(limit, index) {
        props.fetchSonicKeys(limit, index);
    }

    useEffect(() => {
        if (tableData.length <= 0) {
            firstFetchSonicKey(0, 10)
        }
    }, []);

    const handlePageChange = async (event, value) => {
        const limit = 10;
        const page = value;
        console.log("This is for event", event);
        firstFetchSonicKey(value, limit)
        setPageCount(event)
    };


    const downloadFileData = async (data) => {
        console.log("download data");
        const contentFilePath = data?.contentFilePath;
        const contentFileType = data?.contentFileType;
        const s3MetaData = data?.s3FileMeta?.key;
        if (data?.downloadable) {
            if (!restrict) {
                console.log("restrict", restrict);
                setrestrict(true)
                await downloadFile(contentFilePath, contentFileType, setrestrict, s3MetaData)
                setrestrict(false)
            } else {
                return <div style={{ color: 'grey', cursor: 'wait' }} onClick={() => {
                }} data-toggle="tooltip" data-placement="top" title='Progress'>Download</div>
            }
        }

    }

    const onSearchChange = (searchText) => {
        console.log('Search Change', searchText);
        setSearchValue(searchText);
        setPage(0)
        firstFetchSonicKey(0, rowPerPage, searchText)
    }
    // console.log("offset data ", onSearchChange);


    //For sorting   ==============================================================
    //   var value;
    //   const handleSort = (clickedColumn, propFrom) => () => {
    //     if (column !== clickedColumn) {
    //       setcolumn(clickedColumn);
    //       value = _.sortBy(jobs?.data, [clickedColumn]);
    //       setdirection("ascending");
    //       dispatch(actionSorting(value, propFrom));
    //       return;
    //     }
    //     custom_log("value:", value);
    //     value = jobs?.data?.slice().reverse();
    //     setdirection(direction === "ascending" ? "descending" : "ascending");
    //     dispatch(actionSorting(value, propFrom));
    //   };
    //=============================================================================


    return (
        <Grid className={classes.gridContainer}>
            <Grid style={{ display: 'flex', justifyContent: 'space-between', padding: '2.5% 2.5% 0 2.5%', backgroundColor: 'white', }}>
                <Grid>
                    <Typography className={classes.heading}>SonicKeys</Typography>
                    <Typography className={classes.subHeading}>
                        See all your SonicKeys
                    </Typography>
                </Grid>
                <Grid style={{ display: 'flex', backgroundColor: '', }}>
                    <div style={{ backgroundColor: '', marginRight: '25px' }} ><Search searchData={onSearchChange} dataSearch={dataSearch} setDataSearch={setDataSearch} /></div>
                    <div><img src={viewFilter} /></div>
                </Grid>
            </Grid>
            <Grid>
                <TableContainer style={{ ...tableStyle.container }}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>
                                    <div className={classes.tableCellIcon}>
                                        ID
                                        <UnfoldMoreSharpIcon style={{ fontSize: '15px', fontWeight: 'bolder' }}
                                            //   onClick={handleSort("id", prop.propFrom)}
                                            className="sortIcon"
                                        />
                                    </div>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <div className={classes.tableCellIcon}>SONICKEY
                                        <UnfoldMoreSharpIcon style={{ fontSize: '15px', fontWeight: 'bolder' }}
                                            //   onClick={handleSort("id", prop.propFrom)}
                                            className="sortIcon"
                                        />
                                    </div>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <div className={classes.tableCellIcon}>NAME
                                        <UnfoldMoreSharpIcon style={{ fontSize: '15px', fontWeight: 'bolder' }}
                                            //   onClick={handleSort("id", prop.propFrom)}
                                            className="sortIcon"
                                        />
                                    </div>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <div className={classes.tableCellIcon}>ARTIST
                                        <UnfoldMoreSharpIcon style={{ fontSize: '15px', fontWeight: 'bolder' }}
                                            //   onClick={handleSort("id", prop.propFrom)}
                                            className="sortIcon"
                                        />
                                    </div>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <div className={classes.tableCellIcon}>ENCODED DATE
                                        <UnfoldMoreSharpIcon style={{ fontSize: '15px', fontWeight: 'bolder' }}
                                            //   onClick={handleSort("id", prop.propFrom)}
                                            className="sortIcon"
                                        />
                                    </div>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <div className={classes.tableCellIcon}>DESCRIPTION
                                        <UnfoldMoreSharpIcon style={{ fontSize: '15px', fontWeight: 'bolder' }}
                                            //   onClick={handleSort("id", prop.propFrom)}
                                            className="sortIcon"
                                        />
                                    </div>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <div className={classes.tableCellIcon}>ACTION
                                        <UnfoldMoreSharpIcon style={{ fontSize: '15px', fontWeight: 'bolder' }}
                                            //   onClick={handleSort("id", prop.propFrom)}
                                            className="sortIcon"
                                        />
                                    </div>
                                </StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        {loading ? <Box sx={{ display: "flex",alignItems:'center', justifyContent: 'center',  }}>
                            <CircularProgress />
                        </Box>
                            : <TableBody>
                                {tableData.map((data, index) => (
                                    <TableRow className={classes.tableRow} key={index}>
                                        <TableCell component="th" scope="row">
                                            {offset + index + 1}
                                        </TableCell>
                                        <TableCell className={classes.sonicKeyText}>{data.sonicKey}</TableCell>
                                        <TableCell className={classes.tableCellNormalText}>{data.contentFileName}</TableCell>
                                        <TableCell className={classes.tableCellNormalText}>{data.contentOwner === "" ? "-" : data.contentOwner}</TableCell>
                                        <TableCell className={classes.tableCellNormalText}>{format(new Date(data.contentCreatedDate), 'dd/MM/yyyy')}</TableCell>
                                        <TableCell className={classes.tableCellNormalText}>{data.contentDescription === "" ? "-" : data.contentDescription}</TableCell>
                                        <TableCell className={classes.tableCellColor}>
                                            <div className={classes.tableCellIcon} onClick={() => handleClickOpenTable(data)}>
                                                <VisibilityOutlinedIcon fontSize="small" />&nbsp;View
                                            </div>
                                        </TableCell>
                                        <TableCell className={classes.tableCellColor}>
                                            <div className={classes.tableCellIcon} onClick={() => downloadFileData(data)}>
                                                <img src={download} />&nbsp;Download
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>}

                    </Table>
                    {openTable && <DailogTable sonicKey={sonicKeys} open={true} setOpenTable={setOpenTable} />}
                    <Pagination
                        count={page}
                        page={props.pageCount}
                        variant="outlined"
                        shape="rounded"
                        onChange={handlePageChange}
                    />
                </TableContainer>
            </Grid>
        </Grid>
    );
};


const mapStateToProps = (state) => {
    console.log("states", state);
    return {
        sonicKeys: state.sonicKeys,
        totalPage: state.sonicKeys.totalPages,
        // offset: state.sonicKeys.offset,
        // pagingCounter: state.sonicKeys.pagingCounter,

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // fetchSonicKeys: () => dispatch(fetchSonicKeys()), for pagination
        fetchSonicKeys: (limit, index) => dispatch(fetchSonicKeys(limit, index)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SonicKeys);



