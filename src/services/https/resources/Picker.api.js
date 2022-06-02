import { getUserId } from "../AuthHelper";
import { AppWebRequest } from "../NetworkManager";

export const findTitle = (params) => {
    return AppWebRequest(`detections/owners/${getUserId()}/list-plays`, "get", { params: params });
}

export const findCompany = (params) => {
    return AppWebRequest(`/companies`, "get", { params: params });
}

export const findUser = (params) => {
    return AppWebRequest(`/users`, "get", { params: params });
}
