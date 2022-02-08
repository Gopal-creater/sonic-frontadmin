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
    allRadioStations: {
        loading: false,
        data: [],
        error: null,
    }
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

            case actionTypes.GET_ALL_RADIOSTATIONS_LOADING:
                draft.allRadioStations.loading = true;
                break;

            case actionTypes.GET_ALL_RADIOSTATIONS_SUCCESS:
                draft.allRadioStations.loading = false;
                draft.allRadioStations.data = action?.data?.docs?.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
                draft.allRadioStations.error = null
                break;

            case actionTypes.GET_ALL_RADIOSTATIONS_ERROR:
                draft.allRadioStations.loading = false;
                draft.allRadioStations.data = [];
                draft.allRadioStations.error = action.data;
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
