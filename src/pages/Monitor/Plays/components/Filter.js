import React from 'react'
import { FormControl, Grid, InputLabel, MenuItem, Select, Button, TextField } from '@material-ui/core'
import { countries } from '../../../../constants/constants';
import "./Filter.scss";
import { useDispatch, useSelector } from 'react-redux';
import { getPlaysListsAction } from '../../../../stores/actions';
import { log } from '../../../../utils/app.debug';
import cogoToast from 'cogo-toast';
import * as actionTypes from '../../../../stores/actions/actionTypes'

export default function Filter(props) {
    const dispatch = useDispatch();
    const plays = useSelector(state => state.playsList);
    log("plays", plays)

    const handleFilter = (e) => {
        e.preventDefault();
        // if (playsfilters?.channel === "" || playsfilters?.channel === undefined) {
        //     cogoToast.error("Channel is mandatory");
        //     return
        // }

        dispatch(getPlaysListsAction(
            plays?.dates?.startDate,
            plays?.dates?.endDate,
            plays?.filters?.channel,
            props?.page,
            10,
            plays?.filters?.sonicKey,
            plays?.filters?.country,
            plays?.filters?.artist,
            plays?.filters?.radioStation,
            plays?.filters?.song,
            plays?.filters?.encodedDate,
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
                            defaultValue=""
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
                                    color: 'grey',
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
                            onChange={(e) => dispatch({ type: actionTypes.SET_PLAYS_FILTER, data: { ...plays?.filters, country: e.target.value } })}
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
                        <TextField
                            id="artist"
                            label="Artist"
                            type="text"
                            defaultValue=""
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
                                    color: 'grey',
                                    fontFamily: "NunitoSans-Regular",
                                },
                            }}
                        />
                    </FormControl>

                    <FormControl>
                        <InputLabel
                            id="mutiple-radioStation-label"
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
                            <MenuItem value="ArBa-Test-Radio">ArBa-Test-Radio</MenuItem>
                            <MenuItem value="BBC London">BBC London</MenuItem>
                            <MenuItem value="BBC Leeds">BBC Leeds</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl>
                        <TextField
                            id="song"
                            label="Song"
                            type="text"
                            defaultValue=""
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
                                    color: 'grey',
                                    fontFamily: "NunitoSans-Bold",
                                },
                            }}
                        />
                    </FormControl>

                    <FormControl>
                        <TextField
                            id="date"
                            label="Encoded Date"
                            type="date"
                            defaultValue=""
                            value={plays?.filters?.encodedDate}
                            onChange={(e) => dispatch({ type: actionTypes.SET_PLAYS_FILTER, data: { ...plays?.filters, encodedDate: e.target.value } })}
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
                                shrink: true,
                                style: {
                                    paddingLeft: 3,
                                    fontFamily: "NunitoSans-Bold",
                                }
                            }}
                            InputProps={{
                                style: {
                                    paddingLeft: 10,
                                    color: 'grey',
                                    fontFamily: "NunitoSans-Regular",
                                },
                            }}
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
                                channel: "STREAMREADER",
                                sonicKey: "",
                                country: "",
                                artist: "",
                                radioStation: "",
                                song: "",
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
