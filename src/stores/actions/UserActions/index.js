import cogoToast from "cogo-toast"
import { createUser, fetchUsers, getUserProfile } from "../../../services/https/resources/UserApi"
import * as actionTypes from "../actionTypes"
import store from "../..";
import { userRoles } from "../../../constants/constants";
import { getRoleWiseID } from "../../../services/https/AuthHelper";

export const getUserProfileAction = () => {
    return (dispatch) => {
        dispatch({ type: actionTypes.GET_USERPROFILE_LOADING })
        getUserProfile().then((response) => {
            dispatch({ type: actionTypes.GET_USERPROFILE_DATA, data: response })
        }).catch((err) => {
            dispatch({ type: actionTypes.GET_USERPROFILE_ERROR, data: err?.message })
            cogoToast.error(err?.message)
        })
    }
}

export const createUsersAction = (payload) => {
    return dispatch => {
        dispatch({ type: actionTypes.CREATE_USER_LOADING });
        createUser(payload).then((res) => {
            dispatch({ type: actionTypes.CREATE_USER_SUCCESS, data: res });
            dispatch(getUsersAction())
            cogoToast.success("User added successfully!");
        }).catch((err) => {
            dispatch({ type: actionTypes.CREATE_USER_ERROR, data: err?.message });
            cogoToast.error(err?.message);
        })
    }
}

export const getUsersAction = (limit, page) => {
    let params = new URLSearchParams();
    params.append("limit", limit);
    params.append("page", page);
    params.append("skip", page > 1 ? (page - 1) * limit : 0)
    params.append("sort", "-createdAt");

    let users = store.getState()?.user?.filters;

    let userRoleWiseId = getRoleWiseID()
    if (userRoleWiseId?.company) params.append("company", userRoleWiseId?.company)
    if (userRoleWiseId?.partner) params.append("partner", userRoleWiseId?.partner)
    if (userRoleWiseId?.owner) params.append("owner", userRoleWiseId?.owner)

    if (users?.username) {
        params.append("username", `/${users?.username}/i`);
    }

    if (users?.userId) {
        params.append("_id", `/${users?.userId}/i`);
    }

    if (users?.accountType) {
        if (users?.accountType === "Partner") {
            params.append("userRole", [userRoles.PARTNER_ADMIN, userRoles.PARTNER_USER]);
        } else if (users?.accountType === "Company") {
            params.append("userRole", [userRoles.COMPANY_ADMIN, userRoles.COMPANY_USER]);
        }
    }

    if (users?.accountName) {
        if (users?.accountType === "Partner") {
            params.append("relation_partner.name", `/${users?.accountName}/i`);
        }
        else {
            params.append("relation_company.name", `/${users?.accountName}/i`);
        }
    }

    if (users?.userType) {
        if (users?.userType === "Admin") {
            params.append("userRole", [userRoles.PARTNER_ADMIN, userRoles.COMPANY_ADMIN]);
        } else if (users?.userType === "Standard") {
            params.append("userRole", [userRoles.PARTNER_USER, userRoles.COMPANY_USER, userRoles.PORTAL_USER]);
        }
    }

    if (users?.email) {
        params.append("email", `/${users?.email}/i`);
    }

    if (users?.status) {
        params.append("enabled", users?.status === "Active" ? true : false);
    }


    return dispatch => {
        dispatch({ type: actionTypes.GET_USERS_LOADING });
        fetchUsers(params).then((res) => {
            dispatch({ type: actionTypes.GET_USERS_SUCCESS, data: res });
        }).catch((err) => {
            dispatch({ type: actionTypes.GET_USERS_ERROR, data: err?.message });
            cogoToast.error(err?.message);
        })
    }
}