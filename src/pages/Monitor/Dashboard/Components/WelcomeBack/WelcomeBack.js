import { CircularProgress, Grid } from '@material-ui/core';
import React from 'react';
import { H1, H2, H3, Span, Heading, Large } from "../../../../../StyledComponents/StyledHeadings"
import { WelcomeBackContainer } from './StyledWelcomeBack';
import radioIcon from "../../../../../assets/icons/icon-white-radio.png"
import theme from '../../../../../theme';
import RadioIcon from "@material-ui/icons/Radio";
export default function WelcomeBack({ totalRadioStations, loading, error }) {
    return (
        <WelcomeBackContainer container alignItems='center'>
            <Grid xs={12} lg={8}>
                
                <Heading color={theme.colors.primary.contrastText}>Welcome Back</Heading>
            </Grid>
            <Grid container justifyContent='flex-end' xs={12} lg={4}>
                <Grid style={{ marginRight: "30px" }}>
                    <Large
                        color='white'
                        
                        style={{ lineHeight: "0.9", textAlign: "end" }}
                    >
                        {
                            loading ?
                                <CircularProgress size={25} style={{ color: "white" }} /> :
                                <>{totalRadioStations || "--"}</>
                        }
                    </Large>
                    <Heading
                        color='white'
                        
                        // style={{ lineHeight: "0.7", textAlign: "end" }}
                    >
                        Radio Stations
                    </Heading>
                </Grid>
                    <RadioIcon style={{ fontSize: 70, color: "white" }}/>
            </Grid>
        </WelcomeBackContainer>
    );
}
