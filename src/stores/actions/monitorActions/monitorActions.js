import cogoToast from "cogo-toast";
import fileDownload from "js-file-download";
import moment from "moment";
import store from "../..";
import { getRoleWiseID, getUserId } from "../../../services/https/AuthHelper";
import { getMonitorExport, getMonitorList } from "../../../services/https/resources/Monitor/Monitor.api";
import { log } from "../../../utils/app.debug";

export const getMonitorListAction = (actions, startDate, endDate, page, limit, playsBy, sortBy, isAscending) => {
    let newEndDate = moment(endDate).endOf("days").toISOString()
    let params = new URLSearchParams(`detectedAt>=${moment(startDate).format("YYYY-MM-DD")}&detectedAt<=date(${newEndDate})`)
    let userRoleWiseId = getRoleWiseID()

    params.append("limit", limit);
    params.append("page", page)
    params.append("skip", page > 1 ? (page - 1) * limit : 0)

    let monitorFilters = store.getState()?.monitor?.filters
    let additionalFilter = { $or: [] }

    if (userRoleWiseId?.partner) {
        additionalFilter = {
            $or: [{ "sonicKey.company.partner": userRoleWiseId?.partner }, { "sonicKey.partner._id": userRoleWiseId?.partner }, { "sonicKey.owner.partner": userRoleWiseId?.partner }, { "sonicKey.owner._id": getUserId() }]
        }
    }
    if (userRoleWiseId?.company) {
        additionalFilter = {
            $or: [{ "sonicKey.company._id": userRoleWiseId?.company }, { "sonicKey.owner._id": getUserId() }, { "sonicKey.owner.company": userRoleWiseId?.company }]
        }
    }

    if (userRoleWiseId?.owner) params.append("relation_sonicKey.owner._id", userRoleWiseId?.owner)

    if (playsBy) {
        params.append("playsBy", playsBy)
    }

    if (sortBy) {
        isAscending ? params.append("sort", sortBy) : params.append("sort", `-${sortBy}`)
    }

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
        params.append("relation_sonicKey.contentName", monitorFilters?.song);
    }
    if (monitorFilters?.label?.name) {
        params.append("relation_sonicKey.label", monitorFilters?.label?.name);
    }
    if (monitorFilters?.distributor?.name) {
        params.append("relation_sonicKey.distributor", monitorFilters?.distributor?.name);
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

    if (monitorFilters?.company?._id) params.append("company", monitorFilters?.company?._id);
    if (monitorFilters?.user) {
        additionalFilter.$or.push({ "relation_owner._id": monitorFilters?.user }, { "createdBy": monitorFilters?.user })
    }

    if (additionalFilter.$or.length !== 0) params.append("relation_filter", JSON.stringify(additionalFilter));

    return (dispatch) => {
        dispatch({ type: actions?.loading })
        getMonitorList(params).then((data) => {
            log("Monitor List Plays Data", data)
            dispatch({ type: actions?.success, data: data })
        }).catch((error) => {
            log("Monitor List Plays Error", error)
            dispatch({ type: actions?.error, data: error?.message })
            cogoToast.error(error?.message)
        })
    }
}

export const getMonitorExportAction = (startDate, endDate, format, limit = 2000, playsBy, sortBy, isAscending) => {
    let monitorFilters = store.getState()?.monitor?.filters
    let userRoleWiseId = getRoleWiseID()

    let newEndDate = moment(endDate).endOf("days").toISOString()
    let params = new URLSearchParams(`detectedAt>=${moment(startDate).format("YYYY-MM-DD")}&detectedAt<=date(${newEndDate})`)

    params.append("limit", limit);
    let additionalFilter = { $or: [] }

    if (userRoleWiseId?.partner) {
        additionalFilter = {
            $or: [{ "sonicKey.company.partner": userRoleWiseId?.partner }, { "sonicKey.partner._id": userRoleWiseId?.partner }, { "sonicKey.owner.partner": userRoleWiseId?.partner }, { "sonicKey.owner._id": getUserId() }]
        }
    }
    if (userRoleWiseId?.company) {
        additionalFilter = {
            $or: [{ "sonicKey.company._id": userRoleWiseId?.company }, { "sonicKey.owner._id": getUserId() }, { "sonicKey.owner.company": userRoleWiseId?.company }]
        }
    }

    if (userRoleWiseId?.owner) params.append("relation_sonicKey.owner._id", userRoleWiseId?.owner)

    if (playsBy) {
        params.append("playsBy", playsBy)
    }

    if (sortBy) {
        isAscending ? params.append("sort", sortBy) : params.append("sort", `-${sortBy}`)
    }

    if (monitorFilters?.channel !== "ALL") {
        params.append("channel", monitorFilters?.channel)
    }

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
        params.append("relation_sonicKey.contentName", monitorFilters?.song);
    }
    if (monitorFilters?.label?.name) {
        params.append("relation_sonicKey.label", monitorFilters?.label?.name);
    }
    if (monitorFilters?.distributor?.name) {
        params.append("relation_sonicKey.distributor", monitorFilters?.distributor?.name);
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

    if (monitorFilters?.company?._id) params.append("company", monitorFilters?.company?._id);
    if (monitorFilters?.user) {
        additionalFilter.$or.push({ "relation_owner._id": monitorFilters?.user }, { "createdBy": monitorFilters?.user })
    }

    if (additionalFilter.$or.length !== 0) params.append("relation_filter", JSON.stringify(additionalFilter));

    return (dispatch) => {
        getMonitorExport(format, params).then((data) => {
            log("Monitor graphs", data);
            if (format === "xlsx") {
                fileDownload(data, `${playsBy || "Dashboard-plays"} Export-xlsx-(${moment(startDate).format("YYYY_MM_DD")}-to-${moment(endDate).format("YYYY_MM_DD")})_${format}.xlsx`);
            } else {
                fileDownload(data, `${playsBy || "Dashboard-plays"} Export-csv-(${moment(startDate).format("YYYY_MM_DD")}-to-${moment(endDate).format("YYYY_MM_DD")})_${format}.csv`);
            }
        }).catch(error => {
            log("Monitor graphs error", error);
            cogoToast.error(error?.message)
        })
    }
}