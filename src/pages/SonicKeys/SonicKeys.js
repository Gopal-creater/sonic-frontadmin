import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Pagination from "@material-ui/lab/Pagination";
import "../SonicKeys/table.scss";
import UnfoldMoreSharpIcon from "@material-ui/icons/UnfoldMoreSharp";
import VisibilityIcon from '@material-ui/icons/Visibility';
import GetAppIcon from '@material-ui/icons/GetApp';

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
        fontSize:'12px',
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
        <TableContainer component={Paper}>
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
                                <div className={classes.tableCellIcon}>
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
            <Pagination
                // count={prop?.count}
                // page={jobs?.page}
                variant="outlined"
                shape="rounded"
            // onChange={handlePageChange}
            />
        </TableContainer>
    );
}







// import React from 'react'
// import { makeStyles } from '@material-ui/core/styles';
// import MUIDataTable from "mui-datatables";

// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//     },
//     paper: {
//         backgroundColor: 'white',
//     },
// }));

// export default function SonicKeys() {
//     const classes = useStyles();

//     const columns = [
//         {
//             name: "id",
//             label: "ID",
//             options: {
//                 filter: true,
//                 sort: true,
//             }
//         },
//         {
//             name: "sonickey",
//             label: "SONICKEY",
//             options: {
//                 filter: true,
//                 sort: false,
//             }
//         },
//         {
//             name: "name",
//             label: "NAME",
//             options: {
//                 filter: true,
//                 sort: false,
//             }
//         },
//         {
//             name: "artist",
//             label: "ARTIST",
//             options: {
//                 filter: true,
//                 sort: false,
//             }
//         },
//         {
//             name: "encodeddate",
//             label: "ENCODED DATE",
//             options: {
//                 filter: true,
//                 sort: false,
//             }
//         },
//         {
//             name: "description",
//             label: "DESCRIPTION",
//             options: {
//                 filter: true,
//                 sort: false,
//             }
//         },
//         {
//             name: "action",
//             label: "ACTION",
//             options: {
//                 filter: true,
//                 sort: false,
//             }
//         },
//         {
//             name: "a",
//             label: "",
//             options: {
//                 filter: true,
//                 sort: false,
//             }
//         },

//     ];

//     const data = [
//         { id: 1, sonickey:'WIWEUHjkjkjhL5', name:'iopiop23_sample_6587_audio.wav', artist:'Sonic', encodeddate:'25/08/2021', description:'Sample Testing', action:'View', a:'download',},
//         { id: 2, sonickey:'LKHJHjkjkjhL5', name:'svhjkh3_sample_623_audio.wav', artist:'Sonic', encodeddate:'21/07/2021', description:'Sample Testing', action:'View' },
//         { id: 3, sonickey:'WIWfgdkjhL98', name:'sdkjh23_sample_6887_audio.wav', artist:'Sonic', encodeddate:'02/08/2021', description:'Sample Testing', action:'View' },
//         { id: 4, sonickey:'TYHoinlljkjhL5', name:'uyiu_sample_327_audio.wav', artist:'Sonic', encodeddate:'17/02/2021', description:'Sample Testing', action:'View' },
//         { id: 5, sonickey:'LKHJHjkjkjhL5', name:'svhjkh3_sample_623_audio.wav', artist:'Sonic', encodeddate:'21/07/2021', description:'Sample Testing', action:'View' },
//         { id: 6, sonickey:'WIWfgdkjhL98', name:'sdkjh23_sample_6887_audio.wav', artist:'Sonic', encodeddate:'02/08/2021', description:'Sample Testing', action:'View' },
//         { id: 7, sonickey:'TYHoinlljkjhL5', name:'uyiu_sample_327_audio.wav', artist:'Sonic', encodeddate:'17/02/2021', description:'Sample Testing', action:'View' },
//         { id: 8, sonickey:'LKHJHjkjkjhL5', name:'svhjkh3_sample_623_audio.wav', artist:'Sonic', encodeddate:'21/07/2021', description:'Sample Testing', action:'View' },
//         { id: 9, sonickey:'WIWfgdkjhL98', name:'sdkjh23_sample_6887_audio.wav', artist:'Sonic', encodeddate:'02/08/2021', description:'Sample Testing', action:'View' },
//         { id: 10, sonickey:'TYHoinlljkjhL5', name:'uyiu_sample_327_audio.wav', artist:'Sonic', encodeddate:'17/02/2021', description:'Sample Testing', action:'View' },
//         { id: 11, sonickey:'LKHJHjkjkjhL5', name:'svhjkh3_sample_623_audio.wav', artist:'Sonic', encodeddate:'21/07/2021', description:'Sample Testing', action:'View' },
//         { id: 12, sonickey:'WIWfgdkjhL98', name:'sdkjh23_sample_6887_audio.wav', artist:'Sonic', encodeddate:'02/08/2021', description:'Sample Testing', action:'View' },
//         { id: 13, sonickey:'TYHoinlljkjhL5', name:'uyiu_sample_327_audio.wav', artist:'Sonic', encodeddate:'17/02/2021', description:'Sample Testing', action:'View' },
//         { id: 14, sonickey:'LKHJHjkjkjhL5', name:'svhjkh3_sample_623_audio.wav', artist:'Sonic', encodeddate:'21/07/2021', description:'Sample Testing', action:'View' },
//         { id: 15, sonickey:'WIWfgdkjhL98', name:'sdkjh23_sample_6887_audio.wav', artist:'Sonic', encodeddate:'02/08/2021', description:'Sample Testing', action:'View' },
//         { id: 16, sonickey:'TYHoinlljkjhL5', name:'uyiu_sample_327_audio.wav', artist:'Sonic', encodeddate:'17/02/2021', description:'Sample Testing', action:'View' },

//     ];

//     const options = {
//         // filterType: 'checkbox',
//     };

//     return (
//         <div className={classes.paper}>
//             <MUIDataTable
//                 title={"SonicKeys"}
//                 data={data}
//                 columns={columns}
//                 options={options}
//             />
//         </div>
//     )
// }
