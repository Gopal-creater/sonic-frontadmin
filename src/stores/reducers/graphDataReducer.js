import * as actionTypes from "../actions/actionTypes";
import produce from "immer";

const initialState = {
    country: {
        loading: true,
        data: {
            label: [],
            graphData: [],
        },
        error: null,
    },
    song: {
        loading: true,
        data: {
            label: [],
            graphData: [],
        },
        error: null,
    },
    station: {
        loading: true,
        data: {
            label: [],
            graphData: [],
        },
        error: null,
    },
    artist: {
        loading: true,
        data: {
            label: [],
            graphData: [],
        },
        error: null,
    }
};

const graphDataReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case actionTypes.FETCH_GRAPH_DATA_SUCCESS:
                draft.data = action.data;
                draft.loading = false;
                break;

            case actionTypes.FETCH_GRAPH_DATA_ERROR:
                draft.error = action.error;
                draft.loading = false;
                break;

            case actionTypes.FETCH_GRAPH_DATA_LOADING:
                draft.loading = true;
                draft.error = null;
                break;

            default:
                break;
        }
    });

export default graphDataReducer;
