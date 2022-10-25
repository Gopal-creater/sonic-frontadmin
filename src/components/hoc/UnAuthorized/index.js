import { Grid } from "@material-ui/core";
import React from "react";
import { Heading } from "../../../StyledComponents/StyledHeadings";
import WarningIcon from "@material-ui/icons/Warning";
import { useTheme } from "styled-components";
import AppButton from "../../common/AppButton/AppButton";
import { useNavigate } from "react-router-dom";

export default function UnAuthorized() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ height: "300px" }}
    >
      <WarningIcon
        fontSize="large"
        style={{ color: theme.colors.primary.main }}
      />
      <Heading>Unauthorized</Heading>
      <AppButton variant={"fill"} onClick={() => navigate(-1)}>
        Go Back
      </AppButton>
    </Grid>
  );
}
