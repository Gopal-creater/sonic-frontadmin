import * as actionTypes from "../../actions/actionTypes"
import produce from "immer";

const initialState = {
    userProfile: {
        loading: false,
        error: null,
        data: {}
    }
};

const userRed = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case actionTypes.GET_USERPROFILE_LOADING:
                draft.userProfile.loading = true;
                draft.userProfile.error = null;
                draft.userProfile.data = {};
                break;

            case actionTypes.GET_USERPROFILE_DATA:
                draft.userProfile.loading = false;
                draft.userProfile.error = null;
                draft.userProfile.data = action.data;
                break

            case actionTypes.GET_USERPROFILE_ERROR:
                draft.userProfile.loading = false;
                draft.userProfile.error = action.data;
                draft.userProfile.data = {};
                break

            default:
                break;
        }
    });
export default userRed;
