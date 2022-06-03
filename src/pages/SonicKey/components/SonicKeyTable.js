import { Grid, Table, TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import { format } from 'date-fns';
import fileDownload from 'js-file-download';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SelectedColumn } from '../../../components/common/Columns/component/SelectedColumn';
import TableMenu from '../../../components/common/Table/components/TableMenu';
import { ActionMenuItem } from '../../../components/common/Table/TableStyled';
import { AlternateStyledTableData, StyledAlternateTableRow, StyledTableData, StyledTableHead, StyledTableRow } from '../../../StyledComponents/StyledTable/StyledTable';
import { log } from '../../../utils/app.debug';
import DownloadProgressModal from '../../Encode/Components/DownloadProgressModal';
import { downloadAnyFile } from '../../../services/https/resources/EncodeApi/encodeApi'
import MetaDataDailog from '../../../components/common/MetaDataDialog';
import * as actionTypes from '../../../stores/actions/actionTypes';

export default function SonicKeyTable({ data, sonicKeyTableHead }) {
    const navigate = useNavigate()
    const [sonickeys, setSonicKeys] = React.useState({});
    const [openTable, setOpenTable] = React.useState(false);
    const [tableData, setTableData] = React.useState([]);
    const [state, setState] = React.useState({
        openDownloadingModal: false,
        percentComplete: "0"
    })
    log("data of table", data)

    const dispatch = useDispatch();

    const handleClickOpenTable = async (data) => {
        setSonicKeys(data)
        setOpenTable(true);
    };

    const download = (sonickey) => {
        setState({ ...state, openDownloadingModal: true })
        downloadAnyFile(sonickey?.s3FileMeta?.Key).then((response) => {
            axios({
                url: response,
                responseType: 'blob',
                onDownloadProgress: function (progressEvent) {
                    let percent = Math.floor(progressEvent?.loaded / progressEvent?.total * 100)
                    setState({ ...state, percentComplete: percent, openDownloadingModal: true })
                }
            }).then(res => {
                fileDownload(res.data, sonickey?.originalFileName);
                setState({ ...state, openDownloadingModal: false })
            }).catch(error => {
                log("Download error", error)
                cogoToast.error(error?.message)
                setState({ ...state, openDownloadingModal: false })
            });
        }).catch((error) => {
            log("Download error", error)
            cogoToast.error(error?.message)
            setState({ ...state, openDownloadingModal: false })
        })
    }

    return (
        <Grid>
            <TableContainer style={{ padding: '0rem 1rem 1rem 1rem' }}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {
                                sonicKeyTableHead?.map((data, index) => {
                                    const isChecked = SelectedColumn(data?.title);
                                    if (isChecked)
                                        return (
                                            <StyledTableHead align='left' key={index}>
                                                {data?.title}
                                            </StyledTableHead>
                                        )
                                })
                            }

                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data?.docs?.length === 0 ?
                            <TableRow key={0}>
                                <StyledTableData colSpan={8} style={{ textAlign: "center" }}>
                                    No Data
                                </StyledTableData>
                            </TableRow> :
                            data?.docs?.map((row, index) => {
                                log("data number haru yo sapai", row?.offset)
                                if (index % 2 !== 0) {
                                    return (
                                        <StyledAlternateTableRow key={row?._id}>
                                            {SelectedColumn("ID") &&
                                                <AlternateStyledTableData>
                                                    {data?.offset + index + 1}
                                                </AlternateStyledTableData>
                                            }
                                            {SelectedColumn("SONICKEY") &&
                                                <AlternateStyledTableData>
                                                    {row?.sonicKey || "---"}
                                                </AlternateStyledTableData>
                                            }
                                            {SelectedColumn("ORIGINAL FILENAME") &&
                                                <AlternateStyledTableData>
                                                    {row?.originalFileName || row?.contentFileName || "---"}
                                                </AlternateStyledTableData>
                                            }
                                            {SelectedColumn("ARTIST") &&
                                                <AlternateStyledTableData>
                                                    {row?.contentOwner || "---"}
                                                </AlternateStyledTableData>
                                            }
                                            {SelectedColumn("ENCODED DATE") &&
                                                <AlternateStyledTableData>
                                                    {format(new Date(row?.createdAt), 'dd/MM/yyyy') || "---"}
                                                </AlternateStyledTableData>
                                            }
                                            {SelectedColumn("DESCRIPTION") &&
                                                <AlternateStyledTableData>{row?.contentDescription || "---"}</AlternateStyledTableData>
                                            }
                                            {SelectedColumn("ACTION") &&
                                                <AlternateStyledTableData>
                                                    <TableMenu>
                                                        <ActionMenuItem onClick={() => handleClickOpenTable(row)}>View details</ActionMenuItem>
                                                        <ActionMenuItem onClick={() => download(row)}>Download</ActionMenuItem>
                                                    </TableMenu>
                                                </AlternateStyledTableData>
                                            }
                                        </StyledAlternateTableRow>
                                    )
                                }
                                return (
                                    <StyledTableRow key={row?._id}>
                                        {SelectedColumn("ID") &&
                                            <StyledTableData>
                                                {data?.offset + index + 1}
                                            </StyledTableData>
                                        }
                                        {SelectedColumn("SONICKEY") &&
                                            <StyledTableData>
                                                {row?.sonicKey || "---"}
                                            </StyledTableData>
                                        }
                                        {SelectedColumn("ORIGINAL FILENAME") &&
                                            <StyledTableData>
                                                {row?.originalFileName || row?.contentFileName || "---"}
                                            </StyledTableData>
                                        }
                                        {SelectedColumn("ARTIST") &&
                                            <StyledTableData>{row?.contentOwner || "---"}</StyledTableData>
                                        }
                                        {SelectedColumn("ENCODED DATE") &&
                                            <StyledTableData>{format(new Date(row?.createdAt), 'dd/MM/yyyy') || "---"}</StyledTableData>
                                        }
                                        {SelectedColumn("DESCRIPTION") &&
                                            <StyledTableData>{row?.contentDescription || "---"}</StyledTableData>
                                        }
                                        {SelectedColumn("ACTION") &&
                                            <StyledTableData>
                                                <TableMenu>
                                                    <ActionMenuItem onClick={() => handleClickOpenTable(row)}>View details</ActionMenuItem>
                                                    <ActionMenuItem onClick={() => download(row)}>Download</ActionMenuItem>
                                                </TableMenu>
                                            </StyledTableData>
                                        }
                                    </StyledTableRow>
                                )
                            })}
                    </TableBody>
                </Table>
                {openTable &&
                    <MetaDataDailog
                        sonicKey={sonickeys}
                        open={true}
                        setOpenTable={setOpenTable}
                        updateMetaData={(key) => {
                            log("key data is: ", key)
                            setSonicKeys(key)
                            dispatch({ type: actionTypes.UPDATE_SONIC_KEYS, data: key })
                            // setTableData(newTableData)
                        }}
                        enableEditMode={true}
                    />}
                <DownloadProgressModal open={state.openDownloadingModal} percentage={state.percentComplete} />
            </TableContainer>
        </Grid>
    );
}
