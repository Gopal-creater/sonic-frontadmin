import React from 'react';
import { Pagination } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import theme from '../../theme';

const useStyles = makeStyles(() => ({
    root: {
        ".MuiPaginationItem-root": {
            backgroundColor: '#fff',
            color: theme.colors.primary.navy,
        },
        "&:hover .MuiPaginationItem-root": {
            backgroundColor: '#fff',
        },
        "& .Mui-selected": {
            border: `1px solid ${theme.colors.primary.teal}`,
            backgroundColor: '#fff',
            borderRadius: 0
        },
        "& .MuiPaginationItem-icon": {
            fontSize: 28,
            color: theme.colors.primary.navy,
            border: `1px solid ${theme.colors.primary.navy}`,
            borderRadius: 8,
            "& .Mui-disabled": {
                border: `1px solid ${theme.colors.secondary.grey}`,
            }
        },
        "&:hover .MuiPaginationItem-icon": {
            border: `1px solid ${theme.colors.primary.navy}`,
        }
    }
}));

export default function CustomPagination(props) {
    const classes = useStyles();

    return <div>
        <Pagination
            classes={{ root: classes.root }}
            count={props?.count}
            page={props?.page}
            shape="rounded"
            onChange={props?.onChange}
        />
    </div>;
}
