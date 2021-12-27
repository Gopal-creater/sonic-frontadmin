import React from 'react'
import { FormControl, Grid, InputLabel, MenuItem, Select, Button, TextField, ListItemText, InputAdornment } from '@material-ui/core'
import { countries } from '../../../../constants/constants';
import "./Filter.scss";
import { useDispatch, useSelector } from 'react-redux';
import { getPlaysListsAction } from '../../../../stores/actions';
import * as actionTypes from '../../../../stores/actions/actionTypes';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarTodayOutlined } from '@material-ui/icons';

export default function Filter(props) {
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

        props?.setClose(false);
    }

    return (
        <div className="filter-container">
            <form>
                <Grid className="filter-items">
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

                    <FormControl>
                        <DatePicker
                            selected={plays?.filters?.encodedDate}
                            onChange={(date) => dispatch({ type: actionTypes.SET_PLAYS_FILTER, data: { ...plays?.filters, encodedDate: date } })}
                            customInput={
                                <TextField
                                    id="date"
                                    label="Encoded Date"
                                    style={{
                                        color: "#757575",
                                        backgroundColor: "transparent",
                                        outline: "none",
                                        border: "none",
                                        boxShadow: "none",
                                        margin: "5px 30px 0px 20px",
                                        width: 220,
                                    }}
                                    InputLabelProps={{
                                        style: {
                                            marginLeft: 8,
                                            fontFamily: "NunitoSans-Bold",
                                        }
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <CalendarTodayOutlined />
                                            </InputAdornment>
                                        ),
                                        style: {
                                            paddingLeft: 10,
                                            color: '#757575',
                                            fontFamily: "NunitoSans-Regular",
                                        },
                                    }}
                                />
                            }
                            dateFormat="MMM d,yyyy"
                            title="Encoded Date"
                            showYearDropdown
                            showMonthDropdown
                        />
                    </FormControl>
                </Grid>

                <Grid className="filter-btn" container justifyContent="flex-end">
                    <Button
                        variant="contained"
                        className="mx-3"
                        style={{ textTransform: 'none', fontFamily: 'NunitoSans-Bold' }}
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
                    </Button>
                    <Button
                        variant="contained"
                        type="submit"
                        style={{ textTransform: 'none', fontFamily: 'NunitoSans-Bold', backgroundColor: '#343F84', color: '#fff' }}
                        onClick={handleFilter}
                    >
                        Apply
                    </Button>
                </Grid>
            </form>
        </div>
    )
}
