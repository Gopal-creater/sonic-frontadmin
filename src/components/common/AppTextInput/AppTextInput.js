import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    label: {
        color: "yellow",
        "&:-hover": {
            color: "green !important"
        }
    },
    focused: {
        color: "red !important",
    },
}));

export default function AppTextInput({ ...props }) {
    const classes = useStyles();
    return (
        <TextField
            label="Username*"
            InputLabelProps={{
                classes: {
                    root: classes.label,
                    focused: classes.focused,
                }
            }}
            {...props}
        />
    );
}
