import { AppWebRequest } from "../NetworkManager";

export const fetchSubscribedRadioMonitors = (params) => {
    return AppWebRequest(`/radiostations`, "get", { params: params });
}

export const getRadioMonitorsPlaysCount = (params) => {
    return AppWebRequest(`/detections/count`, "get", { params: params });
}

export const getSonicStreamDetails = (channel, params) => {
    return AppWebRequest(`/detections/${channel}/data`, "get", { params: params });
}
