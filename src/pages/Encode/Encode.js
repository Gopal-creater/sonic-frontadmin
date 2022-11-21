import React from "react";
import {
  FileSelectionContainer,
  NewFileSelectionContainer,
  ExistingFileSelectionContainer,
  AppAutoCompleteContainer,
  TrackContainer,
  TrackTitleContainer,
  TrackTableContainer,
  TrackFilterContainer,
} from "./EncodeStyle";
import { Content, SubHeading } from "../../StyledComponents/StyledHeadings";
import { Grid } from "@material-ui/core";
import DragDropFile from "../../components/common/DragDropFile.js";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../stores/actions/actionTypes";
import EncodeData from "./Components/MetaDataDetails";
import { log } from "../../utils/app.debug.js";
import PaginationCount from "../../components/common/Pagination/PaginationCount";
import FilterComponent from "../../components/common/FilterComponent/FilterComponent";
import CommonDataLoadErrorSuccess from "../../components/common/CommonDataLoadErrorSuccess/CommonDataLoadErrorSuccess";
import CustomPagination from "../../components/common/Pagination/CustomPagination";
import { tags, tracksTableHeads } from "../../constants/constants";
import AppAutoComplete from "../../components/common/AutoComplete/AppAutoComplete";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import {
  exportTrackAction,
  getEncodeSearchTracksAction,
  getTracksAction,
} from "../../stores/actions/EncodeActions";
import TracksTable from "./Components/TracksTable";
import { getRoleWiseID } from "../../services/https/AuthHelper";
import * as mm from "music-metadata-browser";
import cogoToast from "cogo-toast";
import TrackFilter from "./Components/TrackFilter";
import CustomToolTip from "../../components/common/CustomToolTip";
import { useTheme } from "styled-components";

export default function Encode() {
  const [state, setState] = React.useState({
    tracksTableHeads: tracksTableHeads,
    currentSortBy: "",
    currentIsAscending: "",
    autoCompleteValue: "",
    openTrackFilter: false,
  });

  const encode = useSelector((state) => state.encode);
  const matches = useMediaQuery("(max-width:1280px)");
  const dispatch = useDispatch();
  const theme = useTheme();

  React.useEffect(() => {
    dispatch(
      getTracksAction(
        encode?.tracks.startDate,
        encode?.tracks?.endDate,
        encode?.tracks?.data?.page || 1,
        "10",
        encode?.tracks?.trackFilters
      )
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleExport = (format) => {
    log("format", format);
    dispatch(
      exportTrackAction(
        format,
        2000,
        encode?.tracks?.trackFilters,
        state.currentSortBy,
        state.currentIsAscending
      )
    );
  };

  const handleTrackPageChange = (event, value) => {
    dispatch(
      getTracksAction(
        encode?.tracks.startDate,
        encode?.tracks?.endDate,
        value,
        "10",
        encode?.tracks?.trackFilters,
        state.currentSortBy,
        state.currentIsAscending
      )
    );
  };

  const handleDragDropFile = (files) => {
    mm.parseBlob(files?.[0], { native: true })
      .then((metaData) => {
        // log("MetaData", metaData)
        let data = {
          additionalMetadata: "",
          contentName: metaData?.common?.title || "",
          contentOwner: metaData?.common?.artist || "",
          contentDuration: metaData.format.duration || "",
          contentSize: files?.[0]?.size / 1024,
          contentEncoding:
            (metaData.format.codec ? metaData.format.codec.toString() : "") +
            (metaData.format.sampleRate
              ? ", " + metaData.format.sampleRate.toString() + " Hz"
              : "") +
            (metaData.format.codecProfile
              ? ", " + metaData.format.codecProfile.toString()
              : "") +
            (metaData.format.bitrate
              ? ", " + metaData.format.bitrate.toString() + " bps"
              : "") +
            (metaData.format.numberOfChannels
              ? ", " + metaData.format.numberOfChannels.toString() + " ch"
              : ""),
          contentSamplingFrequency:
            metaData?.format?.sampleRate?.toString() + "  Hz",
          contentFileType: files?.[0]?.type,
        };
        dispatch({
          type: actionTypes.SET_SELECTED_FILE,
          data: { file: files?.[0], metaData: { ...encode.metaData, ...data } },
        });
      })
      .catch((err) => {
        cogoToast.error(err);
      });
  };

  const handleAutoCompleteSelectedValue = (v) => {
    log("Autocomplete selected value", v);
    let metaData = {
      ...encode?.metaData,
      contentName: v?.trackMetaData?.contentName || v?.title || "",
      contentType: v?.trackMetaData?.contentType || v?.fileType || "",
      contentOwner: v?.trackMetaData?.contentOwner || v?.artist || "",
      version: v?.trackMetaData?.version || "",
      contentFileType: v?.trackMetaData?.contentFileType || "",
      contentDuration: v?.trackMetaData?.contentDuration || v?.duration || "",
      contentSize: v?.trackMetaData?.contentSize || v?.fileSize || "",
      contentEncoding: v?.trackMetaData?.contentEncoding || v?.encoding || "",
      contentSamplingFrequency:
        v?.trackMetaData?.contentSamplingFrequency ||
        v?.samplingFrequency ||
        "",
      contentQuality: v?.trackMetaData?.contentQuality || "",
      contentDescription: v?.trackMetaData?.contentDescription || "",
      label: v?.trackMetaData?.label || "",
      distributor: v?.trackMetaData?.distributor || "",
      additionalMetadata: JSON.stringify(v?.trackMetaData?.additionalMetadata),
      encodeFromExistingFile: true,
    };
    dispatch({
      type: actionTypes.SET_SELECTED_EXISTING_FILE,
      data: { file: v, metaData: metaData },
    });
  };

  const trackSorting = (sortBy, isAscending, isActive) => {
    log("sortBy, isAscending, isActive", sortBy, isAscending, isActive);
    var newTrackTableHeads = state.tracksTableHeads.map((data) => {
      if (data.sortBy === sortBy) {
        dispatch(
          getTracksAction(
            encode?.tracks.startDate,
            encode?.tracks?.endDate,
            encode?.tracks?.data?.page,
            "10",
            encode?.tracks?.trackFilters,
            sortBy,
            isAscending
          )
        );
        return { ...data, isActive: isActive, isAscending: isAscending };
      }
      return { ...data, isActive: false, isAscending: null };
    });

    log("new table heads", newTrackTableHeads);

    return setState({
      ...state,
      tracksTableHeads: newTrackTableHeads,
      currentSortBy: sortBy,
      currentIsAscending: isAscending,
    });
  };

  return (
    <>
      {/* If any file is selected then go to encoding section---------- */}
      {encode?.selectedFile || encode?.selectedExistingFile ? (
        <EncodeData />
      ) : (
        <>
          {/* File selection appears here--------------------------------------- */}
          <FileSelectionContainer container>
            <NewFileSelectionContainer item lg sm={12}>
              <SubHeading color={theme.colors.primary.contrastText}>
                Encode new file with {tags.companyTag}
              </SubHeading>
              <Content color={theme.colors.primary.contrastText}>
                Copy MetaData from existing track if needed.
              </Content>

              <DragDropFile
                handleFiles={(files) => handleDragDropFile(files)}
              />
            </NewFileSelectionContainer>

            <Grid
              item
              style={{ width: matches ? "100%" : "80px" }}
              container
              justifyContent="center"
              alignItems="center"
            >
              <Content
                style={{ marginTop: "15px" }}
                color={theme.colors.primary.contrastText}
              >
                or
              </Content>
            </Grid>

            <ExistingFileSelectionContainer
              item
              container
              direction="column"
              lg
              sm={12}
            >
              <SubHeading color={theme.colors.primary.contrastText}>
                Encode existing file
              </SubHeading>

              <Content color={theme.colors.primary.contrastText}>
                Encode a track multiple times to share with different
                distributors.
              </Content>

              <AppAutoCompleteContainer>
                <AppAutoComplete
                  setTextFieldValue={(typedValue) =>
                    setState({ ...state, autoCompleteValue: typedValue })
                  }
                  textFieldValue={state.autoCompleteValue}
                  setAutoComPleteAction={(value) => {
                    dispatch(getEncodeSearchTracksAction(value));
                    log("user wise role", getRoleWiseID());
                  }}
                  setAutoCompleteOptions={(option) =>
                    option?.trackMetaData?.contentName ||
                    option?.originalFileName ||
                    ""
                  }
                  setAutoCompleteOptionsLabel={(option) =>
                    option?.trackMetaData?.contentOwner || ""
                  }
                  loading={encode?.encodeSearchTrack?.loading}
                  data={encode?.encodeSearchTrack?.data?.docs}
                  error={encode?.encodeSearchTrack?.error}
                  getSelectedValue={(e, v) =>
                    handleAutoCompleteSelectedValue(v)
                  }
                  placeholder={"Search for a track by title"}
                  helperText="Search your company records"
                />

                <Grid container justifyContent="flex-end">
                  <CustomToolTip
                    title={`Use this when you want to encode a track multiple times, each with a unique ${tags.companyTag} to share with different distributors. Saves time inputting data respectively.`}
                    placement={"bottom-end"}
                    arrow
                    marginTop={"30px"}
                  >
                    <HelpOutlineOutlinedIcon
                      style={{
                        color: theme.background.contrastText,
                        fontSize: "15px",
                      }}
                    />
                  </CustomToolTip>
                </Grid>
              </AppAutoCompleteContainer>
            </ExistingFileSelectionContainer>
          </FileSelectionContainer>
          {/* File selection appears here--------------------------------------- */}

          {/* Track Table part appears here--------------------------------- */}
          <TrackContainer>
            <TrackTitleContainer>
              <Grid>
                <SubHeading>Source Tracks</SubHeading>
                <Content>Browse your source tracks</Content>
              </Grid>
            </TrackTitleContainer>

            <TrackFilterContainer>
              <FilterComponent
                startDate={encode?.tracks.startDate}
                onChangeStartDate={(date) =>
                  dispatch({
                    type: actionTypes.SET_ENCODE_TRACKS_START_DATES,
                    data: date,
                  })
                }
                endDate={encode?.tracks?.endDate}
                onChangeEndDate={(date) =>
                  dispatch({
                    type: actionTypes.SET_ENCODE_TRACKS_END_DATES,
                    data: date,
                  })
                }
                filterComponent={<TrackFilter open={true} />}
                exportData={(value) => handleExport(value)}
                pdf={false}
                timezone={false}
              />
            </TrackFilterContainer>

            <TrackTableContainer>
              <CommonDataLoadErrorSuccess
                error={encode?.tracks?.error}
                loading={encode?.tracks?.loading}
                onClickTryAgain={() =>
                  dispatch(
                    dispatch(
                      getTracksAction(
                        encode?.tracks.startDate,
                        encode?.tracks?.endDate,
                        1,
                        "10",
                        encode?.tracks?.trackFilters,
                        state.currentSortBy,
                        state.currentIsAscending
                      )
                    )
                  )
                }
              >
                <TracksTable
                  data={encode?.tracks?.data?.docs}
                  tableHeads={state.tracksTableHeads}
                  trackSorting={(sortBy, isAscending, isActive) =>
                    trackSorting(sortBy, isAscending, isActive)
                  }
                  paginationCount={
                    <PaginationCount
                      heading={true}
                      name="Tracks"
                      total={encode?.tracks?.data?.totalDocs}
                      start={encode?.tracks?.data?.offset}
                      end={encode?.tracks?.data?.docs?.length}
                    />
                  }
                />

                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  style={{ marginTop: "30px" }}
                >
                  <Grid item xs={12} sm={6} md={6}>
                    <PaginationCount
                      name="Tracks"
                      total={encode?.tracks?.data?.totalDocs}
                      start={encode?.tracks?.data?.offset}
                      end={encode?.tracks?.data?.docs?.length}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <CustomPagination
                      count={encode?.tracks?.data?.totalPages}
                      page={encode?.tracks?.data?.page}
                      onChange={handleTrackPageChange}
                    />
                  </Grid>
                </Grid>
              </CommonDataLoadErrorSuccess>
            </TrackTableContainer>
          </TrackContainer>
          {/* Track Table part appears here--------------------------------- */}
        </>
      )}
    </>
  );
}
