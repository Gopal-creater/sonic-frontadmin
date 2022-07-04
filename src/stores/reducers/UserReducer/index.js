import * as actionTypes from "../../actions/actionTypes"
import produce from "immer";
import { userRoles } from "../../../constants/constants";
import { routeList } from "../../../routes/RoutesData";

const initialState = {
    userProfile: {
        loading: true,
        error: null,
        data: {}
    },
    userMenus: [
        {
            url: "/profile",
            urlName: "Admin Profile"
        },
        {
            url: `/profile`,
            urlName: "User Profile"
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
    },
    sideBarData: routeList,
    userSearch: {
        loading: false,
        data: {},
        error: null,
    },
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
                if (action.data.userRole === userRoles.COMPANY_ADMIN) {
                    draft.userMenus = draft.userMenus.filter((menu) => {
                        if (menu.urlName === "Companies" || menu.urlName === "User Profile") return
                        return menu
                    })
                }

                if (action.data.userRole === userRoles.PARTNER_ADMIN) {
                    draft.userMenus = draft.userMenus.filter((menu) => {
                        if (menu.urlName === "User Profile") return
                        return menu
                    })

                    draft.sideBarData = draft.sideBarData.filter((item) => {
                        if (item.path === "/encode" || item.path === "/decode") return
                        return item
                    })
                }

                if (action.data.userRole === userRoles.COMPANY_USER ||
                    action.data.userRole === userRoles.PARTNER_USER ||
                    action.data.userRole === userRoles.PORTAL_USER
                ) {
                    draft.userMenus = draft.userMenus.filter((menu) => {
                        if (menu.urlName === "Admin Profile" || menu.urlName === "Users" || menu.urlName === "Companies") return
                        return menu
                    })
                }

                if (action.data.userRole !== userRoles.PARTNER_ADMIN) {
                    draft.sideBarData = draft.sideBarData.filter((item) => {
                        if (item.title === "Reports") return
                        return item
                    })
                    console.log("SidebarData", draft.sideBarData)
                }
                break;

            case actionTypes.GET_USERPROFILE_ERROR:
                draft.userProfile.loading = false;
                draft.userProfile.error = action.data;
                draft.userProfile.data = {};
                break

            //FILTERS
            case actionTypes.SET_USERS_FILTERS:
                draft.filters = action.data;
                break;

            //CREATING USER
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

            //UPDATING USER
            case actionTypes.UPDATE_USERS_PROFILE:
                let index = draft.getUsers.data?.docs?.findIndex(user => user?._id === action.data?._id);
                draft.getUsers.data.docs[index] = action.data;
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

            // Searching User
            case actionTypes.SET_SEARCH_USER_LOADING:
                draft.userSearch.loading = true;
                draft.userSearch.error = null;
                draft.userSearch.data = {};
                break;

            case actionTypes.SET_SEARCH_USER_SUCCESS:
                draft.userSearch.loading = false;
                draft.userSearch.error = null;
                draft.userSearch.data = action.data;
                break;

            case actionTypes.SET_SEARCH_USER_ERROR:
                draft.userSearch.loading = false;
                draft.userSearch.error = action.data;
                break;

            default:
                break;
        }
    })

export default userRed;
