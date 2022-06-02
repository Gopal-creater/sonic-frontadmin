import { getRoleWiseID } from "../../../services/https/AuthHelper";
import { findCompany, findTitle, findUser } from "../../../services/https/resources/Picker.api";
import { log } from "../../../utils/app.debug";
import * as actionTypes from "../actionTypes"

export const getTrackTitleAction = (autoCompleteValue) => {
    let params = new URLSearchParams();
    let userRoleWiseId = getRoleWiseID()
    if (userRoleWiseId?.company) params.append("company", userRoleWiseId?.company)
    if (userRoleWiseId?.partner) params.append("partner", userRoleWiseId?.partner)
    if (userRoleWiseId?.owner) params.append("owner", userRoleWiseId?.owner)

    if (autoCompleteValue) {
        params.append("relation_sonicKey.contentFileName", `/${autoCompleteValue}/i`)
    }

    return (dispatch) => {
        dispatch({ type: actionTypes.SET_ENCODESEARCHTRACK_LOADING });
        findTitle(params).then((response) => {
            log("TrackTitleAction Found", response)
            dispatch({ type: actionTypes.SET_ENCODESEARCHTRACK_SUCCESS, data: response })
        }).catch((error) => {
            log("TrackTitleAction Error", error)
            dispatch({ type: actionTypes.SET_ENCODESEARCHTRACK_ERROR, data: error?.message })
        })
    }
}

export const getCompanyNameAction = (autoCompleteValue) => {
    let params = new URLSearchParams();
    let userRoleWiseId = getRoleWiseID()
    if (userRoleWiseId?.company) params.append("company", userRoleWiseId?.company)
    if (userRoleWiseId?.partner) params.append("partner", userRoleWiseId?.partner)
    if (userRoleWiseId?.owner) params.append("owner", userRoleWiseId?.owner)

    if (autoCompleteValue) {
        params.append("name", `/${autoCompleteValue}/i`)
    }

    return (dispatch) => {
        dispatch({ type: actionTypes.SET_SEARCH_COMPANY_LOADING });
        findCompany(params).then((response) => {
            log("Company Search Found", response)
            dispatch({ type: actionTypes.SET_SEARCH_COMPANY_SUCCESS, data: response })
        }).catch((error) => {
            log("Company Search Error", error)
            dispatch({ type: actionTypes.SET_SEARCH_COMPANY_ERROR, data: error?.message })
        })
    }
}

export const getUsersNameAction = (autoCompleteValue) => {
    let params = new URLSearchParams();
    let userRoleWiseId = getRoleWiseID()
    if (userRoleWiseId?.company) params.append("company", userRoleWiseId?.company)
    if (userRoleWiseId?.partner) params.append("partner", userRoleWiseId?.partner)
    if (userRoleWiseId?.owner) params.append("owner", userRoleWiseId?.owner)

    if (autoCompleteValue) {
        let options = { $or: [{ "username": { "$regex": autoCompleteValue, "$options": "i" } }, { "_id": { "$regex": autoCompleteValue, "$options": "i" } }] }
        params.append("filter", JSON.stringify(options))
    }
    return (dispatch) => {
        dispatch({ type: actionTypes.SET_SEARCH_USER_LOADING });
        findUser(params).then((response) => {
            log("User Search Found", response)
            dispatch({ type: actionTypes.SET_SEARCH_USER_SUCCESS, data: response })
        }).catch((error) => {
            log("User Search Error", error)
            dispatch({ type: actionTypes.SET_SEARCH_USER_ERROR, data: error?.message })
        })
    }
}