import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CloseOutlined } from '@material-ui/icons';
import { FilterButton, FilterContainer, FilterForm, FilterHeader, FilterItems } from '../../Monitor/Components/MonitorFilter/MonitorFilterStyles';
import { H3 } from '../../../StyledComponents/StyledHeadings';
import CustomDropDown from '../../../components/common/AppTextInput/CustomDropDown';
import theme from '../../../theme';
import AppButton from '../../../components/common/AppButton/AppButton';
import { StyledTextField } from '../../../StyledComponents/StyledAppTextInput/StyledAppTextInput';
import { fetchLicenceKeys } from '../../../stores/actions/licenceKey';
import { accountType, licenseStatus } from '../../../constants/constants';

export default function UsersFilter({ closeDialog }) {
    const dispatch = useDispatch();
    // const license = useSelector(state => state.licenceKey);

    const handleFilter = (e) => {
        e.preventDefault();
        dispatch(fetchLicenceKeys());
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
                            label="User name"
                            // value={license?.filters?.name}
                            // onChange={(e) => dispatch({ type: actionTypes.LIC_KEY_FILTER, data: { ...license?.filters, name: e.target.value } })}
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
                            label="User ID"
                            // value={license?.filters?.key}
                            // onChange={(e) => dispatch({ type: actionTypes.LIC_KEY_FILTER, data: { ...license?.filters, key: e.target.value } })}
                            InputLabelProps={{
                                style: {
                                    fontFamily: theme.fontFamily.nunitoSansBold
                                }
                            }}
                        />
                    </FilterForm>

                    <FilterForm>
                        <CustomDropDown
                            id="account-type"
                            labelText="Account type"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                // value: license?.filters?.type,
                                // onChange: (e) => dispatch({ type: actionTypes.LIC_KEY_FILTER, data: { ...license?.filters, type: e.target.value } }),
                            }}
                            data={accountType || []}
                        />
                    </FilterForm>

                    <FilterForm>
                        <StyledTextField
                            fullWidth
                            label="Account name"
                            // value={license?.filters?.key}
                            // onChange={(e) => dispatch({ type: actionTypes.LIC_KEY_FILTER, data: { ...license?.filters, key: e.target.value } })}
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
                            label="User type"
                            // value={license?.filters?.key}
                            // onChange={(e) => dispatch({ type: actionTypes.LIC_KEY_FILTER, data: { ...license?.filters, key: e.target.value } })}
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
                            // value={license?.filters?.key}
                            // onChange={(e) => dispatch({ type: actionTypes.LIC_KEY_FILTER, data: { ...license?.filters, key: e.target.value } })}
                            InputLabelProps={{
                                style: {
                                    fontFamily: theme.fontFamily.nunitoSansBold
                                }
                            }}
                        />
                    </FilterForm>

                    <FilterForm>
                        <CustomDropDown
                            id="status"
                            labelText="Status"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                // value: license?.filters?.type,
                                // onChange: (e) => dispatch({ type: actionTypes.LIC_KEY_FILTER, data: { ...license?.filters, type: e.target.value } }),
                            }}
                            data={licenseStatus || []}
                        />
                    </FilterForm>
                </FilterItems>

                <FilterButton>
                    <AppButton
                        variant="outline"
                        className="mx-3"
                        onClick={() => { }}
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
