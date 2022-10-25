import React from "react";
import { FormControl, Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../../stores/actions/actionTypes";
import { CloseOutlined } from "@material-ui/icons";
import {
  FilterButton,
  FilterContainer,
  FilterForm,
  FilterHeader,
  FilterItems,
} from "../../Monitor/Components/MonitorFilter/MonitorFilterStyles";
import CustomDropDown from "../../../components/common/AppTextInput/CustomDropDown";
import CustomDatePicker from "../../../components/common/FilterComponent/components/CustomDatePicker";
import AppButton from "../../../components/common/AppButton/AppButton";
import { StyledTextField } from "../../../StyledComponents/StyledAppTextInput/StyledAppTextInput";
import { fetchLicenceKeys } from "../../../stores/actions/licenceKey";
import { licenseType, status } from "../../../constants/constants";
import AppAutoComplete from "../../../components/common/AutoComplete/AppAutoComplete";
import { getCompanyNameAction } from "../../../stores/actions/picker/titlePicker.action";
import { useTheme } from "styled-components";
import { Content, SubHeading } from "../../../StyledComponents/StyledHeadings";

export default function LicenseFilter({ closeDialog }) {
  const dispatch = useDispatch();
  const license = useSelector((state) => state.licenceKey);
  const company = useSelector((state) => state.company);
  const theme = useTheme();

  const handleFilter = (e) => {
    e.preventDefault();
    dispatch(fetchLicenceKeys(5, 1));
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
              label="License Name"
              value={license?.filters?.name}
              onChange={(e) =>
                dispatch({
                  type: actionTypes.LIC_KEY_FILTER,
                  data: { ...license?.filters, name: e.target.value },
                })
              }
              InputLabelProps={{
                style: {
                  fontFamily: theme.fontFamily.robotoBold,
                },
              }}
            />
          </FilterForm>

          <FilterForm>
            <StyledTextField
              fullWidth
              label="Key"
              value={license?.filters?.key}
              onChange={(e) =>
                dispatch({
                  type: actionTypes.LIC_KEY_FILTER,
                  data: { ...license?.filters, key: e.target.value },
                })
              }
              InputLabelProps={{
                style: {
                  fontFamily: theme.fontFamily.robotoBold,
                },
              }}
            />
          </FilterForm>

          <FilterForm>
            <CustomDropDown
              id="account-type"
              labelText="Account Type"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                value: license?.filters?.type,
                onChange: (e) =>
                  dispatch({
                    type: actionTypes.LIC_KEY_FILTER,
                    data: { ...license?.filters, type: e.target.value },
                  }),
                displayEmpty: true,
              }}
              data={licenseType || []}
            />
          </FilterForm>

          <FilterForm>
            <CustomDropDown
              id="license-status"
              labelText="Status"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                value: license?.filters?.status,
                onChange: (e) =>
                  dispatch({
                    type: actionTypes.LIC_KEY_FILTER,
                    data: { ...license?.status, status: e.target.value },
                  }),
                displayEmpty: true,
              }}
              data={status || []}
            />
          </FilterForm>

          <FilterForm style={{ marginTop: "20px" }}>
            <AppAutoComplete
              setAutoComPleteAction={(value) =>
                dispatch(getCompanyNameAction(value))
              }
              setAutoCompleteOptions={(option) => option?.name || ""}
              setAutoCompleteOptionsLabel={(option) => option?._id || ""}
              loading={company?.companySearch?.loading}
              data={company?.companySearch?.data?.docs}
              error={company?.companySearch?.error}
              getSelectedValue={(e, v) =>
                dispatch({
                  type: actionTypes.LIC_KEY_FILTER,
                  data: { ...license?.filters, company: v },
                })
              }
              placeholder={"Company Name"}
              value={license?.filters?.company}
              color={theme.colors.grey.main}
              fontFamily={theme.fontFamily.robotoBold}
            />
          </FilterForm>

          <FilterForm>
            <StyledTextField
              fullWidth
              label="User"
              value={license?.filters?.user}
              onChange={(e) =>
                dispatch({
                  type: actionTypes.LIC_KEY_FILTER,
                  data: { ...license?.filters, user: e.target.value },
                })
              }
              InputLabelProps={{
                style: {
                  fontFamily: theme.fontFamily.robotoBold,
                },
              }}
            />
          </FilterForm>
        </FilterItems>

        <FormControl>
          <Content
            style={{ margin: "30px 0px 10px 20px" }}
            color={theme.colors.secondary.mediumGrey}
          >
            Renewal Date
          </Content>
          <Grid style={{ display: "flex", margin: "0px 30px 0px 20px" }}>
            <CustomDatePicker
              selected={license?.filters?.renewalStartDate}
              onChange={(date) =>
                dispatch({
                  type: actionTypes.LIC_KEY_FILTER,
                  data: { ...license?.filters, renewalStartDate: date },
                })
              }
              calender={true}
              dateFormat="MMM d,yyyy"
              title="Start Date"
              startDate={license?.filters?.renewalStartDate}
              endDate={license?.filters?.renewalEndDate}
              filter={true}
            />

            <div className="mt-4 mx-3">
              <Content color={theme.colors.grey.main}>to</Content>
            </div>

            <CustomDatePicker
              selected={license?.filters?.renewalEndDate}
              onChange={(date) =>
                dispatch({
                  type: actionTypes.LIC_KEY_FILTER,
                  data: { ...license?.filters, renewalEndDate: date },
                })
              }
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
            onClick={() =>
              dispatch({
                type: actionTypes.LIC_KEY_FILTER,
                data: {
                  name: "",
                  key: "",
                  type: "",
                  status: "",
                  company: "",
                  user: "",
                  renewalStartDate: "",
                  renewalEndDate: "",
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
