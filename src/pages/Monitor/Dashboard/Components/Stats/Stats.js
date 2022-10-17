import { Box, CircularProgress, Grid } from "@material-ui/core";
import React from "react";
import {
  CardContainer,
  DataContainer,
  IconContainer,
  OwnershipTitleContainer,
  StatsContainer,
  Title,
} from "./StyledStats";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { useNavigate } from "react-router-dom";
import CustomToolTip from "../../../../../components/common/CustomToolTip/index";
import theme from "../../../../../theme";

export default function Stats({
  loading,
  data,
  error,
  title,
  imgSrc,
  ownerShipTitle,
  pageLink,
  helpText,
}) {
  const navigate = useNavigate();
  const changePage = () => {
    navigate(pageLink);
  };

  return (
    <StatsContainer container onClick={changePage}>
      <Grid item xs={4} container alignItems="flex-start">
        <CardContainer>
            <Box>
          {imgSrc }
          </Box>
        </CardContainer>
      </Grid>

      <Grid
        item
        container
        xs={8}
        flexDirection="column"
        alignContent="space-between"
      >
        <Grid item container justifyContent="flex-end">
          <Grid item container justifyContent="flex-end">
            <Title style={{ textAlign: "end" }}>{title || "---"}</Title>
            <Grid>
              <CustomToolTip
                title={helpText}
                placement={"bottom-end"}
                arrow
                marginTop={"40px"}
              >
                <IconContainer item>
                  <HelpOutlineIcon
                    style={{
                      fontSize: "10px",
                      color: `${theme.colors.primary.graphite} `,
                    }}
                  />
                </IconContainer>
              </CustomToolTip>
            </Grid>
          </Grid>

          {/* <OwnershipTitleContainer>{ownerShipTitle || ""}</OwnershipTitleContainer> */}
          {loading ? (
            <CircularProgress size={25} />
          ) : (
            <DataContainer>{data || "---"}</DataContainer>
          )}
        </Grid>
      </Grid>
    </StatsContainer>
  );
}
