/* eslint-disable no-use-before-define */
import React from 'react';
import { log } from '../../../utils/app.debug';
import { Search } from '@material-ui/icons';
import { AutocompleteTextfield, StyledAutocomplete } from './StyledPicker';

export default function AppAutoComplete(props) {
    return (
        <StyledAutocomplete
            id="combo-box-demo"
            options={props.data}
            noOptionsText={props.error ? props.error : props.loading ? "Loading" : "No Data"}
            getOptionLabel={(option) => props?.setAutoCompleteOptions(option)}
            onChange={(e, v) => props.getSelectedValue(e, v)}
            style={{ width: "100%" }}
            renderInput={(params) => {
                log("params", params)
                return (
                    <AutocompleteTextfield
                        {...params}
                        {...params.InputProps.startAdornment = props?.hideSearchIcon ? "" : <Search />}
                        {...params.InputProps.endAdornment = ""}
                        {...params.inputProps.onChange = (p) => {
                            props?.setTextFieldValue(p.target.value)
                            props?.setAutoComPleteAction(p.target.value)
                        }}
                        {...params.inputProps.value = props.textFieldValue}
                        helperText={props?.helperText || "Title"}
                        placeholder={props?.placeholder || ""}
                    />
                )
            }}
        />
    );
}

