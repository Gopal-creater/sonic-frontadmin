import produce from "immer"
import * as actionTypes from '../actions/actionTypes';


const countriesInitialState = {
    error: null,
    loading: false,
    data: [],
    dates: {
        startDate: new Date().setMonth(new Date().getMonth() - 1),
        endDate: new Date(),
    },
    filters: {}
}


const countriesReducer = (state = countriesInitialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case actionTypes.SET_COUNTRIES_LOADING:
                draft.loading = true;
                draft.error = null;
                break;
            case actionTypes.SET_COUNTRIES_SUCCESS:
                draft.loading = false;
                draft.error = null;
                draft.data = action.data;
                break;
            case actionTypes.SET_COUNTRIES_ERROR:
                draft.loading = false;
                draft.data = {};
                draft.error = action.data;
                break;
            case actionTypes.SET_COUNTRIES_DATE:
                draft.dates = action.data;
                break;
            case actionTypes.SET_COUNTRIES_FILTERS:
                draft.filters = action.data;
                break;
            default:
                break;
        }
    })
export default countriesReducer;