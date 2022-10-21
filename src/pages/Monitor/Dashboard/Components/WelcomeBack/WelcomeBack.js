import { CircularProgress, Grid } from "@material-ui/core";
import React from "react";
import {
  Heading,
  Large,
  SubHeading,
} from "../../../../../StyledComponents/StyledHeadings";
import { WelcomeBackContainer } from "./StyledWelcomeBack";
import theme from "../../../../../theme";
import RadioIcon from "@material-ui/icons/Radio";
export default function WelcomeBack({ totalRadioStations, loading, error }) {
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
          <SubHeading
            color="white"

            // style={{ lineHeight: "0.7", textAlign: "end" }}
          >
            Radio Stations
          </SubHeading>
        </Grid>
        <RadioIcon style={{ fontSize: 70, color: "white" }} />
      </Grid>
    </WelcomeBackContainer>
  );
}
