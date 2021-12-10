import * as actionTypes from "../actions/session/actionTypes";
import produce from "immer";

const initialState = {
  user: null,
  authState: '',
  loading: true,
  resetPassword: false,
  authentication: {
    loading: true,
    data: {},
    error: null
  }
};
const sessionRed = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case actionTypes.SET_USER:
        draft.user = action.user;
        draft.authState = action.authState;
        draft.loading = false;
        break;

      case actionTypes.SET_RESET_PASSWORD:
        draft.resetPassword = action.resetPassword
        break;

      case actionTypes.SET_AUTHENTICATION_LOADING:
        draft.authentication.loading = true
        break;

      case actionTypes.SET_AUTHENTICATION_SUCCESS:
        draft.authentication.loading = false;
        draft.authentication.error = null;
        draft.authentication.data = action.data
        break;

      case actionTypes.SET_AUTHENTICATION_ERROR:
        draft.authentication.loading = false;
        draft.authentication.error = action.data;
        break;

      default:
        break;
    }
  });
export default sessionRed;