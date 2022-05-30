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
        track: encodeReducer?.encodeSearchTrack?.selectedTrack?._id,
        data: {
            sonicKey: encodeReducer?.encodeSearchTrack?.selectedTrack?._id,
            owner: userRole === userRoles.PORTAL_USER ? getUserId() : "",
            company: userRole === userRoles.COMPANY_ADMIN || userRole === userRoles.COMPANY_USER ? getUserId() : "",
            partner: userRole === userRoles.PARTNER_ADMIN || userRole === userRoles.PARTNER_USER ? getUserId() : "",
            channel: encodeReducer?.encodeSearchTrack?.selectedTrack?.channel,
            channelUuid: "",
            encodingStrength: 15,
            contentType: encodeReducer?.metaData?.contentType,
            contentDescription: encodeReducer?.metaData?.contentDescription,
            contentCreatedDate: encodeReducer?.encodeSearchTrack?.selectedTrack?.createdAt,
            contentDuration: encodeReducer?.metaData?.contentDuration,
            contentSize: encodeReducer?.metaData?.contentSize,
            contentFilePath: encodeReducer?.encodeSearchTrack?.selectedTrack?.localFilePath,
            s3FileMeta: encodeReducer?.encodeSearchTrack?.selectedTrack?.s3OriginalFileMeta,
            s3OriginalFileMeta: encodeReducer?.encodeSearchTrack?.selectedTrack?.s3OriginalFileMeta,
            contentFileType: encodeReducer?.metaData?.contentFileType,
            contentEncoding: encodeReducer?.metaData?.contentEncoding,
            contentSamplingFrequency: encodeReducer?.metaData?.contentSamplingFrequency,
            isrcCode: encodeReducer?.metaData?.isrcCode,
            iswcCode: encodeReducer?.metaData?.iswcCode,
            tuneCode: encodeReducer?.metaData?.tuneCode,
            contentName: encodeReducer?.metaData?.contentName,
            contentOwner: encodeReducer?.metaData?.contentOwner,
            contentValidation: true,
            contentFileName: "",
            originalFileName: encodeReducer?.encodeSearchTrack?.selectedTrack?.originalFileName,
            contentQuality: encodeReducer?.metaData?.contentQuality,
            additionalMetadata: { message: encodeReducer?.metaData?.additionalMetadata?.message },
            isRightsHolderForEncode: encodeReducer?.metaData?.isRightsHolderForEncode === null || encodeReducer?.metaData?.isRightsHolderForEncode === "NO" ? false : true,
            isAuthorizedForEncode: encodeReducer?.metaData?.isAuthorizedForEncode === null || encodeReducer?.metaData?.isAuthorizedForEncode === "NO" ? false : true,
            distributor: encodeReducer?.metaData?.distributor,
            version: encodeReducer?.metaData?.version,
            label: encodeReducer?.metaData?.label,
            createdBy: "",
            updatedBy: ""
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
    return (dispatch) => {
        dispatch({ type: actionTypes.SET_ENCODESEARCHTRACK_LOADING })
        getEncodeSearchTracks(title)
            .then((res) => {
                dispatch({ type: actionTypes.SET_ENCODESEARCHTRACK_SUCCESS, data: res })
                log("Encode search track response", res)
            }).catch((err) => {
                dispatch({ type: actionTypes.SET_ENCODESEARCHTRACK_ERROR, data: err?.message })
                log("Encode search track error", err?.message)
            })
    }
}