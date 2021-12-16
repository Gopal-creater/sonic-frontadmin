import moment from 'moment';
import store from '../../stores';
import { getPlaysLists } from '../../services/https/resources/Plays.api';
import { log } from '../../utils/app.debug';
import * as actionType from './actionTypes';
import cogoToast from 'cogo-toast';

export const getPlaysListsAction = (startDate, endDate, channel, page, limit) => {
    let params = new URLSearchParams(`detectedAt>=${moment(startDate).format("YYYY-MM-DD")}&detectedAt<=${moment(endDate).format("YYYY-MM-DD")}`)
    params.append("channel", channel)
    params.append("limit", limit);
    params.append("page", page);
    params.append("skip", page > 1 ? (page - 1) * limit : 0)

    log("store", store.getState().playsList)
    let playsFilters = store.getState()?.playsList?.filters

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
    if (playsFilters?.encodedDate) {
        params.append("relation_sonicKey.createdAt", playsFilters?.encodedDate);
    }

    return dispatch => {
        dispatch({
            type: actionType.FETCH_PLAYS_LISTS_LOADING
        })
        getPlaysLists(params)
            .then((data) => {
                log("Plays detected", data);
                dispatch({
                    type: actionType.FETCH_PLAYS_LISTS_SUCCESS,
                    data: data
                })
            }).catch(error => {
                log("Plays detected error", error);
                dispatch({
                    type: actionType.FETCH_PLAYS_LISTS_ERROR,
                    error: error
                })
                cogoToast.error(error?.message)
            })
    }

};