import React from 'react'
import { FormControl, Grid } from '@material-ui/core'
import { countries } from '../../../../constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import * as actionTypes from '../../../../stores/actions/actionTypes';
import { CloseOutlined } from '@material-ui/icons';
import { FilterButton, FilterContainer, FilterForm, FilterHeader, FilterItems } from './MonitorFilterStyles';
import { H3, H5 } from '../../../../StyledComponents/StyledHeadings';
import AppButton from '../../../../components/common/AppButton/AppButton';
import theme from '../../../../theme';
import CustomDatePicker from '../../../../components/common/FilterComponent/components/CustomDatePicker';
import ChannelDropDown from '../../../../components/common/AppTextInput/ChannelDropdown';
import { StyledTextField } from '../../../../StyledComponents/StyledAppTextInput/StyledAppTextInput';
import CustomDropDown from '../../../../components/common/AppTextInput/CustomDropDown';
import { getMonitorListAction } from '../../../../stores/actions/monitorActions/monitorActions';
import { getMonitorDashboardDataAction } from '../../../../stores/actions/dashboardActions.js/dashboardActions';

export default function MonitorFilter({ closeDialog, playsBy, actions, dashboard = false }) {
    const dispatch = useDispatch();
    const monitor = useSelector(state => state.monitor);
    const radioStations = useSelector(state => state.radioStations)

    const filteredRadioStation = radioStations.data?.filter((data) => {
        if (monitor.filters.country === "") {
            return data
        }
        if (data.country === monitor.filters.country) {
            return data
        }
    })

    const handleFilter = (e) => {
        e.preventDefault();
        if (dashboard) {
            dispatch(getMonitorDashboardDataAction(monitor?.dates?.startDate, monitor?.dates?.endDate))
        }
        else {
            dispatch(getMonitorListAction(
                actions,
                monitor?.dates?.startDate,
                monitor?.dates?.endDate,
                1,
                10,
                playsBy
            ));
        }
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
                                value: monitor?.filters?.channel,
                                onChange: (e) => dispatch({ type: actionTypes.SET_MONITOR_FILTERS, data: { ...monitor?.filters, channel: e.target.value } })
                            }}
                        />
                    </FilterForm>

                    <FilterForm>
                        <StyledTextField
                            fullWidth
                            label="SonicKey"
                            value={monitor?.filters?.sonicKey}
                            onChange={(e) => dispatch({ type: actionTypes.SET_MONITOR_FILTERS, data: { ...monitor?.filters, sonicKey: e.target.value } })}
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
                                value: monitor?.filters?.country,
                                onChange: (e) => dispatch({ type: actionTypes.SET_MONITOR_FILTERS, data: { ...monitor?.filters, country: e.target.value, radioStation: "" } }),
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
                                value: monitor?.filters?.radioStation,
                                onChange: (e) => dispatch({ type: actionTypes.SET_MONITOR_FILTERS, data: { ...monitor?.filters, radioStation: e.target.value } }),
                                disabled: filteredRadioStation?.length === 0 ? true : false
                            }}
                            data={filteredRadioStation || []}
                        />
                    </FilterForm>

                    <FilterForm>
                        <StyledTextField
                            fullWidth
                            label="Artist name"
                            value={monitor?.filters?.artist}
                            onChange={(e) => dispatch({ type: actionTypes.SET_MONITOR_FILTERS, data: { ...monitor?.filters, artist: e.target.value } })}
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
                            value={monitor?.filters?.song}
                            onChange={(e) => dispatch({ type: actionTypes.SET_MONITOR_FILTERS, data: { ...monitor?.filters, song: e.target.value } })}
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
                            value={monitor?.filters?.label}
                            onChange={(e) => dispatch({ type: actionTypes.SET_MONITOR_FILTERS, data: { ...monitor?.filters, label: e.target.value } })}
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
                            value={monitor?.filters?.distributor}
                            onChange={(e) => dispatch({ type: actionTypes.SET_MONITOR_FILTERS, data: { ...monitor?.filters, distributor: e.target.value } })}
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
                            selected={monitor?.filters?.encodedStartDate}
                            onChange={(date) => dispatch({ type: actionTypes.SET_MONITOR_FILTERS, data: { ...monitor?.filters, encodedStartDate: date } })}
                            calender={true}
                            dateFormat="MMM d,yyyy"
                            title="Encoded Start Date"
                            startDate={monitor?.filters?.encodedStartDate}
                            endDate={monitor?.filters?.encodedEndDate}
                            filter={true}
                        />

                        <div className="mt-4 mx-3">
                            <H5 color={theme.colors.secondary.grey}>to</H5>
                        </div>

                        <CustomDatePicker
                            selected={monitor?.filters?.encodedEndDate}
                            onChange={(date) => dispatch({ type: actionTypes.SET_MONITOR_FILTERS, data: { ...monitor?.filters, encodedEndDate: date } })}
                            dateFormat="MMM d,yyyy"
                            title="End Date"
                            startDate={monitor?.filters?.encodedStartDate}
                            endDate={monitor?.filters?.encodedEndDate}
                            filter={true}
                        />
                    </Grid>
                </FormControl>

                <FilterButton>
                    <AppButton
                        variant="outline"
                        className="mx-3"
                        onClick={() => dispatch({
                            type: actionTypes.SET_MONITOR_FILTERS,
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
