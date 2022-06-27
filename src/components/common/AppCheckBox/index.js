import { Checkbox, makeStyles } from '@material-ui/core'
import React from 'react'
import theme from '../../../theme';

const useStyles = makeStyles({
    root: {
        color: theme.colors.primary.navy,
        zIndex: "100",
        outline: '10px',
        '&:hover': {
            backgroundColor: theme.colors.secondary.lightTeal,
        },
        '&.Mui-checked': {
            color: theme.colors.primary.navy,
            "&:hover": {
                color: theme.colors.secondary.grey,
                backgroundColor: theme.colors.secondary.lightTeal,
            },
        },
        "&.Mui-disabled": {
            color: theme.colors.secondary.grey,
        }
    },
});

export default function AppCheckBox({ error, onChange, value, ...props }) {
    const classes = useStyles();

    return (
        <Checkbox
            {...props}
            className={classes.root}
            error={!!error || undefined}
            onChange={onChange}
            checked={value}
            inputProps={{ 'aria-label': 'decorative checkbox' }}
        />
    )
}
