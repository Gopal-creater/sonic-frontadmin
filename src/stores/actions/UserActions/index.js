import cogoToast from "cogo-toast"
import { createUser, fetchUsers, getUserProfile } from "../../../services/https/resources/UserApi"
import * as actionTypes from "../actionTypes"
import store from "../..";

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
            dispatch({ type: actionTypes.GET_USERS_SUCCESS, data: res });
        }).catch((err) => {
            dispatch({ type: actionTypes.GET_USERS_ERROR, data: err?.message });
            cogoToast.error(err?.message);
        })
    }
}