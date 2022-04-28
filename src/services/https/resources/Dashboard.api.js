import { getUserId } from "../AuthHelper"
import { AppWebRequest } from "../NetworkManager"

export const getTotalSonicKeysCount = (params) => {
    return AppWebRequest(`detections/owners/${getUserId()}/plays-dashboard-data`, 'get', { params: params })
}

// export const getTotalSubscribedStation = () => {
//     return AppWebRequest(`/radiomonitors/owners/${getUserId()}/subscribed-stations-count`)
// }

export const getMostPlayedStationsData = (params) => {
    return AppWebRequest(`detections/owners/${getUserId()}/radioStations/top-radiostations-with-plays-details`, 'get', { params: params })
}


export const exportDashboardData = (fileFormat, params) => {
    return AppWebRequest(`/detections/owners/${getUserId()}/export/dashboard-plays-view/${fileFormat}`, 'get', { params: params, responseType: "blob" });
}

export const exportPlaysData = (sonicKey, format, params) => {
    return AppWebRequest(`/detections/owners/${getUserId()}/export/history-of-sonickey/${sonicKey}/${format}`, 'get', { params: params, responseType: "blob" });
}

export const getMonitorDashboardData = (params) => {
    return AppWebRequest(`detections/owners/${getUserId()}/get-monitor-dashboard-data`, "get", { params: params })
}