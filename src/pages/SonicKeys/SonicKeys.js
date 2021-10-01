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
import DailogTable from '../../components/common/DialogTable';
import { Box, CircularProgress, Grid, Typography } from '@material-ui/core';
import { tableStyle } from '../../globalStyle';
import Communication from "../../services/https/Communication";
import { fetchSonicKeys } from "../../stores/actions/sonicKey";
import { connect, useSelector } from 'react-redux';
import { format, isValid, sort } from 'date-fns';
import { converstionOfKb, downloadFile } from '../../utils/HelperMethods';
import Search from "../SonicKeys/Components/Search";
import viewFilter from "../../../src/assets/images/view.png";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CloseIcon from '@material-ui/icons/Close';
import Download from './Components/Download';


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
        position: 'relative',
    },
    heading: {
        fontSize: 30,
        fontWeight: 700,
        color: "#343F84",
        fontFamily: "NunitoSans-ExtraBold",
    },
    subHeading: {
        fontSize: 18,
        fontWeight: 500,
        color: "#00A19A",
        fontFamily: "NunitoSans-Bold",
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
    },
    columnFilter: {
        position: 'absolute',
        right: '5px',
        top: '70px',
        display: 'none',
        backgroundColor: '#ffffff',
        borderRadius: '5px',
        minWidth: '100px',
        padding: '10px',
        maxWidth: '400px',
        width: 'fit-content',
        boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 1px 5px rgba(0,0,0,0.22)",
        "&.active": {
            display: 'block'
        },
    },
    closeDiv: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
    },
});


const SonicKeys = (props) => {
    const [filterColumn, setFilterColumn] = useState(["ID",
        "SONICKEY",
        "NAME",
        "ARTIST",
        "ENCODED DATE",
        "DESCRIPTION",
        "ACTION",])
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
    const [selected, setSelected] = useState([]);
    const [defaultData, setDefaultData] = useState(false);
    const [dataSearch, setDataSearch] = React.useState("");
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

    useEffect(() => {
        firstFetchSonicKey()
    }, [])

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
        const s3MetaData = data?.s3FileMeta?.Key;
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

    const columns = [
        "ID",
        "SONICKEY",
        "NAME",
        "ARTIST",
        "ENCODED DATE",
        "DESCRIPTION",
        "ACTION",
    ];

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

    const isSelected = (radiostation_id) => {
        return filterColumn.includes(radiostation_id);
    };

    const onSearchChange = (searchText) => {
        console.log('Search Change', searchText);
        setSearchValue(searchText);
        setPage(0)
        firstFetchSonicKey(0, rowPerPage, searchText)
    }

    useEffect(() => {
        if (defaultData === true) {
            firstFetchSonicKey();
            setDefaultData(false);
        }
    }, [defaultData]);

    const onClickSortData = () => {
        tableData.sort();
        console.log("sorting data is successfull", tableData.sort());
    }


    const openColumnFilter = () => {
        document.getElementById('columnFilter').classList.add('active');
    }
    const closeColumnFilter = () => {
        document.getElementById('columnFilter').classList.remove('active');
    }


    return (
        <Grid className={classes.gridContainer}>
            <Grid style={{ display: 'flex', justifyContent: 'space-between', padding: "2% 2.5% 0 2.5%", backgroundColor: 'white', }}>
                <Grid>
                    <Typography className={classes.heading}>SonicKeys</Typography>
                    <Typography className={classes.subHeading}>
                        See all your SonicKeys
                    </Typography>
                </Grid>
                <Grid style={{ display: 'flex', backgroundColor: '', }}>
                    <div style={{ backgroundColor: '', marginRight: '25px' }} ><Search searchData={onSearchChange} dataSearch={dataSearch} setDataSearch={setDataSearch} setDefaultData={setDefaultData} /></div>
                    <div><img src={viewFilter} style={{ cursor: 'pointer' }} onClick={openColumnFilter} />
                        <div id="columnFilter" className={classes.columnFilter}>
                            <div className={classes.closeDiv}>
                                <div>Show Columns</div>
                                <div><CloseIcon onClick={closeColumnFilter} /></div>
                            </div>
                            <FormGroup column>
                                {columns?.map((col) => {
                                    const isItemSelected = isSelected(col);
                                    console.log("is item selected:", isItemSelected);
                                    return (
                                        <FormControlLabel
                                            control={<Checkbox
                                                checked={isItemSelected}
                                                onChange={(e) => checkBox(e, col)}
                                                className={classes.checkBoxSytle} color="default" />}
                                            label={col}
                                        />
                                    );
                                })}

                            </FormGroup>
                        </div>
                    </div>
                </Grid>
            </Grid>
            <Grid>
                <TableContainer style={{ ...tableStyle.container }}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {columns?.map((col) => {
                                    const isItemSelected = isSelected(col);
                                    // console.log("is item selected", isItemSelected);
                                    return (
                                        <StyledTableCell>
                                            <div className={classes.tableCellIcon}>
                                                {isItemSelected && <> {col}
                                                    <UnfoldMoreSharpIcon onClick={onClickSortData} style={{ fontSize: '15px', fontWeight: 'bolder' }}
                                                        //   onClick={handleSort("id", prop.propFrom)}
                                                        className="sortIcon"
                                                    /></>}
                                            </div>
                                        </StyledTableCell>
                                    );
                                })}

                            </TableRow>
                        </TableHead>
                        {loading ? <Box sx={{ display: "flex", alignItems: 'center', justifyContent: 'center', }}>
                            <CircularProgress />
                        </Box>
                            : <TableBody>
                                {tableData?.map((data, index) => {
                                    const isItemSelected = isSelected(data);
                                    return (
                                        <TableRow className={classes.tableRow} key={index}>
                                            <TableCell component="th" scope="row">
                                                {isSelected("ID") && offset + index + 1}
                                            </TableCell>
                                            <TableCell className={classes.sonicKeyText}>{isSelected("SONICKEY") && data.sonicKey}</TableCell>
                                            <TableCell className={classes.tableCellNormalText}>{isSelected("NAME") && data.contentFileName?.length > 20 ? data.contentFileName?.slice(0, 20) + "..." : data.contentFileName}</TableCell>
                                            <TableCell className={classes.tableCellNormalText}>{isSelected("ARTIST") && (data.contentOwner === "" ? "-" : data.contentOwner)}</TableCell>
                                            <TableCell className={classes.tableCellNormalText}>{isSelected("ENCODED DATE") && (format(new Date(data.contentCreatedDate), 'dd/MM/yyyy'))}</TableCell>
                                            <TableCell className={classes.tableCellNormalText}>{isSelected("DESCRIPTION") && (data.contentDescription === "" ? "-" : data.contentDescription)}</TableCell>
                                            <TableCell className={classes.tableCellColor}>
                                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                    <div style={{ marginRight: '15px' }} className={classes.tableCellIcon} onClick={() => handleClickOpenTable(data)}>
                                                        <VisibilityOutlinedIcon fontSize="small" />&nbsp;View
                                                    </div>
                                                    <Download data={data} />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
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


