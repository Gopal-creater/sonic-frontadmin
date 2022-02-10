import cogoToast from "cogo-toast"
import moment from "moment"
import store from "../.."
import { getMonitorDashboardData } from "../../../services/https/resources/Dashboard.api"
import { log } from "../../../utils/app.debug"
import * as actionTypes from "../actionTypes"

export const getMonitorDashboardDataAction = (startDate, endDate, limit = 10) => {
    let monitorFilters = store.getState()?.monitor?.filters

    let newEndDate = moment(endDate).endOf("days").toISOString()
    let params = new URLSearchParams(`detectedAt>=${moment(startDate).format("YYYY-MM-DD")}&detectedAt<=date(${newEndDate})`)

    params.append("limit", limit);

    if (monitorFilters?.sonicKey) {
        params.append("relation_sonicKey.sonicKey", monitorFilters?.sonicKey);
    }
    if (monitorFilters?.country) {
        params.append("relation_radioStation.country", monitorFilters?.country);
    }
    if (monitorFilters?.artist) {
        params.append("relation_sonicKey.contentOwner", monitorFilters?.artist);
    }
    if (monitorFilters?.radioStation) {
        params.append("relation_radioStation.name", monitorFilters?.radioStation);
    }
    if (monitorFilters?.song) {
        params.append("relation_sonicKey.originalFileName", monitorFilters?.song);
    }
    if (monitorFilters?.label) {
        params.append("relation_sonicKey.label", monitorFilters?.label);
    }
    if (monitorFilters?.distributor) {
        params.append("relation_sonicKey.distributor", monitorFilters?.distributor);
    }
    if (monitorFilters?.encodedStartDate) {
        let startOfEncodedDate = moment(monitorFilters?.encodedStartDate).startOf("days").toISOString()
        params.append(`relation_sonicKey.createdAt>`, `date(${startOfEncodedDate})`)
        if (monitorFilters?.encodedEndDate) {
            let endOfEncodedDate = moment(monitorFilters?.encodedEndDate).endOf("days").toISOString()
            params.append(`relation_sonicKey.createdAt<`, `date(${endOfEncodedDate})`)
        } else {
            params.append(`relation_sonicKey.createdAt<`, `date(${moment(monitorFilters?.encodedStartDate).endOf("days").toISOString()})`)
        }
    }

    return (dispatch) => {
        dispatch({ type: actionTypes.SET_DASHBOARD_LOADING })
        getMonitorDashboardData(params).then((data) => {
            log("Monitor Dashboard Data", data)
            dispatch({ type: actionTypes.SET_DASHBOARD_SUCCESS, data: data })
        }).catch((error) => {
            log("Monitor Dashboard Error", Error)
            dispatch({ type: actionTypes.SET_DASHBOARD_ERROR, data: error?.message })
            cogoToast.error(error?.message)
        })
    }
} 