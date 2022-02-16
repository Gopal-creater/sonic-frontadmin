import React from "react";
import { FormControl, MenuItem } from "@material-ui/core";
import { StyledSelect, StyledSelectInput } from "../../../StyledComponents/StyledAppTextInput/StyledAppSelectInput";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import theme from "../../../theme";

const useStyles = makeStyles({
    root: {
        "&:hover .MuiInput-input": {
            color: `${theme.colors.primary.navy}`
        },
    },
    select: {
        borderRadius: 0,
        boxShadow: 'none',
        border: `2px solid ${theme.colors.secondary.lightNavy}`,
        backgroundColor: '#fff',

        "& li": {
            fontSize: '14px',
            color: `${theme.colors.secondary.grey}`,
            borderBottom: `1px solid ${theme.colors.secondary.lightGrey}`,
        },

        "& li:hover": {
            backgroundColor: '#fff',
            color: `${theme.colors.secondary.mediumNavy}`,
        },

        "& .Mui-selected, .Mui-selected:hover": {
            backgroundColor: '#fff',
        },
    },
});

export default function CustomDropDown({
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    data,
}) {
    const classes = useStyles();
    const plays = useSelector(state => state.playsList);

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
                className={classes.root}
                {...inputProps}
                MenuProps={{
                    getContentAnchorEl: null,
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left'
                    },
                    classes: { paper: classes.select }
                }}
            >
                {data?.map((item, index) => {
                    return (
                        <MenuItem value={item?.name} key={index}>{item?.name}</MenuItem>
                    );
                })}
            </StyledSelect>
            {data?.length === 0 ?
                <span style={{ color: "red", fontSize: 12 }}>
                    No radio station for {plays?.filters?.country}
                </span> : ""
            }
        </FormControl>
    );
}