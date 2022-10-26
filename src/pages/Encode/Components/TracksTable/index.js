import { Grid, Table, TableRow, TableCell } from "@material-ui/core";
import React from "react";
import PopUp from "../../../../components/common/PopUp";
import { log } from "../../../../utils/app.debug";
import CloseIcon from "@material-ui/icons/Close";
import AppButton from "../../../../components/common/AppButton/AppButton";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../../../stores/actions/actionTypes";
import cogoToast from "cogo-toast";
import fileDownload from "js-file-download";
import axios from "axios";
import DownloadProgressModal from "../DownloadProgressModal";
import { downloadAnyFile } from "../../../../services/https/resources/EncodeApi/encodeApi";
import { useNavigate } from "react-router-dom";
import SkCount from "../SkCount";
import AppTable from "../../../../components/common/AppTable";
import { Content } from "../../../../StyledComponents/StyledHeadings";
import VisibilityIcon from "@material-ui/icons/Visibility";
import GetAppIcon from "@material-ui/icons/GetApp";
import Tooltip from "@material-ui/core/Tooltip";
import AudiotrackIcon from "@material-ui/icons/Audiotrack";
import MusicVideoIcon from "@material-ui/icons/MusicVideo";
import { useTheme } from "styled-components";

export default function TracksTable({ data, paginationCount }) {
  const theme = useTheme();
  const [state, setState] = React.useState({
    openViewTrackPopUp: false,
    selectedTrack: null,
    selectedEncodeAgainTrack: null,
    openDownloadingModal: false,
    percentComplete: "0",
  });

  const encodeReducer = useSelector((state) => state.encode);
  const sonickey = useSelector((state) => state.sonickey);
  const navigation = useNavigate();

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const encodeAgain = (track) => {
    log("Encode Again track", track);

    let metaData = {
      ...encodeReducer?.metaData,
      contentName: track?.trackMetaData?.contentName || track?.title || "",
      contentType: track?.trackMetaData?.contentType || track?.fileType || "",
      contentOwner: track?.trackMetaData?.contentOwner || track?.artist || "",
      trackersion: track?.trackMetaData?.trackersion || "",
      contentFileType: track?.trackMetaData?.contentFileType || "",
      contentDuration:
        track?.trackMetaData?.contentDuration || track?.duration || "",
      contentSize: track?.trackMetaData?.contentSize || track?.fileSize || "",
      contentEncoding:
        track?.trackMetaData?.contentEncoding || track?.encoding || "",
      contentSamplingFrequency:
        track?.trackMetaData?.contentSamplingFrequency ||
        track?.samplingFrequency ||
        "",
      contentQuality: track?.trackMetaData?.contentQuality || "",
      contentDescription: track?.trackMetaData?.contentDescription || "",
      label: track?.trackMetaData?.label || "",
      distributor: track?.trackMetaData?.distributor || "",
      additionalMetadata: JSON.stringify(
        track?.trackMetaData?.additionalMetadata
      ),
      encodeFromExistingFile: true,
    };
    dispatch({
      type: actionTypes.SET_SELECTED_EXISTING_FILE,
      data: { file: track, metaData: metaData },
    });
  };

  const closePopUp = () => {
    setState({ ...state, openViewTrackPopUp: false, selectedTrack: null });
  };

  const download = (track) => {
    log("Download track", track);
    setState({ ...state, openDownloadingModal: true });
    downloadAnyFile(track?.s3OriginalFileMeta?.Key)
      .then((response) => {
        axios({
          url: response,
          responseType: "blob",
          onDownloadProgress: function (progressEvent) {
            let percent = Math.floor(
              (progressEvent?.loaded / progressEvent?.total) * 100
            );
            setState({
              ...state,
              percentComplete: percent,
              openDownloadingModal: true,
            });
          },
        })
          .then((res) => {
            fileDownload(res.data, track?.originalFileName);
            setState({ ...state, openDownloadingModal: false });
          })
          .catch((error) => {
            log("Download error", error);
            cogoToast.error(error?.message);
            setState({ ...state, openDownloadingModal: false });
          });
      })
      .catch((error) => {
        log("Download error", error);
        cogoToast.error(error?.message);
        setState({ ...state, openDownloadingModal: false });
      });
  };

  const viewSonicKeys = (track) => {
    log("View SonicKeys", track);
    dispatch({
      type: actionTypes.SONIC_KEY_FILTERS,
      data: { ...sonickey?.filters, trackId: track?._id },
    });
    navigation("/encoded-tracks");
  };

  const columns = [
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
      name: "encodedDate",
      label: "ENCODED DATE",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "skCount",
      label: "SK COUNT",
      options: {
        customBodyRender: (value) => {
          return <SkCount trackID={value} />;
        },
      },
    },
    {
      name: "actionData",
      label: "ACTION",
      options: {
        customBodyRender: (row) => {
          return (
            <>
              <Tooltip title="View">
                <VisibilityIcon
                  fontSize={"small"}
                  style={{
                    color: theme.colors.secondary.main,
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    setState({
                      ...state,
                      openViewTrackPopUp: true,
                      selectedTrack: row,
                    })
                  }
                />
              </Tooltip>
              <Tooltip title="Download">
                <GetAppIcon
                  fontSize={"small"}
                  style={{
                    color: theme.colors.secondary.main,
                    cursor: "pointer",
                    marginLeft: "5px",
                  }}
                  onClick={() => download(row)}
                />
              </Tooltip>
              <Tooltip title="Encode again">
                <MusicVideoIcon
                  fontSize={"small"}
                  style={{
                    color: theme.colors.secondary.main,
                    cursor: "pointer",
                    marginLeft: "5px",
                  }}
                  onClick={() => encodeAgain(row)}
                />
              </Tooltip>
              <Tooltip title="View encoded tracks">
                <AudiotrackIcon
                  fontSize={"small"}
                  style={{
                    color: theme.colors.secondary.main,
                    cursor: "pointer",
                    marginLeft: "5px",
                  }}
                  onClick={() => viewSonicKeys(row)}
                />
              </Tooltip>
            </>
          );
        },
      },
    },
  ];

  const createStableSourceTrackTableData = () => {
    const sourceTrackData = data?.map((row) => ({
      trackID: row._id,
      title: row?.trackMetaData?.contentName,
      version: row?.trackMetaData?.version,
      artist: row?.trackMetaData?.contentOwner,
      distributor: row?.trackMetaData?.distributor,
      encodedDate: moment(row?.createdAt).format("DD/MM/YYYY"),
      skCount: row?._id,
      actionData: row,
    }));
    return sourceTrackData;
  };

  return (
    <>
      <AppTable
        title={paginationCount}
        columns={columns}
        data={createStableSourceTrackTableData()}
        options={{
          count: data?.length || 0,
          customFooter: () => {
            return null;
          },
        }}
      />

      <PopUp
        key="view track popup"
        open={state.openViewTrackPopUp}
        maxWidth="sm"
        fullWidth
      >
        <Grid style={{ padding: "30px" }}>
          <Grid container justifyContent="space-between">
            <Grid>
              <Content fontFamily={theme.fontFamily.robotoBold}>
                {state?.selectedTrack?.trackMetaData?.contentName ||
                  state?.selectedTrack?.title ||
                  "---"}
              </Content>
              <Content color={theme.colors.secondary.main}>
                by{" "}
                {state?.selectedTrack?.trackMetaData?.contentOwner ||
                  state?.selectedTrack?.artist ||
                  "---"}
              </Content>
            </Grid>
            <CloseIcon onClick={closePopUp} style={{ cursor: "pointer" }} />
          </Grid>

          <Grid
            style={{ height: "300px", marginTop: "20px", overflow: "auto" }}
          >
            <Table>
              <TableRow>
                <TCell cell1={true}>TRACK ID</TCell>
                <TCell cell1={false}>
                  {state?.selectedTrack?._id || "---"}
                </TCell>
              </TableRow>
              <TableRow>
                <TCell cell1={true}>TITLE</TCell>
                <TCell cell1={false}>
                  {state?.selectedTrack?.trackMetaData?.contentName || "---"}
                </TCell>
              </TableRow>
              <TableRow>
                <TCell cell1={true}>AUDIO FILE NAME</TCell>
                <TCell cell1={false}>
                  {state?.selectedTrack?.originalFileName || "---"}
                </TCell>
              </TableRow>
              <TableRow>
                <TCell cell1={true}>VERSION</TCell>
                <TCell cell1={false}>
                  {state?.selectedTrack?.trackMetaData?.version || "---"}
                </TCell>
              </TableRow>
              <TableRow>
                <TCell cell1={true}>ARTIST</TCell>
                <TCell cell1={false}>
                  {state?.selectedTrack?.trackMetaData?.contentOwner || "---"}
                </TCell>
              </TableRow>
              <TableRow>
                <TCell cell1={true}>MUSIC TYPE(MUSIC, VIDEO, AUDIO)</TCell>
                <TCell cell1={false}>
                  {state?.selectedTrack?.trackMetaData?.contentType || "---"}
                </TCell>
              </TableRow>
              <TableRow>
                <TCell cell1={true}>ISRC</TCell>
                <TCell cell1={false}>
                  {state?.selectedTrack?.trackMetaData?.isrcCode || "---"}
                </TCell>
              </TableRow>
              <TableRow>
                <TCell cell1={true}>ISWC</TCell>
                <TCell cell1={false}>
                  {state?.selectedTrack?.trackMetaData?.iswcCode || "---"}
                </TCell>
              </TableRow>
              <TableRow>
                <TCell cell1={true}>TUNE CODE</TCell>
                <TCell cell1={false}>
                  {state?.selectedTrack?.trackMetaData?.tuneCode || "---"}
                </TCell>
              </TableRow>
              <TableRow>
                <TCell cell1={true}>LABEL</TCell>
                <TCell cell1={false}>
                  {state?.selectedTrack?.trackMetaData?.label || "---"}
                </TCell>
              </TableRow>
              <TableRow>
                <TCell cell1={true}>DISTRIBUTOR</TCell>
                <TCell cell1={false}>
                  {state?.selectedTrack?.trackMetaData?.distributor || "---"}
                </TCell>
              </TableRow>
              <TableRow>
                <TCell cell1={true}>FILE TYPE</TCell>
                <TCell cell1={false}>
                  {state?.selectedTrack?.trackMetaData?.contentFileType ||
                    "---"}
                </TCell>
              </TableRow>
              <TableRow>
                <TCell cell1={true}>AUDIO LENGTH</TCell>
                <TCell cell1={false}>
                  {moment
                    .utc(
                      state?.selectedTrack?.trackMetaData?.contentDuration *
                        1000
                    )
                    .format("mm:ss") || "---"}
                </TCell>
              </TableRow>
              <TableRow>
                <TCell cell1={true}>AUDIO SIZE(in MB)</TCell>
                <TCell cell1={false}>
                  {(
                    state?.selectedTrack?.trackMetaData?.contentSize / 1024
                  ).toFixed(3) || "---"}
                </TCell>
              </TableRow>
              <TableRow>
                <TCell cell1={true}>UNDERLYING ENCODING OF FILE</TCell>
                <TCell cell1={false}>
                  {state?.selectedTrack?.trackMetaData?.contentEncoding ||
                    "---"}
                </TCell>
              </TableRow>
              <TableRow>
                <TCell cell1={true}>SAMPLING FREQUENCY</TCell>
                <TCell cell1={false}>
                  {state?.selectedTrack?.trackMetaData
                    ?.contentSamplingFrequency || "---"}
                </TCell>
              </TableRow>
              <TableRow>
                <TCell cell1={true}>QUALITY GRADE</TCell>
                <TCell cell1={false}>
                  {state?.selectedTrack?.trackMetaData?.contentQuality || "---"}
                </TCell>
              </TableRow>
              <TableRow>
                <TCell cell1={true}>DESCRIPTION</TCell>
                <TCell cell1={false}>
                  {state?.selectedTrack?.trackMetaData?.contentDescription ||
                    "---"}
                </TCell>
              </TableRow>
              <TableRow>
                <TCell cell1={true}>ADDITIONAL METADATA</TCell>
                <TCell cell1={false}>
                  {JSON.stringify(
                    state?.selectedTrack?.trackMetaData?.additionalMetadata
                  ) || "---"}
                </TCell>
              </TableRow>
            </Table>
          </Grid>

          <Grid container justifyContent="flex-end" className="mt-2">
            <AppButton
              variant={"outline"}
              onClick={closePopUp}
              fontSize={"15px"}
              fontFamily={theme.fontFamily.robotoMedium}
            >
              Cancel
            </AppButton>
          </Grid>
        </Grid>
      </PopUp>

      <DownloadProgressModal
        open={state.openDownloadingModal}
        percentage={state.percentComplete}
      />
    </>
  );
}

const TCell = ({ children, cell1, ...props }) => {
  if (cell1) {
    return (
      <TableCell size="small" width="35%" {...props}>
        <Content fontSize={"12px"}>{children}</Content>
      </TableCell>
    );
  } else {
    return (
      <TableCell size="small" width="65%" {...props}>
        <Content fontSize={"14px"}>{children}</Content>
      </TableCell>
    );
  }
};
