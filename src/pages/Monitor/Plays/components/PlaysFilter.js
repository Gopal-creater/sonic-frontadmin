import React from 'react'
import { FormControl, InputLabel, MenuItem, Select, TextField, ListItemText, Grid } from '@material-ui/core'
import { countries } from '../../../../constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import { getPlaysListsAction } from '../../../../stores/actions';
import * as actionTypes from '../../../../stores/actions/actionTypes';
import { CloseOutlined } from '@material-ui/icons';
import { FilterButton, FilterContainer, FilterForm, FilterHeader, FilterItems } from './FilterStyled';
import { H3, H5 } from '../../../../StyledComponents/StyledHeadings';
import AppButton from '../../../../components/common/AppButton/AppButton';
import theme from '../../../../theme';
import CustomDatePicker from '../../../../components/common/FilterComponent/components/CustomDatePicker';
import ChannelDropDown from '../../../../components/common/AppTextInput/ChannelDropdown';
import { StyledTextField } from '../../../../StyledComponents/StyledAppTextInput/StyledAppTextInput';
import CustomDropDown from '../../../../components/common/AppTextInput/CustomDropDown';
import { getMonitorListAction } from '../../../../stores/actions/monitorActions/monitorActions';

export default function PlaysFilter({ closeDialog, playsBy }) {
    const dispatch = useDispatch();
    const plays = useSelector(state => state.playsList);

    const filteredRadioStation = plays?.allRadioStations?.data?.filter((data) => {
        if (plays.filters.country === "") {
            return data
        }
        if (data.country === plays.filters.country) {
            return data
        }
    })

    const actions = {
        loading: "",
        error: "",
        data: ""
    }

    const handleFilter = (e) => {
        e.preventDefault();

        dispatch(getMonitorListAction(
            actions,
            plays?.dates?.startDate,
            plays?.dates?.endDate,
            plays?.filters?.channel,
            1,
            10,
            playsBy
        ));
        closeDialog?.();
    }

    return (
        <FilterContainer>
            <FilterHeader>
                <div>
                    <H3>Filter</H3>
                </div>
                <div style={{ cursor: 'pointer' }}>
                    <CloseOutlined onClick={() => closeDialog?.()} />
                </div>
            </FilterHeader>
            <form onSubmit={handleFilter}>
                <FilterItems container>
                    <FilterForm>
                        <ChannelDropDown
                            id="channel-dropdown"
                            labelText="Channel"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                value: plays?.filters?.channel,
                                onChange: (e) => dispatch({ type: actionTypes.SET_PLAYS_FILTER, data: { ...plays?.filters, channel: e.target.value } })
                            }}
                        />
                    </FilterForm>

                    <FilterForm>
                        <StyledTextField
                            fullWidth
                            label="SonicKey"
                            value={plays?.filters?.sonicKey}
                            onChange={(e) => dispatch({ type: actionTypes.SET_PLAYS_FILTER, data: { ...plays?.filters, sonicKey: e.target.value } })}
                            InputLabelProps={{
                                style: {
                                    fontSize: theme.fontSize.h4,
                                    color: theme.colors.secondary.mediumGrey,
                                    fontFamily: theme.fontFamily.nunitoSansBold
                                }
                            }}
                            inputProps={{ style: { fontSize: theme.fontSize.h4 } }}
                        />
                    </FilterForm>

                    <FilterForm>
                        <CustomDropDown
                            id="country-dropdown"
                            labelText="Country"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                value: plays?.filters?.country,
                                onChange: (e) => dispatch({ type: actionTypes.SET_PLAYS_FILTER, data: { ...plays?.filters, country: e.target.value, radioStation: "" } }),
                                displayEmpty: true
                            }}
                            data={countries || []}
                        />
                    </FilterForm>

                    <FilterForm>
                        <CustomDropDown
                            id="radioStation-dropdown"
                            labelText="Radio Station"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                value: plays?.filters?.radioStation,
                                onChange: (e) => dispatch({ type: actionTypes.SET_PLAYS_FILTER, data: { ...plays?.filters, radioStation: e.target.value } }),
                                disabled: filteredRadioStation?.length === 0 ? true : false
                            }}
                            data={filteredRadioStation || []}
                        />
                    </FilterForm>

                    <FilterForm>
                        <StyledTextField
                            fullWidth
                            label="Artist name"
                            value={plays?.filters?.artist}
                            onChange={(e) => dispatch({ type: actionTypes.SET_PLAYS_FILTER, data: { ...plays?.filters, artist: e.target.value } })}
                            InputLabelProps={{
                                style: {
                                    fontSize: theme.fontSize.h4,
                                    color: theme.colors.secondary.mediumGrey,
                                    fontFamily: theme.fontFamily.nunitoSansBold
                                }
                            }}
                            inputProps={{ style: { fontSize: theme.fontSize.h4 } }}
                        />
                    </FilterForm>

                    <FilterForm>
                        <StyledTextField
                            fullWidth
                            label="Track"
                            value={plays?.filters?.song}
                            onChange={(e) => dispatch({ type: actionTypes.SET_PLAYS_FILTER, data: { ...plays?.filters, song: e.target.value } })}
                            InputLabelProps={{
                                style: {
                                    fontSize: theme.fontSize.h4,
                                    color: theme.colors.secondary.mediumGrey,
                                    fontFamily: theme.fontFamily.nunitoSansBold
                                }
                            }}
                            inputProps={{ style: { fontSize: theme.fontSize.h4 } }}
                        />
                    </FilterForm>

                    <FilterForm>
                        <StyledTextField
                            fullWidth
                            label="Label"
                            value={plays?.filters?.label}
                            onChange={(e) => dispatch({ type: actionTypes.SET_PLAYS_FILTER, data: { ...plays?.filters, label: e.target.value } })}
                            InputLabelProps={{
                                style: {
                                    fontSize: theme.fontSize.h4,
                                    color: theme.colors.secondary.mediumGrey,
                                    fontFamily: theme.fontFamily.nunitoSansBold
                                }
                            }}
                            inputProps={{ style: { fontSize: theme.fontSize.h4 } }}
                        />
                    </FilterForm>

                    <FilterForm>
                        <StyledTextField
                            fullWidth
                            label="Distributor"
                            value={plays?.filters?.distributor}
                            onChange={(e) => dispatch({ type: actionTypes.SET_PLAYS_FILTER, data: { ...plays?.filters, distributor: e.target.value } })}
                            InputLabelProps={{
                                style: {
                                    fontSize: theme.fontSize.h4,
                                    color: theme.colors.secondary.mediumGrey,
                                    fontFamily: theme.fontFamily.nunitoSansBold
                                }
                            }}
                            inputProps={{ style: { fontSize: theme.fontSize.h4 } }}
                        />
                    </FilterForm>
                </FilterItems>

                <FormControl>
                    <Grid style={{ display: 'flex', margin: "30px 30px 0px 20px" }}>
                        <CustomDatePicker
                            selected={plays?.filters?.encodedStartDate}
                            onChange={(date) => dispatch({ type: actionTypes.SET_PLAYS_FILTER, data: { ...plays?.filters, encodedStartDate: date } })}
                            calender={true}
                            dateFormat="MMM d,yyyy"
                            title="Encoded Start Date"
                            startDate={plays?.filters?.encodedStartDate}
                            endDate={plays?.filters?.encodedEndDate}
                        />

                        <div className="mt-4 mx-3">
                            <H5 color={theme.colors.secondary.grey}>to</H5>
                        </div>

                        <CustomDatePicker
                            selected={plays?.filters?.encodedEndDate}
                            onChange={(date) => dispatch({ type: actionTypes.SET_PLAYS_FILTER, data: { ...plays?.filters, encodedEndDate: date } })}
                            dateFormat="MMM d,yyyy"
                            title="End Date"
                            startDate={plays?.filters?.encodedStartDate}
                            endDate={plays?.filters?.encodedEndDate}
                        />
                    </Grid>
                </FormControl>

                <FilterButton>
                    <AppButton
                        variant="outline"
                        className="mx-3"
                        onClick={() => dispatch({
                            type: actionTypes.SET_PLAYS_FILTER,
                            data: {
                                channel: "ALL",
                                sonicKey: "",
                                country: "",
                                artist: "",
                                radioStation: "",
                                song: "",
                                label: "",
                                distributor: "",
                                encodedStartDate: "",
                                encodedEndDate: ""
                            }
                        })}
                    >
                        Reset
                    </AppButton>
                    <AppButton
                        variant="fill"
                        type="submit"
                    >
                        Apply
                    </AppButton>
                </FilterButton>
            </form>
        </FilterContainer>
    )
}
