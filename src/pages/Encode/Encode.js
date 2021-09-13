import { Grid, Paper } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import EncodeDecode from '../../components/common/EncodeDecode';

const useStyles = makeStyles((theme) => ({
    EncodeContainer: {

    }
}));

export default function Encode() {
    const classes = useStyles();
    return (
        <Grid className={classes.EncodeContainer}>
            <EncodeDecode title={"Encode SonicKeys"} subTitle={"Upload a file to start"} />
        </Grid>
    )
}
