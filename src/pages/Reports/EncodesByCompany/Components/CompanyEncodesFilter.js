import { CloseOutlined } from '@material-ui/icons'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AppButton from '../../../../components/common/AppButton/AppButton';
import { H3 } from '../../../../StyledComponents/StyledHeadings'
import { FilterButton, FilterContainer, FilterForm, FilterHeader, FilterItems } from '../../../Monitor/Components/MonitorFilter/MonitorFilterStyles'
import * as actionTypes from "../../../../stores/actions/actionTypes"
import theme from '../../../../theme';
import AppAutoComplete from '../../../../components/common/AutoComplete/AppAutoComplete';
import { getCompanyEncodesAction, getCompanySearchAction } from '../../../../stores/actions/CompanyActions';
import { log } from '../../../../utils/app.debug';
import { Grid } from '@material-ui/core';

export default function CompanyEncodesFilter({ closeDialog }) {
    const dispatch = useDispatch();
    const companyEncodes = useSelector(state => state.company.companyEncodes)
    const companySearch = useSelector(state => state.company.companySearch)

    const [state, setState] = React.useState({
        autoCompleteValue: ""
    })

    const handleFilter = (e) => {
        e.preventDefault();
        dispatch(getCompanyEncodesAction())
        closeDialog?.()
    }

    const handleAutoCompleteSelectedValue = (v) => {
        dispatch({ type: actionTypes.SET_COMPANYENCODES_FILTERS, data: { ...companyEncodes?.filters, company: v } })
    }

    const resetFilters = () => {
        dispatch({ type: actionTypes.SET_COMPANYENCODES_FILTERS, data: { ...companyEncodes?.filters, company: {} } })
        setState({ ...state, autoCompleteValue: "" })
    }

    return (
        <FilterContainer>
            <FilterHeader>
                <div>
                    <H3>Filter</H3>
                </div>
                <div style={{ cursor: 'pointer' }}>
                    <CloseOutlined onClick={() => closeDialog?.()} />
                </div>
            </FilterHeader>

            <form onSubmit={handleFilter}>
                <Grid style={{ marginTop: "10px" }}>
                    <AppAutoComplete
                        value={companyEncodes?.filters?.company}
                        setAutoComPleteAction={(value) => {
                            dispatch(getCompanySearchAction(value, 50))
                        }}
                        setAutoCompleteOptions={(option => option?.name || "")}
                        setAutoCompleteOptionsLabel={(option => option?._id || "")}
                        loading={companySearch?.loading}
                        data={companySearch?.data?.docs}
                        error={companySearch?.error}
                        getSelectedValue={(e, v) => handleAutoCompleteSelectedValue(v)}
                        placeholder={"Search for a company by name"}
                    />
                </Grid>

                <FilterButton>
                    <AppButton
                        variant="outline"
                        className="mx-3"
                        onClick={() => resetFilters()}
                    >
                        Reset
                    </AppButton>
                    <AppButton
                        variant="fill"
                        type="submit"
                    >
                        Apply
                    </AppButton>
                </FilterButton>
            </form>
        </FilterContainer>
    )
}
