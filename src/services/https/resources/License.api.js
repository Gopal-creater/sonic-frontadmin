import { getUserId } from "../AuthHelper";
import { AppWebRequest } from "../NetworkManager";

export const getLicenceKey = (params) => {
    return AppWebRequest(`/users/${getUserId()}/licenses`, "get", { params: params });
}

export const addLicenceKey = (payload) => {
    return AppWebRequest(`/license-keys`, "post", { data: payload });
}