import produce from "immer";
import * as actionTypes from "../../actions/actionTypes"

const monitorInitialState = {
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
    track: {
        error: null,
        loading: false,
        data: {

        }
    },
    plays: {
        error: null,
        loading: false,
        data: {}
    },
    radioStation: {
        error: null,
        loading: false,
        data: {}
    }
};

const monitorReducer = (state = monitorInitialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            //For Dates
            case actionTypes.SET_MONITOR_DATES:
                draft.dates = action.data
                break

            case actionTypes.SET_MONITOR_FILTERS:
                draft.filters = action.data;
                break;

            //For track
            case actionTypes.SET_TRACK_LOADING:
                draft.track.loading = true
                draft.track.error = null
                break

            case actionTypes.SET_TRACK_SUCCESS:
                draft.track.loading = false
                draft.track.error = null
                draft.track.data = action.data
                break

            case actionTypes.SET_TRACK_ERROR:
                draft.track.loading = false
                draft.track.error = action.data
                break

            //For plays
            case actionTypes.SET_PLAYS_LOADING:
                draft.plays.loading = true
                draft.plays.error = null
                break

            case actionTypes.SET_PLAYS_SUCCESS:
                draft.plays.loading = false
                draft.plays.error = null
                draft.plays.data = action.data
                break

            case actionTypes.SET_PLAYS_ERROR:
                draft.plays.loading = false
                draft.plays.error = action.data
                break

            //For radioStation
            case actionTypes.SET_RADIOSTATION_LOADING:
                draft.radioStation.loading = true
                draft.radioStation.error = null
                break

            case actionTypes.SET_RADIOSTATION_SUCCESS:
                draft.radioStation.loading = false
                draft.radioStation.error = null
                draft.radioStation.data = action.data
                break

            case actionTypes.SET_RADIOSTATION_ERROR:
                draft.radioStation.loading = false
                draft.radioStation.error = action.data
                break

            default:
                break
        }
    });

export default monitorReducer