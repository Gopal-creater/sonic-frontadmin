import * as actionTypes from "../actions/actionTypes";
import produce from "immer";

const initialState = {
  loading: true,
  data: [],
  error: null,
};
const profileRed = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case actionTypes.PROFILE_SUCCESS:
        draft.data = action.data;
        draft.loading = false;
        break;

      case actionTypes.PROFILE_FAIL:
        draft.error = action.error;
        draft.loading = false;
        break;

      case actionTypes.PROFILE_LOADING:
        draft.loading = true;
        draft.error = null;
        break;
    }
  });
export default profileRed;
