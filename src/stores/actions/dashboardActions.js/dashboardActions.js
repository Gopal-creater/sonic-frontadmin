import cogoToast from "cogo-toast"
import fileDownload from "js-file-download"
import moment from "moment"
import store from "../.."
import { getRoleWiseID, getUserId } from "../../../services/https/AuthHelper"
import { exportDashboardData, getMonitorDashboardData } from "../../../services/https/resources/Dashboard.api"
import { log } from "../../../utils/app.debug"
import * as actionTypes from "../actionTypes"

export const getMonitorDashboardDataAction = (startDate, endDate, limit = 10, sortBy, isAscending) => {
    let monitorFilters = store.getState()?.monitor?.filters
    let userRoleWiseId = getRoleWiseID()
    let newEndDate = moment(endDate).endOf("days").toISOString()
    let params = new URLSearchParams(`detectedAt>=${moment(startDate).format("YYYY-MM-DD")}&detectedAt<=date(${newEndDate})`)

    params.append("limit", limit);
    if (sortBy) {
        isAscending ? params.append("sort", sortBy) : params.append("sort", `-${sortBy}`)
    }

    if (userRoleWiseId?.partner) {
        let additionalFilter = {
            $or: [{ "sonicKey.company.partner": userRoleWiseId?.partner }, { "sonicKey.partner._id": userRoleWiseId?.partner }, { "sonicKey.owner.partner": userRoleWiseId?.partner }, { "sonicKey.owner._id": getUserId() }]
        }
        params.append("relation_filter", JSON.stringify(additionalFilter))
    }
    if (userRoleWiseId?.company) {
        let additionalFilter = {
            $or: [{ "sonicKey.company._id": userRoleWiseId?.company }, { "sonicKey.owner._id": getUserId() }, { "sonicKey.owner.company": userRoleWiseId?.company }]
        }
        params.append("relation_filter", additionalFilter)
    }

    if (userRoleWiseId?.owner) params.append("relation_sonicKey.owner._id", userRoleWiseId?.owner)

    if (monitorFilters?.channel !== "ALL") {
        params.append("channel", monitorFilters?.channel)
    }

    if (monitorFilters?.sonicKey) {
        params.append("relation_sonicKey.sonicKey", `/${monitorFilters?.sonicKey}/i`);
    }
    if (monitorFilters?.country) {
        params.append("relation_radioStation.country", monitorFilters?.country);
    }
    if (monitorFilters?.artist) {
        params.append("relation_sonicKey.contentOwner", `/${monitorFilters?.artist}/i`);
    }
    if (monitorFilters?.radioStation) {
        params.append("relation_radioStation.name", monitorFilters?.radioStation);
    }
    if (monitorFilters?.song) {
        params.append("relation_sonicKey.originalFileName", `/${monitorFilters?.song}/i`);
    }
    if (monitorFilters?.label) {
        params.append("relation_sonicKey.label", `/${monitorFilters?.label}/i`);
    }
    if (monitorFilters?.distributor) {
        params.append("relation_sonicKey.distributor", `/${monitorFilters?.distributor}/i`);
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

export const getMonitorDashboardExportAction = (format, startDate, endDate, limit = 10, sortBy, isAscending) => {
    let monitorFilters = store.getState()?.monitor?.filters
    let userRoleWiseId = getRoleWiseID()
    let newEndDate = moment(endDate).endOf("days").toISOString()
    let params = new URLSearchParams(`detectedAt>=${moment(startDate).format("YYYY-MM-DD")}&detectedAt<=date(${newEndDate})`)

    params.append("limit", limit);
    if (sortBy) {
        isAscending ? params.append("sort", sortBy) : params.append("sort", `-${sortBy}`)
    }

    if (userRoleWiseId?.partner) {
        let additionalFilter = {
            $or: [{ "sonicKey.company.partner": userRoleWiseId?.partner }, { "sonicKey.partner._id": userRoleWiseId?.partner }, { "sonicKey.owner.partner": userRoleWiseId?.partner }, { "sonicKey.owner._id": getUserId() }]
        }
        params.append("relation_filter", JSON.stringify(additionalFilter))
    }
    if (userRoleWiseId?.company) {
        let additionalFilter = {
            $or: [{ "sonicKey.company._id": userRoleWiseId?.company }, { "sonicKey.owner._id": getUserId() }, { "sonicKey.owner.company": userRoleWiseId?.company }]
        }
        params.append("relation_filter", additionalFilter)
    }

    if (userRoleWiseId?.owner) params.append("relation_sonicKey.owner._id", userRoleWiseId?.owner)

    if (monitorFilters?.channel !== "ALL") {
        params.append("channel", monitorFilters?.channel)
    }

    if (monitorFilters?.sonicKey) {
        params.append("relation_sonicKey.sonicKey", `/${monitorFilters?.sonicKey}/i`);
    }
    if (monitorFilters?.country) {
        params.append("relation_radioStation.country", monitorFilters?.country);
    }
    if (monitorFilters?.artist) {
        params.append("relation_sonicKey.contentOwner", `/${monitorFilters?.artist}/i`);
    }
    if (monitorFilters?.radioStation) {
        params.append("relation_radioStation.name", monitorFilters?.radioStation);
    }
    if (monitorFilters?.song) {
        params.append("relation_sonicKey.originalFileName", `/${monitorFilters?.song}/i`);
    }
    if (monitorFilters?.label) {
        params.append("relation_sonicKey.label", `/${monitorFilters?.label}/i`);
    }
    if (monitorFilters?.distributor) {
        params.append("relation_sonicKey.distributor", `/${monitorFilters?.distributor}/i`);
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
        exportDashboardData(format, params).then((data) => {
            log("Monitor Dashboard Data", data)
            if (format === "xlsx") {
                fileDownload(data, `${"Dashboard-plays"} Export-xlsx-(${moment(startDate).format("YYYY_MM_DD")}-to-${moment(endDate).format("YYYY_MM_DD")})_${format}.zip`);
            } else {
                fileDownload(data, `${"Dashboard-plays"} Export-csv-(${moment(startDate).format("YYYY_MM_DD")}-to-${moment(endDate).format("YYYY_MM_DD")})_${format}.zip`);
            }
        }).catch((error) => {
            log("Monitor Dashboard Error", Error)
            cogoToast.error(error?.message)
        })
    }
}