import * as actionTypes from "../actions/actionTypes";
import produce from "immer";

const initialState = {
    loading: false,
    data: [],
    dates: {
        startDate: new Date().setMonth(new Date().getMonth() - 1),
        endDate: new Date(),
    },
    filters: {
        channel: "STREAMREADER",
        sonicKey: "",
        country: "",
        artist: "",
        radioStation: "",
        song: "",
        encodedDate: "",
        label: "",
        distributor: "",
    },
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

            case actionTypes.SET_PLAYS_DATES:
                draft.dates = action.data;
                break;

            case actionTypes.SET_PLAYS_FILTER:
                draft.filters = action.data;
                break;

            default:
                break;
        }
    });

export default playsListsReducer;
