import { getUserId } from "../AuthHelper"
import { AppWebRequest } from "../NetworkManager"

export const getTotalSonicKeysCount = (params) => {
    return AppWebRequest(`detections/owners/${getUserId()}/plays-dashboard-data`, 'get', { params: params })
}

export const getTotalSubscribedStation = () => {
    return AppWebRequest(`/radiomonitors/owners/${getUserId()}/subscriber-count`)
}

export const getMostPlayedStationsData = (params) => {
    return AppWebRequest(`detections/owners/${getUserId()}/radioStations/top-radiostations-with-plays-details`, 'get', { params: params })
}

export const getGraphData = (params) => {
    return AppWebRequest(`/detections/owners/${getUserId()}/plays-dashboard-graph-data`, 'get', { params: params });
}