import cogoToast from "cogo-toast"
import * as actionTypes from "../actionTypes"
import store from "../..";
import { log } from "../../../utils/app.debug";
import { getAllSonicKeys } from "../../../services/https/resources/SonicKeys/SonicKeys.api";
import { getRoleWiseID, getUserId } from '../../../services/https/AuthHelper';

export const getAllSonickeysActions = (limit, page) => {
    let params = new URLSearchParams();
    params.append("limit", limit);
    params.append("page", page);
    params.append("skip", page > 1 ? (page - 1) * limit : 0)

    let userRoleWiseId = getRoleWiseID()

    let sonicKeyData = store.getState()?.sonickey?.filters

    let additionalFilter = { $or: [] }

    if (userRoleWiseId?.partner) {
        additionalFilter = {
            $or: [{ "company.partner": userRoleWiseId?.partner }, { "owner.partner": userRoleWiseId?.partner }, { "owner._id": getUserId() }, { "partner._id": userRoleWiseId?.partner }]
        }
    }
    if (userRoleWiseId?.company) {
        additionalFilter = {
            $or: [{ "company._id": userRoleWiseId?.company }, { "owner._id": getUserId() }, { "owner.company": userRoleWiseId?.company }]
        }
    }
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
    if (sonicKeyData?.company) params.append("relation_company._id", sonicKeyData?.company);
    if (sonicKeyData?.user) {
        additionalFilter.$or.push({ "relation_owner._id": sonicKeyData?.user }, { "createdBy": sonicKeyData?.user })
    }
    params.append("relation_filter", JSON.stringify(additionalFilter));

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
