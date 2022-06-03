import React from "react";
import { MenuItem } from "@material-ui/core";
import { SelectFormControl, StyledSelect, StyledSelectInput } from "../../../StyledComponents/StyledAppTextInput/StyledAppSelectInput";
import { useSelector } from "react-redux";

export default function CustomDropDown({
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    data,
}) {
    const plays = useSelector(state => state.monitor);
    const streamReader = useSelector(state => state.streamReader)

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
                {data?.map((item, index) => {
                    return (
                        <MenuItem value={item?.name} key={index}>{item?.name}</MenuItem>
                    );
                })}
            </StyledSelect>
            {data?.length === 0 ?
                <span style={{ color: "red", fontSize: 12 }}>
                    No radio station for {plays?.filters?.country || streamReader?.filters?.country}
                </span> : ""
            }
        </SelectFormControl>
    );
}