import { Grid } from '@material-ui/core'
import { ArrowDropDown } from '@material-ui/icons'
import React from 'react'
import AppButton from '../../../../components/common/AppButton/AppButton'
import { log } from '../../../../utils/app.debug'

export default function Columns({ columns }) {
    log("COLUMNS..", columns)

    return (
        <Grid>
            <AppButton
                variant={"outline"}
                endIcon={<ArrowDropDown />}
            >
                Columns
            </AppButton>
        </Grid>
    )
}
