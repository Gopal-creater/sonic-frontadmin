import produce from "immer";
import * as actionTypes from "../actions/actionTypes"

const trackListInitialState = {
    error: null,
    loading: false,
    data: {
    },
    dates: {
        startDate: new Date().setMonth(new Date().getMonth() - 1),
        endDate: new Date(),
    },
    filters: {

    }
};

export const trackReducer = (state = trackListInitialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case actionTypes.SET_TRACK_LOADING:
                draft.loading = true
                draft.error = null
                break

            case actionTypes.SET_TRACK_SUCCESS:
                draft.loading = false
                draft.error = null
                draft.data = action.data
                break

            case actionTypes.SET_TRACK_ERROR:
                draft.loading = false
                draft.error = action.data
                break

            case actionTypes.SET_TRACK_DATES:
                draft.dates = action.data
                break

            case actionTypes.SET_TRACK_FILTERS:
                draft.filters = action.data
                break

            default:
                break
        }
    });