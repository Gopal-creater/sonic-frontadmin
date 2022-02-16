import React from "react";
import { FormControl, MenuItem } from "@material-ui/core";
import { StyledSelect, StyledSelectInput } from "../../../StyledComponents/StyledAppTextInput/StyledAppSelectInput";
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
        marginTop: -2,

        "& li": {
            fontSize: `${theme.fontSize.h5}`,
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

export default function ChannelDropDown({
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
}) {
    const classes = useStyles();

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
                <MenuItem style={{ cursor: "pointer" }} value="ALL">ALL</MenuItem>
                <MenuItem style={{ cursor: "pointer" }} value="STREAMREADER">STREAMREADER</MenuItem>
                <MenuItem style={{ cursor: "pointer" }} value="PORTAL">PORTAL</MenuItem>
                <MenuItem style={{ cursor: "pointer" }} value="MOBILE">MOBILE</MenuItem>
            </StyledSelect>
        </FormControl>
    );
}