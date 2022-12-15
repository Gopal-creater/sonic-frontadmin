import * as actionTypes from "../actions/session/actionTypes";
import produce from "immer";

const initialState = {
  user: null,
  loading: true,
  resetPassword: false,
  emailConfirmation: false,
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
        draft.resetPassword = action.resetPassword;
        break;

      case actionTypes.SET_EMAIL_CONFIRMATION:
        draft.emailConfirmation = action.emailConfirmation;
        break;

      default:
        break;
    }
  });
export default sessionRed;
