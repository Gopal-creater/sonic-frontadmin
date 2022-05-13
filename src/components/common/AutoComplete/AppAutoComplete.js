/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { log } from '../../../utils/app.debug';
import { Search } from '@material-ui/icons';

export default function AppAutoComplete(props) {
    return (
        <Autocomplete
            id="combo-box-demo"
            options={props.data}
            noOptionsText={props.error ? props.error : props.loading ? "Loading" : "No Data"}
            getOptionLabel={(option) => props?.setAutoCompleteOptions(option)}
            onChange={(e, v) => props.getSelectedValue(e, v)}
            style={{ width: "100%" }}
            renderInput={(params) => {
                log("params", params)
                return (
                    <TextField
                        {...params}
                        {...params.InputProps.startAdornment = props?.hideSearchIcon ? "" : <Search />}
                        {...params.InputProps.endAdornment = ""}
                        {...params.inputProps.onChange = (p) => {
                            props?.setTextField(p.target.value)
                            if (props.textFieldValue && props.textFieldValue?.length >= 2) {
                                props?.setAutoComPleteAction()
                            }
                        }}
                        {...params.inputProps.value = props.textFieldValue}
                        helperText={props?.helperText || "Title"}
                    />
                )
            }}
        />
    );
}

