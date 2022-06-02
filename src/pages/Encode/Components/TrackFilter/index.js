import { Grid } from '@material-ui/core'
import React from 'react'
import CloseIcon from '@material-ui/icons/Close';
import { H3, H4 } from '../../../../StyledComponents/StyledHeadings';
import { StyledTextField } from '../../../../StyledComponents/StyledAppTextInput/StyledAppTextInput';
import AppButton from '../../../../components/common/AppButton/AppButton';
import { useDispatch, useSelector } from 'react-redux';
import { getTracksAction } from '../../../../stores/actions/EncodeActions';
import * as actionTypes from "../../../../stores/actions/actionTypes"

export default function TrackFilter({ closeDialog }) {
    const encode = useSelector(state => state.encode)

    const dispatch = useDispatch()

    const handleFilter = () => {
        dispatch(getTracksAction(encode?.tracks.startDate, encode?.tracks?.endDate, 1, "10", encode?.tracks?.trackFilters?.title))
        closeDialog?.()
    }

    return (
        <Grid style={{ padding: "30px" }}>
            {/* Header */}
            <Grid container justifyContent='space-between'>
                <H3>Filter</H3>
                <CloseIcon
                    onClick={() => closeDialog?.()}
                    style={{ cursor: "pointer" }} />
            </Grid>

            {/* Body */}
            <Grid className='mt-3'>
                <StyledTextField
                    id=""
                    label="Title"
                    value={encode?.tracks?.trackFilters?.title}
                    onChange={(e) => dispatch({ type: actionTypes.SET_ENCODE_TRACKS_FILTER, data: { ...encode?.tracks?.trackFilters, title: e.target.value } })}
                />
            </Grid>

            {/* Footer Button */}
            <Grid className='mt-5' container justifyContent='flex-end'>
                <AppButton
                    variant={"outline"}
                    style={{ marginRight: "10px" }}
                    onClick={() => dispatch({ type: actionTypes.SET_ENCODE_TRACKS_FILTER, data: { ...encode?.tracks?.trackFilters, title: "" } })}
                >
                    Reset
                </AppButton>
                <AppButton variant={"fill"} onClick={handleFilter}>Apply</AppButton>
            </Grid>
        </Grid>
    )
}
