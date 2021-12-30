import { AppWebRequest } from "../NetworkManager";
import { getUserId } from "../AuthHelper";

export const getPlaysLists = (params) => {
    return AppWebRequest(`/detections/owners/${getUserId()}/list-plays`, "get", { params: params })
}

export const getAllRadioStations = () => {
    return AppWebRequest('/radiostations', 'get', {
        params: {
            limit: 1000
        }
    })
}

export const getSonicHistoryDataFile = (format, params) => {
    return AppWebRequest(`/detections/owners/${getUserId()}/export/history-of-sonickey/${format}`, "get", { params: params, responseType: "blob" })
}
