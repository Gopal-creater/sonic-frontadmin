import React from "react";
import MUIDialog from "@material-ui/core/Dialog";
import theme from "../../../../theme";
import Download from '../../../../assets/images/iconDownloadSvg.svg';
import { FilterExport, Image } from "../Filter.styled";

export default function CustomDialog({
    disabled = false,
    open,
    onClose,
    children,
    ...props
}) {
    const [isOpen, setIsOpen] = React.useState(open || false);

    const handleClickOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <React.Fragment>
            <FilterExport onClick={!disabled && handleClickOpen}>
                <Image src={Download} alt='Filter' />
                <span style={{ fontSize: theme.fontSize.h4, fontFamily: theme.fontFamily.nunitoSansBold, color: theme.colors.primary.navy }}>
                    Filter
                </span>
            </FilterExport>
            <MUIDialog
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
