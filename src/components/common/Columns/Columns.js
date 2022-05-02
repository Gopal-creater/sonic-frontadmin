import { FormControlLabel, Grid, InputAdornment } from '@material-ui/core'
import { ArrowDropDown, Search } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppButton from '../AppButton/AppButton'
import AppCheckBox from '../AppCheckBox'
import { ColumnMenuItem, ColumnPopup, RestoreItem, SearchColumn } from './StyledColumns'
import * as actionTypes from "../../../stores/actions/actionTypes"
import { SelectedColumn } from './component/SelectedColumn'
import { StyledTextField } from '../../../StyledComponents/StyledAppTextInput/StyledAppTextInput'
import theme from '../../../theme'

const useStyles = makeStyles(() => ({
    menu: {
        marginTop: '10px',
        "& .MuiPaper-root": {
            borderRadius: '0px',
            boxShadow: 'none',
            border: `2px solid #222222`
        }
    }
}));

export default function Columns({ columns }) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        showColumns: null,
        filterColumn: columns.map(col => col.title),
        input: "",
        searchedColumns: columns
    })
    const displayColumns = Boolean(state.showColumns);
    const checkedColumns = useSelector(state => state.monitor)
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch({ type: actionTypes.CHECKED_TABLE_COLUMN, data: [...state.filterColumn] })
    }, [])

    const handleColumns = (event, column) => {
        if (event.target.checked) {
            dispatch({ type: actionTypes.CHECKED_TABLE_COLUMN, data: [...checkedColumns.columns, column] })
        } else {
            dispatch({ type: actionTypes.UNCHECKED_TABLE_COLUMN, data: column })
        }
    }

    React.useEffect(() => {
        if (state.input.length > 0) {
            const searched = columns.filter((col) => {
                return col?.title?.match(state.input)
            })
            // console.log("SEARCHD INSIDE", searched);
            // setState({ ...state, searchedColumns: [...state.searchedColumns, searched] })
        }
    }, [state.input])

    return (
        <Grid>
            <AppButton
                variant={"outline"}
                endIcon={<ArrowDropDown />}
                onClick={(e) => setState({ ...state, showColumns: e.currentTarget })}
            >
                Columns
            </AppButton>
            <ColumnPopup
                anchorEl={state.showColumns}
                open={displayColumns}
                className={classes.menu}
                onClose={() => setState({ ...state, showColumns: null })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <>
                    <RestoreItem onClick={() => dispatch({ type: actionTypes.CHECKED_TABLE_COLUMN, data: [...state.filterColumn] })}>
                        Restore defaults
                    </RestoreItem>
                    <SearchColumn>
                        <StyledTextField
                            fullWidth
                            value={state.input}
                            onChange={(e) => setState({ ...state, input: e.target.value })}
                            InputLabelProps={{
                                style: {
                                    fontSize: theme.fontSize.h4,
                                    color: theme.colors.secondary.mediumGrey,
                                    fontFamily: theme.fontFamily.nunitoSansBold
                                }
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),
                            }}
                            inputProps={{ style: { fontSize: theme.fontSize.h4 } }}
                        />
                    </SearchColumn>

                    {state.searchedColumns?.map((col, index) => {
                        const isChecked = SelectedColumn(col?.title);
                        return (
                            <ColumnMenuItem key={index}>
                                <FormControlLabel
                                    control={
                                        <AppCheckBox
                                            value={isChecked}
                                            onChange={(e) => handleColumns(e, col?.title)}
                                        />
                                    }
                                    label={col?.title}
                                />
                            </ColumnMenuItem>
                        )
                    })}
                </>
            </ColumnPopup>
        </Grid>
    )
}
