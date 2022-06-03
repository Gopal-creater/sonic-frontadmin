import { AppWebRequest } from "../../NetworkManager";

export const getAllSonicKeys = (params) => {
    return AppWebRequest(`/sonic-keys`, "get", { params: params })
}