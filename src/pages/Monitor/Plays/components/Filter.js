import React from 'react'
import { FormControl, Grid, InputLabel, MenuItem, Select, Button, TextField } from '@material-ui/core'
import { countries } from '../../../../constants/constants';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Filter.scss";

export default function Filter(props) {
    const [values, setValues] = React.useState({
        channelName: "",
        sonickey: "",
        radioStation: "",
        encodedDate: "",
        country: "",
        song: "",
        artist: "",
    })

    return (
        <div className="filter-container">
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
                        value={values?.channelName}
                        onChange={(e) => setValues({ ...values, channelName: e.target.value })}
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
                        onChange={(e) => setValues({ ...values, sonickey: e.target.value })}
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
                        value={values?.radioStation}
                        onChange={(e) => setValues({ ...values, radioStation: e.target.value })}
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
                        <MenuItem value="UK">UK</MenuItem>
                        <MenuItem value="Germany">Germany</MenuItem>
                        <MenuItem value="Belgium">Belgium</MenuItem>
                    </Select>
                </FormControl>

                <FormControl>
                    <TextField
                        id="artist"
                        label="Artist"
                        type="text"
                        defaultValue=""
                        onChange={(e) => setValues({ ...values, artist: e.target.value })}
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
                        value={values?.country}
                        onChange={(e) => setValues({ ...values, country: e.target.value })}
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
                                <MenuItem value={country?.name} key={country}>{country?.name}</MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>

                <FormControl>
                    <TextField
                        id="song"
                        label="Song"
                        type="text"
                        defaultValue=""
                        onChange={(e) => setValues({ ...values, song: e.target.value })}
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
                        onChange={(date) => setValues({ ...values, encodedDate: date })}
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
                    onClick={props?.onClose}
                >
                    Reset
                </Button>
                <Button
                    variant="contained"
                    style={{ textTransform: 'none', fontFamily: 'NunitoSans-Bold', backgroundColor: '#343F84', color: '#fff' }}
                    onClick={props?.onClose}
                >
                    Apply
                </Button>
            </Grid>
        </div>
    )
}
