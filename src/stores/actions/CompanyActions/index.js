import cogoToast from "cogo-toast"
import * as actionTypes from "../actionTypes"
import store from "../..";
import { log } from "../../../utils/app.debug";
import { createCompany, getAllCompanies } from "../../../services/https/resources/Companies/Companies.api";


export const createCompanyAction = (payload) => {
    return dispatch => {
        dispatch({ type: actionTypes.CREATE_COMPANY_LOADING });
        createCompany(payload).then((res) => {
            log("Create Company Found", res)
            dispatch({ type: actionTypes.CREATE_COMPANY_SUCCESS, data: res });
        }).catch((err) => {
            log("Create Company Error", err)
            dispatch({ type: actionTypes.CREATE_COMPANY_ERROR, data: err?.message });
            cogoToast.error(err?.message);
        })
    }
}


export const getAllCompaniesAction = (limit, page) => {
    let params = new URLSearchParams();
    params.append("limit", limit);
    params.append("page", page);
    params.append("skip", page > 1 ? (page - 1) * limit : 0)
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
