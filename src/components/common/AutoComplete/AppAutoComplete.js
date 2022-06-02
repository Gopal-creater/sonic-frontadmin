/* eslint-disable no-use-before-define */
import React from 'react';
import { ControlPoint, Search } from '@material-ui/icons';
import { AutocompleteTextfield, StyledAutocomplete } from './StyledPicker';
import theme from '../../../theme';
import { Grid } from '@material-ui/core';

export default function AppAutoComplete(props) {
    return (
        <StyledAutocomplete
            id="combo-box-demo"
            options={props.data}
            noOptionsText={props.error ? props.error : props.loading ? "Loading..." : "No Data"}
            getOptionLabel={(option) => props?.setAutoCompleteOptions(option)}
            renderOption={(option) => (
                <Grid container alignItems='center' style={{ margin: 0, borderBottom: `1px solid ${theme.colors.secondary.lightGrey}`, padding: '5px 0px' }}>
                    <Grid item>
                        <ControlPoint fontSize='small' />
                    </Grid>
                    <Grid item style={{ marginLeft: 10, fontSize: '17px' }}>
                        <Grid>{props?.setAutoCompleteOptions(option)}</Grid>
                        <Grid style={{ fontSize: '13px' }}>{props?.setAutoCompleteOptionsLabel(option)}</Grid>
                    </Grid>
                </Grid>
            )}
            onChange={(e, v) => props?.getSelectedValue(e, v)}
            onInputChange={(e, v) => props?.setAutoComPleteAction(v)}
            style={{ width: "100%" }}
            renderInput={(params) => {
                return (
                    <AutocompleteTextfield
                        {...params}
                        {...params.InputProps.startAdornment = props?.hideSearchIcon ? "" : <Search />}
                        {...params.InputProps.endAdornment = ""}
                        helperText={props?.helperText || ""}
                        placeholder={props?.placeholder || ""}
                        label={props?.labelText || ""}
                    />
                )
            }}
        />
    );
}

