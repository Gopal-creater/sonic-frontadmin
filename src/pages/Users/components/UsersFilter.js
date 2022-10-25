import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CloseOutlined } from "@material-ui/icons";
import {
  FilterButton,
  FilterContainer,
  FilterForm,
  FilterHeader,
  FilterItems,
} from "../../Monitor/Components/MonitorFilter/MonitorFilterStyles";
import CustomDropDown from "../../../components/common/AppTextInput/CustomDropDown";
import AppButton from "../../../components/common/AppButton/AppButton";
import { StyledTextField } from "../../../StyledComponents/StyledAppTextInput/StyledAppTextInput";
import {
  accountType,
  status,
  userRoles,
  userType,
} from "../../../constants/constants";
import * as actionTypes from "../../../stores/actions/actionTypes";
import { getUsersAction } from "../../../stores/actions/UserActions";
import { useTheme } from "styled-components";
import { SubHeading } from "../../../StyledComponents/StyledHeadings";

export default function UsersFilter({ closeDialog }) {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
  const theme = useTheme();

  const handleFilter = (e) => {
    e.preventDefault();
    dispatch(getUsersAction(5, 1));
    closeDialog?.();
  };

  return (
    <FilterContainer>
      <FilterHeader>
        <SubHeading>Filter</SubHeading>
        <div style={{ cursor: "pointer" }}>
          <CloseOutlined onClick={() => closeDialog?.()} />
        </div>
      </FilterHeader>
      <form onSubmit={handleFilter}>
        <FilterItems container>
          <FilterForm>
            <StyledTextField
              fullWidth
              label="User Name"
              value={users?.filters?.username}
              onChange={(e) =>
                dispatch({
                  type: actionTypes.SET_USERS_FILTERS,
                  data: { ...users?.filters, username: e.target.value },
                })
              }
              InputLabelProps={{
                style: {
                  fontFamily: theme.fontFamily.robotosBold,
                },
              }}
            />
          </FilterForm>

          <FilterForm>
            <StyledTextField
              fullWidth
              label="User ID"
              value={users?.filters?.userId}
              onChange={(e) =>
                dispatch({
                  type: actionTypes.SET_USERS_FILTERS,
                  data: { ...users?.filters, userId: e.target.value },
                })
              }
              InputLabelProps={{
                style: {
                  fontFamily: theme.fontFamily.robotosBold,
                },
              }}
            />
          </FilterForm>

          {users?.userProfile?.data?.userRole === userRoles.PARTNER_ADMIN && (
            <FilterForm>
              <CustomDropDown
                id="account-type"
                labelText="Account Type"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value: users?.filters?.accountType,
                  onChange: (e) =>
                    dispatch({
                      type: actionTypes.SET_USERS_FILTERS,
                      data: { ...users?.filters, accountType: e.target.value },
                    }),
                }}
                data={accountType || []}
              />
            </FilterForm>
          )}

          {users?.userProfile?.data?.userRole === userRoles.PARTNER_ADMIN && (
            <FilterForm>
              <StyledTextField
                fullWidth
                label="Account Name"
                value={users?.filters?.accountName}
                onChange={(e) =>
                  dispatch({
                    type: actionTypes.SET_USERS_FILTERS,
                    data: { ...users?.filters, accountName: e.target.value },
                  })
                }
                InputLabelProps={{
                  style: {
                    fontFamily: theme.fontFamily.robotosBold,
                  },
                }}
                disabled={users?.filters?.accountType === ""}
              />
            </FilterForm>
          )}

          <FilterForm>
            <CustomDropDown
              id="user-type"
              labelText="User Type"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                value: users?.filters?.userType,
                onChange: (e) =>
                  dispatch({
                    type: actionTypes.SET_USERS_FILTERS,
                    data: { ...users?.filters, userType: e.target.value },
                  }),
              }}
              data={userType || []}
            />
          </FilterForm>

          <FilterForm>
            <StyledTextField
              fullWidth
              label="Email Address"
              value={users?.filters?.email}
              onChange={(e) =>
                dispatch({
                  type: actionTypes.SET_USERS_FILTERS,
                  data: { ...users?.filters, email: e.target.value },
                })
              }
              InputLabelProps={{
                style: {
                  fontFamily: theme.fontFamily.robotosBold,
                },
              }}
            />
          </FilterForm>

          <FilterForm>
            <CustomDropDown
              id="status"
              labelText="Status"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                value: users?.filters?.status,
                onChange: (e) =>
                  dispatch({
                    type: actionTypes.SET_USERS_FILTERS,
                    data: { ...users?.filters, status: e.target.value },
                  }),
              }}
              data={status || []}
            />
          </FilterForm>
        </FilterItems>

        <FilterButton>
          <AppButton
            variant="outline"
            className="mx-3"
            onClick={() =>
              dispatch({
                type: actionTypes.SET_USERS_FILTERS,
                data: {
                  username: "",
                  userId: "",
                  accountType: "",
                  accountName: "",
                  userType: "",
                  email: "",
                  status: "",
                },
              })
            }
          >
            Reset
          </AppButton>
          <AppButton variant="fill" type="submit">
            Apply
          </AppButton>
        </FilterButton>
      </form>
    </FilterContainer>
  );
}
