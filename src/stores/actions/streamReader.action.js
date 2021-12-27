import cogoToast from "cogo-toast";
import { fetchRadioStations } from "../../services/https/resources/StreamReader.api";
import { log } from "../../utils/app.debug";
import * as actionTypes from "./actionTypes";

export const fetchRadioStationsActions = (limit, page, country, radiostations) => {
    let skip = page > 1 ? (page - 1) * limit : 0;
    let params = new URLSearchParams(`skip=${skip}&limit=${limit}`);

    if (country) {
        params.append('radioSearch.country', country);
    }
    if (radiostations) {
        params.append('radioSearch.name', radiostations);
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