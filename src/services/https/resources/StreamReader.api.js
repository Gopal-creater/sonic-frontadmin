import { getUserId } from "../AuthHelper";
import { AppWebRequest } from "../NetworkManager";

export const fetchRadioStations = (params) => {
    return AppWebRequest(`/radiomonitors/owners/${getUserId()}/subscribed-stations-list`, "get", { params: params });
}

export const getSubscribedStationCount = () => {
    return AppWebRequest(`/radiomonitors/owners/${getUserId()}/subscribed-stations-count`);
}