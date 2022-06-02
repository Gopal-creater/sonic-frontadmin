import * as actionTypes from "../../actions/actionTypes"
import produce from "immer";
import { userRoles } from "../../../constants/constants";
import { routeList } from "../../../routes/RoutesData";
import { getUserId } from "../../../services/https/AuthHelper";

const initialState = {
    getSonicKeys: {
        loading: true,
        error: null,
        data: {}
    },
    filters: {
        username: "",
        userId: "",
        accountType: "",
        accountName: "",
        userType: "",
        email: "",
        status: "",
    }
};

const sonickeyReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {

            //Fetching SonicKeys
            case actionTypes.GET_ALL_SONICKEYS_LOADING:
                draft.getSonicKeys.loading = true;
                draft.getSonicKeys.error = null;
                break;
            case actionTypes.GET_ALL_SONICKEYS_SUCCESS:
                draft.getSonicKeys.loading = false;
                draft.getSonicKeys.data = action.data;
                draft.getSonicKeys.error = null;
                break;
            case actionTypes.GET_ALL_SONICKEYS_ERROR:
                draft.getSonicKeys.loading = false;
                draft.getSonicKeys.error = action.data;
                break;

            default:
                break;
        }
    })

export default sonickeyReducer;
