import React from 'react';
import { log } from '../../../utils/app.debug';
import { Autocomplete } from '@material-ui/lab';
import { InputAdornment, TextField } from '@material-ui/core';
import FetchingError from '../FetchingError/FetchingError';
import FetchLoading from '../FetchLoading/FetchLoading';

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

    return (
        <Autocomplete
            {...props}
            id="autoComplete"
            noOptionsText={error ? <FetchingError error={error} tryAgain={getOnInputChange} /> : <FetchLoading loading={loading} />}
            options={data || []}
            getOptionSelected={(option, value) => option.id == value.id}
            getOptionLabel={optionLabel}
            onInputChange={getOnInputChange}
            onChange={getSelectedValue}
            renderInput={(params) => {
                return (
                    <TextField
                        {...params}
                        fullWidth
                        placeholder={placeholder || ""}
                        label={labelText || ""}

                    >
                    </TextField>)
            }
            }
            open={state.open ? true : false}
        />
    );
}
