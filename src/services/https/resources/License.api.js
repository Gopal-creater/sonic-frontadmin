import { AppWebRequest } from "../NetworkManager";

export const getLicenceKey = (params) => {
    return AppWebRequest(`/license-keys`, "get", { params: params });
}

export const addLicenceKey = (payload) => {
    return AppWebRequest(`/license-keys`, "post", { data: payload });
}

export const updateLicenceKey = (key, payload) => {
    return AppWebRequest(`/license-keys/${key}`, "put", { data: payload });
}

export const addUserToLicense = (id, user) => {
    return AppWebRequest(`/license-keys/${id}/add-new-user`, "put", { data: { user: user } });
}