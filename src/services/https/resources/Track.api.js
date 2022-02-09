import { AppWebRequest } from "../NetworkManager"

export const getTrackList = (params) => {
    return AppWebRequest("", "get", { params: params })
}