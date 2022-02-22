import React from "react";
import { FormControl, MenuItem } from "@material-ui/core";
import { StyledSelect, StyledSelectInput } from "../../../StyledComponents/StyledAppTextInput/StyledAppSelectInput";

export default function ChannelDropDown({
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
}) {

    return (
        <FormControl {...formControlProps}>
            {labelText !== undefined ? (
                <StyledSelectInput
                    htmlFor={id}
                    {...labelProps}
                >
                    {labelText}
                </StyledSelectInput>
            ) : null}
            <StyledSelect style={{ boxShadow: "none" }}
                id={id}
                {...inputProps}
            >
                <MenuItem style={{ cursor: "pointer" }} value="ALL">ALL</MenuItem>
                <MenuItem style={{ cursor: "pointer" }} value="STREAMREADER">STREAMREADER</MenuItem>
                <MenuItem style={{ cursor: "pointer" }} value="PORTAL">PORTAL</MenuItem>
                <MenuItem style={{ cursor: "pointer" }} value="MOBILE">MOBILE</MenuItem>
            </StyledSelect>
        </FormControl>
    );
}