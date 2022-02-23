import { CircularProgress, Grid } from '@material-ui/core';
import React from 'react';
import { DataContainer, IconContainer, OwnershipTitleContainer, StatsContainer, Title } from './StyledStats';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import theme from '../../../../../theme';
import CustomToolTip from '../../../../../components/common/CustomToolTip';
import { useHistory } from "react-router-dom";

export default function Stats(
    { loading, data, error, title, imgSrc, ownerShipTitle, pageLink, helpText }
) {
    const history = useHistory()

    const changePage = () => {
        history.push(pageLink)
    }

    return (
        <StatsContainer container onClick={changePage}>
            <Grid item xs={4} container alignItems='flex-end'>
                <img src={imgSrc} alt="Status image" width={50} height={50} />
            </Grid>

            <Grid item xs={8} container flexDirection="column" alignContent='space-between'>
                <Grid item container justifyContent='flex-end'>
                    <OwnershipTitleContainer>{ownerShipTitle || ""}</OwnershipTitleContainer>
                    {
                        loading ?
                            <CircularProgress size={25} />
                            : <DataContainer>{data || "---"}</DataContainer>
                    }
                    <Grid item container justifyContent='flex-end' >
                        <Title style={{ textAlign: "end" }}>{title || "---"}</Title>
                    </Grid>
                </Grid>
                <IconContainer item>
                    <HelpOutlineIcon fontSize='small' style={{ color: theme.colors.secondary.lightNavy }}
                        data-for={title} data-tip />
                    <CustomToolTip
                        id={title}
                        placement="bottom"
                        toolTipText={helpText}
                        textColor={`${theme.colors.primary.teal}`}
                        bgColor='white'
                        borderColor={`${theme.colors.secondary.lightNavy}`}
                    />
                </IconContainer>

            </Grid>
        </StatsContainer >
    );
}
