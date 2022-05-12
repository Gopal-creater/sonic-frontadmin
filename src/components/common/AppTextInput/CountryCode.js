import React from "react";
import { MenuItem } from "@material-ui/core";
import { SelectFormControl, StyledSelect, StyledSelectInput } from "../../../StyledComponents/StyledAppTextInput/StyledAppSelectInput";
import { countries } from "../../../constants/constants";

export default function CountryCode({
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
}) {

    return (
        <SelectFormControl {...formControlProps}>
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
                {countries?.map((item, index) => {
                    return (
                        <MenuItem value={item?.phoneCode} key={index}>{item?.phoneCode}</MenuItem>
                    );
                })}
            </StyledSelect>
        </SelectFormControl>
    );
}