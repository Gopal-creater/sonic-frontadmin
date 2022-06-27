import { CircularProgress, FormControlLabel, Grid, InputAdornment } from '@material-ui/core'
import { ArrowDropDown, Search } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppButton from '../AppButton/AppButton'
import AppCheckBox from '../AppCheckBox'
import { ColumnMenuItem, ColumnPopup, FixedItem, RestoreItem, SearchColumn } from './StyledColumns'
import * as actionTypes from "../../../stores/actions/actionTypes"
import { StyledTextField } from '../../../StyledComponents/StyledAppTextInput/StyledAppTextInput'
import theme from '../../../theme'
import { H4 } from "../../../StyledComponents/StyledHeadings"

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
        loading: false,
    })
    const displayColumns = Boolean(state.showColumns);
    const filterColumns = useSelector(state => state.monitor)
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch({ type: actionTypes.CHECKED_TABLE_COLUMN, data: [...state.filterColumn] })
        dispatch({ type: actionTypes.STORE_TABLE_COLUMN, data: [...columns] })
    }, [])

    const handleColumns = (event, column) => {
        if (event.target.checked) {
            dispatch({ type: actionTypes.CHECKED_TABLE_COLUMN, data: [...filterColumns.columns, column] })
        } else {
            dispatch({ type: actionTypes.UNCHECKED_TABLE_COLUMN, data: column })
        }
    }

    React.useEffect(() => {
        if (state.input.length > 0) {
            dispatch({ type: actionTypes.SEARCHED_TABLE_COLUMN, data: state.input })
        } else {
            dispatch({ type: actionTypes.STORE_TABLE_COLUMN, data: [...columns] })
        }
    }, [state.input])

    const selectedColumn = (title) => {
        return filterColumns.columns.includes(title)
    }

    function formatString(str) {
        return str
            .replace(/(\B)[^ ]*/g, match => (match.toLowerCase()))
            .replace(/^[^ ]/g, match => (match.toUpperCase()));
    }

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
                    <FixedItem>
                        <RestoreItem onClick={() => dispatch({ type: actionTypes.CHECKED_TABLE_COLUMN, data: [...state.filterColumn] })}>
                            Restore defaults
                        </RestoreItem>
                        <SearchColumn>
                            <StyledTextField
                                value={state.input}
                                onChange={(e) => setState({ ...state, input: e.target.value })}
                                InputLabelProps={{
                                    style: {
                                        fontSize: theme.fontSize.h4,
                                        color: theme.colors.secondary.mediumGrey,
                                        fontFamily: theme.fontFamily.nunitoSansBold,
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
                    </FixedItem>

                    {state?.loading ?
                        <div style={{ textAlign: 'center', padding: 20 }}>
                            <CircularProgress size={22} />
                        </div>
                        :
                        filterColumns?.searchedColumn?.length > 0 ?
                            filterColumns?.searchedColumn?.map((col, index) => {
                                const isChecked = selectedColumn(col?.title);
                                return (
                                    <ColumnMenuItem key={index}>
                                        <FormControlLabel
                                            style={{ zIndex: 1 }}
                                            control={
                                                <AppCheckBox
                                                    value={isChecked}
                                                    onChange={(e) => handleColumns(e, col?.title)}
                                                />
                                            }
                                            label={formatString(col?.title)}
                                        />
                                    </ColumnMenuItem>
                                )
                            }) :
                            <div style={{ textAlign: 'center', padding: 20 }}>
                                <H4>Not Found</H4>
                            </div>
                    }
                </>
            </ColumnPopup>
        </Grid>
    )
}
