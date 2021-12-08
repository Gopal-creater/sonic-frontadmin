import React from 'react'
import "../Styles/BarGraph.css";
import { Grid } from '@material-ui/core';

export const BarGraph = () => {
    return (
        <div className="BarGraphContainer">
            <div>
                <Grid>
                    <span className="plays-title">Plays - Chart</span><br />
                    <p className="plays-subTitle">See history of sonickey plays</p>
                </Grid>
            </div>
        </div>
    )
}
