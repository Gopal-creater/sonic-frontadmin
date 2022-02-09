import { AppWebRequest } from "../NetworkManager"

export const getCountries = (params) => {
    return AppWebRequest(``, "get", { params: params });
}