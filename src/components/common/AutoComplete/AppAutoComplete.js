/* eslint-disable no-use-before-define */
import React from "react";
import { ControlPoint, Search } from "@material-ui/icons";
import { AutocompleteTextfield, StyledAutocomplete } from "./StyledPicker";
import { Grid } from "@material-ui/core";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";
import { log } from "../../../utils/app.debug";
import { useTheme } from "styled-components";

export default function AppAutoComplete(props) {
  const filterOptions = createFilterOptions({
    limit: 5000,
  });
  const theme = useTheme();

  log("props", props);
  return (
    <StyledAutocomplete
      {...props}
      filterOptions={filterOptions}
      id="combo-box-demo"
      options={props.data || []}
      noOptionsText={
        props?.error
          ? props?.error
          : props.loading
          ? "Loading..."
          : props?.data === undefined
          ? "Start typing..."
          : "No Data"
      }
      getOptionLabel={(option) => props?.setAutoCompleteOptions(option)}
      getOptionSelected={(option, value) => option.id === value.id}
      renderOption={(option) => (
        <Grid
          wrap="nowrap"
          container
          alignItems="center"
          style={{
            margin: 0,
            borderBottom: `1px solid ${theme.colors.grey.main}`,
            padding: "5px 0px",
          }}
        >
          <Grid item>
            <ControlPoint fontSize="small" />
          </Grid>
          <Grid
            item
            style={{ marginLeft: 10, fontSize: theme.fontSize.content }}
          >
            <Grid>{props?.setAutoCompleteOptions(option)}</Grid>
            <Grid style={{ fontSize: theme.fontSize.content }}>
              {props?.setAutoCompleteOptionsLabel(option)}
            </Grid>
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
            {...(params.InputProps.startAdornment = props?.hideSearchIcon ? (
              ""
            ) : (
              <Search />
            ))}
            {...(params.InputProps.endAdornment = "")}
            helperText={props?.helperText || ""}
            placeholder={props?.placeholder || ""}
            label={props?.labelText || ""}
            color={props?.color}
            fontFamily={props?.fontFamily}
            fontSize={props?.fontSize}
          />
        );
      }}
    />
  );
}
