import * as actionType from './actionTypes';
import Communication from "../../services/https/Communication";
import { log } from '../../utils/app.debug';

//LicenceKeys
export const fetchLicenceKeys = () => {
    return dispatch => {
        dispatch({
            type: actionType.LIC_KEY_LOADING
        })
        Communication.fetchLicenceKey()
            .then((data) => {
                log("key's data", data);
                dispatch({
                    type: actionType.LIC_KEY_SUCCESS,
                    data: data
                })
            }).catch(error => {
                log(error);
                dispatch({
                    type: actionType.LIC_KEY_FAIL,
                    error: error
                })
            })
    }

};
