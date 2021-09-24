import * as actionTypes from "../actions/actionTypes";
import produce from "immer";

const initialState = {
  loading: true,
  data: [],
  error: null,
};
const sonicKeyRed = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case actionTypes.SONIC_KEY_SUCCESS:
        draft.data = action.data;
        draft.loading = false;
        break;

      case actionTypes.SONIC_KEY_FAIL:
        draft.error = action.error;
        draft.loading = false;
        break;

      case actionTypes.SONIC_KEY_LOADING:
        draft.loading = true;
        draft.error = null;
        break;

      case actionTypes.SORTING:
        draft.data = action.data;
        break;

      default:
        break;
    }
  });
export default sonicKeyRed;
