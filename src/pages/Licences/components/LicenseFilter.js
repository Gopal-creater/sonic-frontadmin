import React from 'react'
import { FormControl, Grid } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux';
import * as actionTypes from '../../../stores/actions/actionTypes';
import { CloseOutlined } from '@material-ui/icons';
import { FilterButton, FilterContainer, FilterForm, FilterHeader, FilterItems } from '../../Monitor/Components/MonitorFilter/MonitorFilterStyles';
import { H3, H4, H5 } from '../../../StyledComponents/StyledHeadings';
import CustomDropDown from '../../../components/common/AppTextInput/CustomDropDown';
import theme from '../../../theme';
import CustomDatePicker from '../../../components/common/FilterComponent/components/CustomDatePicker';
import AppButton from '../../../components/common/AppButton/AppButton';
import { StyledTextField } from '../../../StyledComponents/StyledAppTextInput/StyledAppTextInput';
import { fetchLicenceKeys } from '../../../stores/actions/licenceKey';
import { accountType, licenseStatus } from '../../../constants/constants';

export default function LicenseFilter({ closeDialog }) {
    const dispatch = useDispatch();
    const license = useSelector(state => state.licenceKey);

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
                            label="License name"
                            value={license?.filters?.name}
                            onChange={(e) => dispatch({ type: actionTypes.LIC_KEY_FILTER, data: { ...license?.filters, name: e.target.value } })}
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
                            label="Key"
                            value={license?.filters?.key}
                            onChange={(e) => dispatch({ type: actionTypes.LIC_KEY_FILTER, data: { ...license?.filters, key: e.target.value } })}
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
                                value: license?.filters?.type,
                                onChange: (e) => dispatch({ type: actionTypes.LIC_KEY_FILTER, data: { ...license?.filters, type: e.target.value } }),
                                displayEmpty: true
                            }}
                            data={accountType || []}
                        />
                    </FilterForm>

                    <FilterForm>
                        <CustomDropDown
                            id="license-status"
                            labelText="Status"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                value: license?.filters?.status,
                                onChange: (e) => dispatch({ type: actionTypes.LIC_KEY_FILTER, data: { ...license?.status, status: e.target.value } }),
                                displayEmpty: true
                            }}
                            data={licenseStatus || []}
                        />
                    </FilterForm>
                </FilterItems>

                <FormControl>
                    <H4 style={{ margin: "30px 0px 10px 20px" }} color={theme.colors.secondary.mediumGrey}>
                        Renewal Date
                    </H4>
                    <Grid style={{ display: 'flex', margin: "0px 30px 0px 20px" }}>
                        <CustomDatePicker
                            selected={license?.filters?.renewalStartDate}
                            onChange={(date) => dispatch({ type: actionTypes.LIC_KEY_FILTER, data: { ...license?.filters, renewalStartDate: date } })}
                            calender={true}
                            dateFormat="MMM d,yyyy"
                            title="Start Date"
                            startDate={license?.filters?.renewalStartDate}
                            endDate={license?.filters?.renewalEndDate}
                            filter={true}
                        />

                        <div className="mt-4 mx-3">
                            <H5 color={theme.colors.secondary.grey}>to</H5>
                        </div>

                        <CustomDatePicker
                            selected={license?.filters?.renewalEndDate}
                            onChange={(date) => dispatch({ type: actionTypes.LIC_KEY_FILTER, data: { ...license?.filters, renewalEndDate: date } })}
                            dateFormat="MMM d,yyyy"
                            title="End Date"
                            startDate={license?.filters?.renewalStartDate}
                            endDate={license?.filters?.renewalEndDate}
                            filter={true}
                        />
                    </Grid>
                </FormControl>

                <FilterButton>
                    <AppButton
                        variant="outline"
                        className="mx-3"
                        onClick={() => dispatch({
                            type: actionTypes.LIC_KEY_FILTER,
                            data: {
                                name: "",
                                key: "",
                                type: "",
                                status: "",
                                renewalStartDate: "",
                                renewalEndDate: "",
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
