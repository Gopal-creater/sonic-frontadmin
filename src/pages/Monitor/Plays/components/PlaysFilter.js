import React from 'react'
import { FormControl, InputLabel, MenuItem, Select, TextField, ListItemText, Grid } from '@material-ui/core'
import { countries } from '../../../../constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import { getPlaysListsAction } from '../../../../stores/actions';
import * as actionTypes from '../../../../stores/actions/actionTypes';
import { CloseOutlined } from '@material-ui/icons';
import { FilterButton, FilterContainer, FilterHeader, FilterItems } from './FilterStyled';
import { H3, H5 } from '../../../../StyledComponents/StyledHeadings';
import AppButton from '../../../../components/common/AppButton/AppButton';
import theme from '../../../../theme';
import CustomDatePicker from '../../../../components/common/FilterComponent/components/CustomDatePicker';

export default function PlaysFilter({ closeDialog }) {
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

    const handleFilter = (e) => {
        e.preventDefault();

        dispatch(getPlaysListsAction(
            plays?.dates?.startDate,
            plays?.dates?.endDate,
            plays?.filters?.channel,
            1,
            10,
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
                <FilterItems>
                    <FormControl>
                        <InputLabel
                            id="mutiple-channel-label"
                            style={{
                                paddingLeft: 30,
                                color: "grey",
                                paddingBottom: 50,
                                marginBottom: 20,
                                fontFamily: "NunitoSans-Bold",
                            }}
                        >
                            Channel
                        </InputLabel>
                        <Select
                            id="channel-drop-down"
                            className="form-control"
                            value={plays?.filters?.channel}
                            onChange={(e) => dispatch({ type: actionTypes.SET_PLAYS_FILTER, data: { ...plays?.filters, channel: e.target.value } })}
                            autoWidth={false}
                            style={{
                                color: "#757575",
                                backgroundColor: "transparent",
                                outline: "none",
                                border: "none",
                                boxShadow: "none",
                                margin: "10px 30px 0px 20px",
                                width: 220,
                            }}
                        >
                            <MenuItem value="ALL">All</MenuItem>
                            <MenuItem value="STREAMREADER">StreamReader</MenuItem>
                            <MenuItem value="PORTAL">SonicPortal</MenuItem>
                            <MenuItem value="MOBILEAPP">SonicApp</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl>
                        <TextField
                            id="sonickey"
                            label="SonicKey"
                            type="text"
                            value={plays?.filters?.sonicKey}
                            onChange={(e) => dispatch({ type: actionTypes.SET_PLAYS_FILTER, data: { ...plays?.filters, sonicKey: e.target.value } })}
                            style={{
                                color: "#757575",
                                backgroundColor: "transparent",
                                outline: "none",
                                border: "none",
                                boxShadow: "none",
                                margin: "0px 30px 0px 20px",
                                padding: "5px 0px",
                                width: 220,
                            }}
                            InputLabelProps={{
                                style: {
                                    paddingLeft: 10,
                                    fontFamily: "NunitoSans-Bold",
                                }
                            }}
                            InputProps={{
                                style: {
                                    paddingLeft: 12,
                                    color: '#757575',
                                    fontFamily: "NunitoSans-Regular",
                                },
                            }}
                        />
                    </FormControl>

                    <FormControl>
                        <InputLabel
                            id="mutiple-country-label"
                            style={{
                                paddingLeft: 30,
                                color: "grey",
                                paddingBottom: 50,
                                marginBottom: 20,
                                fontFamily: "NunitoSans-Bold",
                            }}
                        >
                            Country
                        </InputLabel>
                        <Select
                            id="country-drop-down"
                            className="form-control mb-0"
                            value={plays?.filters?.country}
                            onChange={(e) => dispatch({ type: actionTypes.SET_PLAYS_FILTER, data: { ...plays?.filters, country: e.target.value, radioStation: "" } })}
                            displayEmpty
                            autoWidth={false}
                            style={{
                                color: "#757575",
                                backgroundColor: "transparent",
                                outline: "none",
                                border: "none",
                                boxShadow: "none",
                                margin: "10px 30px 0px 20px",
                                width: 220,
                            }}
                        >
                            {countries?.map((country) => {
                                return (
                                    <MenuItem value={country?.name} key={country?.name}>{country?.name}</MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>

                    <FormControl>
                        <InputLabel
                            id="radioStation-label"
                            style={{
                                paddingLeft: 30,
                                color: "grey",
                                paddingBottom: 50,
                                marginBottom: 20,
                                fontFamily: "NunitoSans-Bold",
                            }}
                        >
                            Radio Station
                        </InputLabel>
                        <Select
                            id="radioStation-drop-down"
                            className="form-control"
                            value={plays?.filters?.radioStation}
                            onChange={(e) => dispatch({ type: actionTypes.SET_PLAYS_FILTER, data: { ...plays?.filters, radioStation: e.target.value } })}
                            autoWidth={false}
                            disabled={filteredRadioStation?.length === 0 ? true : false}
                            style={{
                                color: "#757575",
                                backgroundColor: "transparent",
                                outline: "none",
                                border: "none",
                                boxShadow: "none",
                                margin: "10px 30px 0px 20px",
                                width: 220,
                                height: "45px",
                            }}
                        >
                            {filteredRadioStation?.
                                map((data, index) => {
                                    return (
                                        <MenuItem key={index} value={data?.name}>
                                            <ListItemText primary={data?.name} />
                                        </MenuItem>
                                    );
                                })}
                        </Select>
                        {filteredRadioStation?.length === 0 ?
                            <span style={{ color: "red", fontSize: 12, marginLeft: 20 }}>
                                No radio station for {plays?.filters?.country}
                            </span> : ""
                        }
                    </FormControl>

                    <FormControl>
                        <TextField
                            id="artist"
                            label="Artist"
                            type="text"
                            value={plays?.filters?.artist}
                            onChange={(e) => dispatch({ type: actionTypes.SET_PLAYS_FILTER, data: { ...plays?.filters, artist: e.target.value } })}
                            style={{
                                color: "#757575",
                                backgroundColor: "transparent",
                                outline: "none",
                                border: "none",
                                boxShadow: "none",
                                margin: "0px 30px 0px 20px",
                                padding: "5px 0px",
                                width: 220,
                            }}
                            InputLabelProps={{
                                style: {
                                    paddingLeft: 10,
                                    fontFamily: "NunitoSans-Bold",
                                }
                            }}
                            InputProps={{
                                style: {
                                    paddingLeft: 12,
                                    color: '#757575',
                                    fontFamily: "NunitoSans-Regular",
                                },
                            }}
                        />
                    </FormControl>

                    <FormControl>
                        <TextField
                            id="song"
                            label="Track"
                            type="text"
                            value={plays?.filters?.song}
                            onChange={(e) => dispatch({ type: actionTypes.SET_PLAYS_FILTER, data: { ...plays?.filters, song: e.target.value } })}
                            style={{
                                color: "#757575",
                                backgroundColor: "transparent",
                                outline: "none",
                                border: "none",
                                boxShadow: "none",
                                margin: "0px 30px 0px 20px",
                                padding: "5px 0px",
                                width: 220,
                            }}
                            InputLabelProps={{
                                style: {
                                    paddingLeft: 10,
                                    fontFamily: "NunitoSans-Bold",
                                }
                            }}
                            InputProps={{
                                style: {
                                    paddingLeft: 12,
                                    color: '#757575',
                                    fontFamily: "NunitoSans-Regular",
                                },
                            }}
                        />
                    </FormControl>

                    <FormControl>
                        <TextField
                            id="label"
                            label="Label"
                            type="text"
                            value={plays?.filters?.label}
                            onChange={(e) => dispatch({ type: actionTypes.SET_PLAYS_FILTER, data: { ...plays?.filters, label: e.target.value } })}
                            style={{
                                color: "#757575",
                                backgroundColor: "transparent",
                                outline: "none",
                                border: "none",
                                boxShadow: "none",
                                margin: "0px 30px 0px 20px",
                                padding: "5px 0px",
                                width: 220,
                            }}
                            InputLabelProps={{
                                style: {
                                    paddingLeft: 10,
                                    fontFamily: "NunitoSans-Bold",
                                }
                            }}
                            InputProps={{
                                style: {
                                    paddingLeft: 12,
                                    color: '#757575',
                                    fontFamily: "NunitoSans-Regular",
                                }
                            }}
                        />
                    </FormControl>

                    <FormControl>
                        <TextField
                            id="distributor"
                            label="Distributor"
                            type="text"
                            value={plays?.filters?.distributor}
                            onChange={(e) => dispatch({ type: actionTypes.SET_PLAYS_FILTER, data: { ...plays?.filters, distributor: e.target.value } })}
                            style={{
                                color: "#757575",
                                backgroundColor: "transparent",
                                outline: "none",
                                border: "none",
                                boxShadow: "none",
                                margin: "0px 30px 0px 20px",
                                padding: "5px 0px",
                                width: 220,
                            }}
                            InputLabelProps={{
                                style: {
                                    paddingLeft: 10,
                                    fontFamily: "NunitoSans-Bold",
                                }
                            }}
                            InputProps={{
                                style: {
                                    paddingLeft: 12,
                                    color: '#757575',
                                    fontFamily: "NunitoSans-Regular",
                                },
                            }}
                        />
                    </FormControl>
                </FilterItems>

                <FormControl>
                    <Grid style={{ display: 'flex', margin: "15px 30px 0px 20px" }}>
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
                            <H5 color={theme.colors.secondary.mediumGrey}>to</H5>
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
                                encodedDate: ""
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
