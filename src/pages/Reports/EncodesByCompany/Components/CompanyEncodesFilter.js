import { CloseOutlined } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AppButton from "../../../../components/common/AppButton/AppButton";
import {
  FilterButton,
  FilterContainer,
  FilterHeader,
} from "../../../Monitor/Components/MonitorFilter/MonitorFilterStyles";
import * as actionTypes from "../../../../stores/actions/actionTypes";
import AppAutoComplete from "../../../../components/common/AutoComplete/AppAutoComplete";
import {
  getCompanyEncodesAction,
  getCompanySearchAction,
} from "../../../../stores/actions/CompanyActions";
import { Grid } from "@material-ui/core";
import { SubHeading } from "../../../../StyledComponents/StyledHeadings";
import { useTheme } from "styled-components";

export default function CompanyEncodesFilter({ closeDialog }) {
  const dispatch = useDispatch();
  const companyEncodes = useSelector((state) => state.company.companyEncodes);
  const companySearch = useSelector((state) => state.company.companySearch);
  const theme = useTheme();

  const [state, setState] = React.useState({
    autoCompleteValue: "",
  });

  const handleFilter = (e) => {
    e.preventDefault();
    dispatch(getCompanyEncodesAction());
    closeDialog?.();
  };

  const handleAutoCompleteSelectedValue = (v) => {
    dispatch({
      type: actionTypes.SET_COMPANYENCODES_FILTERS,
      data: { ...companyEncodes?.filters, company: v },
    });
  };

  const resetFilters = () => {
    dispatch({
      type: actionTypes.SET_COMPANYENCODES_FILTERS,
      data: { ...companyEncodes?.filters, company: {} },
    });
    setState({ ...state, autoCompleteValue: "" });
  };

  return (
    <FilterContainer>
      <FilterHeader>
        <div>
          <SubHeading>Filter</SubHeading>
        </div>
        <div style={{ cursor: "pointer" }}>
          <CloseOutlined
            style={{ color: theme.background.contrastText }}
            onClick={() => closeDialog?.()}
          />
        </div>
      </FilterHeader>

      <form onSubmit={handleFilter}>
        <Grid style={{ marginTop: "10px" }}>
          <AppAutoComplete
            value={companyEncodes?.filters?.company}
            setAutoComPleteAction={(value) => {
              dispatch(getCompanySearchAction(value, 50));
            }}
            setAutoCompleteOptions={(option) => option?.name || ""}
            setAutoCompleteOptionsLabel={(option) => option?._id || ""}
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
          <AppButton variant="fill" type="submit">
            Apply
          </AppButton>
        </FilterButton>
      </form>
    </FilterContainer>
  );
}
