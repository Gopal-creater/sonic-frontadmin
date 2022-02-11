import React from 'react';
import { Pagination } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import { useTheme } from 'styled-components';

const useStyles = makeStyles(() => {
    const theme = useTheme()

    return ({
        root: {
            ".MuiPaginationItem-root": {
                backgroundColor: '#fff',
            },
            "&:hover .MuiPaginationItem-root": {
                backgroundColor: '#fff',
            },
            "& .Mui-selected": {
                fontSize: "16px",
                padding: "1px",
                margin: "1px",
                fontFamily: theme.fontFamily.nunitoSansBold,
                color: theme.colors.primary.navy,
                border: `1px solid ${theme.colors.primary.teal}`,
                backgroundColor: '#fff',
                borderRadius: 0,
            },
            "& .MuiPaginationItem-textPrimary": {
                fontSize: "18px",
                padding: "1px",
                margin: "1px",
                color: theme.colors.primary.navy,
            },
            "& .MuiPaginationItem-icon": {
                fontSize: "32px",
                color: theme.colors.primary.navy,
                border: `1px solid ${theme.colors.primary.navy}`,
                borderRadius: 8,
                "& .Mui-disabled": {
                    border: `1px solid ${theme.colors.secondary.grey}`,
                }
            },
            "&:hover .MuiPaginationItem-icon": {
                border: `1px solid ${theme.colors.primary.navy}`,
                // backgroundColor: "green"
            }
        },
    })
});

export default function CustomPagination({ count, page, ...props }) {
    const classes = useStyles();

    return (
        <div>
            <Pagination
                classes={{
                    root: classes.root,
                }}
                count={count}
                page={page}
                shape="rounded"
                disableFocusRipple
                disableRipple
                {...props}
            />
        </div>
    )
}
