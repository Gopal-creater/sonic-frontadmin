import { ControlPoint } from '@material-ui/icons';
import React from 'react'
import AppButton from '../AppButton/AppButton'
import { ActionPopup } from './StyledPopper'

export default function Popper({ title, showDetails, children }) {
    const [state, setState] = React.useState({
        open: null,
    })
    const openMenu = Boolean(state.open);

    const handleShowDetails = () => {
        setState({ ...state, open: null })
        showDetails(true)
    }

    return (
        <div>
            <AppButton
                variant={"none"}
                startIcon={<ControlPoint />}
                aria-expanded={openMenu ? 'true' : undefined}
                style={{ paddingLeft: 3 }}
                onClick={(e) => setState({ ...state, open: e.currentTarget })}
            >
                Add associated new {title}
            </AppButton>

            <ActionPopup
                anchorEl={state.open}
                open={openMenu}
                onClose={() => setState({ ...state, open: null })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <>{children}</>
                {showDetails && <AppButton
                    variant={"fill"}
                    className="mt-3"
                    onClick={handleShowDetails}>
                    Add
                </AppButton>}
            </ActionPopup>
        </div>
    )
}
