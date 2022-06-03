import * as actionTypes from "../actions/actionTypes";
import produce from "immer";

const initialState = {
    filters: {
        country: "",
        radioStation: ""
    },
    stations: {
        loading: false,
        data: {},
        error: null,
    },
    playsCount: {
        loading: false,
        data: 0,
        error: null,
    },
    streamDetails: {
        loading: false,
        data: {},
        error: null,
    }
}

const streamReaderReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            //FILTERS
            case actionTypes.FETCH_RADIOMONITORS_FILTERS:
                draft.filters = action.data;
                break;

            //RADIOMONITORS
            case actionTypes.FETCH_RADIOMONITORS_LOADING:
                draft.stations.loading = true;
                draft.stations.error = null;
                break;
            case actionTypes.FETCH_RADIOMONITORS_SUCCESS:
                draft.stations.loading = false;
                draft.stations.data = action.data;
                draft.stations.error = null;
                break;
            case actionTypes.FETCH_RADIOMONITORS_ERROR:
                draft.stations.loading = false;
                draft.stations.error = action.data;
                break;

            //RADIOMONITORS PLAYS COUNT
            case actionTypes.FETCH_RADIOMONITORS_PLAYS_COUNT_LOADING:
                draft.playsCount.loading = true;
                draft.playsCount.error = null;
                break;
            case actionTypes.FETCH_RADIOMONITORS_PLAYS_COUNT_SUCCESS:
                draft.playsCount.loading = false;
                draft.playsCount.data = action.data;
                draft.playsCount.error = null;
                break;
            case actionTypes.FETCH_RADIOMONITORS_PLAYS_COUNT_ERROR:
                draft.playsCount.loading = false;
                draft.playsCount.error = action.data;
                break;

            //SONICSTREAM DETAILS
            case actionTypes.FETCH_SONICSTREAM_DETAILS_LOADING:
                draft.streamDetails.loading = true;
                draft.streamDetails.error = null;
                break;
            case actionTypes.FETCH_SONICSTREAM_DETAILS_SUCCESS:
                draft.streamDetails.loading = false;
                draft.streamDetails.data = action.data;
                draft.streamDetails.error = null;
                break;
            case actionTypes.FETCH_SONICSTREAM_DETAILS_ERROR:
                draft.streamDetails.loading = false;
                draft.streamDetails.error = action.data;
                break;

            default:
                break;
        }
    })

export default streamReaderReducer;