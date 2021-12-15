import Communication from '../../services/https/Communication';
import { log } from '../../utils/app.debug';
import * as actionType from './actionTypes';

export const getPlaysListsAction = (startDate, endDate, channel, page, limit) => {
    log("playsAction", startDate, endDate, channel, page, limit)
    return dispatch => {
        dispatch({
            type: actionType.FETCH_PLAYS_LISTS_LOADING
        })
        Communication.getPlaysLists(startDate, endDate, channel, page, limit)
            .then((data) => {
                log("plays-list", data);
                dispatch({
                    type: actionType.FETCH_PLAYS_LISTS_SUCCESS,
                    data: data
                })
            }).catch(error => {
                log(error);
                dispatch({
                    type: actionType.FETCH_PLAYS_LISTS_ERROR,
                    error: error
                })
            })
    }

};