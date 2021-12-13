import { getUserId } from "../AuthHelper"
import { AppWebRequest } from "../NetworkManager"

export const getTotalSonicKeysDetected = (params) => {
    return AppWebRequest(`detections/owners/${getUserId()}/plays-dashboard-data`, 'get', { params: params })
}

export const getTotalSubscribedStation = () => {
    return AppWebRequest(`/radiomonitors/owners/${getUserId()}/subscriber-count`)
}