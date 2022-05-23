import { AppWebRequest } from "../../NetworkManager"

export const fetchUsers = (params) => {
    return AppWebRequest(`/users`, "get", { params: params })
}

export const createUser = (payload) => {
    return AppWebRequest(`/users`, 'post', { data: payload })
}