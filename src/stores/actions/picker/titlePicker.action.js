import store from "../..";
import { findTitle } from "../../../services/https/resources/Picker.api";
import { log } from "../../../utils/app.debug";
import * as actionTypes from "../actionTypes"

export const getTrackTitleAction = () => {
    return (dispatch) => {
        dispatch({ type: actionTypes.SET_ENCODESEARCHTRACK_LOADING });
        findTitle(store?.getState()?.encode?.encodeSearchTrack?.typedValue).then((response) => {
            log("TrackTitleAction Found", response)
            dispatch({ type: actionTypes.SET_ENCODESEARCHTRACK_SUCCESS, data: response })
        }).catch((error) => {
            log("TrackTitleAction Error", error)
            dispatch({ type: actionTypes.SET_ENCODESEARCHTRACK_ERROR, data: error?.message })
        })
    }
}