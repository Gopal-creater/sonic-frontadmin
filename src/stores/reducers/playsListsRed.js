import * as actionTypes from "../actions/actionTypes";
import produce from "immer";

const initialState = {
    loading: true,
    data: [],
    error: null,
};

const playsListsReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case actionTypes.FETCH_PLAYS_LISTS_SUCCESS:
                draft.data = action.data;
                draft.loading = false;
                break;

            case actionTypes.FETCH_PLAYS_LISTS_ERROR:
                draft.error = action.error;
                draft.loading = false;
                break;

            case actionTypes.FETCH_PLAYS_LISTS_LOADING:
                draft.loading = true;
                draft.error = null;
                break;

            default:
                break;
        }
    });

export default playsListsReducer;
