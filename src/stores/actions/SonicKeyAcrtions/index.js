import cogoToast from "cogo-toast"
import * as actionTypes from "../actionTypes"
import store from "../..";
import { log } from "../../../utils/app.debug";
import { userRoles } from "../../../constants/constants";
import { getUserId } from "../../../services/https/AuthHelper";
import { getAllSonicKeys } from "../../../services/https/resources/SonicKeys/SonicKeys.api";

export const getAllSonickeysActions = (limit, page) => {
    let params = new URLSearchParams();
    params.append("limit", limit);
    params.append("page", page);
    params.append("skip", page > 1 ? (page - 1) * limit : 0)

    // let company = store.getState()?.company?.filters;

    // let userRole = store.getState().user?.userProfile?.data?.userRole
    // if (userRole === userRoles.COMPANY_ADMIN || userRole === userRoles.COMPANY_USER) {
    //     params.append("company", store.getState().user?.userProfile?.data?.company?.id)
    // }
    // else if (userRole === userRoles.PARTNER_ADMIN || userRole === userRoles.PARTNER_USER) {
    //     params.append("partner", store.getState().user?.userProfile?.data?.partner?.id)
    // }
    // else {
    //     params.append("owner", getUserId())
    // }

    // if (company?.companyName) {
    //     params.append("name", `/${company?.companyName}/i`);
    // }

    // if (company?.companyType) {
    //     params.append("companyType", `/${company?.companyType}/i`);
    // }

    // if (company?.email) {
    //     params.append("email", `/${company?.email}/i`);
    // }

    // if (company?.companyId) {
    //     params.append("companyUrnOrId", `/${company?.email}/i`);
    // }

    // if (company?.admin) {
    //     params.append("admin", `/${company?.admin}/i`);
    // }

    return (dispatch) => {
        dispatch({ type: actionTypes.GET_ALL_SONICKEYS_LOADING })
        getAllSonicKeys(params).then((response) => {
            log("Sonic Keys details", response)
            dispatch({ type: actionTypes.GET_ALL_SONICKEYS_SUCCESS, data: response })
        }).catch((err) => {
            log("Sonic keys error", err)
            dispatch({ type: actionTypes.GET_ALL_SONICKEYS_ERROR, data: err?.message })
            cogoToast.error(err?.message)
        })
    }
}
