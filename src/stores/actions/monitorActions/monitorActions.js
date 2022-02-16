import cogoToast from "cogo-toast";
import fileDownload from "js-file-download";
import moment from "moment";
import store from "../..";
import { getMonitorExport, getMonitorList } from "../../../services/https/resources/Monitor/Monitor.api";
import { log } from "../../../utils/app.debug";

export const getMonitorListAction = (actions, startDate, endDate, page, limit, playsBy) => {
    let newEndDate = moment(endDate).endOf("days").toISOString()
    let params = new URLSearchParams(`detectedAt>=${moment(startDate).format("YYYY-MM-DD")}&detectedAt<=date(${newEndDate})`)

    params.append("limit", limit);
    params.append("page", page)
    params.append("skip", page > 1 ? (page - 1) * limit : 0)

    let monitorFilters = store.getState()?.monitor?.filters

    if (playsBy) {
        params.append("playsBy", playsBy)
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

export const getMonitorExportAction = (startDate, endDate, format, limit = 2000, playsBy) => {
    let monitorFilters = store.getState()?.monitor?.filters

    let newEndDate = moment(endDate).endOf("days").toISOString()
    let params = new URLSearchParams(`detectedAt>=${moment(startDate).format("YYYY-MM-DD")}&detectedAt<=date(${newEndDate})`)

    params.append("limit", limit);

    monitorFilters?.channel === "ALL" ? params.append("channel", "") : params.append("channel", monitorFilters?.channel)

    if (playsBy) {
        params.append("playsBy", playsBy)
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

    return dispatch => {
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