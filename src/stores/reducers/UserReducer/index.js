import * as actionTypes from "../../actions/actionTypes"
import produce from "immer";
import { log } from "../../../utils/app.debug";

const initialState = {
    userProfile: {
        loading: false,
        error: null,
        data: {}
    },
    userMenus: [
        {
            url: "/admin-profile",
            urlName: "Admin Profile"
        },
        {
            url: "/users",
            urlName: "Users"
        },
        {
            url: "/companies",
            urlName: "Companies"
        },
        {
            url: "/licences",
            urlName: "Licenses"
        },
    ],
    filters: {
        username: "",
        userId: "",
        accountType: "",
        accountName: "",
        userType: "",
        email: "",
        status: "",
    },
    createUser: {
        loading: false,
        data: {},
        error: null,
    },
    getUsers: {
        loading: false,
        data: {},
        error: null,
    }
};

const userRed = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case actionTypes.GET_USERPROFILE_LOADING:
                draft.userProfile.loading = true;
                draft.userProfile.error = null;
                draft.userProfile.data = {};
                break;

            case actionTypes.GET_USERPROFILE_DATA:
                draft.userProfile.loading = false;
                draft.userProfile.error = null;
                draft.userProfile.data = action.data;
                log("action user role", action.data)
                break

            case actionTypes.GET_USERPROFILE_ERROR:
                draft.userProfile.loading = false;
                draft.userProfile.error = action.data;
                draft.userProfile.data = {};
                break

            //FILTERS
            case actionTypes.SET_USERS_FILTERS:
                draft.filters = action.data;
                break;

            //CREATE USER
            case actionTypes.CREATE_USER_LOADING:
                draft.createUser.loading = true;
                draft.createUser.error = null;
                break;
            case actionTypes.CREATE_USER_SUCCESS:
                draft.createUser.loading = false;
                draft.createUser.data = action.data;
                draft.createUser.error = null;
                break;
            case actionTypes.CREATE_USER_ERROR:
                draft.createUser.loading = false;
                draft.createUser.error = action.data;
                break;

            //FETCHING USERS
            case actionTypes.GET_USERS_LOADING:
                draft.getUsers.loading = true;
                draft.getUsers.error = null;
                break;
            case actionTypes.GET_USERS_SUCCESS:
                draft.getUsers.loading = false;
                draft.getUsers.data = action.data;
                draft.getUsers.error = null;
                break;
            case actionTypes.GET_USERS_ERROR:
                draft.getUsers.loading = false;
                draft.getUsers.error = action.data;
                break;

            default:
                break;
        }
    })

export default userRed;
