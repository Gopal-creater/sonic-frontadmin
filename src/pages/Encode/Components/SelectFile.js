import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';
import React from 'react'

const useStyles = makeStyles((theme) => ({
    selectFileRoot: {
        backgroundColor: "white",
        padding: "3%"
    },
}));
export default function SelectFile() {
    const classes = useStyles();
    return (
        <Grid container className={classes.selectFileRoot} id="selectFile_Container">
            <Grid item xs={8} id="selectFile_LeftContainer">
                <Grid item id="selectFile_Headings">
                    <h2>
                        Encode SonicKeys
                    </h2>
                    <h6>
                        Upload a file to start
                    </h6>
                </Grid>
                <Grid container id="selectFile_UploadButton">

                </Grid>
            </Grid>
            <Grid item xs={4} id="selectFile_RightContainer">
                Logo
            </Grid>
        </Grid>
    )
}
