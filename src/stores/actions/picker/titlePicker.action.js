import store from "../..";
import { findCompany, findTitle, findUser } from "../../../services/https/resources/Picker.api";
import { log } from "../../../utils/app.debug";
import * as actionTypes from "../actionTypes"

export const getTrackTitleAction = (autoCompleteValue) => {
    return (dispatch) => {
        dispatch({ type: actionTypes.SET_ENCODESEARCHTRACK_LOADING });
        findTitle(autoCompleteValue).then((response) => {
            log("TrackTitleAction Found", response)
            dispatch({ type: actionTypes.SET_ENCODESEARCHTRACK_SUCCESS, data: response })
        }).catch((error) => {
            log("TrackTitleAction Error", error)
            dispatch({ type: actionTypes.SET_ENCODESEARCHTRACK_ERROR, data: error?.message })
        })
    }
}

export const getCompanyNameAction = (autoCompleteValue) => {
    return (dispatch) => {
        dispatch({ type: actionTypes.SET_SEARCH_COMPANY_LOADING });
        findCompany(autoCompleteValue).then((response) => {
            log("Company Search Found", response)
            dispatch({ type: actionTypes.SET_SEARCH_COMPANY_SUCCESS, data: response })
        }).catch((error) => {
            log("Company Search Error", error)
            dispatch({ type: actionTypes.SET_SEARCH_COMPANY_ERROR, data: error?.message })
        })
    }
}

export const getUsersNameAction = (autoCompleteValue) => {
    return (dispatch) => {
        dispatch({ type: actionTypes.SET_SEARCH_USER_LOADING });
        findUser(autoCompleteValue).then((response) => {
            log("User Search Found", response)
            dispatch({ type: actionTypes.SET_SEARCH_USER_SUCCESS, data: response })
        }).catch((error) => {
            log("User Search Error", error)
            dispatch({ type: actionTypes.SET_SEARCH_USER_ERROR, data: error?.message })
        })
    }
}