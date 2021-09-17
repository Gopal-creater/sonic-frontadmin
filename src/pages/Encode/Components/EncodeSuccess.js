import { Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import encodeSuccessIcon from "../../../assets/images/icon-success-graphic.svg"

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
        fontSize: "calc(1.3rem + .5vw)",
        fontWeight: "bold",
        color: "#393F5B"
    },
    subHeading: {
        fontSize: 18,
        fontWeight: 500,
        color: "#00A19A"
    },
    iconText: {
        fontSize: "calc(1rem + .5vw)",
        fontWeight: "bolder",
        color: "#343F84",
        textAlign: "center",
        marginTop: "8px"
    }
}))

export default function EncodeSuccess({ audioName }) {
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
            >
                <Typography className={classes.heading}>Well done!</Typography>
                <Typography className={classes.subHeading}>Encoding of <b>{audioName}</b> successfully done.</Typography>
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
