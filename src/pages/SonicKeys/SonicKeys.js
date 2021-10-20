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
import { Grid, Tooltip, Typography } from '@material-ui/core';
import { tableStyle } from '../../globalStyle';
import Communication from "../../services/https/Communication";
import { fetchSonicKeys } from "../../stores/actions/sonicKey";
import { connect } from 'react-redux';
import { format, isValid } from 'date-fns';
import { converstionOfKb } from '../../utils/HelperMethods';
import Search from "../SonicKeys/Components/Search";
import viewFilter from "../../../src/assets/images/view.png";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CloseIcon from '@material-ui/icons/Close';
import Download from './Components/Download';
import SonicSpinner from '../../components/common/SonicSpinner';


const StyledTableCell = withStyles((theme) => ({
    head: {
        fontSize: 12,
        color: "#D0D0D0",
        fontFamily: "NunitoSans-Bold",
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
        color: "#00A19A",
        fontFamily: "NunitoSans-Regular",
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
        fontFamily: "NunitoSans-ExtraBold",
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
        fontFamily: "NunitoSans-Bold",
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
    const [loading, setLoading] = React.useState(true);
    const [rowPerPage, setrowPerPage] = React.useState(10)
    const [openTable, setOpenTable] = React.useState(false)
    const classes = useStyles();
    const [tableData, setTableData] = React.useState([]);
    const [page, setTotalPage] = React.useState(0);
    const [offset, setOffset] = React.useState(0);
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
            setTotalPage(res.totalPages)
            setOffset(res.offset)

            setLoading(false);
        }).catch(err => {
        })
    }

    useEffect(() => {
        firstFetchSonicKey()
    }, [])

    const handleClickOpenTable = async (data) => {
        setSonicKeys({
            ...sonicKeys,
            sonicKey: data?.sonicKey,
            contentName: data?.contentName,
            contentOwner: data?.contentOwner,
            contentValidation: data?.contentValidation ? "YES" : "NO",
            contentQuality: data?.contentQuality,
            contentDescription: data?.contentDescription,
            contentFileName: data?.contentFileName,
            contentFileType: data?.contentFileType,
            createdAt: data?.createdAt,
            contentDuration: data?.contentDuration?.toFixed(2),
            encodingStrength: data?.encodingStrength,
            contentSize: converstionOfKb(data?.contentSize),
            contentSamplingFrequency: data?.contentSamplingFrequency?.replace('Hz', ''),
            iswcCode: (data?.iswcCode ? data?.iswcCode : 'Not Specified'),
            isrcCode: (data?.isrcCode ? data?.isrcCode : 'Not Specified'),
            tuneCode: (data?.tuneCode ? data?.tuneCode : 'Not Specified'),
            contentFilePath: data?.contentFilePath,
            job: data?.job,
            additionalMetadata: data?.additionalMetadata?.message ? data?.additionalMetadata?.message : '',
            channel: data?.channel
        })
        setOpenTable(true);
    };

    useEffect(() => {
        if (tableData.length <= 0) {
            firstFetchSonicKey(0, 10)
        }
    }, []);

    const handlePageChange = async (event, value) => {
        const limit = 10;
        console.log("This is for event", event);
        firstFetchSonicKey(value, limit)
    };

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

                    {loading ? <div style={{ display: 'flex', justifyContent: 'center', width: '100%', height: '200px' }}>
                        <SonicSpinner title="Loading Sonic Keys..." containerStyle={{ height: '100%', display: 'flex', justifyContent: 'center' }} />
                    </div>
                        :
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    {columns?.map((col) => {
                                        const isItemSelected = isSelected(col);
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

                            <TableBody>
                                {tableData?.map((data, index) => {
                                    const isItemSelected = isSelected(data);
                                    return (
                                        <TableRow className={classes.tableRow} key={index}>
                                            <TableCell className={classes.tableCellNormalText}>
                                                {isSelected("ID") && offset + index + 1}
                                            </TableCell>
                                            <TableCell className={classes.sonicKeyText}>{isSelected("SONICKEY") && data.sonicKey}</TableCell>
                                            <Tooltip title={data.originalFileName || data.contentFileName}>
                                                <TableCell className={classes.tableCellNormalText}>
                                                    {isSelected("NAME") && (data?.originalFileName?.length > 20 ? data?.originalFileName?.slice(0, 20) + "..." : data?.originalFileName) || (data?.contentFileName?.length > 20 ? data?.contentFileName?.slice(0, 20) + "..." : data?.contentFileName)}
                                                </TableCell>
                                            </Tooltip>
                                            <Tooltip title={data.contentOwner}><TableCell className={classes.tableCellNormalText}>{isSelected("ARTIST") && (data.contentOwner === "" ? "-" : (data.contentOwner?.length > 20 ? data.contentOwner?.slice(0, 20) + "..." : data.contentOwner))}</TableCell></Tooltip>
                                            <TableCell className={classes.tableCellNormalText}>{isSelected("ENCODED DATE") && (format(new Date(data.contentCreatedDate), 'dd/MM/yyyy'))}</TableCell>
                                            <Tooltip title={data.contentDescription}><TableCell className={classes.tableCellNormalText}>{isSelected("DESCRIPTION") && (data.contentDescription === "" ? "-" : (data.contentDescription?.length > 20 ? data.contentDescription?.slice(0, 20) + "..." : data.contentDescription))}</TableCell></Tooltip>
                                            <TableCell className={classes.tableCellColor} width="100px">
                                                <div style={{ display: 'flex', justifyContent: 'center', fontSize: '14px', fontFamily: "NunitoSans-Bold", }}>
                                                    <div style={{ marginRight: '15px' }} className={classes.tableCellIcon} onClick={() => handleClickOpenTable(data)}>
                                                        <VisibilityOutlinedIcon fontSize="small" />&nbsp;View
                                                    </div>
                                                    <Download data={data} />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>

                        </Table>}
                    {openTable && <DailogTable sonicKey={sonicKeys} open={true} setOpenTable={setOpenTable} />}
                    {!loading ?
                        <Pagination
                            count={page}
                            page={props.pageCount}
                            variant="outlined"
                            shape="rounded"
                            onChange={handlePageChange}
                        /> : ""}

                </TableContainer>
            </Grid>
        </Grid>
    );
};


const mapStateToProps = (state) => {
    return {
        sonicKeys: state.sonicKeys,
        totalPage: state.sonicKeys.totalPages,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSonicKeys: (limit, index) => dispatch(fetchSonicKeys(limit, index)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SonicKeys);


