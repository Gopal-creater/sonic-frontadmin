import * as actionTypes from "../actions/actionTypes";
import produce from "immer";

const initialState = {
    loading: false,
    data: [],
    error: null,
}

const streamReaderReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case actionTypes.FETCH_RADIOSTATIONS_LOADING:
                draft.loading = true;
                break;
            case actionTypes.FETCH_RADIOSTATIONS_SUCCESS:
                draft.loading = false;
                draft.data = action.data;
                draft.error = null;
                break;
            case actionTypes.FETCH_RADIOSTATIONS_ERROR:
                draft.loading = false;
                draft.data = [];
                draft.error = action.data;
                break;
            default:
                break;
        }
    })

export default streamReaderReducer;