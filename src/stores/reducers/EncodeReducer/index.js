import * as actionTypes from "../../actions/actionTypes"
import produce from "immer";

const initialState = {
    loading: true,
    data: [],
    error: null,
    selectedFile: null
};
const encodeRed = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case actionTypes.SET_SELECTED_FILE:
                draft.selectedFile = action.data
                break;

            case actionTypes.CLEAR_SELECTED_FILE:
                draft.selectedFile = null
                break;

            default:
                break;
        }
    });
export default encodeRed;
