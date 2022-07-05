import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CloseOutlined } from '@material-ui/icons';
import { FilterButton, FilterContainer, FilterForm, FilterHeader, FilterItems } from '../../Monitor/Components/MonitorFilter/MonitorFilterStyles';
import { H3 } from '../../../StyledComponents/StyledHeadings';
import CustomDropDown from '../../../components/common/AppTextInput/CustomDropDown';
import theme from '../../../theme';
import AppButton from '../../../components/common/AppButton/AppButton';
import { StyledTextField } from '../../../StyledComponents/StyledAppTextInput/StyledAppTextInput';
import { companyType } from '../../../constants/constants';
import * as actionTypes from '../../../stores/actions/actionTypes';
import { log } from '../../../utils/app.debug';
import { getAllCompaniesAction } from '../../../stores/actions/CompanyActions';

export default function CompanyFilter({ closeDialog }) {
    const dispatch = useDispatch();
    const company = useSelector(state => state.company)
    log("filter data", company)

    const handleFilter = (e) => {
        e.preventDefault();
        dispatch(getAllCompaniesAction(5, 1));
        closeDialog?.()
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
                <FilterItems container>
                    <FilterForm>
                        <StyledTextField
                            fullWidth
                            label="Company Name"
                            value={company?.filters?.companyName}
                            onChange={(e) => dispatch({ type: actionTypes.SET_COMPANIES_FILTERS, data: { ...company?.filters, companyName: e.target.value } })}
                            InputLabelProps={{
                                style: {
                                    fontFamily: theme.fontFamily.nunitoSansBold
                                }
                            }}
                        />
                    </FilterForm>

                    <FilterForm>
                        <CustomDropDown
                            id="company-type"
                            labelText="Company Type"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                value: company?.filters?.companyType,
                                onChange: (e) => dispatch({ type: actionTypes.SET_COMPANIES_FILTERS, data: { ...company?.filters, companyType: e.target.value } }),
                            }}
                            data={companyType || []}
                        />
                    </FilterForm>

                    <FilterForm>
                        <StyledTextField
                            fullWidth
                            label="Company ID"
                            value={company?.filters?.companyId}
                            onChange={(e) => dispatch({ type: actionTypes.SET_COMPANIES_FILTERS, data: { ...company?.filters, companyId: e.target.value } })}
                            InputLabelProps={{
                                style: {
                                    fontFamily: theme.fontFamily.nunitoSansBold
                                }
                            }}
                        />
                    </FilterForm>

                    <FilterForm>
                        <StyledTextField
                            fullWidth
                            label="Email Address"
                            value={company?.filters?.email}
                            onChange={(e) => dispatch({ type: actionTypes.SET_COMPANIES_FILTERS, data: { ...company?.filters, email: e.target.value } })}
                            InputLabelProps={{
                                style: {
                                    fontFamily: theme.fontFamily.nunitoSansBold
                                }
                            }}
                        />
                    </FilterForm>

                    <FilterForm>
                        <StyledTextField
                            fullWidth
                            label="Admin"
                            value={company?.filters?.admin}
                            onChange={(e) => dispatch({ type: actionTypes.SET_COMPANIES_FILTERS, data: { ...company?.filters, admin: e.target.value } })}
                            InputLabelProps={{
                                style: {
                                    fontFamily: theme.fontFamily.nunitoSansBold
                                }
                            }}
                        />
                    </FilterForm>
                </FilterItems>

                <FilterButton>
                    <AppButton
                        variant="outline"
                        className="mx-3"
                        onClick={() => dispatch({
                            type: actionTypes.SET_COMPANIES_FILTERS,
                            data: {
                                companyName: "",
                                companyType: "",
                                email: "",
                                companyId: "",
                                admin: "",
                            }
                        })}
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
