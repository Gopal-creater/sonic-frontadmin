import React from "react";
import {
  IconButton,
  Grid,
  Dialog,
  DialogTitle,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Table from "react-bootstrap/Table";
import CloseIcon from "@material-ui/icons/Close";
import DialogActions from "@material-ui/core/DialogActions";
import { makeStyles } from "@material-ui/core/styles";
import amazingRadio_Icon from "../../../src/assets/icons/amazingRadio_Icon.png";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../stores/actions/actionTypes";
import { log } from "../../utils/app.debug";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import cogoToast from "cogo-toast";
import AppButton from "./AppButton/AppButton";
import { monitorInitialState } from "../../stores/reducers/monitor/monitorReducer";
import { getMonitorListAction } from "../../stores/actions/monitorActions/monitorActions";
import { useNavigate } from "react-router-dom";
import { Distributor, Labels, tags } from "../../constants/constants";
import CustomDropDown from "./AppTextInput/CustomDropDown";
import { editSonicMetaData } from "../../services/https/resources/SonicKeys/SonicKeys.api";
import AppAutoComplete from "./AutoComplete/AppAutoComplete";
import { isJsonObject } from "../../utils/HelperMethods";
import { useTheme } from "styled-components";

const MetaDataDailog = (props) => {
  const [values, setValues] = React.useState({
    channelName: props?.sonicKey?.channel,
    startDate: new Date().setMonth(new Date().getMonth() - 1),
    endDate: new Date(),
    switchEdit: false,
    sonicKey: props?.sonicKey,
    updateSonicKeyLoading: false,
    updatingSonicKey: {
      contentName: "",
      version: "",
      contentOwner: "",
      contentType: "",
      isrcCode: "",
      iswcCode: "",
      tuneCode: "",
      label: { name: "" },
      distributor: { name: "" },
      contentQuality: "",
      contentDescription: "",
      additionalMetadata: "",
    },
  });

  let distributorArray = Distributor.map((data) => {
    return { name: data };
  });
  let labelArray = Labels.map((data) => {
    return { name: data };
  });

  React.useEffect(() => {
    setValues({
      ...values,
      updatingSonicKey: {
        contentName: props?.sonicKey?.contentName || "",
        version: props?.sonicKey?.version || "",
        contentOwner: props?.sonicKey?.contentOwner || "",
        contentType: props?.sonicKey?.contentType || "",
        isrcCode: props?.sonicKey?.isrcCode || "",
        iswcCode: props?.sonicKey?.iswcCode || "",
        tuneCode: props?.sonicKey?.tuneCode || "",
        label: { name: props?.sonicKey?.label || "" },
        distributor: { name: props?.sonicKey?.distributor || "" },
        contentQuality: props?.sonicKey?.contentQuality || "",
        contentDescription: props?.sonicKey?.contentDescription || "",
        additionalMetadata:
          JSON.stringify(props?.sonicKey?.additionalMetadata) || "",
      },
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const theme = useTheme();
  const dispatch = useDispatch();
  const monitor = useSelector((state) => state.monitor);
  const navigate = useNavigate();
  const classes = useStyles();

  const handleCloseTable = () => {
    if (values?.updateSonicKeyLoading) {
      return;
    }
    props.setOpenTable(false);
  };

  const actions = {
    loading: actionTypes.SET_PLAYS_LOADING,
    success: actionTypes.SET_PLAYS_SUCCESS,
    error: actionTypes.SET_PLAYS_ERROR,
  };

  const viewPlaysWithSonicKey = () => {
    dispatch({
      type: actionTypes.SET_MONITOR_FILTERS,
      data: {
        ...monitorInitialState?.filters,
        sonicKey: values?.sonicKey?.sonicKey,
      },
    });
    dispatch(
      getMonitorListAction(
        actions,
        monitor?.dates?.startDate,
        monitor?.dates?.endDate,
        1,
        10
      )
    );
    props.setOpenTable(false);
    navigate("/monitor/plays");
  };

  const updateSonicKey = () => {
    if (values?.updateSonicKeyLoading) {
      return;
    }

    if (
      values?.updatingSonicKey?.additionalMetadata &&
      !isJsonObject(values?.updatingSonicKey?.additionalMetadata)
    )
      return cogoToast.error("Additional MetaData must be in JSON format");

    setValues({ ...values, updateSonicKeyLoading: true });
    let payload = {
      contentName: values?.updatingSonicKey?.contentName,
      version: values?.updatingSonicKey?.version,
      contentOwner: values?.updatingSonicKey?.contentOwner,
      contentType: values?.updatingSonicKey?.contentType,
      isrcCode: values?.updatingSonicKey?.isrcCode,
      iswcCode: values?.updatingSonicKey?.iswcCode,
      tuneCode: values?.updatingSonicKey?.tuneCode,
      label: values?.updatingSonicKey?.label?.name,
      distributor: values?.updatingSonicKey?.distributor?.name || undefined,
      contentQuality: values?.updatingSonicKey?.contentQuality,
      contentDescription: values?.updatingSonicKey?.contentDescription,
      additionalMetadata:
        values?.updatingSonicKey?.additionalMetadata &&
        JSON.parse(values?.updatingSonicKey?.additionalMetadata),
    };

    editSonicMetaData(values?.sonicKey?.sonicKey, payload)
      .then((response) => {
        setValues({
          ...values,
          updateSonicKeyLoading: false,
          sonicKey: response,
          switchEdit: false,
        });
        props.updateMetaData(response);
        cogoToast.success("Successfully updated meta-data");
      })
      .catch((error) => {
        log("Error updating meta-data", error);
        setValues({ ...values, updateSonicKeyLoading: false });
        cogoToast.error(error?.message || "Error updating meta-data");
      });
  };

  return (
    <>
      <Dialog open={true} fullWidth={true} className={classes.dialogPaper}>
        {props?.enableEditMode && (
          <AppButton
            variant="fill"
            startIcon={values?.switchEdit ? <VisibilityIcon /> : <EditIcon />}
            onClick={() => {
              !values?.updateSonicKeyLoading &&
                setValues({ ...values, switchEdit: !values?.switchEdit });
            }}
          >
            Switch to {values?.switchEdit ? "view metadata" : "edit metadata"}
          </AppButton>
        )}

        <Grid container justifyContent="space-between" className="mt-1">
          <DialogTitle id="form-dialog-title">
            <div style={{ display: "flex", alignItems: "center" }}>
              <img style={{ width: "30px" }} src={amazingRadio_Icon} alt="" />
              <div
                style={{
                  fontFamily: theme.fontFamily.robotoBold,
                  fontSize: theme.fontSize.subHeading,
                  color: theme.colors.primary.dark,
                }}
              >
                &nbsp; &nbsp;{tags.companyTag}:{" "}
                {values?.sonicKey?.sonicKey || "---"}
              </div>
            </div>
          </DialogTitle>

          <Grid>
            <IconButton
              aria-label="close"
              style={{
                marginRight: 5,
                color: theme.colors.primary.dark,
              }}
              onClick={handleCloseTable}
              data-toggle="tooltip"
              data-placement="top"
              title="Close"
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>

        <TableContainer
          component={Paper}
          style={{ marginTop: 5, padding: "10px 20px", border: "none" }}
          elevation={0}
        >
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableBody>
              <TableRow>
                <TableCell className={classes.tableCellOne}>TRACK ID</TableCell>
                <TableCell className={classes.tableCellTwo}>
                  {values?.sonicKey?.track?._id || "---"}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className={classes.tableCellOne}>
                  {tags.companyTag}
                </TableCell>
                <TableCell className={classes.tableCellTwo}>
                  {values?.sonicKey?.sonicKey || "---"}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className={classes.tableCellOne}>TITLE</TableCell>
                <TableCell className={classes.tableCellTwo}>
                  {values?.switchEdit ? (
                    <TextField
                      id="audioNameInput"
                      fullWidth
                      placeholder="Edit content name"
                      inputProps={{ className: classes.textInput }}
                      value={values?.updatingSonicKey?.contentName}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          updatingSonicKey: {
                            ...values?.updatingSonicKey,
                            contentName: e.target.value,
                          },
                        })
                      }
                    />
                  ) : (
                    values?.sonicKey?.contentName || "--"
                  )}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className={classes.tableCellOne}>VERSION</TableCell>
                <TableCell className={classes.tableCellTwo}>
                  {values?.switchEdit ? (
                    <TextField
                      id="versionInput"
                      fullWidth
                      placeholder="Edit version"
                      inputProps={{ className: classes.textInput }}
                      value={values?.updatingSonicKey?.version}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          updatingSonicKey: {
                            ...values?.updatingSonicKey,
                            version: e.target.value,
                          },
                        })
                      }
                    />
                  ) : (
                    values?.sonicKey?.version || "---"
                  )}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className={classes.tableCellOne}>ARTIST</TableCell>
                <TableCell className={classes.tableCellTwo}>
                  {values?.switchEdit ? (
                    <TextField
                      id="ownerInput"
                      fullWidth
                      placeholder="Edit artist"
                      inputProps={{ className: classes.textInput }}
                      value={values?.updatingSonicKey?.contentOwner}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          updatingSonicKey: {
                            ...values?.updatingSonicKey,
                            contentOwner: e.target.value,
                          },
                        })
                      }
                    />
                  ) : (
                    values?.sonicKey?.contentOwner || "---"
                  )}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className={classes.tableCellOne}>
                  MUSIC TYPE
                </TableCell>
                <TableCell className={classes.tableCellTwo}>
                  {values?.switchEdit ? (
                    <CustomDropDown
                      id="music-type-dropdown"
                      labelText="Music Type"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      labelProps={{
                        style: {
                          fontFamily: theme.fontFamily.robotoRegular,
                          fontSize: theme.fontSize.content,
                        },
                      }}
                      inputProps={{
                        style: {
                          fontSize: theme.fontSize.content,
                          fontFamily: theme.fontFamily.robotoBold,
                        },
                        value: values?.updatingSonicKey?.contentType,
                        onChange: (e) =>
                          setValues({
                            ...values,
                            updatingSonicKey: {
                              ...values?.updatingSonicKey,
                              contentType: e.target.value,
                            },
                          }),
                      }}
                      data={
                        [
                          { name: "Music" },
                          { name: "Video" },
                          { name: "Audio" },
                        ] || []
                      }
                    />
                  ) : (
                    values?.sonicKey?.contentType || "---"
                  )}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className={classes.tableCellOne}>ISRC</TableCell>
                <TableCell className={classes.tableCellTwo}>
                  {values?.switchEdit ? (
                    <TextField
                      id="isrcInput"
                      fullWidth
                      placeholder="Edit isrc"
                      inputProps={{ className: classes.textInput }}
                      value={values?.updatingSonicKey?.isrcCode}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          updatingSonicKey: {
                            ...values?.updatingSonicKey,
                            isrcCode: e.target.value,
                          },
                        })
                      }
                    />
                  ) : values?.sonicKey?.isrcCode ? (
                    values?.sonicKey?.isrcCode
                  ) : (
                    "Not Specified"
                  )}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className={classes.tableCellOne}>ISWC</TableCell>
                <TableCell className={classes.tableCellTwo}>
                  {values?.switchEdit ? (
                    <TextField
                      id="iswcInput"
                      fullWidth
                      placeholder="Edit iswc"
                      inputProps={{ className: classes.textInput }}
                      value={values?.updatingSonicKey?.iswcCode}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          updatingSonicKey: {
                            ...values?.updatingSonicKey,
                            iswcCode: e.target.value,
                          },
                        })
                      }
                    />
                  ) : values?.sonicKey?.iswcCode ? (
                    values?.sonicKey?.iswcCode
                  ) : (
                    "Not Specified"
                  )}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className={classes.tableCellOne}>
                  TUNE CODE
                </TableCell>
                <TableCell className={classes.tableCellTwo}>
                  {values?.switchEdit ? (
                    <TextField
                      id="tuneInput"
                      fullWidth
                      placeholder="Edit tunecode"
                      inputProps={{ className: classes.textInput }}
                      value={values?.updatingSonicKey?.tuneCode}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          updatingSonicKey: {
                            ...values?.updatingSonicKey,
                            tuneCode: e.target.value,
                          },
                        })
                      }
                    />
                  ) : values?.sonicKey?.tuneCode ? (
                    values?.sonicKey?.tuneCode
                  ) : (
                    "Not Specified"
                  )}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className={classes.tableCellOne}>LABEL</TableCell>
                <TableCell className={classes.tableCellTwo}>
                  {values?.switchEdit ? (
                    <AppAutoComplete
                      setAutoComPleteAction={() => {}}
                      setAutoCompleteOptions={(option) => option?.name || ""}
                      data={labelArray}
                      setAutoCompleteOptionsLabel={() => {}}
                      getSelectedValue={(e, v) =>
                        setValues({
                          ...values,
                          updatingSonicKey: {
                            ...values?.updatingSonicKey,
                            label: v,
                          },
                        })
                      }
                      placeholder={"Label"}
                      // hideSearchIcon={true}
                      value={values?.updatingSonicKey?.label}
                      color={theme.colors.grey.main}
                      fontFamily={theme.fontFamily.robotoBold}
                      fontSize={theme.fontSize.content}
                    />
                  ) : (
                    values?.sonicKey?.label || "---"
                  )}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className={classes.tableCellOne}>
                  DISTRIBUTOR
                </TableCell>
                <TableCell className={classes.tableCellTwo}>
                  {values?.switchEdit ? (
                    <AppAutoComplete
                      setAutoComPleteAction={() => {}}
                      setAutoCompleteOptions={(option) => option?.name || ""}
                      data={distributorArray}
                      setAutoCompleteOptionsLabel={() => {}}
                      getSelectedValue={(e, v) =>
                        setValues({
                          ...values,
                          updatingSonicKey: {
                            ...values?.updatingSonicKey,
                            distributor: v,
                          },
                        })
                      }
                      placeholder={"Distributor"}
                      // hideSearchIcon={true}
                      value={values?.updatingSonicKey?.distributor}
                      color={theme.colors.grey.main}
                      fontFamily={theme.fontFamily.robotoBold}
                      fontSize={theme.fontSize.content}
                    />
                  ) : (
                    values?.sonicKey?.distributor || "---"
                  )}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className={classes.tableCellOne}>
                  FILE TYPE
                </TableCell>
                <TableCell className={classes.tableCellTwo}>
                  {values?.sonicKey?.contentFileType || "---"}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className={classes.tableCellOne}>
                  AUDIO LENGTH (00:00:00:000)
                </TableCell>
                <TableCell className={classes.tableCellTwo}>
                  {moment
                    .utc(values?.sonicKey?.contentDuration * 1000)
                    .format("HH:mm:ss:SSS") || "---"}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className={classes.tableCellOne}>
                  AUDIO SIZE (IN MB)
                </TableCell>
                <TableCell className={classes.tableCellTwo}>
                  {(values?.sonicKey?.contentSize / 1024).toFixed(3) || "---"}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className={classes.tableCellOne}>
                  UNDERLYING ENCODING OF THE FILE
                </TableCell>
                <TableCell className={classes.tableCellTwo}>
                  {values?.sonicKey?.contentEncoding || "---"}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className={classes.tableCellOne}>
                  SAMPLING FREQUENCY (Hz){" "}
                </TableCell>
                <TableCell className={classes.tableCellTwo}>
                  {values?.sonicKey?.contentSamplingFrequency || "---"}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className={classes.tableCellOne}>
                  QUALITY GRADE
                </TableCell>
                <TableCell className={classes.tableCellTwo}>
                  {values?.switchEdit ? (
                    <TextField
                      id="qualityInput"
                      fullWidth
                      placeholder="Edit quality grade"
                      inputProps={{ className: classes.textInput }}
                      value={values?.updatingSonicKey?.contentQuality}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          updatingSonicKey: {
                            ...values?.updatingSonicKey,
                            contentQuality: e.target.value,
                          },
                        })
                      }
                    />
                  ) : (
                    values?.sonicKey?.contentQuality || "---"
                  )}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className={classes.tableCellOne}>
                  DESCRIPTION
                </TableCell>
                <TableCell className={classes.tableCellTwo}>
                  {values?.switchEdit ? (
                    <TextField
                      id="descriptionInput"
                      fullWidth
                      placeholder="Edit description"
                      inputProps={{ className: classes.textInput }}
                      value={values?.updatingSonicKey?.contentDescription}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          updatingSonicKey: {
                            ...values?.updatingSonicKey,
                            contentDescription: e.target.value,
                          },
                        })
                      }
                      multiline
                      minRows={3}
                    />
                  ) : (
                    values?.sonicKey?.contentDescription || "---"
                  )}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className={classes.tableCellOne}>
                  ADDITIONAL METADATA
                </TableCell>
                <TableCell className={classes.tableCellTwo}>
                  {values?.switchEdit ? (
                    <TextField
                      id="additionalInput"
                      fullWidth
                      placeholder="Edit additional metadata"
                      inputProps={{ className: classes.textInput }}
                      value={values?.updatingSonicKey?.additionalMetadata}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          updatingSonicKey: {
                            ...values?.updatingSonicKey,
                            additionalMetadata: e.target.value,
                          },
                        })
                      }
                    />
                  ) : values?.sonicKey?.additionalMetadata ? (
                    JSON.stringify(values?.sonicKey?.additionalMetadata)
                  ) : (
                    "---"
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <DialogActions border="none" style={{ margin: "20px", border: "none" }}>
          <AppButton
            variant="outline"
            onClick={handleCloseTable}
            style={{ padding: "10px 20px", minWidth: "115px" }}
          >
            Cancel
          </AppButton>

          {values?.switchEdit && props?.enableEditMode ? (
            <AppButton
              variant="fill"
              onClick={updateSonicKey}
              style={{ padding: "12px 20px", minWidth: "115px" }}
            >
              {values?.updateSonicKeyLoading ? (
                <CircularProgress style={{ color: "white" }} size={24} />
              ) : (
                " Update"
              )}
            </AppButton>
          ) : (
            <AppButton
              variant="fill"
              onClick={viewPlaysWithSonicKey}
              style={{ padding: "12px 20px", minWidth: "115px" }}
            >
              View Plays
            </AppButton>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MetaDataDailog;

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    dialogPaper: {
      minHeight: "75vh",
      maxHeight: "75vh",
      margin: "auto",
    },
    tableCellOne: {
      padding: "5px",
      fontFamily: `${theme.fontFamily.robotoBold}`,
      fontSize: `12px`,
      color: `${theme.colors.secondary.mediumGrey}`,
    },
    tableCellTwo: {
      padding: "5px",
      fontFamily: `${theme.fontFamily.robotoBold}`,
      fontSize: `${theme.fontSize.content}`,
      color: `${theme.colors.grey.main}`,
    },
    textInput: {
      fontFamily: `${theme.fontFamily.robotoBold}`,
      fontSize: `${theme.fontSize.content}`,
      color: `${theme.colors.grey.main}`,
    },
  };
});
