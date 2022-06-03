import * as actionTypes from "../../actions/actionTypes"
import produce from "immer";

const initialState = {
    getSonicKeys: {
        loading: true,
        error: null,
        data: {}
    },
    filters: {
        channel: "ALL",
        sonicKey: "",
        artist: "",
        track: "",
        label: "",
        distributor: "",
    },
};

const sonickeyReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {

            //Fetching SonicKeys
            case actionTypes.GET_ALL_SONICKEYS_LOADING:
                draft.getSonicKeys.loading = true;
                draft.getSonicKeys.error = null;
                break;
            case actionTypes.GET_ALL_SONICKEYS_SUCCESS:
                draft.getSonicKeys.loading = false;
                draft.getSonicKeys.data = action.data;
                draft.getSonicKeys.error = null;
                break;
            case actionTypes.GET_ALL_SONICKEYS_ERROR:
                draft.getSonicKeys.loading = false;
                draft.getSonicKeys.error = action.data;
                break;

            //Filters
            case actionTypes.SONIC_KEY_FILTERS:
                draft.filters = action.data;
                break;

            case actionTypes.UPDATE_SONIC_KEYS:
                let index = draft.getSonicKeys.data.docs.findIndex(key => key.sonicKey == action.data.sonicKey)
                draft.getSonicKeys.data.docs[index] = action.data;
                break;

            default:
                break;
        }
    })

export default sonickeyReducer;
