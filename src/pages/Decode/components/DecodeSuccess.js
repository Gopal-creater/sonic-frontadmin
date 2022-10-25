import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import axios from "axios";
import cogoToast from "cogo-toast";
import { format } from "date-fns";
import fileDownload from "js-file-download";
import Icon from "../../../assets/images/icon-success-graphic.png";
import MetaDataDailog from "../../../components/common/MetaDataDialog";
import DownloadProgressModal from "../../Encode/Components/DownloadProgressModal";
import { log } from "../../../utils/app.debug";
import theme from "../../../theme";
import { downloadAnyFile } from "../../../services/https/resources/EncodeApi/encodeApi";
import { MainContainer } from "../../../StyledComponents/StyledPageContainer";
import AppTable from "../../../components/common/AppTable";
import GetAppRoundedIcon from "@material-ui/icons/GetAppRounded";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Tooltip from "@material-ui/core/Tooltip";
import { Content, SubHeading } from "../../../StyledComponents/StyledHeadings";
import { tags } from "../../../constants/constants";

export default function DecodeSuccess(props) {
  const classes = useStyles();
  const [values, setValues] = useState({
    openTable: false,
    selectedSonicKey: {},
    sonickeys: props?.decodeKeys,
    openDownloadingModal: false,
    percentComplete: "0",
  });

  React.useEffect(() => {
    setValues({ ...values, sonickeys: props?.decodeKeys });
  }, [props]);

  const handleClickOpenTable = async (data) => {
    setValues({ ...values, openTable: true, selectedSonicKey: data });
  };

  const download = (sonickey) => {
    setValues({ ...values, openDownloadingModal: true });
    downloadAnyFile(sonickey?.s3FileMeta?.Key)
      .then((response) => {
        axios({
          url: response,
          responseType: "blob",
          onDownloadProgress: function (progressEvent) {
            let percent = Math.floor(
              (progressEvent?.loaded / progressEvent?.total) * 100
            );
            setValues({
              ...values,
              percentComplete: percent,
              openDownloadingModal: true,
            });
          },
        })
          .then((res) => {
            fileDownload(res.data, sonickey?.originalFileName);
            setValues({ ...values, openDownloadingModal: false });
          })
          .catch((error) => {
            log("Download error", error);
            cogoToast.error(error?.message);
            setValues({ ...values, openDownloadingModal: false });
          });
      })
      .catch((error) => {
        log("Download error", error);
        cogoToast.error(error?.message);
        setValues({ ...values, openDownloadingModal: false });
      });
  };

  let columns = [
    {
      name: "trackID",
      label: "TRACK ID",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "sonickey",
      label: `${tags.companyTag}`,
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "title",
      label: "TITLE",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "version",
      label: "VERSION",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "artist",
      label: "ARTIST",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "distributor",
      label: "DISTRIBUTOR",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "description",
      label: "DESCRIPTION",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "encodedDate",
      label: "ENCODED DATE",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "actionData",
      label: "ACTION",
      options: {
        customBodyRender: (value) => {
          return (
            <>
              <Tooltip title="View">
                <VisibilityIcon
                  fontSize={"small"}
                  style={{
                    color: theme.colors.secondary.main,
                    cursor: "pointer",
                  }}
                  onClick={() => handleClickOpenTable(value)}
                />
              </Tooltip>
              <Tooltip title="Download">
                <GetAppRoundedIcon
                  fontSize={"small"}
                  style={{
                    color: theme.colors.secondary.main,
                    cursor: "pointer",
                    marginLeft: "10px",
                  }}
                  onClick={() => download(value)}
                />
              </Tooltip>
            </>
          );
        },
      },
    },
  ];

  const createStableDecodedData = () => {
    const decodedData = values?.sonickeys?.data?.map((data, index) => {
      return {
        trackID: data?.track,
        sonickey: data?.sonicKey,
        title: data?.contentName,
        version: data?.version,
        artist: data?.contentOwner,
        distributor: data?.distributor,
        description: data?.contentDescription,
        encodedDate: format(new Date(data?.createdAt), "dd/MM/yyyy"),
        actionData: data,
      };
    });
    return decodedData;
  };

  return (
    <MainContainer>
      {/* Heading--------------------------------------------------- */}
      <Grid container className={classes.header}>
        <Grid item>
          <SubHeading>Well done!</SubHeading>
          <Content>
            {props?.title} of <b>{props?.audioName}</b> successfully done.
          </Content>
          <Content className={classes.found}>
            We found <b>{props?.decodeKeys?.data?.length}</b> {tags.companyTag}.
          </Content>
        </Grid>
        <Grid item className={classes.failedIcon}>
          <img src={Icon} alt="Failed" style={{ height: 80, width: 80 }} />
          <SubHeading>{props?.title} done</SubHeading>
        </Grid>
      </Grid>
      {/* Heading--------------------------------------------------- */}

      {/* Table------------------------------------------------------------------- */}
      <AppTable
        title={""}
        columns={columns}
        data={createStableDecodedData()}
        options={{
          count: values?.sonickeys?.data?.length || 0,
          customFooter: () => {
            return null;
          },
        }}
      />
      {/* Table------------------------------------------------------------------- */}

      {values?.openTable && (
        <MetaDataDailog
          sonicKey={values?.selectedSonicKey}
          open={true}
          setOpenTable={(flag) => {
            setValues({ ...values, openTable: flag });
          }}
          updateMetaData={(newData) => {
            let newSonicData = values?.sonickeys?.data?.map((data) => {
              if (data?._id === newData?.sonicKey) {
                return newData;
              }
              return data;
            });
            setValues({
              ...values,
              selectedSonicKey: newData,
              sonickeys: { ...values?.sonickeys, data: newSonicData },
            });
          }}
          // enableEditMode={true}
        />
      )}

      <DownloadProgressModal
        open={values.openDownloadingModal}
        percentage={values.percentComplete}
      />
    </MainContainer>
  );
}

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "40px",
  },
  subHeading: {
    fontSize: "18px",
    fontFamily: "Roboto-Regular",
    color: "#00A19A",
  },
  found: {
    padding: "30px 0px 0px 0px",
    fontSize: "18px",
    fontFamily: "Roboto-Regular",
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
}));
