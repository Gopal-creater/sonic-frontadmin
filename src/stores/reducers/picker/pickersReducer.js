import produce from "immer";
import * as actionTypes from "../../actions/actionTypes";

export const initialPickers = {
    title: {
        loading: false,
        data: [],
        error: null,
    }
}

const pickersReducer = (state = initialPickers, action) =>
    produce(state, (draft) => {
        switch (action.type) {

            //title
            case actionTypes.FETCH_TITLE_LOADING:
                draft.title.loading = true;
                draft.title.error = null;
                break;
            case actionTypes.FETCH_TITLE_SUCCESS:
                draft.title.loading = false;
                draft.title.data = action.data;
                draft.title.error = null;
                break;
            case actionTypes.FETCH_TITLE_ERROR:
                draft.title.loading = false;
                draft.title.error = action.data;
                break;
            default:
                break;

        }
    });

export default pickersReducer;