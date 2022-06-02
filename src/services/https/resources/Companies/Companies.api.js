import { AppWebRequest } from "../../NetworkManager";

export const getAllCompanies = (params) => {
    return AppWebRequest(`/companies`, "get", { params: params })
}

export const createCompany = (payload) => {
    return AppWebRequest(`/companies`, "post", { data: payload })
}

export const updateCompanyProfile = (payload, id) => {
    return AppWebRequest(`/companies/${id}`, "put", { data: payload })
}