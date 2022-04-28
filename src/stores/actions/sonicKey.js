import * as actionType from './actionTypes';
import Communication from "../../services/https/Communication";
import { log } from '../../utils/app.debug';

export const fetchSonicKeys = (limit = 10, index = 0) => {
    index = index > 1 ? (index - 1) * limit : 0
    log("index", index);
    return dispatch => {
        dispatch({
            type: actionType.SONIC_KEY_LOADING
        })
        // Communication.fetchMySonicKey() change for pagination
        Communication.fetchMySonicKey(limit, index)
            .then((data) => {
                log("key's data", data);
                dispatch({
                    type: actionType.SONIC_KEY_SUCCESS,
                    data: data
                })
            }).catch(error => {
                log(error);
                dispatch({
                    type: actionType.SONIC_KEY_FAIL,
                    error: error
                })
            })
    }

};