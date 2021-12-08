import React from 'react'
import { FormControl, Grid, Input, InputLabel, MenuItem, Select, Button, TextField } from '@material-ui/core'
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
                        id="mutiple-checkbox-label"
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
                        id="drop-down"
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
                    <InputLabel
                        id="mutiple-checkbox-label"
                        style={{
                            paddingLeft: 30,
                            color: "grey",
                            paddingBottom: 50,
                            marginBottom: 20,
                            fontFamily: "NunitoSans-Bold",
                        }}
                    >
                        SonicKey
                    </InputLabel>
                    <Select
                        id="drop-down"
                        className="form-control"
                        value={values?.sonickey}
                        onChange={(e) => setValues({ ...values, sonickey: e.target.value })}
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
                        <MenuItem value="ugGmojtz0XW">ugGmojtz0XW</MenuItem>
                        <MenuItem value="ugGmojtz0XW">ugGmojtz0XW</MenuItem>
                        <MenuItem value="ugGmojtz0XW">ugGmojtz0XW</MenuItem>
                    </Select>
                </FormControl>

                <FormControl>
                    <InputLabel
                        id="mutiple-checkbox-label"
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
                        id="drop-down"
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
                        <MenuItem value="UK">UK</MenuItem>
                        <MenuItem value="Germany">Germany</MenuItem>
                        <MenuItem value="Belgium">Belgium</MenuItem>
                    </Select>
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

                <FormControl>
                    <InputLabel
                        id="mutiple-checkbox-label"
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
                        id="drop-down"
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
                                <MenuItem value={country?.name}>{country?.name}</MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>

                <FormControl>
                    <InputLabel
                        id="mutiple-checkbox-label"
                        style={{
                            paddingLeft: 30,
                            color: "grey",
                            paddingBottom: 50,
                            marginBottom: 20,
                            fontFamily: "NunitoSans-Bold",
                        }}
                    >
                        Song
                    </InputLabel>
                    <Select
                        id="drop-down"
                        className="form-control"
                        value={values?.song}
                        onChange={(e) => setValues({ ...values, song: e.target.value })}
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
                        <MenuItem value="Paradise">Paradise</MenuItem>
                        <MenuItem value="Forever">Forever</MenuItem>
                        <MenuItem value="Rasputin">Rasputin</MenuItem>
                    </Select>
                </FormControl>

                <FormControl>
                    <InputLabel
                        id="mutiple-checkbox-label"
                        style={{
                            paddingLeft: 30,
                            color: "grey",
                            paddingBottom: 50,
                            marginBottom: 20,
                            fontFamily: "NunitoSans-Bold",
                        }}
                    >
                        Artist
                    </InputLabel>
                    <Select
                        id="drop-down"
                        className="form-control"
                        value={values?.artist}
                        onChange={(e) => setValues({ ...values, artist: e.target.value })}
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
                        <MenuItem value="Coldplay">Coldplay</MenuItem>
                        <MenuItem value="Chris Brown">Chris Brown</MenuItem>
                        <MenuItem value="Boney M">Boney M</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid className="filter-btn" container justifyContent="flex-end">
                <Button
                    variant="contained"
                    className="mx-3"
                    style={{ textTransform: 'none', fontFamily: 'NunitoSans-Bold' }}
                    onClick={props?.onClose}
                >
                    Cancel
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
