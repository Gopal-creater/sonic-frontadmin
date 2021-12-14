import * as actionTypes from "../actions/actionTypes";
import produce from "immer"

const initialState = {
    totalSonicKeysCount: {
        loading: false,
        data: {},
        error: null
    }
}

const dashboardReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case actionTypes.SET_TOTALSONICKEYS_COUNT_LOADING:
                draft.totalSonicKeysCount.loading = true;
                break

            case actionTypes.SET_TOTALSONICKEYS_COUNT_SUCCESS:
                draft.totalSonicKeysCount.loading = false
                draft.totalSonicKeysCount.data = action.data
                draft.totalSonicKeysCount.error = null
                break

            case actionTypes.SET_TOTALSONICKEYS_COUNT_ERROR:
                draft.totalSonicKeysCount.loading = false
                draft.totalSonicKeysCount.data = {}
                draft.totalSonicKeysCount.error = action.data

            default:
                break
        }
    })

export default dashboardReducer;