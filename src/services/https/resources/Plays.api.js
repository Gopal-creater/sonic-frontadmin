import { AppWebRequest } from "../NetworkManager";
import { getUserId } from "../AuthHelper";

export const getPlaysLists = (params) => {
    return AppWebRequest(`/detections/owners/${getUserId()}/list-plays`, "get", { params: params })
}

export const getCountriesRadioStations = (country, _offset = 0, _limit = 300) => {
    return AppWebRequest(`/radiostations?country=${country}&skip=${_offset}&limit=${_limit}`, "get")
}