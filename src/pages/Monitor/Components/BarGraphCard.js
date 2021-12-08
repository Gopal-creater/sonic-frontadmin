import React from 'react'
import "../Styles/BarGraph.css";
import { Grid } from '@material-ui/core';
import BarGraph from './BarGraph';

export const BarGraphCard = () => {

    return (
        <div className="BarGraphContainer">
            <div>
                <Grid>
                    <span className="plays-title">Plays - Chart</span><br />
                    <p className="plays-subTitle">See history of sonickey plays</p>
                </Grid>
            </div>
            <div style={{ marginTop: 50 }}>
                <Grid container spacing={4}>
                    <Grid item sm={12} lg={4}>
                        <BarGraph labels="Plays - Country-wise"/>
                    </Grid>
                    <Grid item sm={12} lg={4}>
                        <BarGraph labels="Plays - Song-wise"/>
                    </Grid>
                    <Grid item sm={12} lg={4}>
                        <BarGraph labels="Plays - Station-wise"/>
                    </Grid>
                    <Grid item sm={12} lg={4}>
                        <BarGraph labels="Plays - Artist-wise"/>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
