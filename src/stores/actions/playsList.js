import moment from 'moment';
import { getPlaysLists } from '../../services/https/resources/Plays.api';
import { log } from '../../utils/app.debug';
import * as actionType from './actionTypes';

export const getPlaysListsAction = (startDate, endDate, channel, page, limit, sonicKey, country, artist, radioStation, song, encodedDate) => {
    let params = new URLSearchParams(`detectedAt>=${moment(startDate).format("YYYY-MM-DD")}&detectedAt<=${moment(endDate).format("YYYY-MM-DD")}`)
    params.append("channel", channel)
    params.append("limit", limit);
    params.append("page", page);
    params.append("skip", page > 1 ? (page - 1) * limit : 0)

    log("sonicKey", sonicKey)

    if (sonicKey) {
        params.append("relation_sonicKey.sonicKey", sonicKey);
    }
    if (country) {
        params.append("relation_radioStation.country", country);
    }
    if (artist) {
        params.append("relation_sonicKey.contentOwner", artist);
    }
    if (radioStation) {
        params.append("relation_radioStation.name", radioStation);
    }
    if (song) {
        params.append("relation_sonicKey.originalFileName", song);
    }
    if (encodedDate) {
        params.append("relation_sonicKey.createdAt", encodedDate);
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
            })
    }

};