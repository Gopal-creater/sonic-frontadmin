import { findTitle } from "../../../services/https/resources/Picker.api";
import { log } from "../../../utils/app.debug";

export const getTrackTitleAction = (actions, data) => {
    return (dispatch) => {
        dispatch({ type: actions.loading });
        findTitle(data).then((response) => {
            log("TrackTitleAction Found", response)
            dispatch({ type: actions.success, data: response })
        }).catch((error) => {
            log("TrackTitleAction Error", error)
            dispatch({ type: actions.error, data: error?.message })
        })
    }
}