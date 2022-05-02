import { Checkbox, makeStyles } from '@material-ui/core'
import React from 'react'
import theme from '../../../theme';

const useStyles = makeStyles({
    root: {
        color: theme.colors.grey1,
        zIndex: "100",
        outline: '10px',
        '&:hover': {
            backgroundColor: theme.colors.greenTeaBg,
        },
        '&.Mui-checked': {
            color: theme.colors.aubergine,
            "&:hover": {
                color: theme.colors.greenTea,
                backgroundColor: theme.colors.greenTeaBg,
            },
        },
        "&.Mui-disabled": {
            color: theme.colors.grey3,
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
