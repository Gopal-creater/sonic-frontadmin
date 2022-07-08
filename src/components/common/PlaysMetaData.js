import { Grid, TableCell, TableRow } from '@material-ui/core'
import React from 'react'
import { H3, H4, H6 } from '../../StyledComponents/StyledHeadings'
import theme from '../../theme'
import AppButton from './AppButton/AppButton'
import PopUp from './PopUp'
import CloseIcon from '@material-ui/icons/Close';
import { Table } from 'react-bootstrap'
import moment from 'moment'
import { log } from '../../utils/app.debug'
import { userRoles } from '../../constants/constants'
import { useSelector } from 'react-redux'
import { getSKSIDFromDetectionOrigin } from '../../utils/HelperMethods'

function PlaysMetaData(props) {

    const user = useSelector(state => state.user)
    const [state, setState] = React.useState({
        playsData: props.playsData,
        selectedTrack: null,
    })

    log("data of plays", state.playsData)

    const closePopUp = () => {
        props.setOpenTable(false)
    }

    return (
        <PopUp open={true} maxWidth="sm" fullWidth>
            <Grid style={{ padding: "30px" }}>
                <Grid container justifyContent='space-between'>
                    <Grid >
                        <H3 fontFamily={theme.fontFamily.nunitoSansMediumBold}>{state?.playsData?.sonicKey?.track?.trackMetaData?.contentName || state?.playsData?.sonicKey?.track?.title || "---"}</H3>
                        <H4 color={theme.colors.primary.teal}>by {state?.playsData?.sonicKey?.track?.trackMetaData?.contentOwner || state?.playsData?.sonicKey?.track?.artist || "---"}</H4>
                    </Grid>
                    <CloseIcon onClick={closePopUp} style={{ cursor: "pointer" }} />
                </Grid>

                <Grid style={{ height: "300px", marginTop: "20px", overflow: "auto" }}>
                    <Table>
                        {user?.userProfile?.data?.userRole === userRoles.PARTNER_ADMIN &&
                            <TableRow>
                                <TCell cell1={true}>COMPANY</TCell>
                                <TCell cell1={false}>{state?.playsData?.sonicKey?.company?.name || "---"}</TCell>
                            </TableRow>
                        }
                        {user?.userProfile?.data?.userRole === userRoles.PARTNER_ADMIN &&
                            <TableRow>
                                <TCell cell1={true}>COMPANY TYPE</TCell>
                                <TCell cell1={false}>{state?.playsData?.sonicKey?.company?.companyType || "---"}</TCell>
                            </TableRow>
                        }
                        <TableRow>
                            <TCell cell1={true}>ARTIST</TCell>
                            <TCell cell1={false}>{state?.playsData?.sonicKey?.track?.artist || "---"}</TCell>
                        </TableRow>
                        <TableRow>
                            <TCell cell1={true}>TITLE</TCell>
                            <TCell cell1={false}>{state?.playsData?.sonicKey?.track?.trackMetaData?.contentFileName || "---"}</TCell>
                        </TableRow>
                        <TableRow>
                            <TCell cell1={true}>RADIO STATION</TCell>
                            <TCell cell1={false}>{state?.playsData?.sonicKey?.radioStation || "---"}</TCell>
                        </TableRow>
                        <TableRow>
                            <TCell cell1={true}>DATE</TCell>
                            <TCell cell1={false}>{moment(state?.playsData?.detectedAt).utc().format("DD/MM/YYYY") || "---"}</TCell>
                        </TableRow>
                        <TableRow>
                            <TCell cell1={true}>TIME</TCell>
                            <TCell cell1={false}>{moment(state?.playsData?.detectedAt).utc().format("HH:mm:ss") || "---"}</TCell>
                        </TableRow>
                        <TableRow>
                            <TCell cell1={true}>DURATION</TCell>
                            <TCell cell1={false}>{moment.utc(state?.playsData?.sonicKey?.contentDuration * 1000).format("mm:ss") || "---"}</TCell>
                        </TableRow>
                        <TableRow>
                            <TCell cell1={true}>COUNTRY</TCell>
                            <TCell cell1={false}>{state?.playsData?.sonicKey?.country || "---"}</TCell>
                        </TableRow>
                        <TableRow>
                            <TCell cell1={true}>TRACK ID</TCell>
                            <TCell cell1={false}>{state?.playsData?.sonicKey?.track?._id || "---"}</TCell>
                        </TableRow>
                        <TableRow>
                            <TCell cell1={true}>SONICKEY</TCell>
                            <TCell cell1={false}>{state?.playsData?.sonicKey?.sonicKey || "---"}</TCell>
                        </TableRow>
                        <TableRow>
                            <TCell cell1={true}>SK/SID</TCell>
                            <TCell cell1={false}>{getSKSIDFromDetectionOrigin(state?.playsData?.detectionOrigins)}</TCell>
                        </TableRow>
                        <TableRow>
                            <TCell cell1={true}>VERSION</TCell>
                            <TCell cell1={false}>{state?.playsData?.sonicKey?.track?.version || "---"}</TCell>
                        </TableRow>
                        <TableRow>
                            <TCell cell1={true}>DISTRIBUTOR</TCell>
                            <TCell cell1={false}>{state?.playsData?.sonicKey?.distributor || "---"}</TCell>
                        </TableRow>
                        <TableRow>
                            <TCell cell1={true}>LABEL</TCell>
                            <TCell cell1={false}>{state?.playsData?.sonicKey?.label || "---"}</TCell>
                        </TableRow>
                        <TableRow>
                            <TCell cell1={true}>ISRC</TCell>
                            <TCell cell1={false}>{state?.playsData?.sonicKey?.isrcCode || "---"}</TCell>
                        </TableRow>
                        <TableRow>
                            <TCell cell1={true}>ISWC</TCell>
                            <TCell cell1={false}>{state?.playsData?.sonicKey?.iswcCode || "---"}</TCell>
                        </TableRow>
                        <TableRow>
                            <TCell cell1={true}>TUNE CODE</TCell>
                            <TCell cell1={false}>{state?.playsData?.sonicKey?.tuneCode || "---"}</TCell>
                        </TableRow>
                        <TableRow>
                            <TCell cell1={true}>DESCRIPTION</TCell>
                            <TCell cell1={false}>{state?.playsData?.sonicKey?.contentDescription || "---"}</TCell>
                        </TableRow>
                        <TableRow>
                            <TCell cell1={true}>FILE TYPE</TCell>
                            <TCell cell1={false}>{state?.playsData?.sonicKey?.track?.fileType || "---"}</TCell>
                        </TableRow>

                    </Table>
                </Grid>

                <Grid container justifyContent='flex-end' className='mt-2'>
                    <AppButton
                        variant={"outline"}
                        onClick={closePopUp}
                        fontSize={"15px"}
                        fontFamily={theme.fontFamily.nunitoSansBlack}
                    >
                        Cancel
                    </AppButton>
                </Grid>
            </Grid>
        </PopUp>
    )
}

export default PlaysMetaData

const TCell = ({ children, cell1, ...props }) => {
    if (cell1) {
        return (
            <TableCell size='small' width="35%" {...props}>
                <H6 fontSize={"12px"} color={theme.colors.secondary.mediumGrey}>{children}</H6>
            </TableCell>
        )
    }
    else {
        return (
            <TableCell size='small' width="65%"{...props}>
                <H6 fontSize={"14px"} fontFamily={theme.fontFamily.nunitoSansMediumBold}>{children}</H6>
            </TableCell>
        )
    }
}