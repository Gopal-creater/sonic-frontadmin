import { Grid } from '@material-ui/core';
import React from 'react';
import { H1, H2, H3, Span } from "../../../../../StyledComponents/StyledHeadings"
import { WelcomeBackContainer } from './StyledWelcomeBack';
import radioIcon from "../../../../../assets/icons/icon-grey-radio.png"
import theme from '../../../../../theme';

export default function WelcomeBack({ totalRadioStations }) {
    return (
        <WelcomeBackContainer container alignItems='center'>
            <Grid xs={12} lg={8}>
                <H2 color='white'>Welcome back</H2>
            </Grid>
            <Grid container justifyContent='flex-end' xs={12} lg={4}>
                <Grid style={{ marginRight: "30px" }}>
                    <H1
                        color='white'
                        fontSize={"43px"}
                        style={{ lineHeight: "0.9", textAlign: "end" }}
                    >
                        {totalRadioStations}
                    </H1>
                    <H3
                        color='white'
                        fontFamily={theme.fontFamily.nunitoSansRegular}
                        style={{ lineHeight: "0.7", textAlign: "end" }}
                    >
                        Radio Stations
                    </H3>
                </Grid>
                <img src={radioIcon} alt="Radio Icon" width={70} height={"100%"} />
            </Grid>
        </WelcomeBackContainer>
    );
}