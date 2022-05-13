/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { log } from '../../../utils/app.debug';
import { Search } from '@material-ui/icons';

<<<<<<< HEAD
export default function AppAutoComplete({
    labelText,
    placeholder,
    loading,
    error,
    data,
    onInputChange,
    onChange,
    optionLabel,
    ...props
}) {
    const [state, setState] = React.useState({
        open: false,
        value: {}
    })
    const getOnInputChange = (event, value) => {
        setState({ ...state, value: value })
        if (value.length > 2) {
            setState({ ...state, open: true })
            onInputChange(value)
        } else {
            setState({ ...state, open: false });
        }
    };

    const getSelectedValue = (event, value) => {
        onChange(value)
        setState({ ...state, open: false });
    }


=======
export default function AppAutoComplete(props) {
>>>>>>> bfb45495d8a5b5de8cbf69bcb9b6b2d219645907
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

