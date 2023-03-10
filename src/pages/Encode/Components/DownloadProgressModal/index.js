import { Box, CircularProgress, Grid, Typography } from "@material-ui/core";
import React from "react";
import { useTheme } from "styled-components";
import PopUp from "../../../../components/common/PopUp";
import { Content } from "../../../../StyledComponents/StyledHeadings";

function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          color="textSecondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function DownloadProgressModal({ open, percentage = "0" }) {
  const theme = useTheme();
  return (
    <PopUp open={open} maxWidth="sm">
      <Grid
        container
        style={{ padding: "30px" }}
        justifyContent="center"
        alignItems="center"
      >
        <Content
          style={{ marginLeft: "15px", marginTop: "5px", marginRight: "10px" }}
          color={theme.colors.grey.dark}
        >
          Download in progress{" "}
        </Content>
        <CircularProgressWithLabel value={percentage} />
      </Grid>
    </PopUp>
  );
}
