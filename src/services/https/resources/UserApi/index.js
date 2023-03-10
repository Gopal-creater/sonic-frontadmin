import { AppWebRequest } from "../../NetworkManager"

export const getUserProfile = (jwtToken) => {
    const config = {
        headers: { Authorization: `Bearer ${jwtToken}` }
    };
    return AppWebRequest("/users/@me", "get", config)
}

export const fetchUsers = (params) => {
    return AppWebRequest(`/users`, "get", { params: params })
}

export const createUser = (payload) => {
    return AppWebRequest(`/users`, 'post', { data: payload })
}

export const updateUser = (id, payload) => {
    return AppWebRequest(`/users/${id}`, 'put', { data: payload })
}
