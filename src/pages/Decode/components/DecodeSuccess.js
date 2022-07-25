import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Table, TableBody, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import { format } from 'date-fns';
import fileDownload from 'js-file-download';
import Icon from "../../../assets/images/icon-success-graphic.png";
import { sonicKeyTableHeads } from "../../../constants/constants";
import MetaDataDailog from "../../../components/common/MetaDataDialog";
import DownloadProgressModal from "../../Encode/Components/DownloadProgressModal";
import { log } from "../../../utils/app.debug";
import { StyledTableData, StyledTableHead, StyledTableRow } from "../../../StyledComponents/StyledTable/StyledTable";
import TableMenu from "../../../components/common/Table/components/TableMenu";
import { ActionMenuItem } from "../../../components/common/Table/TableStyled";
import CustomToolTip from "../../../components/common/CustomToolTip";
import theme from "../../../theme";
import { downloadAnyFile } from "../../../services/https/resources/EncodeApi/encodeApi";
import { MainContainer } from "../../../StyledComponents/StyledPageContainer";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "40px"
  },
  heading: {
    fontSize: '30px',
    fontFamily: 'NunitoSans-Bold',
    color: "#393F5B",
  },
  subHeading: {
    fontSize: '18px',
    fontFamily: 'NunitoSans-Regular',
    color: "#00A19A",
  },
  found: {
    padding: "30px 0px 0px 0px",
    fontSize: '18px',
    fontFamily: 'NunitoSans-Regular',
    color: "#393F5B",
  },
  failedIcon: {
    backgroundColor: "#E5F5F4",
    height: 180,
    padding: "1% 5%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  failed: {
    marginTop: 10,
    fontSize: '22px',
    fontFamily: 'NunitoSans-ExtraBold',
    color: "#393F5B",
  },
}));

export default function DecodeSuccess(props) {
  const classes = useStyles();
  const [values, setValues] = useState({
    openTable: false,
    selectedSonicKey: {},
    sonickeys: props?.decodeKeys,
    openDownloadingModal: false,
    percentComplete: "0"
  })

  React.useEffect(() => {
    setValues({ ...values, sonickeys: props?.decodeKeys })
  }, [props])

  const handleClickOpenTable = async (data) => {
    setValues({ ...values, openTable: true, selectedSonicKey: data })
  };

  const download = (sonickey) => {
    setValues({ ...values, openDownloadingModal: true })
    downloadAnyFile(sonickey?.s3FileMeta?.Key).then((response) => {
      axios({
        url: response,
        responseType: 'blob',
        onDownloadProgress: function (progressEvent) {
          let percent = Math.floor(progressEvent?.loaded / progressEvent?.total * 100)
          setValues({ ...values, percentComplete: percent, openDownloadingModal: true })
        }
      }).then(res => {
        fileDownload(res.data, sonickey?.originalFileName);
        setValues({ ...values, openDownloadingModal: false })
      }).catch(error => {
        log("Download error", error)
        cogoToast.error(error?.message)
        setValues({ ...values, openDownloadingModal: false })
      });
    }).catch((error) => {
      log("Download error", error)
      cogoToast.error(error?.message)
      setValues({ ...values, openDownloadingModal: false })
    })
  }

  return (
    <MainContainer>
      <Grid container className={classes.header}>
        <Grid item>
          <Typography className={classes.heading}>Well done!</Typography>
          <Typography className={classes.subHeading}>
            {props?.title} of <b>{props?.audioName}</b> successfully done.
          </Typography>
          <Typography className={classes.found}>
            We found <b>{props?.decodeKeys?.data?.length}</b> SonicKeys.
          </Typography>
        </Grid>
        <Grid item className={classes.failedIcon}>
          <img src={Icon} alt="Failed" style={{ height: 80, width: 80 }} />
          <Typography className={classes.failed}>{props?.title} done</Typography>
        </Grid>
      </Grid>

      <TableContainer style={{ padding: '0rem 1rem 1rem 1rem' }}>
        <Table>
          <TableHead>
            <TableRow>
              {sonicKeyTableHeads.map((data, index) => (
                <StyledTableHead align='left' key={index}>
                  {data?.title}
                </StyledTableHead>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {values?.sonickeys?.data?.length === 0 ?
              <TableRow key={0}>
                <StyledTableData colSpan={9} style={{ textAlign: "center" }}>
                  No Data
                </StyledTableData>
              </TableRow> :
              values?.sonickeys?.data?.map((data, index) => (
                <StyledTableRow key={index} bgColor={index % 2 !== 0 && theme.colors.secondary.tableColor}>
                  <CustomToolTip title={data?.track}>
                    <StyledTableData>{data?.track || "---"}</StyledTableData>
                  </CustomToolTip>

                  <CustomToolTip title={data?.sonicKey || "---"}>
                    <StyledTableData>{data?.sonicKey || "---"}</StyledTableData>
                  </CustomToolTip>

                  <CustomToolTip title={data?.contentName || "---"}>
                    <StyledTableData>{data?.contentName || "---"}</StyledTableData>
                  </CustomToolTip>

                  <StyledTableData>{data?.version || "---"}</StyledTableData>

                  <CustomToolTip title={data?.contentOwner || "---"}>
                    <StyledTableData>{data?.contentOwner || "---"}</StyledTableData>
                  </CustomToolTip>

                  <CustomToolTip title={data?.distributor || "---"}>
                    <StyledTableData>{data?.distributor || "---"}</StyledTableData>
                  </CustomToolTip>

                  <CustomToolTip title={data?.contentDescription || "---"}>
                    <StyledTableData>{data?.contentDescription || "---"}</StyledTableData>
                  </CustomToolTip>

                  <StyledTableData>{format(new Date(data?.createdAt), 'dd/MM/yyyy') || "---"}</StyledTableData>

                  <StyledTableData>
                    <TableMenu>
                      <ActionMenuItem onClick={() => handleClickOpenTable(data)}>View</ActionMenuItem>
                      <ActionMenuItem onClick={() => download(data)}>Download</ActionMenuItem>
                    </TableMenu>
                  </StyledTableData>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>

        {values?.openTable &&
          <MetaDataDailog
            sonicKey={values?.selectedSonicKey}
            open={true}
            setOpenTable={(flag) => { setValues({ ...values, openTable: flag }) }}
            updateMetaData={(newData) => {
              let newSonicData = values?.sonickeys?.data?.map((data) => {
                if (data?._id === newData?.sonicKey) {
                  return newData
                }
                return data
              })
              setValues({ ...values, selectedSonicKey: newData, sonickeys: { ...values?.sonickeys, data: newSonicData } })
            }}
          // enableEditMode={true}
          />}

        <DownloadProgressModal open={values.openDownloadingModal} percentage={values.percentComplete} />
      </TableContainer>
    </MainContainer>
  );
}
