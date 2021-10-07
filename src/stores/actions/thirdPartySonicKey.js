import * as actionType from './actionTypes';
import Communication from "../../services/https/Communication";
import moment from 'moment';


//ThirdPartySonicKeys
export const fetchThirdPartySonicKeys = (limit, page, channel, startDate, endDate) => {
    let newEndDate = new Date(endDate)
    let params = new URLSearchParams(`detectedAt>=${moment(startDate).format("YYYY-MM-DD")}&detectedAt<=${moment(newEndDate?.setDate?.(newEndDate?.getDate?.() + 1)).format("YYYY-MM-DD")}`)
    params.append("limit", limit)
    params.append("skip", page > 1 ? (page - 1) * limit : 0)
    // params.append("sort", "-detectedAt")
    params.append("page", page)

    return dispatch => {
        dispatch({
            type: actionType.THIRDPARTY_SONIC_KEY_LOADING
        })
        Communication.fetchThirdPartySonicKeys(channel, params)
            .then((data) => {
                dispatch({
                    type: actionType.THIRDPARTY_SONIC_KEY_SUCCESS,
                    data: data
                })
            }).catch(error => {
                console.log(error);
                dispatch({
                    type: actionType.THIRDPARTY_SONIC_KEY_FAIL,
                    error: error
                })
            })
    }
};