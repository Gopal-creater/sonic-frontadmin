import * as actionTypes from "../actions/actionTypes";
import produce from "immer";

const initialState = {
  loading: true,
  data: [],
  error: null,
};
const thirdPartyRed = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case actionTypes.THIRDPARTY_SONIC_KEY_SUCCESS:
        draft.data = action.data;
        draft.loading = false;
        break;

      case actionTypes.THIRDPARTY_SONIC_KEY_FAIL:
        draft.error = action.error;
        draft.loading = false;
        break;

      case actionTypes.THIRDPARTY_SONIC_KEY_LOADING:
        draft.loading = true;
        draft.error = null;
        break;
    }
  });
export default thirdPartyRed;
