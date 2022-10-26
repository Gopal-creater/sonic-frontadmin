import React from "react";
import { FormControl, Grid } from "@material-ui/core";
import { channel, countries, userRoles } from "../../../../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../../../stores/actions/actionTypes";
import { CloseOutlined } from "@material-ui/icons";
import {
  FilterButton,
  FilterContainer,
  FilterForm,
  FilterHeader,
  FilterItems,
} from "./MonitorFilterStyles";
import AppButton from "../../../../components/common/AppButton/AppButton";
import CustomDatePicker from "../../../../components/common/FilterComponent/components/CustomDatePicker";
import { StyledTextField } from "../../../../StyledComponents/StyledAppTextInput/StyledAppTextInput";
import CustomDropDown from "../../../../components/common/AppTextInput/CustomDropDown";
import { getMonitorListAction } from "../../../../stores/actions/monitorActions/monitorActions";
import { getMonitorDashboardDataAction } from "../../../../stores/actions/dashboardActions.js/dashboardActions";
import { Distributor, Labels } from "../../../../constants/constants";
import AppAutoComplete from "../../../../components/common/AutoComplete/AppAutoComplete";
import { getCompanyNameAction } from "../../../../stores/actions/picker/titlePicker.action";
import {
  Content,
  SubHeading,
} from "../../../../StyledComponents/StyledHeadings";
import { useTheme } from "styled-components";

export default function MonitorFilter({
  closeDialog,
  playsBy,
  actions,
  dashboard = false,
}) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const monitor = useSelector((state) => state.monitor);
  const company = useSelector((state) => state.company);
  const radioStations = useSelector((state) => state.radioStations);
  const users = useSelector((state) => state.user);

  let distributorArray = Distributor.map((data) => {
    return { name: data };
  });
  let labelArray = Labels.map((data) => {
    return { name: data };
  });

  const filteredRadioStation = radioStations.data?.filter((data) => {
    if (monitor.filters.country === "") {
      return data;
    }
    if (data.country === monitor.filters.country) {
      return data;
    }
  });
  const handleFilter = (e) => {
    e.preventDefault();
    if (dashboard) {
      dispatch(
        getMonitorDashboardDataAction(
          monitor?.dates?.startDate,
          monitor?.dates?.endDate
        )
      );
    } else {
      dispatch(
        getMonitorListAction(
          actions,
          monitor?.dates?.startDate,
          monitor?.dates?.endDate,
          1,
          10,
          playsBy
        )
      );
    }
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
              id="channel-dropdown"
              labelText="Channel"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                value: monitor?.filters?.channel,
                onChange: (e) =>
                  dispatch({
                    type: actionTypes.SET_MONITOR_FILTERS,
                    data: { ...monitor?.filters, channel: e.target.value },
                  }),
              }}
              data={channel || []}
            />
          </FilterForm>

          <FilterForm>
            <StyledTextField
              fullWidth
              label="SonicKey"
              value={monitor?.filters?.sonicKey}
              onChange={(e) =>
                dispatch({
                  type: actionTypes.SET_MONITOR_FILTERS,
                  data: { ...monitor?.filters, sonicKey: e.target.value },
                })
              }
            />
          </FilterForm>

          <FilterForm>
            <CustomDropDown
              id="country-dropdown"
              labelText="Country"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                value: monitor?.filters?.country,
                onChange: (e) =>
                  dispatch({
                    type: actionTypes.SET_MONITOR_FILTERS,
                    data: {
                      ...monitor?.filters,
                      country: e.target.value,
                      radioStation: "",
                    },
                  }),
                displayEmpty: true,
              }}
              data={countries || []}
            />
          </FilterForm>

          <FilterForm>
            <CustomDropDown
              id="radioStation-dropdown"
              labelText="Radio Station"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                value: monitor?.filters?.radioStation,
                onChange: (e) =>
                  dispatch({
                    type: actionTypes.SET_MONITOR_FILTERS,
                    data: { ...monitor?.filters, radioStation: e.target.value },
                  }),
                disabled: filteredRadioStation?.length === 0 ? true : false,
              }}
              data={filteredRadioStation || []}
              radio={true}
            />
          </FilterForm>

          <FilterForm>
            <StyledTextField
              fullWidth
              label="Artist name"
              value={monitor?.filters?.artist}
              onChange={(e) =>
                dispatch({
                  type: actionTypes.SET_MONITOR_FILTERS,
                  data: { ...monitor?.filters, artist: e.target.value },
                })
              }
            />
          </FilterForm>

          <FilterForm>
            <StyledTextField
              fullWidth
              label="Track"
              value={monitor?.filters?.song}
              onChange={(e) =>
                dispatch({
                  type: actionTypes.SET_MONITOR_FILTERS,
                  data: { ...monitor?.filters, song: e.target.value },
                })
              }
            />
          </FilterForm>

          <FilterForm style={{ marginTop: "20px" }}>
            <AppAutoComplete
              setAutoComPleteAction={() => {}}
              setAutoCompleteOptions={(option) => option?.name || ""}
              data={labelArray}
              setAutoCompleteOptionsLabel={() => {}}
              getSelectedValue={(e, v) =>
                dispatch({
                  type: actionTypes.SET_MONITOR_FILTERS,
                  data: { ...monitor?.filters, label: v },
                })
              }
              placeholder={"Label"}
              value={monitor?.filters?.label}
              color={theme.colors.grey.main}
              fontFamily={theme.fontFamily.robotosBold}
            />
          </FilterForm>

          <FilterForm style={{ marginTop: "20px" }}>
            <AppAutoComplete
              setAutoComPleteAction={() => {}}
              setAutoCompleteOptions={(option) => option?.name || ""}
              data={distributorArray}
              setAutoCompleteOptionsLabel={() => {}}
              getSelectedValue={(e, v) =>
                dispatch({
                  type: actionTypes.SET_MONITOR_FILTERS,
                  data: { ...monitor?.filters, distributor: v },
                })
              }
              placeholder={"Distributor"}
              value={monitor?.filters?.distributor}
              color={theme.colors.grey.main}
              fontFamily={theme.fontFamily.robotosBold}
            />
          </FilterForm>

          {users?.userProfile?.data?.userRole === userRoles.PARTNER_ADMIN && (
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
                    type: actionTypes.SET_MONITOR_FILTERS,
                    data: { ...monitor?.filters, company: v },
                  })
                }
                placeholder={"Company Name"}
                value={monitor?.filters?.company}
                color={theme.colors.grey.main}
                fontFamily={theme.fontFamily.robotosBold}
              />
            </FilterForm>
          )}

          {(users?.userProfile?.data?.userRole === userRoles.PARTNER_ADMIN ||
            users?.userProfile?.data?.userRole === userRoles.COMPANY_ADMIN) && (
            <FilterForm>
              <StyledTextField
                fullWidth
                label="User ID"
                value={monitor?.filters?.user}
                onChange={(e) =>
                  dispatch({
                    type: actionTypes.SET_MONITOR_FILTERS,
                    data: { ...monitor?.filters, user: e.target.value },
                  })
                }
                InputLabelProps={{
                  style: {
                    fontFamily: theme.fontFamily.robotosBold,
                  },
                }}
              />
            </FilterForm>
          )}
        </FilterItems>

        <FormControl>
          <Grid style={{ display: "flex", margin: "30px 30px 0px 0px" }}>
            <CustomDatePicker
              selected={monitor?.filters?.encodedStartDate}
              onChange={(date) =>
                dispatch({
                  type: actionTypes.SET_MONITOR_FILTERS,
                  data: { ...monitor?.filters, encodedStartDate: date },
                })
              }
              calender={true}
              dateFormat="MMM d,yyyy"
              title="Encoded Start Date"
              startDate={monitor?.filters?.encodedStartDate}
              endDate={monitor?.filters?.encodedEndDate}
              filter={true}
            />

            <div className="mt-4 mx-3">
              <Content>to</Content>
            </div>

            <CustomDatePicker
              selected={monitor?.filters?.encodedEndDate}
              onChange={(date) =>
                dispatch({
                  type: actionTypes.SET_MONITOR_FILTERS,
                  data: { ...monitor?.filters, encodedEndDate: date },
                })
              }
              dateFormat="MMM d,yyyy"
              title="End Date"
              startDate={monitor?.filters?.encodedStartDate}
              endDate={monitor?.filters?.encodedEndDate}
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
                type: actionTypes.SET_MONITOR_FILTERS,
                data: {
                  channel: "ALL",
                  sonicKey: "",
                  country: "",
                  artist: "",
                  radioStation: "",
                  song: "",
                  label: "",
                  distributor: "",
                  encodedStartDate: "",
                  encodedEndDate: "",
                  timezone: "GMT",
                  company: "",
                  user: "",
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
