import moment from 'moment';
import store from '../../stores';
import { getAllRadioStations, getPlaysLists } from '../../services/https/resources/Plays.api';
import { log } from '../../utils/app.debug';
import * as actionType from './actionTypes';
import cogoToast from 'cogo-toast';

export const getPlaysListsAction = (startDate, endDate, channel, page, limit, recentPlays = false) => {
    let newEndDate = moment(endDate).endOf("days").toISOString()
    let params = new URLSearchParams(`detectedAt>=${moment(startDate).format("YYYY-MM-DD")}&detectedAt<=date(${newEndDate})`)

    params.append("limit", limit);
    !recentPlays && params.append("page", page)
    !recentPlays && params.append("skip", page > 1 ? (page - 1) * limit : 0)
    params.append("recentPlays", recentPlays)

    // log("store", store.getState().playsList)
    let playsFilters = store.getState()?.playsList?.filters

    channel === "ALL" ? params.append("channel", "") : params.append("channel", channel)

    if (playsFilters?.sonicKey) {
        params.append("relation_sonicKey.sonicKey", playsFilters?.sonicKey);
    }
    if (playsFilters?.country) {
        params.append("relation_radioStation.country", playsFilters?.country);
    }
    if (playsFilters?.artist) {
        params.append("relation_sonicKey.contentOwner", playsFilters?.artist);
    }
    if (playsFilters?.radioStation) {
        params.append("relation_radioStation.name", playsFilters?.radioStation);
    }
    if (playsFilters?.song) {
        params.append("relation_sonicKey.originalFileName", playsFilters?.song);
    }
    if (playsFilters?.label) {
        params.append("relation_sonicKey.label", playsFilters?.label);
    }
    if (playsFilters?.distributor) {
        params.append("relation_sonicKey.distributor", playsFilters?.distributor);
    }
    if (playsFilters?.encodedDate) {
        let startOfEncodedDate = moment(playsFilters?.encodedDate).startOf("days").toISOString()
        params.append(`relation_sonicKey.createdAt>`, `date(${startOfEncodedDate})`)
        params.append(`relation_sonicKey.createdAt<`, `date(${moment(playsFilters?.encodedDate).endOf("days").toISOString()})`)
    }

    return dispatch => {
        dispatch({
            type: actionType.FETCH_PLAYS_LISTS_LOADING
        })
        getPlaysLists(params)
            .then((data) => {
                // log("Plays detected", data);
                dispatch({
                    type: actionType.FETCH_PLAYS_LISTS_SUCCESS,
                    data: data
                })
            }).catch(error => {
                log("Plays detected error", error);
                dispatch({
                    type: actionType.FETCH_PLAYS_LISTS_ERROR,
                    error: error?.message
                })
                cogoToast.error(error?.message)
            })
    }
};

export const getAllRadioStationsAction = () => {
    return (dispatch) => {
        dispatch({ type: actionType.GET_ALL_RADIOSTATIONS_LOADING })
        getAllRadioStations().then((response) => {
            dispatch({ type: actionType.GET_ALL_RADIOSTATIONS_SUCCESS, data: response })
        }).catch((error) => {
            dispatch({ type: actionType.GET_ALL_RADIOSTATIONS_ERROR, data: error?.message })
            cogoToast.error(error?.message)
        })
    }
}