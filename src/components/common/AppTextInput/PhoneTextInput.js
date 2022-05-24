import React from "react";
import { InputAdornment, MenuItem } from "@material-ui/core";
import { StyledSelect } from "../../../StyledComponents/StyledAppTextInput/StyledAppSelectInput";
import { countries } from "../../../constants/constants";
import { StyledTextField } from "../../../StyledComponents/StyledAppTextInput/StyledAppTextInput";

export default function PhoneTextInput({
    props,
    phoneCodeProps,
    inputProps,
    value,
    onchange,
    error
}) {

    return (
        <StyledTextField
            {...props}
            fullWidth
            inputProps={{
                ...inputProps,
            }}
            value={value}
            onChange={onchange}
            error={error}
            label="Phone Number"
            type="number"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="end">
                        <StyledSelect
                            style={{ boxShadow: "none", margin: 0 }}
                            {...phoneCodeProps}
                        >
                            {countries.map((country, index) => (
                                <MenuItem key={index} value={country.phoneCode}>
                                    {`${country.alpha3code}(${country.phoneCode})`}
                                </MenuItem>
                            ))}
                        </StyledSelect>
                    </InputAdornment>
                ),
            }}
        />
    );
}