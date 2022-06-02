import cogoToast from "cogo-toast"
import fileDownload from "js-file-download"
import moment from 'moment'
import store from "../.."
import { getRoleWiseID } from "../../../services/https/AuthHelper"
import { encodeFromFile, encodeFromTrack, exportTrack, getEncodeSearchTracks, getTracks } from "../../../services/https/resources/EncodeApi/encodeApi"
import { log } from "../../../utils/app.debug"
import * as actionTypes from "../actionTypes"

export const encodeFromFileAction = (mediaFile, metaData) => {
    const formData = new FormData();
    let userRoleWiseId = getRoleWiseID()
    let isRightsHolderForEncode = metaData?.isRightsHolderForEncode === null || metaData?.isRightsHolderForEncode === "NO" ? false : true
    let isAuthorizedForEncode = metaData?.isAuthorizedForEncode === null || metaData?.isAuthorizedForEncode === "NO" ? false : true
    formData.append("mediaFile", mediaFile);
    formData.append("data", JSON.stringify({
        ...metaData,
        owner: userRoleWiseId?.owner,
        company: userRoleWiseId?.company,
        partner: userRoleWiseId?.partner,
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
    let userRoleWiseId = getRoleWiseID()
    let encodePayload = {
        track: encodeReducer?.selectedExistingFile?._id,
        data: {
            ...encodeReducer.metaData,
            owner: userRoleWiseId?.owner,
            company: userRoleWiseId?.company,
            partner: userRoleWiseId?.partner,
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

export const encodeAgainFromTrackAction = (encodePayload) => {
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

export const getTracksAction = (startDate, endDate, page, limit, filters, playsBy, sortBy, isAscending) => {
    let newEndDate = moment(endDate).endOf("days").toISOString()
    let params = new URLSearchParams(`createdAt>=${moment(startDate).format("YYYY-MM-DD")}&createdAt<=date(${newEndDate})`)
    params.append("limit", limit);
    params.append("page", page)
    params.append("skip", page > 1 ? (page - 1) * limit : 0)

    let userRoleWiseId = getRoleWiseID()

    if (userRoleWiseId?.company) params.append("company", userRoleWiseId?.company)
    if (userRoleWiseId?.partner) params.append("partner", userRoleWiseId?.partner)
    if (userRoleWiseId?.owner) params.append("owner", userRoleWiseId?.owner)

    let filterArray = []

    if (filters?.title) filterArray.push({ "trackMetaData.contentName": { "$regex": filters?.title, "$options": "i" } }, { "originalFileName": { "$regex": filters?.title, "$options": "i" } })
    if (filters?.id) filterArray.push({ "_id": { "$regex": filters?.id, "$options": "i" } })
    if (filters?.artist) filterArray.push({ "trackMetaData.contentOwner": { "$regex": filters?.artist, "$options": "i" } }, { "artist": { "$regex": filters?.artist, "$options": "i" } })
    if (filters?.distributor) filterArray.push({ "trackMetaData.distributor": { "$regex": filters?.distributor, "$options": "i" } })
    if (filters?.company) filterArray.push({ "company.name": { "$regex": filters?.company, "$options": "i" } })
    if (filters?.user) filterArray.push({ "owner.name": { "$regex": filters?.user, "$options": "i" } })

    if (filterArray.length !== 0) params.append("filter", JSON.stringify({ "$or": filterArray }))

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
    let userRoleWiseId = getRoleWiseID()

    if (userRoleWiseId?.company) params.append("company", userRoleWiseId?.company)
    if (userRoleWiseId?.partner) params.append("partner", userRoleWiseId?.partner)
    if (userRoleWiseId?.owner) params.append("owner", userRoleWiseId?.owner)

    const addiFilter = {
        "$or": [{ "trackMetaData.contentName": { "$regex": title, "$options": "i" } }, { "originalFileName": { "$regex": title, "$options": "i" } }]
    }
    params.append("filter", JSON.stringify(addiFilter))
    return (dispatch) => {
        dispatch({ type: actionTypes.SET_ENCODESEARCHTRACK_LOADING })
        getEncodeSearchTracks(params)
            .then((res) => {
                dispatch({ type: actionTypes.SET_ENCODESEARCHTRACK_SUCCESS, data: res })
                log("Encode search track response", res)
            }).catch((err) => {
                dispatch({ type: actionTypes.SET_ENCODESEARCHTRACK_ERROR, data: err?.message })
                log("Encode search track error", err?.message)
            })
    }
}

export const exportTrackAction = (format, limit = 2000, filters) => {
    let encode = store.getState()?.encode
    let trackFilters = store.getState()?.encode?.tracks?.trackFilters
    let userRoleWiseId = getRoleWiseID()
    let startDate = encode?.tracks?.startDate
    let endDate = encode?.tracks?.endDate

    let params = new URLSearchParams(`createdAt>=${moment(encode?.tracks?.startDate).format("YYYY-MM-DD")}&createdAt<=date(${moment(endDate).endOf("days").toISOString()})`)

    params.append("limit", limit);

    if (userRoleWiseId?.company) params.append("company", userRoleWiseId?.company)
    if (userRoleWiseId?.partner) params.append("partner", userRoleWiseId?.partner)
    if (userRoleWiseId?.owner) params.append("owner", userRoleWiseId?.owner)

    let filterArray = []

    if (filters?.title) filterArray.push({ "trackMetaData.contentName": { "$regex": filters?.title, "$options": "i" } }, { "originalFileName": { "$regex": filters?.title, "$options": "i" } })
    if (filters?.id) filterArray.push({ "_id": { "$regex": filters?.id, "$options": "i" } })
    if (filters?.artist) filterArray.push({ "trackMetaData.contentOwner": { "$regex": filters?.artist, "$options": "i" } }, { "artist": { "$regex": filters?.artist, "$options": "i" } })
    if (filters?.distributor) filterArray.push({ "trackMetaData.distributor": { "$regex": filters?.distributor, "$options": "i" } })
    if (filters?.company) filterArray.push({ "company.name": { "$regex": filters?.company, "$options": "i" } })
    if (filters?.user) filterArray.push({ "owner.name": { "$regex": filters?.user, "$options": "i" } })

    if (filterArray.length !== 0) params.append("filter", JSON.stringify({ "$or": filterArray }))

    return (dispatch) => {
        exportTrack(format, params).then((res) => {
            if (format === "xlsx") {
                fileDownload(res, `${"Tracks"} Export-xlsx-(${moment(startDate).format("YYYY_MM_DD")}-to-${moment(endDate).format("YYYY_MM_DD")})_${format}.xlsx`);
            } else {
                fileDownload(res, `${"Tracks"} Export-csv-(${moment(startDate).format("YYYY_MM_DD")}-to-${moment(endDate).format("YYYY_MM_DD")})_${format}.csv`);
            }
        }).catch((err) => {
            log("Error getting export track")
            cogoToast.error(err?.message)
        })
    }
}