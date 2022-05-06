import produce from "immer";
import * as actionTypes from "../../actions/actionTypes"

export const monitorInitialState = {
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
        timezone: "GMT",
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
    },
    artist: {
        error: null,
        loading: false,
        data: {}
    },
    country: {
        error: null,
        loading: false,
        data: {

        }
    },
    columns: [],
    searchedColumn: [],
};

const monitorReducer = (state = monitorInitialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            //For Column hiding
            case actionTypes.CHECKED_TABLE_COLUMN:
                draft.columns = action.data
                break;

            case actionTypes.UNCHECKED_TABLE_COLUMN:
                draft.columns = draft.columns.filter((data) => {
                    return data !== action.data
                })
                break;

            case actionTypes.STORE_TABLE_COLUMN:
                draft.searchedColumn = action.data
                break;

            case actionTypes.SEARCHED_TABLE_COLUMN:
                draft.searchedColumn = draft.searchedColumn.filter((data) => {
                    return data?.title?.toLowerCase()?.match(action.data.toLowerCase())
                })
                break;

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

            case actionTypes.UPDATE_EDITED_PLAYSLIST:
                draft.plays.data.docs = draft.plays.data.docs.map((play, index) => {
                    if (play?.sonicKey?._id === action.data.sonicKey) {
                        play.sonicKey = action.data
                        return play
                    }
                    return play
                })
                break;

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

            // For Artist
            case actionTypes.SET_ARTIST_LOADING:
                draft.artist.loading = true
                draft.artist.error = null
                break

            case actionTypes.SET_ARTIST_SUCCESS:
                draft.artist.loading = false
                draft.artist.error = null
                draft.artist.data = action.data
                break

            case actionTypes.SET_ARTIST_ERROR:
                draft.artist.loading = false
                draft.artist.error = action.data
                break


            //For country
            case actionTypes.SET_COUNTRIES_LOADING:
                draft.country.loading = true
                draft.country.error = null
                break

            case actionTypes.SET_COUNTRIES_SUCCESS:
                draft.country.loading = false
                draft.country.error = null
                draft.country.data = action.data
                break

            case actionTypes.SET_COUNTRIES_ERROR:
                draft.country.loading = false
                draft.country.error = action.data
                break
            default:
                break
        }
    });

export default monitorReducer