import { Grid } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import EncodeDecode from '../../components/common/FileSelection';
import EncodeData from './Components/EncodeData';

const useStyles = makeStyles((theme) => ({
    EncodeContainer: {

    }
}));

export default function Encode() {
    const classes = useStyles();
    return (
        <Grid className={classes.EncodeContainer} id="encodeDecodeContainer">
            <EncodeDecode title={"Encode SonicKeys"} subTitle={"Upload a file to start"} />
            <EncodeData />
        </Grid>
    )
}
