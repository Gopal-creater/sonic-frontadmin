import cogoToast from "cogo-toast"
import { encodeFile } from "../../../services/https/resources/EncodeApi/encodeApi"
import * as actionTypes from "../actionTypes"

export const encodeFileAction = (formData) => {
    return (dispatch) => {
        dispatch({ type: actionTypes.SET_ENCODE_LOADING })
        encodeFile(formData).then((response) => {
            dispatch({ type: actionTypes.SET_ENCODE_SUCCESS, data: response })
        }).catch((err) => {
            dispatch({ type: actionTypes.SET_ENCODE_ERROR, data: err?.message })
            cogoToast.error(err?.message)
        })
    }
}