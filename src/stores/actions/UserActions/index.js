import cogoToast from "cogo-toast";
import store from "../..";
import { createUser, fetchUsers } from "../../../services/https/resources/Users/Users.api";
import { log } from "../../../utils/app.debug";
import * as actionTypes from "../actionTypes"

export const createUsersAction = (payload) => {
    return dispatch => {
        dispatch({ type: actionTypes.CREATE_USER_LOADING });
        createUser(payload).then((res) => {
            log("Create Users Found", res)
            dispatch({ type: actionTypes.CREATE_USER_SUCCESS, data: res });
        }).catch((err) => {
            log("Create Users Error", err)
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

    let users = store.getState()?.user?.filters;

    //     accountType: "",
    //     accountName: "",
    //     userType: "",

    if (users?.username) {
        params.append("username", `/${users?.username}/i`);
    }

    if (users?.userId) {
        params.append("_id", `/${users?.userId}/i`);
    }

    // if (users?.username) {
    //     params.append("username", `/${users?.username}/i`);
    // }

    // if (users?.username) {
    //     params.append("username", `/${users?.username}/i`);
    // }

    // if (users?.username) {
    //     params.append("username", `/${users?.username}/i`);
    // }

    if (users?.email) {
        params.append("email", `/${users?.email}/i`);
    }

    if (users?.status) {
        params.append("enabled", users?.status === "Active" ? true : false);
    }


    return dispatch => {
        dispatch({ type: actionTypes.GET_USERS_LOADING });
        fetchUsers(params).then((res) => {
            log("Users Found", res)
            dispatch({ type: actionTypes.GET_USERS_SUCCESS, data: res });
        }).catch((err) => {
            log("Users Error", err)
            dispatch({ type: actionTypes.GET_USERS_ERROR, data: err?.message });
            cogoToast.error(err?.message);
        })
    }
}