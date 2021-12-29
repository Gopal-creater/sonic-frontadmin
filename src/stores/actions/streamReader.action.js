import cogoToast from "cogo-toast";
import { fetchRadioStations, getSubscribedStationCount } from "../../services/https/resources/StreamReader.api";
import { log } from "../../utils/app.debug";
import * as actionTypes from "./actionTypes";

export const fetchRadioStationsActions = (limit, page, country, radiostations) => {
    let skip = page > 1 ? (page - 1) * limit : 0;
    let params = new URLSearchParams(`limit=${limit}&skip=${skip}&page=${page}`);

    if (country) {
        params.append('country', country);
    }
    if (radiostations) {
        params.append('name', radiostations);
    }

    return dispatch => {
        dispatch({ type: actionTypes.FETCH_RADIOSTATIONS_LOADING })

        fetchRadioStations(params).then((res) => {
            log("Radio Stations", res);
            dispatch({ type: actionTypes.FETCH_RADIOSTATIONS_SUCCESS, data: res })
        }).catch((err) => {
            log("Radio Stations Error", err);
            dispatch({ type: actionTypes.FETCH_RADIOSTATIONS_ERROR, data: err?.message })
            cogoToast.error(err?.message);
        })
    }
}

export const getSubscribedStationCountActions = () => {
    return (dispatch) => {
        dispatch({ type: actionTypes.TOTAL_SUBSCRIBED_STATION_COUNT_LOADING })

        getSubscribedStationCount().then((res) => {
            log("Subscribed Stations Count", res);
            dispatch({ type: actionTypes.TOTAL_SUBSCRIBED_STATION_COUNT_SUCCESS, data: res })
        }).catch((err) => {
            log("Subscribed Stations Count", err);
            dispatch({ type: actionTypes.TOTAL_SUBSCRIBED_STATION_COUNT_ERROR, data: err?.message })
            cogoToast.error(err?.message)
        })
    }
}