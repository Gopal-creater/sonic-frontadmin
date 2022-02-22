import React from "react";
import { FormControl, MenuItem } from "@material-ui/core";
import { StyledSelect, StyledSelectInput } from "../../../StyledComponents/StyledAppTextInput/StyledAppSelectInput";

export default function EncodeType({
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
                <MenuItem style={{ cursor: "pointer" }} value="Music">Music</MenuItem>
                <MenuItem style={{ cursor: "pointer" }} value="Video">Video</MenuItem>
                <MenuItem style={{ cursor: "pointer" }} value="Audio">Audio</MenuItem>
            </StyledSelect>
        </FormControl>
    );
}