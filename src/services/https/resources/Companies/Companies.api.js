import { AppWebRequest } from "../../NetworkManager";

export const getAllCompanies = (params) => {
    return AppWebRequest(`/companies`, "get", { params: params })
}

export const createCompany = (payload) => {
    return AppWebRequest(`/companies`, "post", { data: payload })
}