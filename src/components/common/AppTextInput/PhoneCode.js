import React from "react";
import { MenuItem } from "@material-ui/core";
import { SelectFormControl, StyledSelect } from "../../../StyledComponents/StyledAppTextInput/StyledAppSelectInput";
import { countries } from "../../../constants/constants";

export default function PhoneCode({
    formControlProps,
    id,
    inputProps,
}) {

    return (
        <SelectFormControl {...formControlProps}>
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