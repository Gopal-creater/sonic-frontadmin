import React from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import { countries } from '../../../../constants/constants';

export default function Filter() {
    const [values, setValues] = React.useState({
        channelName: "",
        country: "",
    })

    return (
        <div>
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
                    Filter by channel
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
                    Select country of station
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
        </div>
    )
}
