import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import theme from '../../../theme';
import { DoneSharp } from '@material-ui/icons';

const IOSSwitch = withStyles(() => ({
    root: {
        width: props => props?.size || 120,
        height: 32,
        padding: 0,
    },
    switchBase: {
        padding: 1,
        '&$checked': {
            transform: 'translateX(100%)',
            color: theme.colors.secondary.white,
            '& + $track': {
                backgroundColor: theme.colors.primary.navy,
                opacity: 1,
                border: 'none',
            },
        },
    },
    thumb: {
        width: 30,
        height: 30,
    },
    track: {
        borderRadius: props => props?.size / 2,
        backgroundColor: theme.colors.secondary.mediumGrey,
        opacity: 1,
        "&:after, &:before": {
            color: theme.colors.secondary.white,
            fontSize: theme.fontSize.h6,
            fontFamily: theme.fontFamily.nunitoSansBold,
            position: "absolute",
            top: "9px"
        },
        "&:before": {
            content: props => props?.active || "''",
            left: "10%",
            opacity: 0,
        },
        "&:after": {
            content: props => props?.inActive || "''",
            right: "10%"
        }
    },
    checked: {
        width: props => props?.checkedSize || 69,
        '&$switchBase': {
            color: theme.colors.secondary.white,
            transform: 'translateX(100%)'
        },
        '& $thumb': {
            backgroundColor: theme.colors.secondary.white,
        },
        '& + $track': {
            background: theme.colors.primary.navy,
            '&:before': {
                opacity: 1,
            },
            '&:after': {
                opacity: 0,
            }
        },
    },
    focusVisible: {},
}))(({ classes, ...props }) => {
    return (
        <Switch
            focusVisibleClassName={classes.focusVisible}
            disableRipple
            checkedIcon={
                <div style={{ width: 30, height: 30, backgroundColor: theme.colors.secondary.lightGrey, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <DoneSharp style={{ color: theme.colors.primary.navy }} fontSize='small' />
                </div>
            }
            classes={{
                root: classes.root,
                switchBase: classes.switchBase,
                thumb: classes.thumb,
                track: classes.track,
                checked: classes.checked,
            }}
            {...props}
        />
    );
});


export default function AppToggleSwitch({ checked, onChange, size, checkedSize, active, inActive, ...props }) {
    return (
        <Grid>
            <IOSSwitch
                {...props}
                checked={checked}
                onChange={onChange}
                name="checked"
                size={size}
                checkedSize={checkedSize}
                active={active}
                inActive={inActive}
            />
        </Grid>
    );
}