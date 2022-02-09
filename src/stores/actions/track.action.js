import { getTrackList } from "../../services/https/resources/Track.api"
import { log } from "../../utils/app.debug"
import * as actionTypes from "../actions/actionTypes"

export const getTrackListAction = () => {
    return (dispatch) => {
        dispatch({ type: actionTypes.SET_TRACK_LOADING })
        getTrackList().then((data) => {
            log("Track Api Data", data)
            dispatch({ type: actionTypes.SET_TRACK_SUCCESS, data: data })
        }).catch((error) => {
            log("Track Api Error", error)
            dispatch({ type: actionTypes.SET_TRACK_ERROR, data: error?.message })
        })
    }
}