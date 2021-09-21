import { Button, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import encodeSuccessIcon from "../../../assets/images/icon-success-graphic.svg"
import { AppWebRequest } from '../../../services/https/NetworkManager'
import { log } from '../../../utils/app.debug'
import FileSaver from "file-saver";
import cogoToast from 'cogo-toast'

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
    },
    downloadBtn: {
        height: 45,
        padding: "0px 20px",
        textTransform: "initial",
        fontSize: 15,
        fontWeight: 700,
        borderRadius: 8,
        backgroundColor: "#393F5B",
        maxWidth: "120px"
    },
}))

export default function EncodeSuccess({ audioName, successData }) {
    const classes = useStyles()
    log("Success Data", successData)

    const handleDownload = () => {
        AppWebRequest(`/s3-file-uploads/signed-url/${successData?.s3FileMeta?.Key}`).then((response) => {
            FileSaver.saveAs(response)
        }).catch((error) => {
            log("error download", error)
            cogoToast.error(error?.data?.message || error?.message)
        })
    }

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
                <Button
                    variant="contained"
                    component="span"
                    color="primary"
                    className={classes.downloadBtn}
                    onClick={handleDownload}
                >
                    Download
                </Button>
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
