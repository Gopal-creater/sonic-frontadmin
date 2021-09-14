import { Grid } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import FileSelection from '../../components/common/FileSelection';
import EncodeData from './Components/EncodeData';
import { log } from '../../utils/app.debug';

const useStyles = makeStyles((theme) => ({
    EncodeContainer: {

    }
}));

export default function Encode() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        audioData: {
            name: null
        }
    });

    return (
        <Grid className={classes.EncodeContainer} id="encodeDecodeContainer">
            <FileSelection
                prop={{
                    title: "Encode",
                    subTitle: "Upload a file to start",
                    getAudioData: (audioData) => { setValues(audioData) }
                }}
            />

            {values?.audioData?.name === null ? "" : <EncodeData prop={values} />}

        </Grid>
    )
}
