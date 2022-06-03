import { Grid } from '@material-ui/core'
import React from 'react'
import PopUp from '../../../../components/common/PopUp'
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import { H5 } from '../../../../StyledComponents/StyledHeadings';

export default function DownloadProgressModal({ open, percentage = "0" }) {
    return (
        <PopUp
            open={open}
            maxWidth="sm"
        >
            <Grid container style={{ padding: "30px" }} justifyContent="center" alignItems='center'>
                <GetAppRoundedIcon /><H5 style={{ marginLeft: "15px", marginTop: "5px" }}>Download in progress {percentage} %</H5>
            </Grid>
        </PopUp>
    )
}
