import * as actionTypes from "../actions/session/actionTypes";
import produce from "immer";

const initialState = {
  user:null,
  authState:'',
  loading:true
};
const sessionRed = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case actionTypes.SET_USER:
        draft.user = action.user;
        draft.authState = action.authState;
        draft.loading = false;
        break;
    }
  });
export default sessionRed;
