import cogoToast from "cogo-toast"
import { encodeFromFile, getEncodedTrack } from "../../../services/https/resources/EncodeApi/encodeApi"
import { log } from "../../../utils/app.debug"
import * as actionTypes from "../actionTypes"

export const encodeFromFileAction = (formData) => {
    return (dispatch) => {
        dispatch({ type: actionTypes.SET_ENCODE_LOADING })
        encodeFromFile(formData).then((response) => {
            dispatch({ type: actionTypes.SET_ENCODE_SUCCESS, data: response })
        }).catch((err) => {
            dispatch({ type: actionTypes.SET_ENCODE_ERROR, data: err?.message })
            cogoToast.error(err?.message)
        })
    }
}

export const encodeFromTrackAction = () => {

}

export const getEncodedTrackAction = () => {
    return (dispatch) => {
        // dispatch({ type: actionTypes.SET_ENCODEDTRACK_LOADING })
        getEncodedTrack().then((res) => {
            log("Encoded track response", res)
            // dispatch({ type: actionTypes.SET_ENCODEDTRACK_SUCCESS, data: res })
        }).catch((err) => {
            // dispatch({ type: actionTypes.SET_ENCODEDTRACK_ERROR })
            cogoToast.error(err?.message)
        })
    }
}