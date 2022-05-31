import cogoToast from "cogo-toast"
import * as actionTypes from "../actionTypes"
import store from "../..";
import { log } from "../../../utils/app.debug";
import { createCompany, getAllCompanies, updateCompanyProfile } from "../../../services/https/resources/Companies/Companies.api";
import { userRoles } from "../../../constants/constants";
import { getUserId } from "../../../services/https/AuthHelper";


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

    let userRole = store.getState().user?.userProfile?.data?.userRole
    if (userRole === userRoles.COMPANY_ADMIN || userRole === userRoles.COMPANY_USER) {
        params.append("company", store.getState().user?.userProfile?.data?.company?.id)
    }
    else if (userRole === userRoles.PARTNER_ADMIN || userRole === userRoles.PARTNER_USER) {
        params.append("partner", store.getState().user?.userProfile?.data?.partner?.id)
    }
    else {
        params.append("owner", getUserId())
    }

    if (company?.companyName) {
        params.append("name", `/${company?.companyName}/i`);
    }

    if (company?.companyType) {
        params.append("companyType", `/${company?.companyType}/i`);
    }

    if (company?.email) {
        params.append("email", `/${company?.email}/i`);
    }

    if (company?.companyId) {
        params.append("companyUrnOrId", `/${company?.email}/i`);
    }

    if (company?.admin) {
        params.append("admin", `/${company?.admin}/i`);
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
