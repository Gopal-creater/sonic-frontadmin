import { Grid } from '@material-ui/core';
import React from 'react';
import { DataContainer, IconContainer, OwnershipTitleContainer, StatsContainer, Title } from './StyledStats';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import theme from '../../../../../theme';

export default function Stats(
    { loading, data, error, title, imgSrc, ownerShipTitle }
) {
    return (
        <StatsContainer container>
            <Grid item xs={6} container alignItems='flex-end'>
                <img src={imgSrc} alt="Status image" width={50} height={50} />
            </Grid>

            <Grid item xs={6} container flexDirection="column" alignContent='space-between'>
                <Grid item container justifyContent='flex-end'>
                    <OwnershipTitleContainer>{ownerShipTitle || ""}</OwnershipTitleContainer>
                    <DataContainer>{data || "---"}</DataContainer><br />
                    <Title style={{ textAlign: "end" }}>{title || "---"}</Title>
                </Grid>

                <IconContainer item>
                    <HelpOutlineIcon fontSize='small' style={{ color: theme.colors.secondary.lightNavy }} />
                </IconContainer>
            </Grid>
        </StatsContainer>
    );
}
