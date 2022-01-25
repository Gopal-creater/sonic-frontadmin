import React from 'react';
import { Pagination } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        "&:hover .MuiPaginationItem-root": {
            backgroundColor: '#fff',
        },
        "& .Mui-selected": {
            border: `1px solid teal`,
            backgroundColor: '#fff',
            borderRadius: 0
        },
        "& .MuiPaginationItem-icon": {
            fontSize: 28,
            color: 'blue',
            border: `1px solid blue`,
            borderRadius: 8,
            "& .Mui-disabled": {
                border: `1px solid grey`,
            }
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
