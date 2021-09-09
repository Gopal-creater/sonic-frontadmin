import { Grid, Paper } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import SelectFile from './Components/SelectFile'

const useStyles = makeStyles((theme) => ({
    EncodeContainer: {

    }
}));

export default function Encode() {
    const classes = useStyles();
    return (
        <Grid container className={classes.EncodeContainer}>
            <SelectFile />
        </Grid>
    )
}
