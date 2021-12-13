import Communication from '../../services/https/Communication';
import { log } from '../../utils/app.debug';
import * as actionType from './actionTypes';

export const fetchPlaysLists = (limit = 10, index = 0) => {
    index = index > 1 ? (index - 1) * limit : 0
    return dispatch => {
        dispatch({
            type: actionType.FETCH_PLAYS_LISTS_LOADING
        })
        Communication.fetchPlayList(limit, index)
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