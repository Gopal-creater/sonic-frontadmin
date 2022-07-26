import { Grid } from '@material-ui/core'
import React from 'react'
import CloseIcon from '@material-ui/icons/Close';
import { H3, H4 } from '../../../../StyledComponents/StyledHeadings';
import { StyledTextField } from '../../../../StyledComponents/StyledAppTextInput/StyledAppTextInput';
import AppButton from '../../../../components/common/AppButton/AppButton';
import { useDispatch, useSelector } from 'react-redux';
import { getTracksAction } from '../../../../stores/actions/EncodeActions';
import * as actionTypes from "../../../../stores/actions/actionTypes"
import CustomDropDown from '../../../../components/common/AppTextInput/CustomDropDown';
import theme from '../../../../theme';
import { Distributor, Labels, userRoles } from '../../../../constants/constants';
import AppAutoComplete from '../../../../components/common/AutoComplete/AppAutoComplete';

export default function TrackFilter({ closeDialog }) {
    const encode = useSelector(state => state.encode)
    const users = useSelector(state => state.user);

    const dispatch = useDispatch()

    const handleFilter = () => {
        dispatch(getTracksAction(encode?.tracks.startDate, encode?.tracks?.endDate, 1, "10", encode?.tracks?.trackFilters))
        closeDialog?.()
    }

    let distributorArray = Distributor.map((data) => { return { name: data } })
    let labelArray = Labels.map((data) => { return { name: data } })
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
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <StyledTextField
                        id=""
                        className="mt-1"
                        label="Track Id"
                        value={encode?.tracks?.trackFilters?.id}
                        onChange={(e) => dispatch({ type: actionTypes.SET_ENCODE_TRACKS_FILTER, data: { ...encode?.tracks?.trackFilters, id: e.target.value } })}
                    />
                    <Grid style={{ marginTop: 35 }}>
                        <AppAutoComplete
                            setAutoComPleteAction={(value) => ""}
                            setAutoCompleteOptions={(option => option?.name || "")}
                            data={distributorArray}
                            setAutoCompleteOptionsLabel={(option => "")}
                            getSelectedValue={(e, v) => dispatch({ type: actionTypes.SET_ENCODE_TRACKS_FILTER, data: { ...encode?.tracks?.trackFilters, distributor: v?.name } })}
                            placeholder={"Distributor"}
                        />
                    </Grid>
                    <Grid style={{ marginTop: 10 }}>
                        <StyledTextField
                            id=""
                            label="Artist"
                            className="mt-2"
                            value={encode?.tracks?.trackFilters?.artist}
                            onChange={(e) => dispatch({ type: actionTypes.SET_ENCODE_TRACKS_FILTER, data: { ...encode?.tracks?.trackFilters, artist: e.target.value } })}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <StyledTextField
                        id=""
                        label="Title"
                        className="mt-1"
                        value={encode?.tracks?.trackFilters?.title}
                        onChange={(e) => dispatch({ type: actionTypes.SET_ENCODE_TRACKS_FILTER, data: { ...encode?.tracks?.trackFilters, title: e.target.value } })}
                    />

                    <Grid style={{ marginTop: 35 }}>
                        <AppAutoComplete
                            setAutoComPleteAction={(value) => ""}
                            setAutoCompleteOptions={(option => option?.name || "")}
                            data={labelArray}
                            setAutoCompleteOptionsLabel={(option => "")}
                            getSelectedValue={(e, v) => dispatch({ type: actionTypes.SET_ENCODE_TRACKS_FILTER, data: { ...encode?.tracks?.trackFilters, label: v?.name } })}
                            placeholder={"Label"}
                        />
                    </Grid>

                    {users?.userProfile?.data?.userRole === userRoles.PARTNER_ADMIN &&
                        <Grid style={{ marginTop: 10 }}>
                            <StyledTextField
                                id=""
                                label="Company"
                                className="mt-2"
                                value={encode?.tracks?.trackFilters?.company}
                                onChange={(e) => dispatch({ type: actionTypes.SET_ENCODE_TRACKS_FILTER, data: { ...encode?.tracks?.trackFilters, company: e.target.value } })}
                            />
                        </Grid>
                    }
                    {(users?.userProfile?.data?.userRole === userRoles.PARTNER_ADMIN || users?.userProfile?.data?.userRole === userRoles.COMPANY_ADMIN) &&
                        <Grid style={{ marginTop: 10 }}>
                            <StyledTextField
                                id=""
                                label="User"
                                className="mt-2"
                                value={encode?.tracks?.trackFilters?.user}
                                onChange={(e) => dispatch({ type: actionTypes.SET_ENCODE_TRACKS_FILTER, data: { ...encode?.tracks?.trackFilters, user: e.target.value } })}
                            />
                        </Grid>
                    }
                </Grid>
            </Grid>

            {/* Footer Button */}
            <Grid className='mt-5' container justifyContent='flex-end'>
                <AppButton
                    variant={"outline"}
                    style={{ marginRight: "10px" }}
                    onClick={() => dispatch({
                        type: actionTypes.SET_ENCODE_TRACKS_FILTER, data: {
                            ...encode?.tracks?.trackFilters,
                            title: "",
                            id: "",
                            artist: "",
                            company: "",
                            distributor: "",
                            label: "",
                            user: ""
                        }
                    })}
                >
                    Reset
                </AppButton>
                <AppButton variant={"fill"} onClick={handleFilter}>Apply</AppButton>
            </Grid>
        </Grid>
    )
}
