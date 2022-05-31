import cogoToast from "cogo-toast"
import store from "../.."
import { userRoles } from "../../../constants/constants"
import { getUserId } from "../../../services/https/AuthHelper"
import { encodeFromFile, encodeFromTrack, getEncodeSearchTracks, getTracks } from "../../../services/https/resources/EncodeApi/encodeApi"
import { log } from "../../../utils/app.debug"
import * as actionTypes from "../actionTypes"

export const encodeFromFileAction = (mediaFile, metaData) => {
    const formData = new FormData();
    let isRightsHolderForEncode = metaData?.isRightsHolderForEncode === null || metaData?.isRightsHolderForEncode === "NO" ? false : true
    let isAuthorizedForEncode = metaData?.isAuthorizedForEncode === null || metaData?.isAuthorizedForEncode === "NO" ? false : true
    formData.append("mediaFile", mediaFile);
    formData.append("data", JSON.stringify({
        ...metaData,
        isRightsHolderForEncode: isRightsHolderForEncode,
        isAuthorizedForEncode: isAuthorizedForEncode
    }));

    return (dispatch) => {
        dispatch({ type: actionTypes.SET_ENCODE_LOADING })
        encodeFromFile(formData).then((response) => {
            dispatch({ type: actionTypes.SET_ENCODE_SUCCESS, data: response })
        }).catch((err) => {
            log("Encode from file error", err)
            dispatch({ type: actionTypes.SET_ENCODE_ERROR, data: err?.message })
            cogoToast.error(err?.message)
        })
    }
}

export const encodeFromTrackAction = () => {
    let encodeReducer = store.getState()?.encode
    let userRole = store.getState().user?.userProfile?.data?.userRole
    let encodePayload = {
        track: encodeReducer?.selectedExistingFile?._id,
        data: {
            ...encodeReducer.metaData,
            owner: userRole === userRoles.PORTAL_USER ? getUserId() : "",
            company: userRole === userRoles.COMPANY_ADMIN || userRole === userRoles.COMPANY_USER ? getUserId() : "",
            partner: userRole === userRoles.PARTNER_ADMIN || userRole === userRoles.PARTNER_USER ? getUserId() : "",
            channel: encodeReducer?.selectedExistingFile?.channel
        }
    }

    return (dispatch) => {
        dispatch({ type: actionTypes.SET_ENCODE_LOADING })
        encodeFromTrack(encodePayload).then((res) => {
            dispatch({ type: actionTypes.SET_ENCODE_SUCCESS, data: res })
        }).catch((err) => {
            log("Encode from track error", err)
            dispatch({ type: actionTypes.SET_ENCODE_ERROR, data: err?.message })
            cogoToast.error(err?.message)
        })
    }
}

export const getTracksAction = (startDate, endDate, page, limit, playsBy, sortBy, isAscending) => {
    let params = new URLSearchParams()
    params.append("limit", limit);
    params.append("page", page)
    params.append("skip", page > 1 ? (page - 1) * limit : 0)

    let userRole = store.getState().user?.userProfile?.data?.userRole
    if (userRole === userRoles.COMPANY_ADMIN || userRole === userRoles.COMPANY_USER) {
        params.append("company", getUserId())
    }
    else if (userRole === userRoles.PARTNER_ADMIN || userRole === userRoles.PARTNER_USER) {
        params.append("partner", getUserId())
    }
    else {
        params.append("owner", getUserId())
    }

    return (dispatch) => {
        dispatch({ type: actionTypes.SET_TRACKS_LOADING })
        getTracks(params).then((res) => {
            log("Tracks response", res)
            dispatch({ type: actionTypes.SET_TRACKS_SUCCESS, data: res })
        }).catch((err) => {
            log("Tracks Error", err)
            dispatch({ type: actionTypes.SET_TRACKS_ERROR, data: err?.message })
            cogoToast.error(err?.message)
        })
    }
}

export const getEncodeSearchTracksAction = (title) => {
    let params = new URLSearchParams()
    let userRole = store.getState().user?.userProfile?.data?.userRole

    if (userRole === userRoles.COMPANY_ADMIN || userRole === userRoles.COMPANY_USER) {
        params.append("company", getUserId())
    }
    else if (userRole === userRoles.PARTNER_ADMIN || userRole === userRoles.PARTNER_USER) {
        params.append("partner", getUserId())
    }
    else {
        params.append("owner", getUserId())
    }
    return (dispatch) => {
        dispatch({ type: actionTypes.SET_ENCODESEARCHTRACK_LOADING })
        getEncodeSearchTracks(params, title)
            .then((res) => {
                dispatch({ type: actionTypes.SET_ENCODESEARCHTRACK_SUCCESS, data: res })
                log("Encode search track response", res)
            }).catch((err) => {
                dispatch({ type: actionTypes.SET_ENCODESEARCHTRACK_ERROR, data: err?.message })
                log("Encode search track error", err?.message)
            })
    }
}