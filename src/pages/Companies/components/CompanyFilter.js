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
import { companyType } from "../../../constants/constants";
import * as actionTypes from "../../../stores/actions/actionTypes";
import { getAllCompaniesAction } from "../../../stores/actions/CompanyActions";
import { useTheme } from "styled-components";
import { SubHeading } from "../../../StyledComponents/StyledHeadings";

export default function CompanyFilter({ closeDialog }) {
  const dispatch = useDispatch();
  const company = useSelector((state) => state.company);
  const theme = useTheme();

  const handleFilter = (e) => {
    e.preventDefault();
    dispatch(getAllCompaniesAction(5, 1));
    closeDialog?.();
  };

  return (
    <FilterContainer>
      <FilterHeader>
        <SubHeading>Filter</SubHeading>
        <div style={{ cursor: "pointer" }}>
          <CloseOutlined
            style={{ color: theme.background.contrastText }}
            onClick={() => closeDialog?.()}
          />
        </div>
      </FilterHeader>
      <form onSubmit={handleFilter}>
        <FilterItems container>
          <FilterForm>
            <StyledTextField
              fullWidth
              label="Company Name"
              value={company?.filters?.companyName}
              onChange={(e) =>
                dispatch({
                  type: actionTypes.SET_COMPANIES_FILTERS,
                  data: { ...company?.filters, companyName: e.target.value },
                })
              }
            />
          </FilterForm>

          <FilterForm>
            <CustomDropDown
              id="company-type"
              labelText="Company Type"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                value: company?.filters?.companyType,
                onChange: (e) =>
                  dispatch({
                    type: actionTypes.SET_COMPANIES_FILTERS,
                    data: { ...company?.filters, companyType: e.target.value },
                  }),
              }}
              data={companyType || []}
            />
          </FilterForm>

          <FilterForm>
            <StyledTextField
              fullWidth
              label="Company ID"
              value={company?.filters?.companyId}
              onChange={(e) =>
                dispatch({
                  type: actionTypes.SET_COMPANIES_FILTERS,
                  data: { ...company?.filters, companyId: e.target.value },
                })
              }
            />
          </FilterForm>

          <FilterForm>
            <StyledTextField
              fullWidth
              label="Email Address"
              value={company?.filters?.email}
              onChange={(e) =>
                dispatch({
                  type: actionTypes.SET_COMPANIES_FILTERS,
                  data: { ...company?.filters, email: e.target.value },
                })
              }
            />
          </FilterForm>

          <FilterForm>
            <StyledTextField
              fullWidth
              label="Admin"
              value={company?.filters?.admin}
              onChange={(e) =>
                dispatch({
                  type: actionTypes.SET_COMPANIES_FILTERS,
                  data: { ...company?.filters, admin: e.target.value },
                })
              }
            />
          </FilterForm>
        </FilterItems>

        <FilterButton>
          <AppButton
            variant="outline"
            className="mx-3"
            onClick={() =>
              dispatch({
                type: actionTypes.SET_COMPANIES_FILTERS,
                data: {
                  companyName: "",
                  companyType: "",
                  email: "",
                  companyId: "",
                  admin: "",
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
