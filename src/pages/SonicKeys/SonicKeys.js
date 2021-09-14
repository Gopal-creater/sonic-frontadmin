import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Pagination from "@material-ui/lab/Pagination";
import "../SonicKeys/table.scss";
import UnfoldMoreSharpIcon from "@material-ui/icons/UnfoldMoreSharp";
import VisibilityIcon from '@material-ui/icons/Visibility';
import GetAppIcon from '@material-ui/icons/GetApp';
import DailogTable from '../../components/common/DialogTable';
import { Grid, Typography } from '@material-ui/core';


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
    container: {
        marginBottom: 40,
        backgroundColor: "white",
        padding: "2% 2.5%",
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
        fontWeight: 'bold'
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
        fontSize: '12px',
    }
});


function createData(id, sonickey, name, artist, encodeddate, description, action, download) {
    return { id, sonickey, name, artist, encodeddate, description, action, download };
}

const rows = [
    createData(1, 'WDHGh978', 'sdkj_98_udio.wav', 'Sonic', '25/08/2021', 'Sample testing', 'View', 'Download'),
    createData(2, 'LKJLKJ87ij', 'nvn_98_audio.wav', 'Sonic', '25/08/2021', 'Sample testing', 'View', 'Download'),
    createData(3, 'UTYG0980OP', 'sample_67_audio.wav', 'Sonic', '25/08/2021', 'Sample testing', 'View', 'Download'),
    createData(4, 'YuhjkhUII8', 'sdkjf34__audio.wav', 'Sonic', '25/08/2021', 'Sample testing', 'View', 'Download'),
    createData(5, 'LKHK85gjhb', 'sd4_98_audio.wav', 'Sonic', '25/08/2021', 'Sample testing', 'View', 'Download'),
    createData(6, 'WDHGj0978', 'sdkj_udio.wav', 'Sonic', '25/08/2021', 'Sample testing', 'View', 'Download'),
    createData(7, 'LKJLKJ87ij', 'sdj_vbnvnio.wav', 'Sonic', '25/08/2021', 'Sample testing', 'View', 'Download'),
    createData(8, 'UTYG0909OP', 'sdkj67_audio.wav', 'Sonic', '25/08/2021', 'Sample testing', 'View', 'Download'),
    createData(9, 'YuhjkhYII8', 'sdkjf34_sio.wav', 'Sonic', '25/08/2021', 'Sample testing', 'View', 'Download'),
    createData(10, 'L6887gjhb', 'sd_audio.wav', 'Sonic', '25/08/2021', 'Sample testing', 'View', 'Download'),
    createData(11, 'WDHGhg0978', 'sdkj_sio.wav', 'Sonic', '25/08/2021', 'Sample testing', 'View', 'Download'),
    createData(12, 'LKJLK87ij', 'sddio.wav', 'Sonic', '25/08/2021', 'Sample testing', 'View', 'Download'),
    createData(13, 'UTYG809OP', 'sdkjf3udio.wav', 'Sonic', '25/08/2021', 'Sample testing', 'View', 'Download'),
    createData(14, 'YuhjYUII8', 'sdkjfg_audio.wav', 'Sonic', '25/08/2021', 'Sample testing', 'View', 'Download'),
    createData(15, 'LKHKJ5gjhb', 'sdk456_sampio.wav', 'Sonic', '25/08/2021', 'Sample testing', 'View', 'Download'),
];

export default function SonicKeys() {
    const [openTable, setOpenTable] = React.useState(false)
    const classes = useStyles();

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
        <Grid className={classes.container}>
            <Typography className={classes.heading}>SonicKeys</Typography>
            <Typography className={classes.subHeading}>
                See all your SonicKeys
            </Typography>
            <TableContainer>
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
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow className={classes.tableRow} key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell className={classes.sonicKeyText}>{row.sonickey}</TableCell>
                                <TableCell className={classes.tableCellNormalText}>{row.name}</TableCell>
                                <TableCell className={classes.tableCellNormalText}>{row.artist}</TableCell>
                                <TableCell className={classes.tableCellNormalText}>{row.encodeddate}</TableCell>
                                <TableCell className={classes.tableCellNormalText}>{row.description}</TableCell>
                                <TableCell className={classes.tableCellColor}>
                                    <div className={classes.tableCellIcon} onClick={() => setOpenTable(true)}>
                                        <VisibilityIcon />&nbsp;{row.action}
                                    </div>
                                </TableCell>
                                <TableCell className={classes.tableCellColor}>
                                    <div className={classes.tableCellIcon}>
                                        <GetAppIcon />&nbsp;{row.download}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {openTable && <DailogTable open={true} setOpenTable={setOpenTable} />}
                <Pagination
                    // count={prop?.count}
                    // page={jobs?.page}
                    variant="outlined"
                    shape="rounded"
                // onChange={handlePageChange}
                />
            </TableContainer>
        </Grid>
    );
}





