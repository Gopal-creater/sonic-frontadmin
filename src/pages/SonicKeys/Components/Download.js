import React from 'react'
import download from "../../../assets/images/download.png"
import Communication from '../../../services/https/Communication'
import axios from "axios"
import fileDownload from 'js-file-download'
import cogoToast from 'cogo-toast'
import { log } from '../../../utils/app.debug'

import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import { DialogContent, Tooltip } from '@material-ui/core'

function CircularProgressWithLabel(props) {
    return (
        <Box position="relative" display="inline-flex">
            <CircularProgress variant="determinate" {...props} />
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

CircularProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate variant.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
};

export default function Download(prop) {
    const [values, setValues] = React.useState({
        openDownloadingModal: false,
        percentComplete: 0
    })

    function extractFileName(url) {
        var filename = url.substring(url.lastIndexOf('-') + 1);
        return filename
    }

    const downloadFileData = async () => {
        setValues({ ...values, openDownloadingModal: true })
        Communication.downloadFileWithS3Key(prop?.data?.s3FileMeta?.Key).then((response) => {
            axios({
                url: response,
                responseType: 'blob',
                onDownloadProgress: function (progressEvent) {
                    let percent = Math.floor(progressEvent?.loaded / progressEvent?.total * 100)
                    setValues({ ...values, percentComplete: percent, openDownloadingModal: true })
                    log("percent complete", percent)

                }
            }).then(res => {
                fileDownload(res.data, extractFileName(prop?.data.contentFilePath));
                setValues({ ...values, openDownloadingModal: false })
            });
        }).catch((error) => {
            cogoToast.error(error)
            setValues({ ...values, openDownloadingModal: false })
        })
    }

    const closeDownloadModal = () => {
        setValues({ ...values, openDownloadingModal: false })
    }


    return (
        <>
            {
                prop?.data?.s3FileMeta ?
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer" }} onClick={downloadFileData}>
                        <img src={download} width="16px" height="16px" />&nbsp;Download
                    </div> :
                    <Tooltip title="File was encoded outside portal. Not downloadable.">
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "grey", cursor: "pointer" }} >
                            <img src={download} width="16px" height="16px" />&nbsp;Download
                        </div>
                    </Tooltip>
            }

            <Dialog
                open={values?.openDownloadingModal}
                onClose={closeDownloadModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                disableBackdropClick={true}
            >
                <DialogContent style={{ display: "flex", justifyContent: "center", alignItems: "center" }} className="mb-2" >
                    <div style={{ marginRight: "10px" }}>Download in progress</div>
                    <CircularProgressWithLabel value={values?.percentComplete} />
                </DialogContent>
            </Dialog>
        </>
    )
}
