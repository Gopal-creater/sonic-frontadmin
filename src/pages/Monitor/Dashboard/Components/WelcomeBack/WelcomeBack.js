import { CircularProgress, Grid } from "@material-ui/core";
import React from "react";
import {
  Large,
  SubHeading,
} from "../../../../../StyledComponents/StyledHeadings";
import { WelcomeBackContainer } from "./StyledWelcomeBack";
import RadioIcon from "@material-ui/icons/Radio";
import { useTheme } from "styled-components";

export default function WelcomeBack({ totalRadioStations, loading, error }) {
  const theme =useTheme();
  return (
    <WelcomeBackContainer container alignItems="center">
      <Grid xs={12} lg={8}>
        <SubHeading color={theme.colors.primary.contrastText}>
          Welcome Back
        </SubHeading>
      </Grid>
      <Grid container justifyContent="flex-end" xs={12} lg={4}>
        <Grid style={{ marginRight: "30px" }}>
          <Large color="white" style={{ lineHeight: "0.9", textAlign: "end" }}>
            {loading ? (
              <CircularProgress size={25} style={{ color: "white" }} />
            ) : (
              <>{totalRadioStations || "--"}</>
            )}
          </Large>
          <SubHeading color="white">Radio Stations</SubHeading>
        </Grid>
        <RadioIcon style={{ fontSize: 70, color: "white" }} />
      </Grid>
    </WelcomeBackContainer>
  );
}
