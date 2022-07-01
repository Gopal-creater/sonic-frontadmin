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

function PlaysMetaData(props) {

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
                        <H3 fontFamily={theme.fontFamily.nunitoSansMediumBold}>{state?.selectedTrack?.trackMetaData?.contentName || state?.selectedTrack?.title || "---"}</H3>
                        <H4 color={theme.colors.primary.teal}>by {state?.selectedTrack?.trackMetaData?.contentOwner || state?.selectedTrack?.artist || "---"}</H4>
                    </Grid>
                    <CloseIcon onClick={closePopUp} style={{ cursor: "pointer" }} />
                </Grid>

                <Grid style={{ height: "300px", marginTop: "20px", overflow: "auto" }}>
                    <Table>
                        <TableRow>
                            <TCell cell1={true}>COMPANY</TCell>
                            <TCell cell1={false}>{state?.playsData?.modal?.company?.name || "---"}</TCell>
                        </TableRow>
                        <TableRow>
                            <TCell cell1={true}>COMPANY TYPE</TCell>
                            <TCell cell1={false}>{state?.playsData?.modal?.company?.companyType || "---"}</TCell>
                        </TableRow>
                        <TableRow>
                            <TCell cell1={true}>ARTIST</TCell>
                            <TCell cell1={false}>{state?.playsData?.artist || "---"}</TCell>
                        </TableRow>
                        <TableRow>
                            <TCell cell1={true}>TITLE</TCell>
                            <TCell cell1={false}>{state?.playsData?.title || "---"}</TCell>
                        </TableRow>
                        <TableRow>
                            <TCell cell1={true}>RADIO STATION</TCell>
                            <TCell cell1={false}>{state?.playsData?.radioStation || "---"}</TCell>
                        </TableRow>
                        <TableRow>
                            <TCell cell1={true}>DATE</TCell>
                            <TCell cell1={false}>{moment(state?.playsData?.date).utc().format("DD/MM/YYYY") || "---"}</TCell>
                        </TableRow>
                        {/* <TableRow>
                                    <TCell cell1={true}>TIME</TCell>
                                    <TCell cell1={false}>{monitor?.filters?.timezone === "GMT" ? moment(state?.playsData?.time).utc().format("HH:mm:ss") : moment(state?.playsData?.time).format("HH:mm:ss") || "---"}</TCell>
                                </TableRow> */}
                        <TableRow>
                            <TCell cell1={true}>DURATION</TCell>
                            <TCell cell1={false}>{moment.utc(state?.playsData?.duration * 1000).format("mm:ss") || "---"}</TCell>
                        </TableRow>
                        <TableRow>
                            <TCell cell1={true}>COUNTRY</TCell>
                            <TCell cell1={false}>{state?.playsData?.country || "---"}</TCell>
                        </TableRow>
                        <TableRow>
                            <TCell cell1={true}>TRACK ID</TCell>
                            <TCell cell1={false}>{state?.playsData?.trackId || "---"}</TCell>
                        </TableRow>
                        <TableRow>
                            <TCell cell1={true}>SONICKEY</TCell>
                            <TCell cell1={false}>{state?.playsData?.sonicKey || "---"}</TCell>
                        </TableRow>
                        <TableRow>
                            <TCell cell1={true}>SK/SID</TCell>
                            <TCell cell1={false}>{"---"}</TCell>
                        </TableRow>
                        <TableRow>
                            <TCell cell1={true}>VERSION</TCell>
                            <TCell cell1={false}>{state?.playsData?.version || "---"}</TCell>
                        </TableRow>
                        <TableRow>
                            <TCell cell1={true}>DISTRIBUTOR</TCell>
                            <TCell cell1={false}>{state?.playsData?.distributor || "---"}</TCell>
                        </TableRow>
                        <TableRow>
                            <TCell cell1={true}>LABEL</TCell>
                            <TCell cell1={false}>{state?.playsData?.label || "---"}</TCell>
                        </TableRow>
                        <TableRow>
                            <TCell cell1={true}>ISRC</TCell>
                            <TCell cell1={false}>{state?.playsData?.isrcCode || "---"}</TCell>
                        </TableRow>
                        <TableRow>
                            <TCell cell1={true}>ISWC</TCell>
                            <TCell cell1={false}>{state?.playsData?.iswc || "---"}</TCell>
                        </TableRow>
                        <TableRow>
                            <TCell cell1={true}>TUNE CODE</TCell>
                            <TCell cell1={false}>{state?.playsData?.tuneCode || "---"}</TCell>
                        </TableRow>
                        <TableRow>
                            <TCell cell1={true}>FILE TYPE</TCell>
                            <TCell cell1={false}>{state?.playsData?.fileType || "---"}</TCell>
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