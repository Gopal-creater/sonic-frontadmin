import { makeStyles } from '@material-ui/styles';
import React from 'react'
import theme from '../../../../theme';
import AppButton from '../../AppButton/AppButton';
import { ActionPopup } from '../TableStyled';

const useStyles = makeStyles(() => ({
    tableCellMenus: {
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        marginRight: '3px',
        backgroundColor: theme.colors.secondary.mediumGrey,
    },
    menu: {
        marginTop: '10px',
        "& .MuiPaper-root": {
            borderRadius: '0px',
            boxShadow: 'none',
            border: `2px solid ${theme.colors.primary.navy}`,
        }
    }
}));

export default function TableMenu({ children }) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        open: null,
    })
    const openMenu = Boolean(state.open);
    return (
        <div>
            <AppButton
                variant="none"
                style={{ display: 'flex', justifyContent: 'flex-start', padding: 0, backgroundColor: 'white' }}
                aria-expanded={openMenu ? 'true' : undefined}
                onClick={(e) => setState({ ...state, open: e.currentTarget })}
            >
                <span className={classes.tableCellMenus} />
                <span className={classes.tableCellMenus} />
                <span className={classes.tableCellMenus} />
            </AppButton>

            <ActionPopup
                anchorEl={state.open}
                open={openMenu}
                className={classes.menu}
                onClose={() => setState({ ...state, open: null })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                {children}
            </ActionPopup>
        </div>
    )
}
