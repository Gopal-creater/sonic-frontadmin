import { ControlPoint } from '@material-ui/icons';
import React from 'react'
import AppButton from '../AppButton/AppButton'
import { ActionPopup } from './StyledPopper'

export default function CompanyPopper({ children }) {
    const [state, setState] = React.useState({
        open: null,
    })
    const openMenu = Boolean(state.open);
    return (
        <div>
            <AppButton
                variant={"none"}
                startIcon={<ControlPoint />}
                aria-expanded={openMenu ? 'true' : undefined}
                style={{ paddingLeft: 3 }}
                onClick={(e) => setState({ ...state, open: e.currentTarget })}
            >
                Add associated new company
            </AppButton>

            <ActionPopup
                anchorEl={state.open}
                open={openMenu}
                onClose={() => setState({ ...state, open: null })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                {children}
            </ActionPopup>
        </div>
    )
}
