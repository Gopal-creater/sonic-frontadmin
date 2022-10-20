import { CircularProgress, Grid } from '@material-ui/core';
import React from 'react';
import { H1, H2, H3, Span } from "../../../../../StyledComponents/StyledHeadings"
import { WelcomeBackContainer } from './StyledWelcomeBack';
import radioIcon from "../../../../../assets/icons/icon-white-radio.png"
import theme from '../../../../../theme';
import RadioIcon from "@material-ui/icons/Radio";
export default function WelcomeBack({ totalRadioStations, loading, error }) {
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
                        {
                            loading ?
                                <CircularProgress size={25} style={{ color: "white" }} /> :
                                <>{totalRadioStations || "--"}</>
                        }
                    </H1>
                    <H3
                        color='white'
                        fontFamily={theme.fontFamily.nunitoSansRegular}
                        style={{ lineHeight: "0.7", textAlign: "end" }}
                    >
                        Radio Stations
                    </H3>
                </Grid>
                    <RadioIcon style={{ fontSize: 65, color: "white" }}/>
            </Grid>
        </WelcomeBackContainer>
    );
}
