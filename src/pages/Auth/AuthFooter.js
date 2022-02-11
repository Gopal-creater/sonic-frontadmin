import { Grid } from '@material-ui/core'
import React from 'react'
import { useTheme } from 'styled-components'
import { H5 } from '../../StyledComponents/StyledHeadings'

export default function AuthFooter() {
    const theme = useTheme()
    return (
        <Grid id="footer" style={{ marginTop: "25px" }}>
            <H5
                fontSize={11}
                color={theme.colors.secondary.grey}
                fontFamily={theme.fontFamily.nunitoSansRegular}
            >
                <span>&#169;</span> {new Date().getFullYear()} SonicData Ltd. All rights reserved.

            </H5>
        </Grid>
    )
}
