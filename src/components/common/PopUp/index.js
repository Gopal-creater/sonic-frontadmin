import { Dialog } from '@material-ui/core'
import React from 'react'

export default function PopUp({ open, handleClose, children, ...props }) {
    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby="simple-dialog-title"
            open={open}
            {...props}
        >
            {children}
        </Dialog>
    )
}
