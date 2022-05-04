import { findTitle } from "../../../services/https/resources/Picker.api";
import { log } from "../../../utils/app.debug";
import * as actionTypes from "../actionTypes";

export const findTitleAction = (title) => {
    return (dispatch) => {
        dispatch({ type: actionTypes.FETCH_TITLE_LOADING });
        findTitle(title).then((response) => {
            log("Title Found", response)
            dispatch({ type: actionTypes.FETCH_TITLE_SUCCESS, data: response })
        }).catch((error) => {
            log("Title Error", error)
            dispatch({ type: actionTypes.FETCH_TITLE_ERROR, data: error?.message })
        })
    }
}