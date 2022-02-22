import React from "react";
import { FormControl, MenuItem } from "@material-ui/core";
import { TimezoneSelect, TimezoneSelectInput } from "../../../../StyledComponents/StyledAppTextInput/StyledAppSelectInput";

export default function Timezone({
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
}) {

    return (
        <FormControl {...formControlProps} className="mt-1">
            {labelText !== undefined ? (
                <TimezoneSelectInput
                    htmlFor={id}
                    {...labelProps}
                >
                    {labelText}
                </TimezoneSelectInput>
            ) : null}
            <TimezoneSelect style={{ boxShadow: "none" }}
                id={id}
                {...inputProps}
            >
                <MenuItem style={{ cursor: "pointer" }} value="GMT">GMT, Time Zone</MenuItem>
                <MenuItem style={{ cursor: "pointer" }} value="LOCALE">Browser Local Time Zone</MenuItem>
            </TimezoneSelect>
        </FormControl>
    );
}