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

            default:
                break
        }
    });

export default monitorReducer