import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import theme from '../../../theme';

const IOSSwitch = withStyles((themeData) => ({
    root: {
        width: 115,
        height: 28,
        padding: 0,
        // margin: themeData.spacing(1),
    },
    switchBase: {
        paddingTop: 3,
        padding: 1,
        '&$checked': {
            transform: 'translateX(90px)',
            color: themeData.palette.common.white,
            '& + $track': {
                backgroundColor: theme.colors.primary.navy,
                opacity: 1,
                border: 'none',
                // '&:after': {
                //     paddingTop: 3,
                //     content: '"Active"',
                //     marginLeft: 14,
                //     top: "10px",
                //     color: "#ffff",
                //     fontSize: theme.fontSize.h6,
                //     fontFamily: theme.fontFamily.nunitoSansRegular,
                //     opacity: 1,
                // },
            },
            '& $thumb': {
                backgroundColor: '#fff',
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path fill="${encodeURIComponent(
                    theme.colors.primary.navy
                )}" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>')`,

            },
        },
        '&$focusVisible $thumb': {
            color: '#52d869',
            border: '6px solid #fff',
        },
    },
    thumb: {
        width: 22,
        height: 22,
        // boxShadow: 'none',
        // backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path fill="${encodeURIComponent(
        //     theme.colors.primary.navy
        // )}" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>')`,
        // backgroundRepeat: 'no-repeat',
        // backgroundPosition: 'center',
    },
    track: {
        borderRadius: 28 / 2,
        border: `1px solid ${themeData.palette.grey[400]}`,
        backgroundColor: theme.colors.secondary.mediumGrey,
        opacity: 1,
        transition: themeData.transitions.create(['background-color', 'border']),
        position: 'relative',
        '&:before, &:after': {
            display: 'inline-block',
            position: 'absolute',
            top: '50%',
            width: '50%',
            transform: 'translateY(-50%)',
            color: '#fff',
            textAlign: 'center',
        },
        '&:before': {
            content: '"ACTIVE"',
            left: 6,
            opacity: 0,
        },
        '&:after': {
            content: '"SUSPENDED"',
            right: 32,
        },
    },
    checked: {
        '&$switchBase': {
            color: '#185a9d',
            transform: 'translateX(90px)',
            '&:hover': {
                backgroundColor: 'rgba(24,90,257,0.08)',
            },
        },
        '& $thumb': {
            backgroundColor: '#fff',
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


export default function AppToggleSwitch() {
    const [state, setState] = React.useState({
        checkedB: true,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <Grid>
            <IOSSwitch checked={state.checkedB} onChange={handleChange} name="checkedB" />
        </Grid>
    );
}