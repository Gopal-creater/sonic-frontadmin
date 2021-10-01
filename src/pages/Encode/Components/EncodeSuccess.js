import { Button, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import encodeSuccessIcon from "../../../assets/images/icon-success-graphic.svg"
import { log } from '../../../utils/app.debug'
import { downloadFile } from '../../../utils/HelperMethods'
import Download from '../../SonicKeys/Components/Download'

const useStyles = makeStyles(() => ({
    encodeSuccesContainer: {
        backgroundColor: "white",
        padding: "2% 2.5%",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        marginBottom: "4%"
    },
    encodeSuccessLogo: {
        borderRadius: "10px",
        padding: "5%",
        backgroundColor: "#E5F5F4"
    },
    heading: {
        color: "#393F5B",
        fontFamily: "NunitoSans-ExtraBold",
        fontSize: 30
    },
    subHeading: {
        fontSize: 18,
        fontWeight: "medium",
        color: "#00A19A",
        fontFamily: "NunitoSans-Bold",

    },
    iconText: {
        fontSize: "calc(1rem + .5vw)",
        fontWeight: "bold",
        color: "#343F84",
        textAlign: "center",
        marginTop: "8px",
        fontFamily: "NunitoSans-ExtraBold"
    },
}))

export default function EncodeSuccess({ audioName, successData }) {
    const classes = useStyles()

    return (
        <Grid
            id="EncodeSuccessContainer"
            container
            justifyContent="space-between"
            className={classes.encodeSuccesContainer}
        >
            <Grid
                id="EncodeSuccess-Headings"
                item
                style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}
            >
                <div>
                    <Typography className={classes.heading}>Well done!</Typography>
                    <Typography className={classes.subHeading}>Encoding of <b>{audioName}</b> successfully done.</Typography>
                </div>
                <div style={{ cursor: "pointer", width: "fit-content" }}>
                    <Download data={successData} />
                </div>
            </Grid>

            <Grid
                id="Encode Success Logo"
                className={classes.encodeSuccessLogo}
                justifyContent="center"
                alignItems="center"
            >
                <img src={encodeSuccessIcon} alt="Encode Success Icon" style={{ width: "100%", height: "auto" }} />
                <Typography className={classes.iconText} alignItems="center">Encoding done</Typography>
            </Grid>
        </Grid>
    )
}
