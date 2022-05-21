import cogoToast from "cogo-toast"
import { getUserProfile } from "../../../services/https/resources/UserApi"
import * as actionTypes from "../actionTypes"

export const getUserProfileAction = () => {
    return (dispatch) => {
        dispatch({ type: actionTypes.GET_USERPROFILE_LOADING })
        getUserProfile().then((response) => {
            dispatch({ type: actionTypes.GET_USERPROFILE_DATA, data: response })
        }).catch((err) => {
            dispatch({ type: actionTypes.GET_USERPROFILE_ERROR, data: err?.message })
            cogoToast.error(err?.message)
        })
    }
}