import { AppWebRequest } from "../../NetworkManager"

export const getMonitorList = (params) => {
    return AppWebRequest(`detections/list-plays`, "get", { params: params })
}

export const getMonitorExport = (format, params) => {
    return AppWebRequest(`/detections/export-plays-by/${format}`, "get", { params: params, responseType: "blob" })
}