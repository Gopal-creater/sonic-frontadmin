import * as actionTypes from "../actions/actionTypes";
import produce from "immer";

const initialState = {
    stations: {
        loading: false,
        data: [],
        error: null,
    },
    stationCount: {
        loading: false,
        data: 0,
        error: null,
    }

}

const streamReaderReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case actionTypes.FETCH_RADIOSTATIONS_LOADING:
                draft.stations.loading = true;
                break;
            case actionTypes.FETCH_RADIOSTATIONS_SUCCESS:
                draft.stations.loading = false;
                draft.stations.data = action.data;
                draft.stations.error = null;
                break;
            case actionTypes.FETCH_RADIOSTATIONS_ERROR:
                draft.stations.loading = false;
                draft.stations.data = [];
                draft.stations.error = action.data;
                break;
            case actionTypes.TOTAL_SUBSCRIBED_STATION_COUNT_LOADING:
                draft.stationCount.loading = true;
                break;
            case actionTypes.TOTAL_SUBSCRIBED_STATION_COUNT_SUCCESS:
                draft.stationCount.loading = false;
                draft.stationCount.data = action.data;
                draft.stationCount.error = null;
                break;
            case actionTypes.TOTAL_SUBSCRIBED_STATION_COUNT_ERROR:
                draft.stationCount.loading = false;
                draft.stationCount.data = 0;
                draft.stationCount.error = action.data;
                break;
            default:
                break;
        }
    })

export default streamReaderReducer;