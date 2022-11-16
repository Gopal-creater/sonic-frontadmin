import { Grid, makeStyles, TableCell, TableRow } from "@material-ui/core";
import React from "react";
import AppButton from "./AppButton/AppButton";
import PopUp from "./PopUp";
import CloseIcon from "@material-ui/icons/Close";
import { Table } from "react-bootstrap";
import moment from "moment";
import { tags, userRoles } from "../../constants/constants";
import { useSelector } from "react-redux";
import { getSKSIDFromDetectionOrigin } from "../../utils/HelperMethods";
import { useTheme } from "styled-components";
import { Content, SubHeading } from "../../StyledComponents/StyledHeadings";

function PlaysMetaData(props) {
  const user = useSelector((state) => state.user);
  const [state] = React.useState({
    playsData: props.playsData,
    selectedTrack: null,
  });
  const theme = useTheme();
  const classes = useStyles();

  const closePopUp = () => {
    props.setOpenTable(false);
  };

  return (
    <PopUp open={true} maxWidth="sm" fullWidth>
      <Grid className={classes.playsMetaData}>
        <Grid container justifyContent="space-between">
          <Grid>
            <SubHeading>
              {state?.playsData?.sonicKey?.track?.trackMetaData?.contentName ||
                state?.playsData?.sonicKey?.track?.title ||
                state?.playsData?.sonicKey?.contentName ||
                "---"}
            </SubHeading>
            <Content color={theme.colors.secondary.main}>
              by{" "}
              {state?.playsData?.sonicKey?.track?.trackMetaData?.contentOwner ||
                state?.playsData?.sonicKey?.track?.artist ||
                state?.playsData?.sonicKey?.contentOwner ||
                "---"}
            </Content>
          </Grid>
          <CloseIcon onClick={closePopUp} style={{ cursor: "pointer" }} />
        </Grid>

        <Grid style={{ height: "300px", marginTop: "20px", overflow: "auto" }}>
          <Table>
            {user?.userProfile?.data?.userRole === userRoles.PARTNER_ADMIN && (
              <TableRow>
                <TCell cell1={true}>COMPANY</TCell>
                <TCell cell1={false}>
                  {state?.playsData?.sonicKey?.company?.name || "---"}
                </TCell>
              </TableRow>
            )}
            {user?.userProfile?.data?.userRole === userRoles.PARTNER_ADMIN && (
              <TableRow>
                <TCell cell1={true}>COMPANY TYPE</TCell>
                <TCell cell1={false}>
                  {state?.playsData?.sonicKey?.company?.companyType || "---"}
                </TCell>
              </TableRow>
            )}
            <TableRow>
              <TCell cell1={true}>ARTIST</TCell>
              <TCell cell1={false}>
                {state?.playsData?.sonicKey?.track?.artist ||
                  state?.playsData?.sonicKey?.contentOwner ||
                  "---"}
              </TCell>
            </TableRow>
            <TableRow>
              <TCell cell1={true}>TITLE</TCell>
              <TCell cell1={false}>
                {state?.playsData?.sonicKey?.track?.trackMetaData
                  ?.contentName ||
                  state?.playsData?.sonicKey?.contentName ||
                  "---"}
              </TCell>
            </TableRow>
            <TableRow>
              <TCell cell1={true}>RADIO STATION</TCell>
              <TCell cell1={false}>
                {state?.playsData?.sonicKey?.radioStation || "---"}
              </TCell>
            </TableRow>
            <TableRow>
              <TCell cell1={true}>DATE</TCell>
              <TCell cell1={false}>
                {moment(state?.playsData?.detectedAt)
                  .utc()
                  .format("DD/MM/YYYY") || "---"}
              </TCell>
            </TableRow>
            <TableRow>
              <TCell cell1={true}>TIME</TCell>
              <TCell cell1={false}>
                {moment(state?.playsData?.detectedAt)
                  .utc()
                  .format("HH:mm:ss") || "---"}
              </TCell>
            </TableRow>
            <TableRow>
              <TCell cell1={true}>DURATION</TCell>
              <TCell cell1={false}>
                {moment
                  .utc(state?.playsData?.sonicKey?.contentDuration * 1000)
                  .format("mm:ss") || "---"}
              </TCell>
            </TableRow>
            <TableRow>
              <TCell cell1={true}>COUNTRY</TCell>
              <TCell cell1={false}>
                {state?.playsData?.sonicKey?.country || "---"}
              </TCell>
            </TableRow>
            <TableRow>
              <TCell cell1={true}>TRACK ID</TCell>
              <TCell cell1={false}>
                {state?.playsData?.sonicKey?.track?._id || "---"}
              </TCell>
            </TableRow>
            <TableRow>
              <TCell cell1={true}>{tags.companyTag}</TCell>
              <TCell cell1={false}>
                {state?.playsData?.sonicKey?.sonicKey || "---"}
              </TCell>
            </TableRow>
            <TableRow>
              <TCell cell1={true}>SK/SID</TCell>
              <TCell cell1={false}>
                {getSKSIDFromDetectionOrigin(
                  state?.playsData?.detectionOrigins
                )}
              </TCell>
            </TableRow>
            <TableRow>
              <TCell cell1={true}>VERSION</TCell>
              <TCell cell1={false}>
                {state?.playsData?.sonicKey?.track?.version ||
                  state?.playsData?.sonicKey?.version ||
                  "---"}
              </TCell>
            </TableRow>
            <TableRow>
              <TCell cell1={true}>DISTRIBUTOR</TCell>
              <TCell cell1={false}>
                {state?.playsData?.sonicKey?.distributor || "---"}
              </TCell>
            </TableRow>
            <TableRow>
              <TCell cell1={true}>LABEL</TCell>
              <TCell cell1={false}>
                {state?.playsData?.sonicKey?.label || "---"}
              </TCell>
            </TableRow>
            <TableRow>
              <TCell cell1={true}>ISRC</TCell>
              <TCell cell1={false}>
                {state?.playsData?.sonicKey?.isrcCode || "---"}
              </TCell>
            </TableRow>
            <TableRow>
              <TCell cell1={true}>ISWC</TCell>
              <TCell cell1={false}>
                {state?.playsData?.sonicKey?.iswcCode || "---"}
              </TCell>
            </TableRow>
            <TableRow>
              <TCell cell1={true}>TUNE CODE</TCell>
              <TCell cell1={false}>
                {state?.playsData?.sonicKey?.tuneCode || "---"}
              </TCell>
            </TableRow>
            <TableRow>
              <TCell cell1={true}>DESCRIPTION</TCell>
              <TCell cell1={false}>
                {state?.playsData?.sonicKey?.contentDescription || "---"}
              </TCell>
            </TableRow>
            <TableRow>
              <TCell cell1={true}>FILE TYPE</TCell>
              <TCell cell1={false}>
                {state?.playsData?.sonicKey?.track?.fileType ||
                  state?.playsData?.sonicKey?.contentFileType ||
                  "---"}
              </TCell>
            </TableRow>
          </Table>
        </Grid>

        <Grid container justifyContent="flex-end" className="mt-2">
          <AppButton variant={"outline"} onClick={closePopUp}>
            Cancel
          </AppButton>
        </Grid>
      </Grid>
    </PopUp>
  );
}

export default PlaysMetaData;

const TCell = ({ children, cell1, ...props }) => {
  if (cell1) {
    return (
      <TableCell width="35%" {...props}>
        <Content>{children}</Content>
      </TableCell>
    );
  } else {
    return (
      <TableCell width="65%" {...props}>
        <Content>{children}</Content>
      </TableCell>
    );
  }
};

const useStyles = makeStyles(() => {
  const appTheme = useTheme();
  return {
    playsMetaData: {
      backgroundColor: appTheme.background.dark4,
      padding: "30px",
    },
  };
});
