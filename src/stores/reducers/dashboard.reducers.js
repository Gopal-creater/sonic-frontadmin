import * as actionTypes from "../actions/actionTypes";
import produce from "immer"

const initialState = {
    error: null,
    loading: false,
    data: {}
}

const dashboardReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case actionTypes.SET_DASHBOARD_LOADING:
                draft.loading = true;
                draft.error = null;
                break;
            case actionTypes.SET_DASHBOARD_SUCCESS:
                draft.loading = false;
                draft.error = null;
                draft.data = action.data;
                break;
            case actionTypes.SET_DASHBOARD_ERROR:
                draft.loading = false;
                draft.data = {};
                draft.error = action.data;
                break;

            default:
                break
        }
    })

export default dashboardReducer;