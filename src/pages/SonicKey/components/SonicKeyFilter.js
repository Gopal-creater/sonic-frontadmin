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
  channel,
  Distributor,
  Labels,
  tags,
  userRoles,
} from "../../../constants/constants";
import * as actionTypes from "../../../stores/actions/actionTypes";
import { getAllSonickeysActions } from "../../../stores/actions/SonicKeyAcrtions";
import AppAutoComplete from "../../../components/common/AutoComplete/AppAutoComplete";
import { getCompanyNameAction } from "../../../stores/actions/picker/titlePicker.action";
import { useTheme } from "styled-components";
import { SubHeading } from "../../../StyledComponents/StyledHeadings";

export default function SonicKeyFilter({ closeDialog }) {
  const dispatch = useDispatch();
  const sonickey = useSelector((state) => state.sonickey);
  const users = useSelector((state) => state.user);
  const company = useSelector((state) => state.company);
  const theme = useTheme();

  const handleFilter = (e) => {
    e.preventDefault();
    dispatch(getAllSonickeysActions(10, 1));
    closeDialog?.();
  };

  let distributorArray = Distributor.map((data) => {
    return { name: data };
  });
  let labelArray = Labels.map((data) => {
    return { name: data };
  });

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
            <CustomDropDown
              id="channel-dropdown"
              labelText="Channel"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                value: sonickey?.filters?.channel,
                onChange: (e) =>
                  dispatch({
                    type: actionTypes.SONIC_KEY_FILTERS,
                    data: { ...sonickey?.filters, channel: e.target.value },
                  }),
              }}
              data={channel || []}
            />
          </FilterForm>

          <FilterForm>
            <StyledTextField
              fullWidth
              label={tags.companyTag}
              value={sonickey?.filters?.sonicKey}
              onChange={(e) =>
                dispatch({
                  type: actionTypes.SONIC_KEY_FILTERS,
                  data: { ...sonickey?.filters, sonicKey: e.target.value },
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
              label="Artist name"
              value={sonickey?.filters?.artist}
              onChange={(e) =>
                dispatch({
                  type: actionTypes.SONIC_KEY_FILTERS,
                  data: { ...sonickey?.filters, artist: e.target.value },
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
              label="Track Id"
              value={sonickey?.filters?.trackId}
              onChange={(e) =>
                dispatch({
                  type: actionTypes.SONIC_KEY_FILTERS,
                  data: { ...sonickey?.filters, trackId: e.target.value },
                })
              }
              InputLabelProps={{
                style: {
                  fontFamily: theme.fontFamily.robotosBold,
                },
              }}
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
                  type: actionTypes.SONIC_KEY_FILTERS,
                  data: { ...sonickey?.filters, label: v },
                })
              }
              placeholder={"Label"}
              value={sonickey?.filters?.label}
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
                  type: actionTypes.SONIC_KEY_FILTERS,
                  data: { ...sonickey?.filters, distributor: v },
                })
              }
              placeholder={"Distributor"}
              value={sonickey?.filters?.distributor}
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
                    type: actionTypes.SONIC_KEY_FILTERS,
                    data: { ...sonickey?.filters, company: v },
                  })
                }
                placeholder={"Company Name"}
                value={sonickey?.filters?.company}
              />
            </FilterForm>
          )}

          {(users?.userProfile?.data?.userRole === userRoles.PARTNER_ADMIN ||
            users?.userProfile?.data?.userRole === userRoles.COMPANY_ADMIN) && (
            <FilterForm>
              <StyledTextField
                fullWidth
                label="User ID"
                value={sonickey?.filters?.user}
                onChange={(e) =>
                  dispatch({
                    type: actionTypes.SONIC_KEY_FILTERS,
                    data: { ...sonickey?.filters, user: e.target.value },
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

          <FilterForm>
            <StyledTextField
              fullWidth
              label="Title"
              value={sonickey?.filters?.title}
              onChange={(e) =>
                dispatch({
                  type: actionTypes.SONIC_KEY_FILTERS,
                  data: { ...sonickey?.filters, title: e.target.value },
                })
              }
              InputLabelProps={{
                style: {
                  fontFamily: theme.fontFamily.robotosBold,
                },
              }}
            />
          </FilterForm>
        </FilterItems>

        <FilterButton>
          <AppButton
            variant="outline"
            className="mx-3"
            onClick={() =>
              dispatch({
                type: actionTypes.SONIC_KEY_FILTERS,
                data: {
                  channel: "ALL",
                  sonicKey: "",
                  artist: "",
                  trackId: "",
                  title: "",
                  label: "",
                  distributor: "",
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
