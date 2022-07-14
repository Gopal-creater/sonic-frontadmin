import cogoToast from "cogo-toast";
import { getRoleWiseID } from "../../services/https/AuthHelper";
import { fetchSubscribedRadioMonitors, getRadioMonitorsPlaysCount, getSonicStreamDetails } from "../../services/https/resources/StreamReader.api";
import { log } from "../../utils/app.debug";
import * as actionTypes from "./actionTypes";

export const fetchRadioMonitorsActions = (limit, page, country, radiostations) => {
    let params = new URLSearchParams();
    params.append("limit", limit);
    params.append("page", page);
    params.append("skip", page > 1 ? (page - 1) * limit : 0)

    if (country) {
        params.append('country', country);
    }
    if (radiostations) {
        params.append('name', radiostations);
    }

    return dispatch => {
        dispatch({ type: actionTypes.FETCH_RADIOMONITORS_LOADING })
        fetchSubscribedRadioMonitors(params).then((res) => {
            log("Radio Monitor response", res);
            dispatch({ type: actionTypes.FETCH_RADIOMONITORS_SUCCESS, data: res })
        }).catch((err) => {
            log("Radio Monitor Error", err);
            dispatch({ type: actionTypes.FETCH_RADIOMONITORS_ERROR, data: err?.message })
            cogoToast.error(err?.message)
        })
    }
}

export const getRadioMonitorsPlaysCountActions = (id) => {
    let params = new URLSearchParams();
    params.append("channel", "STREAMREADER");

    let userRoleWiseId = getRoleWiseID()
    if (userRoleWiseId?.company) params.append("company", userRoleWiseId?.company)
    if (userRoleWiseId?.partner) params.append("partner", userRoleWiseId?.partner)
    if (userRoleWiseId?.owner) params.append("owner", userRoleWiseId?.owner)

    if (id) {
        params.append("radioStation", id);
    }

    return (dispatch) => {
        dispatch({ type: actionTypes.FETCH_RADIOMONITORS_PLAYS_COUNT_LOADING })
        getRadioMonitorsPlaysCount(params).then((res) => {
            dispatch({ type: actionTypes.FETCH_RADIOMONITORS_PLAYS_COUNT_SUCCESS, data: res })
        }).catch((err) => {
            log("Radio Monitor Count Error", err);
            dispatch({ type: actionTypes.FETCH_RADIOMONITORS_PLAYS_COUNT_ERROR, data: err?.message })
            cogoToast.error(err?.message)
        })
    }
}

export const getSonicStreamDetailsActions = (id) => {
    let params = new URLSearchParams();
    let channel = "STREAMREADER";

    let userRoleWiseId = getRoleWiseID()
    if (userRoleWiseId?.company) params.append("company", userRoleWiseId?.company)
    if (userRoleWiseId?.partner) params.append("partner", userRoleWiseId?.partner)
    if (userRoleWiseId?.owner) params.append("owner", userRoleWiseId?.owner)

    if (id) {
        params.append("radioStation", id);
    }

    return (dispatch) => {
        dispatch({ type: actionTypes.FETCH_SONICSTREAM_DETAILS_LOADING })
        getSonicStreamDetails(channel, params).then((res) => {
            dispatch({ type: actionTypes.FETCH_SONICSTREAM_DETAILS_SUCCESS, data: res })
        }).catch((err) => {
            log("SonicStream Details Error", err);
            dispatch({ type: actionTypes.FETCH_SONICSTREAM_DETAILS_ERROR, data: err?.message })
            cogoToast.error(err?.message)
        })
    }
}