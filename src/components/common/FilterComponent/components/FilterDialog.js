import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import MUIDialog from "@material-ui/core/Dialog";
import theme from "../../../../theme";
import { FilterExport } from "../Filter.styled";
import AppButton from "../../AppButton/AppButton";
import { TuneRounded } from "@material-ui/icons";

const useStyles = makeStyles({
    root: {
        "& .MuiDialog-paper": {
            borderRadius: 0,
        }
    },
});

export default function CustomDialog({
    disabled = false,
    open,
    onClose,
    children,
    ...props
}) {
    const [isOpen, setIsOpen] = React.useState(open || false);
    const classes = useStyles();

    const handleClickOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <React.Fragment>
            <FilterExport onClick={!disabled && handleClickOpen}>
                <AppButton
                    variant="none"
                    fontSize={theme.fontSize.h4}
                    startIcon={<TuneRounded />}
                >
                    Filter
                </AppButton>
            </FilterExport>
            <MUIDialog
                className={classes.root}
                open={isOpen}
                maxWidth="md"
                // onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                {...props}
            >
                {typeof children == "function"
                    ? children({ close: handleClose })
                    : children}
            </MUIDialog>
        </React.Fragment>
    );
};
