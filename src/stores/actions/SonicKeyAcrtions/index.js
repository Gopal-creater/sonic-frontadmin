import cogoToast from "cogo-toast"
import * as actionTypes from "../actionTypes"
import store from "../..";
import { log } from "../../../utils/app.debug";
import { getRoleWiseID } from "../../../services/https/AuthHelper"
import { getAllSonicKeys } from "../../../services/https/resources/SonicKeys/SonicKeys.api";

export const getAllSonickeysActions = (limit, page) => {
    let params = new URLSearchParams();
    params.append("limit", limit);
    params.append("page", page);
    params.append("skip", page > 1 ? (page - 1) * limit : 0)

    let userRoleWiseId = getRoleWiseID()

    let sonicKeyData = store.getState()?.sonickey?.filters

    if (userRoleWiseId?.company) params.append("company", userRoleWiseId?.company)
    if (userRoleWiseId?.partner) params.append("partner", userRoleWiseId?.partner)
    if (userRoleWiseId?.owner) params.append("owner", userRoleWiseId?.owner)

    if (sonicKeyData?.channel !== "ALL") {
        params.append("channel", sonicKeyData?.channel)
    }
    if (sonicKeyData?.sonicKey) {
        params.append("sonicKey", `/${sonicKeyData?.sonicKey}/i`);
    }
    if (sonicKeyData?.artist) {
        params.append("contentOwner", `/${sonicKeyData?.artist}/i`);
    }
    if (sonicKeyData?.track) {
        params.append("track", `/${sonicKeyData?.track}/i`);
    }
    if (sonicKeyData?.label) {
        params.append("label", `/${sonicKeyData?.label}/i`);
    }
    if (sonicKeyData?.distributor) {
        params.append("distributor", `/${sonicKeyData?.distributor}/i`);
    }

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
