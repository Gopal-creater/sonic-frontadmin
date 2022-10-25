import { CircularProgress, Dialog, DialogContent } from "@material-ui/core";
import { CloseOutlined, ControlPoint } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import cogoToast from "cogo-toast";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AppButton from "../../../components/common/AppButton/AppButton";
import AppAutoComplete from "../../../components/common/AutoComplete/AppAutoComplete";
import { addUserToLicense } from "../../../services/https/resources/License.api";
import { getUsersNameAction } from "../../../stores/actions/picker/titlePicker.action";
import { Content } from "../../../StyledComponents/StyledHeadings";
import {
  FilterButton,
  FilterContainer,
  FilterHeader,
} from "../../Monitor/Components/MonitorFilter/MonitorFilterStyles";

const useStyles = makeStyles({
  root: {
    "& .MuiDialog-paper": {
      borderRadius: 0,
    },
  },
});

export default function AddNewUser({ license, setLicense }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [state, setState] = React.useState({
    loading: false,
    open: false,
    user: {},
  });

  const onAddNewUser = () => {
    setState({ ...state, loading: true });
    addUserToLicense(license?._id, state.user?._id)
      .then((data) => {
        setState({ ...state, loading: false, open: false });
        setLicense(data);
        cogoToast.success("Added");
      })
      .catch((err) => {
        setState({ ...state, loading: false, open: false });
        cogoToast.error(err?.message || "Error adding new user");
      });
  };

  return (
    <div>
      <AppButton
        variant={"none"}
        startIcon={<ControlPoint />}
        style={{ paddingLeft: 5 }}
        onClick={() => setState({ ...state, open: true })}
      >
        Add new user
      </AppButton>
      <Dialog
        aria-labelledby="add-new-user"
        open={state.open}
        onClose={() => setState({ ...state, open: false })}
        className={classes.root}
        maxWidth="sm"
        fullWidth
      >
        <FilterContainer>
          <FilterHeader style={{ paddingBottom: 0 }}>
            <Content>Add new user</Content>
            <div style={{ cursor: "pointer" }}>
              <CloseOutlined
                onClick={() => setState({ ...state, open: false })}
              />
            </div>
          </FilterHeader>
          <DialogContent style={{ padding: 0 }}>
            <AppAutoComplete
              setAutoComPleteAction={(value) =>
                dispatch(getUsersNameAction(value))
              }
              setAutoCompleteOptions={(option) => option?.username || ""}
              setAutoCompleteOptionsLabel={(option) => option?._id || ""}
              loading={user?.userSearch?.loading}
              data={user?.userSearch?.data?.docs}
              error={user?.userSearch?.error}
              getSelectedValue={(e, v) => setState({ ...state, user: v })}
              labelText={"Enter username"}
              hideSearchIcon={true}
            />
          </DialogContent>
          <FilterButton style={{ marginTop: 20, marginBottom: 10 }}>
            <AppButton
              variant="outline"
              disabled={state.loading}
              onClick={() => setState({ ...state, open: false })}
            >
              Cancel
            </AppButton>
            <AppButton
              variant="fill"
              type="submit"
              onClick={onAddNewUser}
              style={{ marginLeft: "15px", width: "130px" }}
            >
              {state.loading ? (
                <CircularProgress size={20} color="white" />
              ) : (
                "Add user"
              )}
            </AppButton>
          </FilterButton>
        </FilterContainer>
      </Dialog>
    </div>
  );
}
