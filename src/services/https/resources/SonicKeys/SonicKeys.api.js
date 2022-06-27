import { AppWebRequest } from "../../NetworkManager";

export const getAllSonicKeys = (params) => {
    return AppWebRequest(`/sonic-keys`, "get", { params: params })
}

export const editSonicMetaData = (key, payload) => {
    return AppWebRequest(`sonic-keys/${key}`, 'patch', { data: payload })
}