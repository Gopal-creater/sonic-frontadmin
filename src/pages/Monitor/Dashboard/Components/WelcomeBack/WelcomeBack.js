import { CircularProgress, Grid } from "@material-ui/core";
import React from "react";
import {
  Large,
  SubHeading,
} from "../../../../../StyledComponents/StyledHeadings";
import { WelcomeBackContainer } from "./StyledWelcomeBack";
import amazingRadio_Icon from "../../../../../assets/icons/amazingRadio_Icon.png";

export default function WelcomeBack({ totalRadioStations, loading, error }) {
  return (
    <WelcomeBackContainer container alignItems="center">
      <Grid xs={12} lg={8}>
        <SubHeading>Welcome Back</SubHeading>
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
        <img src={amazingRadio_Icon} width="70px" alt="radio" />
      </Grid>
    </WelcomeBackContainer>
  );
}
