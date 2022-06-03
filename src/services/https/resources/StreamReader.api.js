import { AppWebRequest } from "../NetworkManager";

export const fetchRadioMonitors = (params) => {
    return AppWebRequest(`/radiomonitors/subscribed-stations-list`, "get", { params: params });
}

export const getRadioMonitorsPlaysCount = (params) => {
    return AppWebRequest(`/detections/count`, "get", { params: params });
}

export const getSonicStreamDetails = (params) => {
    return AppWebRequest(`/detections/list-plays`, "get", { params: params });
}
