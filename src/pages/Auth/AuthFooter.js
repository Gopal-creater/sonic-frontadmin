import { Grid } from '@material-ui/core'
import React from 'react'

export default function AuthFooter() {
    return (
        <Grid id="footer" style={{ marginTop: "25px" }}>
            <span style={{ fontSize: "small", color: "#ACACAC", fontFamily: "NunitoSans-Regular", fontWeight: "medium", }}>
                <span>&#169;</span> {new Date().getFullYear()} SonicData Ltd. All rights reserved.
            </span>
        </Grid>
    )
}
