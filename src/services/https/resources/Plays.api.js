import { AppWebRequest } from "../NetworkManager";
import { getUserId } from "../AuthHelper";

export const getPlaysLists = (params) => {
    return AppWebRequest(`/detections/owners/${getUserId()}/list-plays`, "get", { params: params })
}

export const getAllRadioStations = (limit) => {
    return AppWebRequest('/radiostations', 'get', {
        params: {
            shortListed: true,
            limit: limit || 2500,
            sort: "name"
        }
    })
}

export const getSonicHistoryDataFile = (format, params) => {
    return AppWebRequest(`/detections/owners/${getUserId()}/export/history-of-sonickey/${format}`, "get", { params: params, responseType: "blob" })
}
