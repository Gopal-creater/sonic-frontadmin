import cogoToast from "cogo-toast"
import * as actionTypes from "../actionTypes"
import store from "../..";
import { log } from "../../../utils/app.debug";
import { createCompany, getAllCompanies, updateCompanyProfile } from "../../../services/https/resources/Companies/Companies.api";
import { userRoles } from "../../../constants/constants";
import { getRoleWiseID, getUserId } from "../../../services/https/AuthHelper";


export const createCompanyAction = (payload) => {
    return dispatch => {
        dispatch({ type: actionTypes.CREATE_COMPANY_LOADING });
        createCompany(payload).then((res) => {
            dispatch({ type: actionTypes.CREATE_COMPANY_SUCCESS, data: res });
            cogoToast.success("Company created successfully!")
        }).catch((err) => {
            log("Create Company Error", err)
            dispatch({ type: actionTypes.CREATE_COMPANY_ERROR, data: err?.message });
            cogoToast.error(err?.message);
        })
    }
}

export const updateCompanyProfileAction = (payload, id) => {
    return dispatch => {
        dispatch({ type: actionTypes.UPDATE_COMPANY_LOADING });
        updateCompanyProfile(payload, id).then((res) => {
            dispatch({ type: actionTypes.UPDATE_COMPANY_SUCCESS, data: res });
            cogoToast.success("Company updated successfully!")
        }).catch((err) => {
            log("update Company Error", err)
            dispatch({ type: actionTypes.UPDATE_COMPANY_ERROR, data: err?.message });
            cogoToast.error(err?.message);
        })
    }
}

export const getAllCompaniesAction = (limit, page) => {
    let params = new URLSearchParams();
    params.append("limit", limit);
    params.append("page", page);
    params.append("skip", page > 1 ? (page - 1) * limit : 0)

    let company = store.getState()?.company?.filters;

    let userRoleWiseId = getRoleWiseID()
    if (userRoleWiseId?.company) params.append("company", userRoleWiseId?.company)
    if (userRoleWiseId?.partner) params.append("partner", userRoleWiseId?.partner)
    if (userRoleWiseId?.owner) params.append("owner", userRoleWiseId?.owner)

    if (company?.companyName) {
        params.append("name", `/${company?.companyName}/i`);
    }

    if (company?.companyType) {
        params.append("companyType", `/${company?.companyType}/i`);
    }

    if (company?.email) {
        params.append("relation_owner.email", `/${company?.email}/i`);
    }

    if (company?.companyId) {
        params.append("companyUrnOrId", `/${company?.companyId}/i`);
    }

    if (company?.admin) {
        params.append("relation_owner.name", `/${company?.admin}/i`);
    }

    return (dispatch) => {
        dispatch({ type: actionTypes.GET_COMPANIES_LOADING })
        getAllCompanies(params).then((response) => {
            log("company details found", response)
            dispatch({ type: actionTypes.GET_COMPANIES_SUCCESS, data: response })
        }).catch((err) => {
            log("company details error", err)
            dispatch({ type: actionTypes.GET_COMPANIES_ERROR, data: err?.message })
            cogoToast.error(err?.message)
        })
    }
}
