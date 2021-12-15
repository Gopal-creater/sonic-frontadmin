import * as actionTypes from "../actions/actionTypes";
import produce from "immer"

const initialState = {
    totalSonicKeysCount: {
        loading: false,
        data: {},
        error: null
    },
    totalSubscribedStationCount: {
        loading: false,
        data: 0,
        error: null
    },
    mostPlayedStations: {
        loading: false,
        data: [],
        error: null
    },
    graphData: {
        loading: false,
        data: {},
        error: null
    }
}

const dashboardReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case actionTypes.SET_TOTALSONICKEYS_COUNT_LOADING:
                draft.totalSonicKeysCount.loading = true;
                break

            case actionTypes.SET_TOTALSONICKEYS_COUNT_SUCCESS:
                draft.totalSonicKeysCount.loading = false
                draft.totalSonicKeysCount.data = action.data
                draft.totalSonicKeysCount.error = null
                break

            case actionTypes.SET_TOTALSONICKEYS_COUNT_ERROR:
                draft.totalSonicKeysCount.loading = false
                draft.totalSonicKeysCount.data = {}
                draft.totalSonicKeysCount.error = action.data

            case actionTypes.SET_TOTALSUBSCRIBEDSTATION_COUNT_LOADING:
                draft.totalSubscribedStationCount.loading = true
                break

            case actionTypes.SET_TOTALSUBSCRIBEDSTATION_COUNT_SUCCESS:
                draft.totalSubscribedStationCount.loading = false
                draft.totalSubscribedStationCount.data = action.data
                draft.totalSubscribedStationCount.error = null
                break

            case actionTypes.SET_TOTALSUBSCRIBEDSTATION_COUNT_ERROR:
                draft.totalSubscribedStationCount.loading = false
                draft.totalSubscribedStationCount.data = 0
                draft.totalSubscribedStationCount.error = action.data
                break

            case actionTypes.SET_MOSTPLAYEDSTATION_LOADING:
                draft.mostPlayedStations.loading = true
                break

            case actionTypes.SET_MOSTPLAYEDSTATION_SUCCESS:
                draft.mostPlayedStations.loading = false
                draft.mostPlayedStations.data = action.data
                draft.mostPlayedStations.error = null
                break

            case actionTypes.SET_MOSTPLAYEDSTATION_ERROR:
                draft.mostPlayedStations.loading = false
                draft.mostPlayedStations.data = []
                draft.mostPlayedStations.error = action.data
                break

            case actionTypes.SET_DASHBOARDGRAPH_LOADING:
                draft.graphData.loading = true
                break

            case actionTypes.SET_DASHBOARDGRAPH_SUCCESS:
                draft.graphData.loading = false
                draft.graphData.data = action.data
                draft.graphData.error = null
                break

            case actionTypes.SET_DASHBOARDGRAPH_ERROR:
                draft.graphData.loading = false
                draft.graphData.data = {}
                draft.graphData.error = action.data
                break

            default:
                break
        }
    })

export default dashboardReducer;