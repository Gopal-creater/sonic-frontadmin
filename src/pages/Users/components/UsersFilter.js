import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CloseOutlined } from '@material-ui/icons';
import { FilterButton, FilterContainer, FilterForm, FilterHeader, FilterItems } from '../../Monitor/Components/MonitorFilter/MonitorFilterStyles';
import { H3 } from '../../../StyledComponents/StyledHeadings';
import CustomDropDown from '../../../components/common/AppTextInput/CustomDropDown';
import theme from '../../../theme';
import AppButton from '../../../components/common/AppButton/AppButton';
import { StyledTextField } from '../../../StyledComponents/StyledAppTextInput/StyledAppTextInput';
import { accountType, status, userRoles, userType } from '../../../constants/constants';
import * as actionTypes from '../../../stores/actions/actionTypes';
import { getUsersAction } from '../../../stores/actions/UserActions';

export default function UsersFilter({ closeDialog }) {
    const dispatch = useDispatch();
    const users = useSelector(state => state.user);

    const handleFilter = (e) => {
        e.preventDefault();
        dispatch(getUsersAction(5, 1));
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
                            value={users?.filters?.username}
                            onChange={(e) => dispatch({ type: actionTypes.SET_USERS_FILTERS, data: { ...users?.filters, username: e.target.value } })}
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
                            value={users?.filters?.userId}
                            onChange={(e) => dispatch({ type: actionTypes.SET_USERS_FILTERS, data: { ...users?.filters, userId: e.target.value } })}
                            InputLabelProps={{
                                style: {
                                    fontFamily: theme.fontFamily.nunitoSansBold
                                }
                            }}
                        />
                    </FilterForm>

                    {users?.userProfile?.data?.userRole === userRoles.PARTNER_ADMIN &&
                        <FilterForm>
                            <CustomDropDown
                                id="account-type"
                                labelText="Account type"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    value: users?.filters?.accountType,
                                    onChange: (e) => dispatch({ type: actionTypes.SET_USERS_FILTERS, data: { ...users?.filters, accountType: e.target.value } }),
                                }}
                                data={accountType || []}
                            />
                        </FilterForm>}

                    {users?.userProfile?.data?.userRole === userRoles.PARTNER_ADMIN &&
                        <FilterForm>
                            <StyledTextField
                                fullWidth
                                label="Account name"
                                value={users?.filters?.accountName}
                                onChange={(e) => dispatch({ type: actionTypes.SET_USERS_FILTERS, data: { ...users?.filters, accountName: e.target.value } })}
                                InputLabelProps={{
                                    style: {
                                        fontFamily: theme.fontFamily.nunitoSansBold
                                    }
                                }}
                                disabled={users?.filters?.accountType === ""}
                            />
                        </FilterForm>}

                    <FilterForm>
                        <CustomDropDown
                            id="user-type"
                            labelText="User type"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                value: users?.filters?.userType,
                                onChange: (e) => dispatch({ type: actionTypes.SET_USERS_FILTERS, data: { ...users?.filters, userType: e.target.value } }),
                            }}
                            data={userType || []}
                        />
                    </FilterForm>

                    <FilterForm>
                        <StyledTextField
                            fullWidth
                            label="Email Address"
                            value={users?.filters?.email}
                            onChange={(e) => dispatch({ type: actionTypes.SET_USERS_FILTERS, data: { ...users?.filters, email: e.target.value } })}
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
                                value: users?.filters?.status,
                                onChange: (e) => dispatch({ type: actionTypes.SET_USERS_FILTERS, data: { ...users?.filters, status: e.target.value } }),
                            }}
                            data={status || []}
                        />
                    </FilterForm>
                </FilterItems>

                <FilterButton>
                    <AppButton
                        variant="outline"
                        className="mx-3"
                        onClick={() => dispatch({
                            type: actionTypes.SET_USERS_FILTERS,
                            data: {
                                username: "",
                                userId: "",
                                accountType: "",
                                accountName: "",
                                userType: "",
                                email: "",
                                status: "",
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
