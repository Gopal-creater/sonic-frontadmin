import React from "react";
import {
  EncodeContainer,
  MetaDataHeaderContainer,
  CheckBoxLabelContainer,
  IconContainer,
  ButtonContainer,
  SearchTrackContainer,
  MetaDataDetailsContainer,
  ProperAccessContainer,
  RightsHolderContainer,
  RadioLabel,
  TextContainer,
  PopUpContainer,
  TitleContainer,
  Anchor,
  SelectedTrackTextContainer,
  UlList,
} from "./indexStyles";
import {
  SubHeading,
  Content,
} from "../../../../StyledComponents/StyledHeadings";
import { useDispatch, useSelector } from "react-redux";
import { log } from "../../../../utils/app.debug";
import AppCheckBox from "../../../../components/common/AppCheckBox";
import { FormControlLabel, Grid, RadioGroup } from "@material-ui/core";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import { StyledTextField } from "../../../../StyledComponents/StyledAppTextInput/StyledAppTextInput";
import moment from "moment";
import { CustomRadioButton } from "../../../../components/common/AppRadioButton/AppRadioButton";
import AppButton from "../../../../components/common/AppButton/AppButton";
import * as actionTypes from "../../../../stores/actions/actionTypes";
import {
  encodeFromFileAction,
  encodeFromTrackAction,
  getEncodeSearchTracksAction,
  getTracksAction,
} from "../../../../stores/actions/EncodeActions";
import cogoToast from "cogo-toast";
import PopUp from "../../../../components/common/PopUp";
import amazingRadio_Icon from "../../../../assets/icons/amazingRadio_Icon.png";
import sonic_preloader from "../../../../assets/icons/sonic_preloader.gif";

import CloseIcon from "@material-ui/icons/Close";
import CustomDropDown from "../../../../components/common/AppTextInput/CustomDropDown";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import AppAutoComplete from "../../../../components/common/AutoComplete/AppAutoComplete";
import IconButton from "@material-ui/core/IconButton";
import { Distributor, Labels, tags } from "../../../../constants/constants";
import DownloadIcon from "../../../../assets/images/download.png";
import axios from "axios";
import { downloadAnyFile } from "../../../../services/https/resources/EncodeApi/encodeApi";
import DownloadProgressModal from "../DownloadProgressModal";
import fileDownload from "js-file-download";
import { useTheme } from "styled-components";

export default function EncodeData() {
  const encodeReducer = useSelector((state) => state.encode);
  const dispatch = useDispatch();
  const theme = useTheme();

  let labelArray = Labels.map((data) => {
    return { name: data };
  });
  let distributorArray = Distributor.map((data) => {
    return { name: data };
  });

  const [state, setState] = React.useState({
    copyMetaData: false,
    autoCompleteValue: null,
    displaySelectedTrack: false,
    openDownloadingModal: false,
    percentComplete: "",
  });

  React.useEffect(() => {
    if (encodeReducer?.selectedExistingFile)
      setState({
        ...state,
        copyMetaData: true,
        displaySelectedTrack: true,
        autoCompleteValue: encodeReducer?.selectedExistingFile,
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const encode = () => {
    if (encodeReducer?.loading) return;
    if (!encodeReducer?.metaData?.contentOwner)
      return cogoToast.error("Artist is mandetory field");
    if (
      encodeReducer?.metaData?.additionalMetadata &&
      !isJsonObject(encodeReducer?.metaData?.additionalMetadata)
    )
      return cogoToast.error("Additional MetaData must be in JSON format");

    if (
      encodeReducer?.metaData?.contentType === "Music" &&
      (encodeReducer?.metaData?.isrcCode === "" ||
        encodeReducer?.metaData?.isrcCode === undefined) &&
      (encodeReducer?.metaData?.iswcCode === "" ||
        encodeReducer?.metaData?.iswcCode === undefined) &&
      (encodeReducer?.metaData?.tuneCode === "" ||
        encodeReducer?.metaData?.tuneCode === undefined)
    ) {
      return cogoToast.error(
        'At least one industry code(ISRC,ISWC or TuneCode ) must be given when type is "Music".'
      );
    }

    if (encodeReducer?.selectedFile)
      dispatch(
        encodeFromFileAction(
          encodeReducer?.selectedFile,
          encodeReducer?.metaData
        )
      );
    if (encodeReducer?.selectedExistingFile) dispatch(encodeFromTrackAction());
  };

  const handleAutoCompleteSelectedValue = (v) => {
    log("Autocomplete selected value", v);
    let metaData = {
      ...encodeReducer?.metaData,
      contentName: v?.trackMetaData?.contentName || v?.title || "",
      version: v?.trackMetaData?.version || "",
      contentOwner: v?.trackMetaData?.contentOwner || v?.artist || "",
      contentType: v?.trackMetaData?.contentType || v?.fileType || "",
      label: v?.trackMetaData?.label || "",
      distributor: v?.trackMetaData?.distributor || "",
      contentDescription: v?.trackMetaData?.contentDescription || "",
      additionalMetadata: JSON.stringify(v?.trackMetaData?.additionalMetadata),
    };
    dispatch({ type: actionTypes.SET_METADATA, data: metaData });
    setState({ ...state, displaySelectedTrack: true, autoCompleteValue: v });
  };

  const isJsonObject = (str) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };

  log("Encode reducer", encodeReducer);

  const downloadEncodedFile = () => {
    setState({ ...state, openDownloadingModal: true });
    downloadAnyFile(encodeReducer?.data?.s3FileMeta?.Key)
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
            fileDownload(res.data, encodeReducer?.data?.originalFileName);
            setState({ ...state, openDownloadingModal: false });

            dispatch({ type: actionTypes.CLEAR_SELECTED_FILE });
            dispatch({ type: actionTypes.CLOSE_SUCCESS_POPUP });
            dispatch({ type: actionTypes.CLOSE_ERROR_POPUP });
            dispatch(
              getTracksAction(
                encodeReducer?.tracks.startDate,
                encodeReducer?.tracks?.endDate,
                encodeReducer?.tracks?.data?.page || 1,
                "10"
              )
            );
          })
          .catch((error) => {
            log("Download error", error);
            cogoToast.error(error?.message);
            setState({ ...state, openDownloadingModal: false });

            dispatch({ type: actionTypes.CLEAR_SELECTED_FILE });
            dispatch({ type: actionTypes.CLOSE_SUCCESS_POPUP });
            dispatch({ type: actionTypes.CLOSE_ERROR_POPUP });
            dispatch(
              getTracksAction(
                encodeReducer?.tracks.startDate,
                encodeReducer?.tracks?.endDate,
                encodeReducer?.tracks?.data?.page || 1,
                "10"
              )
            );
          });
      })
      .catch((error) => {
        log("Download error", error);
        cogoToast.error(error?.message);
        setState({ ...state, openDownloadingModal: false });

        dispatch({ type: actionTypes.CLEAR_SELECTED_FILE });
        dispatch({ type: actionTypes.CLOSE_SUCCESS_POPUP });
        dispatch({ type: actionTypes.CLOSE_ERROR_POPUP });
        dispatch(
          getTracksAction(
            encodeReducer?.tracks.startDate,
            encodeReducer?.tracks?.endDate,
            encodeReducer?.tracks?.data?.page || 1,
            "10"
          )
        );
      });
  };

  return (
    <EncodeContainer>
      <MetaDataHeaderContainer>
        <TextContainer>
          <Grid container direction="column" justifyItem="center">
            <Content color={theme.colors.primary.contrastText}>
              {encodeReducer?.selectedExistingFile
                ? "You're about to encode again:"
                : "You're about to encode new file:"}
            </Content>
            <SubHeading color={theme.colors.primary.contrastText}>
              {encodeReducer?.selectedFile?.name ||
                encodeReducer?.selectedFile?.originalFileName ||
                encodeReducer?.selectedExistingFile?.title ||
                encodeReducer?.selectedExistingFile?.originalFileName}
            </SubHeading>

            <FormControlLabel
              control={
                <AppCheckBox
                  value={state.copyMetaData}
                  color={theme.colors.primary.contrastText}
                  onChange={() =>
                    setState({ ...state, copyMetaData: !state.copyMetaData })
                  }
                />
              }
              label={
                <CheckBoxLabelContainer>
                  <Content color={theme.colors.primary.contrastText}>
                    Copy MetaData from existing track
                  </Content>
                  <HelpOutlineOutlinedIcon
                    style={{
                      color: theme.colors.primary.contrastText,
                      fontSize: 17,
                      marginLeft: "5px",
                    }}
                  />
                </CheckBoxLabelContainer>
              }
            />
          </Grid>

          <IconContainer>
            <img src={amazingRadio_Icon} width={"55px"} alt="upload_icon" />
          </IconContainer>
        </TextContainer>

        {state.copyMetaData ? (
          state.displaySelectedTrack ? (
            <SearchTrackContainer>
              <SelectedTrackTextContainer>
                <Grid>
                  <IconButton
                    color={theme.colors.primary.main}
                    aria-label="upload picture"
                    component="span"
                    onClick={() =>
                      setState({ ...state, displaySelectedTrack: false })
                    }
                  >
                    <CancelOutlinedIcon />
                  </IconButton>
                </Grid>
                <Grid style={{ marginLeft: "10px" }}>
                  <Content>
                    {state?.autoCompleteValue?.trackMetaData?.contentName ||
                      state?.autoCompleteValue?.originalFileName ||
                      ""}
                  </Content>
                  <Content style={{ lineHeight: "1", marginTop: "-5px" }}>
                    {state?.autoCompleteValue?.trackMetaData?.contentOwner ||
                      ""}
                  </Content>
                </Grid>
              </SelectedTrackTextContainer>
            </SearchTrackContainer>
          ) : (
            <SearchTrackContainer>
              <AppAutoComplete
                setTextFieldValue={(typedValue) =>
                  setState({ ...state, autoCompleteValue: typedValue })
                }
                textFieldValue={state.autoCompleteValue}
                setAutoComPleteAction={(value) =>
                  dispatch(getEncodeSearchTracksAction(value))
                }
                setAutoCompleteOptions={(option) =>
                  option?.trackMetaData?.contentName ||
                  option?.originalFileName ||
                  ""
                }
                setAutoCompleteOptionsLabel={(option) =>
                  option?.trackMetaData?.contentOwner || ""
                }
                loading={encodeReducer?.encodeSearchTrack?.loading}
                data={encodeReducer?.encodeSearchTrack?.data?.docs}
                error={encodeReducer?.encodeSearchTrack?.error}
                getSelectedValue={(e, v) => handleAutoCompleteSelectedValue(v)}
                placeholder={"Search for a track by title"}
                helperText="Search your company records"
              />
            </SearchTrackContainer>
          )
        ) : (
          ""
        )}
      </MetaDataHeaderContainer>

      <MetaDataDetailsContainer>
        <SubHeading>Enter MetaData details</SubHeading>

        <Grid container spacing={10}>
          <Grid item lg={6}>
            <StyledTextField
              disabled={
                encodeReducer?.metaData?.encodeFromExistingFile === true
                  ? true
                  : false
              }
              variant={
                encodeReducer?.metaData?.encodeFromExistingFile === true
                  ? "filled"
                  : "standard"
              }
              fullWidth
              id="standard-basic"
              label="Title"
              value={encodeReducer?.metaData?.contentName}
              onChange={(e) => {
                dispatch({
                  type: actionTypes.SET_METADATA,
                  data: {
                    ...encodeReducer.metaData,
                    contentName: e.target.value,
                  },
                });
              }}
              placeholder="Song,Video or Audio track title"
              autoComplete="off"
            />

            <Grid className="mt-3">
              <CustomDropDown
                id="channel-dropdown"
                labelText="Type"
                formControlProps={{
                  fullWidth: true,
                }}
                labelProps={{
                  style: {
                    fontFamily: theme.fontFamily.robotoRegular,
                    padding: `${
                      encodeReducer?.metaData?.encodeFromExistingFile === true
                        ? "10px 0px 0px 15px"
                        : "0px"
                    }`,
                  },
                }}
                inputProps={{
                  disabled:
                    encodeReducer?.metaData?.encodeFromExistingFile === true
                      ? true
                      : false,
                  variant:
                    encodeReducer?.metaData?.encodeFromExistingFile === true
                      ? "filled"
                      : "standard",
                  value: encodeReducer?.metaData?.contentType,
                  onChange: (e) =>
                    dispatch({
                      type: actionTypes.SET_METADATA,
                      data: {
                        ...encodeReducer.metaData,
                        contentType: e.target.value,
                      },
                    }),
                }}
                data={
                  [{ name: "Music" }, { name: "Video" }, { name: "Audio" }] ||
                  []
                }
              />
            </Grid>

            <StyledTextField
              disabled={
                encodeReducer?.metaData?.encodeFromExistingFile === true
                  ? true
                  : false
              }
              variant={
                encodeReducer?.metaData?.encodeFromExistingFile === true
                  ? "filled"
                  : "standard"
              }
              fullWidth
              id="standard-basic"
              label="Artist"
              value={encodeReducer?.metaData?.contentOwner}
              className="mt-3"
              onChange={(e) => {
                dispatch({
                  type: actionTypes.SET_METADATA,
                  data: {
                    ...encodeReducer.metaData,
                    contentOwner: e.target.value,
                  },
                });
              }}
            />

            <StyledTextField
              disabled={
                encodeReducer?.metaData?.encodeFromExistingFile === true
                  ? true
                  : false
              }
              variant={
                encodeReducer?.metaData?.encodeFromExistingFile === true
                  ? "filled"
                  : "standard"
              }
              fullWidth
              id="standard-basic"
              label="Version"
              className="mt-3"
              value={encodeReducer?.metaData?.version}
              onChange={(e) => {
                dispatch({
                  type: actionTypes.SET_METADATA,
                  data: { ...encodeReducer.metaData, version: e.target.value },
                });
              }}
            />

            <StyledTextField
              disabled={
                encodeReducer?.metaData?.encodeFromExistingFile === true
                  ? true
                  : false
              }
              variant={
                encodeReducer?.metaData?.encodeFromExistingFile === true
                  ? "filled"
                  : "standard"
              }
              fullWidth
              id="standard-basic"
              label="ISRC"
              className="mt-3"
              value={encodeReducer?.metaData?.isrcCode}
              onChange={(e) => {
                dispatch({
                  type: actionTypes.SET_METADATA,
                  data: { ...encodeReducer.metaData, isrcCode: e.target.value },
                });
              }}
              // helperText="Hint: GB-H01-02-12345."
            />

            <StyledTextField
              disabled={
                encodeReducer?.metaData?.encodeFromExistingFile === true
                  ? true
                  : false
              }
              variant={
                encodeReducer?.metaData?.encodeFromExistingFile === true
                  ? "filled"
                  : "standard"
              }
              fullWidth
              id="standard-basic"
              label="ISWC"
              className="mt-3"
              value={encodeReducer?.metaData?.iswcCode}
              onChange={(e) => {
                dispatch({
                  type: actionTypes.SET_METADATA,
                  data: { ...encodeReducer.metaData, iswcCode: e.target.value },
                });
              }}
              // helperText="Hint: T-123.456.789-C."
            />

            <StyledTextField
              disabled={
                encodeReducer?.metaData?.encodeFromExistingFile === true
                  ? true
                  : false
              }
              variant={
                encodeReducer?.metaData?.encodeFromExistingFile === true
                  ? "filled"
                  : "standard"
              }
              fullWidth
              id="standard-basic"
              label="Tune Code"
              className="mt-3"
              value={encodeReducer?.metaData?.tuneCode}
              onChange={(e) => {
                dispatch({
                  type: actionTypes.SET_METADATA,
                  data: { ...encodeReducer.metaData, tuneCode: e.target.value },
                });
              }}
              // helperText="Hint: 9876543Z."
            />

            <StyledTextField
              disabled
              fullWidth
              id="standard-basic"
              label="File type"
              variant="filled"
              className="mt-3"
              inputProps={{ readOnly: true }}
              InputLabelProps={{ shrink: true }}
              value={encodeReducer?.metaData?.contentFileType}
            />

            <StyledTextField
              fullWidth
              disabled
              variant="filled"
              id="standard-basic"
              label="Audio length"
              className="mt-3"
              inputProps={{ readOnly: true }}
              InputLabelProps={{ shrink: true }}
              value={moment
                .utc(encodeReducer?.metaData?.contentDuration * 1000)
                .format("HH:mm:ss:SSS")}
            />
          </Grid>

          <Grid item lg={6}>
            <StyledTextField
              fullWidth
              disabled
              variant="filled"
              id="standard-basic"
              label="Audio Size (In MB)"
              inputProps={{ readOnly: true }}
              value={(encodeReducer?.metaData?.contentSize / 1024).toFixed(3)}
            />

            <StyledTextField
              fullWidth
              disabled
              variant="filled"
              id="standard-basic"
              label="Underlying encoding of file"
              inputProps={{ readOnly: true }}
              InputLabelProps={{ shrink: true }}
              value={encodeReducer?.metaData?.contentEncoding}
              className="mt-3"
            />

            <StyledTextField
              fullWidth
              disabled
              variant="filled"
              id="standard-basic"
              label="Sampling Frequency"
              className="mt-3"
              inputProps={{ readOnly: true }}
              InputLabelProps={{ shrink: true }}
              value={encodeReducer?.metaData?.contentSamplingFrequency}
            />

            <StyledTextField
              disabled={
                encodeReducer?.metaData?.encodeFromExistingFile === true
                  ? true
                  : false
              }
              variant={
                encodeReducer?.metaData?.encodeFromExistingFile === true
                  ? "filled"
                  : "standard"
              }
              fullWidth
              id="standard-basic"
              label="Quality Grade"
              className="mt-3"
              value={encodeReducer?.metaData?.contentQuality}
              onChange={(e) => {
                dispatch({
                  type: actionTypes.SET_METADATA,
                  data: {
                    ...encodeReducer.metaData,
                    contentQuality: e.target.value,
                  },
                });
              }}
            />

            <StyledTextField
              fullWidth
              id="standard-basic"
              label="Description"
              className="mt-3"
              multiline
              value={encodeReducer?.metaData?.contentDescription}
              onChange={(e) => {
                dispatch({
                  type: actionTypes.SET_METADATA,
                  data: {
                    ...encodeReducer.metaData,
                    contentDescription: e.target.value,
                  },
                });
              }}
            />

            <Grid style={{ marginTop: "35px" }}>
              <AppAutoComplete
                setAutoComPleteAction={(value) => ""}
                setAutoCompleteOptions={(option) => option?.name || ""}
                data={distributorArray}
                setAutoCompleteOptionsLabel={(option) => ""}
                getSelectedValue={(e, v) =>
                  dispatch({
                    type: actionTypes.SET_METADATA,
                    data: { ...encodeReducer.metaData, distributor: v?.name },
                  })
                }
                placeholder={"Distributor"}
              />
            </Grid>

            <Grid style={{ marginTop: "35px" }}>
              {encodeReducer?.metaData?.encodeFromExistingFile === true ? (
                <StyledTextField
                  disabled={true}
                  variant={"filled"}
                  fullWidth
                  multiline
                  placeholder="Label"
                  id="standard-basic"
                  label="Label"
                  className="mt-3"
                  value={encodeReducer?.metaData?.label}
                />
              ) : (
                <AppAutoComplete
                  setAutoComPleteAction={(value) => ""}
                  setAutoCompleteOptions={(option) => option?.name || ""}
                  data={labelArray}
                  setAutoCompleteOptionsLabel={(option) => ""}
                  getSelectedValue={(e, v) =>
                    dispatch({
                      type: actionTypes.SET_METADATA,
                      data: { ...encodeReducer.metaData, label: v?.name },
                    })
                  }
                  placeholder={"Label"}
                />
              )}
            </Grid>

            <StyledTextField
              disabled={
                encodeReducer?.metaData?.encodeFromExistingFile === true
                  ? true
                  : false
              }
              variant={
                encodeReducer?.metaData?.encodeFromExistingFile === true
                  ? "filled"
                  : "standard"
              }
              fullWidth
              multiline
              placeholder="Json object"
              id="standard-basic"
              label="Additional MetaData"
              className="mt-3"
              value={encodeReducer?.metaData?.additionalMetadata}
              onChange={(e) => {
                dispatch({
                  type: actionTypes.SET_METADATA,
                  data: {
                    ...encodeReducer.metaData,
                    additionalMetadata: e.target.value,
                  },
                });
              }}
            />
          </Grid>
        </Grid>

        <ProperAccessContainer>
          <RightsHolderContainer>
            <Content
              color={theme.colors.grey.main}
              fontFamily={theme.fontFamily.robotoMedium}
            >
              Are you the Rights Holder for the audio file you wish to encode
              with a {tags.companyTag}?
            </Content>
            <RadioGroup
              row
              style={{ marginLeft: "20px" }}
              value={
                encodeReducer?.metaData?.isRightsHolderForEncode === null
                  ? ""
                  : encodeReducer?.metaData?.isRightsHolderForEncode
                  ? "Yes"
                  : "No"
              }
              onChange={(e) =>
                dispatch({
                  type: actionTypes.SET_METADATA,
                  data: {
                    ...encodeReducer.metaData,
                    isRightsHolderForEncode:
                      e.target.value === "Yes" ? true : false,
                  },
                })
              }
            >
              <FormControlLabel
                value={"Yes"}
                control={<CustomRadioButton style={{ marginTop: "-5px" }} />}
                label={<RadioLabel>Yes</RadioLabel>}
              />
              <FormControlLabel
                value={"No"}
                control={<CustomRadioButton style={{ marginTop: "-5px" }} />}
                label={<RadioLabel>No</RadioLabel>}
              />
            </RadioGroup>
          </RightsHolderContainer>
          <ul>
            <UlList>
              If you select 'Yes' the grey encode button will turn to blue and
              you can immediately encode the audio file by cUlListcking on the
              blue encode button.
            </UlList>
            <UlList>
              If you select 'No', please answer the question below.
            </UlList>
          </ul>

          <RightsHolderContainer>
            <Content
              color={theme.colors.grey.main}
              fontFamily={theme.fontFamily.robotoMedium}
            >
              Are you Authorised by the Rights Holder to encode this audio file
              with a {tags.companyTag}?
            </Content>
            <RadioGroup
              row
              style={{ marginLeft: "20px" }}
              value={
                encodeReducer?.metaData?.isAuthorizedForEncode === null
                  ? ""
                  : encodeReducer?.metaData?.isAuthorizedForEncode
                  ? "Yes"
                  : "No"
              }
              onChange={(e) =>
                dispatch({
                  type: actionTypes.SET_METADATA,
                  data: {
                    ...encodeReducer.metaData,
                    isAuthorizedForEncode:
                      e.target.value === "Yes" ? true : false,
                  },
                })
              }
            >
              <FormControlLabel
                value={"Yes"}
                control={<CustomRadioButton style={{ marginTop: "-5px" }} />}
                label={<RadioLabel>Yes</RadioLabel>}
              />
              <FormControlLabel
                value={"No"}
                control={<CustomRadioButton style={{ marginTop: "-5px" }} />}
                label={<RadioLabel>No</RadioLabel>}
              />
            </RadioGroup>
          </RightsHolderContainer>
          <ul>
            <UlList>
              If you select 'Yes' the grey encode button will turn to blue and
              you can immediately encode the audio file by clicking on the blue
              encode button.
            </UlList>
            <UlList>
              IIf you select 'No', you will be unable to encode the file.
            </UlList>
          </ul>
        </ProperAccessContainer>

        <ButtonContainer>
          <AppButton
            variant={"outline"}
            onClick={() => {
              dispatch({ type: actionTypes.CLEAR_SELECTED_FILE });
              dispatch(
                getTracksAction(
                  encodeReducer?.tracks.startDate,
                  encodeReducer?.tracks?.endDate,
                  encodeReducer?.tracks?.data?.page || 1,
                  "10"
                )
              );
            }}
          >
            Cancel
          </AppButton>
          <AppButton
            disabled={
              encodeReducer?.metaData?.isAuthorizedForEncode === false &&
              encodeReducer?.metaData?.isRightsHolderForEncode === false
                ? true
                : encodeReducer?.metaData?.isAuthorizedForEncode ||
                  encodeReducer?.metaData?.isRightsHolderForEncode ||
                  (encodeReducer?.metaData?.isAuthorizedForEncode !== null &&
                    encodeReducer?.metaData?.isRightsHolderForEncode !== null)
                ? false
                : true
            }
            variant={"fill"}
            style={{ marginLeft: "15px", width: "175px" }}
            onClick={encode}
          >
            Encode New File
          </AppButton>
        </ButtonContainer>
      </MetaDataDetailsContainer>

      <PopUp
        id="loadingPopUp"
        open={encodeReducer?.loadingPopUp}
        maxWidth="sm"
        fullWidth
      >
        <PopUpContainer>
          <TitleContainer container direction="column" alignItems="center">
            <img
              src={amazingRadio_Icon}
              style={{ width: "140px", height: "140px", zIndex: 1 }}
              alt="encode_progress"
            />
            <SubHeading
              className="mt-4"
              style={{ textAlign: "center", zIndex: 1 }}
              color={theme.colors.primary.contrastText}
            >
              Encoding of{" "}
              {encodeReducer?.selectedFile?.name ||
                encodeReducer?.selectedFile?.originalFileName ||
                encodeReducer?.selectedExistingFile?.title ||
                encodeReducer?.selectedExistingFile?.originalFileName}{" "}
              in progress
            </SubHeading>
          </TitleContainer>
          <Content style={{ textAlign: "center", padding: "25px" }}>
            The speed of your internet connection and the size of the audio file
            may affect encoding and decoding times.
          </Content>
          <Grid container justifyContent="center">
            <img src={sonic_preloader} alt="sonic preloader" />
          </Grid>
        </PopUpContainer>
      </PopUp>

      <PopUp
        id="successPopUp"
        open={encodeReducer?.successPopUp}
        maxWidth="sm"
        fullWidth
      >
        <PopUpContainer padding="20px 40px 25px 40px">
          <Grid container justifyContent="flex-end">
            <CloseIcon
              onClick={() => {
                dispatch({ type: actionTypes.CLEAR_SELECTED_FILE });
                dispatch({ type: actionTypes.CLOSE_SUCCESS_POPUP });
                dispatch({ type: actionTypes.CLOSE_ERROR_POPUP });
                dispatch(
                  getTracksAction(
                    encodeReducer?.tracks.startDate,
                    encodeReducer?.tracks?.endDate,
                    encodeReducer?.tracks?.data?.page || 1,
                    "10"
                  )
                );
              }}
              style={{ cursor: "pointer" }}
            />
          </Grid>
          <TitleContainer container direction="column" alignItems="center">
            <img
              src={amazingRadio_Icon}
              style={{ width: "140px", height: "140px", zIndex: 1 }}
              alt="success_icon"
            />
            <SubHeading
              className="mt-4"
              style={{ textAlign: "center", zIndex: 1 }}
              color={theme.colors.primary.contrastText}
            >
              Well done! Encoding successful
            </SubHeading>
          </TitleContainer>
          <Grid container justifyContent="center" className="mt-1">
            <AppButton
              onClick={() => {
                dispatch({ type: actionTypes.CLEAR_SELECTED_FILE });
                dispatch({ type: actionTypes.CLOSE_SUCCESS_POPUP });
                dispatch({ type: actionTypes.CLOSE_ERROR_POPUP });
                dispatch(
                  getTracksAction(
                    encodeReducer?.tracks.startDate,
                    encodeReducer?.tracks?.endDate,
                    encodeReducer?.tracks?.data?.page || 1,
                    "10"
                  )
                );
              }}
              fontSize={"15px"}
              fontFamily={theme.fontFamily.robotoBlack}
            >
              Encode another file
            </AppButton>
          </Grid>
          <AppButton
            startIcon={<img src={DownloadIcon} alt="download_icon" />}
            style={{ padding: "0px" }}
            variant={"none"}
            onClick={() => downloadEncodedFile()}
          >
            Download
          </AppButton>
        </PopUpContainer>
      </PopUp>

      <PopUp
        id="errorPopUp"
        open={encodeReducer?.errorPopUp}
        maxWidth="sm"
        fullWidth
      >
        <PopUpContainer padding="20px 40px 25px 40px">
          <Grid container justifyContent="flex-end">
            <CloseIcon
              onClick={() => {
                dispatch({ type: actionTypes.CLOSE_ERROR_POPUP });
              }}
              style={{ cursor: "pointer" }}
            />
          </Grid>
          <TitleContainer container direction="column" alignItems="center">
            <img
              src={amazingRadio_Icon}
              style={{ width: "140px", height: "140px", zIndex: 1 }}
              alt="error_encode"
            />
            <SubHeading
              className="mt-4"
              style={{ textAlign: "center", zIndex: 1 }}
              color={theme.colors.primary.contrastText}
            >
              Ooops! Encoding failed
            </SubHeading>
          </TitleContainer>
          <Grid container justifyContent="center" className="mt-1">
            <AppButton
              onClick={() => {
                dispatch({ type: actionTypes.CLOSE_ERROR_POPUP });
                encode();
              }}
              fontFamily={theme.fontFamily.robotoMedium}
            >
              Try to encode again
            </AppButton>
          </Grid>
          <Grid className="mt-5">
            <Content fontFamily={theme.fontFamily.robotoMedium}>
              Do you need help?
            </Content>
            <Content>
              Use <Anchor>HelpCenter</Anchor> or email our{" "}
              <Anchor>Support Team</Anchor>
            </Content>
          </Grid>
        </PopUpContainer>
      </PopUp>

      <DownloadProgressModal
        open={state.openDownloadingModal}
        percentage={state.percentComplete}
      />
    </EncodeContainer>
  );
}
