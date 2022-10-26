import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../../stores/actions/actionTypes";
import { CloseOutlined } from "@material-ui/icons";
import { countries } from "../../../constants/constants";
import {
  FilterButton,
  FilterContainer,
  FilterForm,
  FilterHeader,
  FilterItems,
} from "../../Monitor/Components/MonitorFilter/MonitorFilterStyles";
import CustomDropDown from "../../../components/common/AppTextInput/CustomDropDown";
import AppButton from "../../../components/common/AppButton/AppButton";
import { fetchRadioMonitorsActions } from "../../../stores/actions/streamReader.action";
import { Content, SubHeading } from "../../../StyledComponents/StyledHeadings";

export default function StreamReaderFilter({ closeDialog }) {
  const dispatch = useDispatch();
  const radioStations = useSelector((state) => state.radioStations);
  const streamReader = useSelector((state) => state.streamReader);

  const filteredRadioStation = radioStations.data?.filter((data) => {
    if (streamReader.filters.country === "") {
      return data;
    }
    if (data.country === streamReader.filters.country) {
      return data;
    }
  });

  const handleFilter = (e) => {
    e.preventDefault();
    dispatch(fetchRadioMonitorsActions(10, 1));
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
            <CustomDropDown
              id="country"
              labelText="Country"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                value: streamReader?.filters?.country,
                onChange: (e) =>
                  dispatch({
                    type: actionTypes.FETCH_RADIOMONITORS_FILTERS,
                    data: { ...streamReader?.filters, country: e.target.value },
                  }),
              }}
              data={countries || []}
            />
          </FilterForm>

          <FilterForm>
            <CustomDropDown
              id="radioStation"
              labelText="Radio Station"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                value: streamReader?.filters?.radioStation,
                onChange: (e) =>
                  dispatch({
                    type: actionTypes.FETCH_RADIOMONITORS_FILTERS,
                    data: {
                      ...streamReader?.filters,
                      radioStation: e.target.value,
                    },
                  }),
                disabled: filteredRadioStation?.length === 0 ? true : false,
              }}
              data={filteredRadioStation || []}
              radio={true}
            />
          </FilterForm>
        </FilterItems>

        <FilterButton>
          <AppButton
            variant="outline"
            className="mx-3"
            onClick={() =>
              dispatch({
                type: actionTypes.FETCH_RADIOMONITORS_FILTERS,
                data: { country: "", radioStation: "" },
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
