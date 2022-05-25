import cogoToast from "cogo-toast"
import * as actionTypes from "../actionTypes"
import store from "../..";
import { log } from "../../../utils/app.debug";
import { createCompany, getAllCompanies } from "../../../services/https/resources/Companies/Companies.api";


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

// companyName: "",
// companyType: "",
// email: "",
// companyId: "",
// admin: "",

export const getAllCompaniesAction = (limit, page) => {
    let params = new URLSearchParams();
    params.append("limit", limit);
    params.append("page", page);
    params.append("skip", page > 1 ? (page - 1) * limit : 0)

    let company = store.getState()?.company?.filters;

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
