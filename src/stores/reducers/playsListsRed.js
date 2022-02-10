import * as actionTypes from "../actions/actionTypes";
import produce from "immer";

export const playsListInitialState = {
    loading: false,
    data: [],
    dates: {
        startDate: new Date().setMonth(new Date().getMonth() - 1),
        endDate: new Date(),
    },
    filters: {
        channel: "ALL",
        sonicKey: "",
        country: "",
        artist: "",
        radioStation: "",
        song: "",
        label: "",
        distributor: "",
        encodedStartDate: "",
        encodedEndDate: "",
    },
    error: null,
};

const playsListsReducer = (state = playsListInitialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case actionTypes.FETCH_PLAYS_LISTS_SUCCESS:
                draft.data = action.data;
                draft.loading = false;
                break;

            case actionTypes.FETCH_PLAYS_LISTS_ERROR:
                draft.error = action.data;
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

            case actionTypes.UPDATE_EDITED_PLAYSLIST:
                draft.data.docs = draft.data.docs.map((play, index) => {
                    if (play?.sonicKey?._id === action.data.sonicKey) {
                        play.sonicKey = action.data
                        return play
                    }
                    return play
                })
                break;

            default:
                break;
        }
    });

export default playsListsReducer;
