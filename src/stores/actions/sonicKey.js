import * as actionType from './actionTypes';
import Communication from "../../services/https/Communication";


//SonicKeys
// export const fetchSonicKeys = () =>{ change for pagination
export const fetchSonicKeys = (limit = 10, index = 0) => {
    index = index > 1 ? (index - 1) * limit : 0
    console.log("index", index);
    return dispatch => {
        dispatch({
            type: actionType.SONIC_KEY_LOADING
        })
        // Communication.fetchMySonicKey() change for pagination
        Communication.fetchMySonicKey(limit, index)
            .then((data) => {
                console.log("key's data", data);
                dispatch({
                    type: actionType.SONIC_KEY_SUCCESS,
                    data: data
                })
            }).catch(error => {
                console.log(error);
                dispatch({
                    type: actionType.SONIC_KEY_FAIL,
                    error: error
                })
            })
    }

};

export const actionSorting = (sortdata, propFrom) => {
    return (dispatch) => {
        dispatch({ type: actionType.SORTING, data: sortdata, propFrom: propFrom });
    };
};