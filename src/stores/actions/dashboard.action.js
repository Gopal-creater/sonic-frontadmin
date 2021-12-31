import cogoToast from "cogo-toast"
import moment from "moment"
import { getGraphData, getMostPlayedStationsData, getTotalSonicKeysCount, getTotalSubscribedStation, exportDashboardData, exportPlaysData } from "../../services/https/resources/Dashboard.api"
import { log } from "../../utils/app.debug"
import * as actionTypes from "../actions/actionTypes"
import fileDownload from 'js-file-download'
import store from '../../stores';

export const getTotalSonicKeysCountAction = (startDate, endDate) => {
    let newEndDate = moment(endDate).endOf("days").toISOString()
    let params = new URLSearchParams(`detectedAt>=${moment(startDate).format("YYYY-MM-DD")}&detectedAt<=date(${newEndDate})`)
    params.append("channel", "STREAMREADER")
    return (dispatch) => {
        dispatch({ type: actionTypes.SET_TOTALSONICKEYS_COUNT_LOADING })
        getTotalSonicKeysCount(params).then((response) => {
            log("Total SonicKeys Detected response", response)
            dispatch({ type: actionTypes.SET_TOTALSONICKEYS_COUNT_SUCCESS, data: response })
        }).catch((error) => {
            log("Total SonicKeys Detected Error", error)
            dispatch({ type: actionTypes.SET_TOTALSONICKEYS_COUNT_ERROR, data: error?.message })
            cogoToast.error(error?.message)
        })
    }
}

export const getTotalSubscribedStationAction = () => {
    return (dispatch) => {
        dispatch({ type: actionTypes.SET_TOTALSUBSCRIBEDSTATION_COUNT_LOADING })
        getTotalSubscribedStation().then((response) => {
            log("TotalSubscribedStation response", response)
            dispatch({ type: actionTypes.SET_TOTALSUBSCRIBEDSTATION_COUNT_SUCCESS, data: response })
        }).catch((error) => {
            log("TotalSubscribedStation error", error)
            dispatch({ type: actionTypes.SET_TOTALSUBSCRIBEDSTATION_COUNT_ERROR, data: error?.message })
            cogoToast.error(error?.message)
        })
    }
}

export const getMostPlayedStationsDataAction = (startDate, endDate) => {
    let newEndDate = moment(endDate).endOf("days").toISOString()
    let params = new URLSearchParams(`detectedAt>=${moment(startDate).format("YYYY-MM-DD")}&detectedAt<=date(${newEndDate})`)
    return (dispatch) => {
        dispatch({ type: actionTypes.SET_MOSTPLAYEDSTATION_LOADING })
        getMostPlayedStationsData(params).then((response) => {
            log("Most played station data success", response)
            dispatch({ type: actionTypes.SET_MOSTPLAYEDSTATION_SUCCESS, data: response })
        }).catch((error) => {
            log("Most played station data error", error)
            dispatch({ type: actionTypes.SET_MOSTPLAYEDSTATION_ERROR, data: error?.message })
            cogoToast.error(error?.message)
        })
    }
}

export const getGraphDataAction = (startDate, endDate) => {
    let newEndDate = moment(endDate).endOf("days").toISOString()
    let params = new URLSearchParams(`detectedAt>=${moment(startDate).format("YYYY-MM-DD")}&detectedAt<=date(${newEndDate})`)
    return dispatch => {
        dispatch({
            type: actionTypes.SET_DASHBOARDGRAPH_LOADING
        })
        getGraphData(params)
            .then((response) => {
                dispatch({
                    type: actionTypes.SET_DASHBOARDGRAPH_SUCCESS,
                    data: response
                })
            }).catch(error => {
                dispatch({
                    type: actionTypes.SET_DASHBOARDGRAPH_ERROR,
                    error: error?.message
                })
                cogoToast.error(error?.message)
            })
    }
};

export const getExportDataAction = (startDate, endDate, channel, limit = 2000, fileFormat) => {
    let newEndDate = moment(endDate).endOf("days").toISOString()
    let params = new URLSearchParams(`detectedAt>=${moment(startDate).format("YYYY-MM-DD")}&detectedAt<=date(${newEndDate})`)
    params.append("limit", limit);

    // params.append("channel", "STREAMREADER");

    let playsFilters = store.getState()?.playsList?.filters

    // channel === "ALL" ? params.append("channel", "") : params.append("channel", channel)

    if (channel !== "ALL") {
        params.append("channel", channel)
    }
    if (playsFilters?.sonicKey) {
        params.append("relation_sonicKey.sonicKey", playsFilters?.sonicKey);
    }
    if (playsFilters?.country) {
        params.append("relation_radioStation.country", playsFilters?.country);
    }
    if (playsFilters?.artist) {
        params.append("relation_sonicKey.contentOwner", playsFilters?.artist);
    }
    if (playsFilters?.radioStation) {
        params.append("relation_radioStation.name", playsFilters?.radioStation);
    }
    if (playsFilters?.song) {
        params.append("relation_sonicKey.originalFileName", playsFilters?.song);
    }
    if (playsFilters?.label) {
        params.append("relation_sonicKey.label", playsFilters?.label);
    }
    if (playsFilters?.distributor) {
        params.append("relation_sonicKey.distributor", playsFilters?.distributor);
    }
    if (playsFilters?.encodedDate) {
        let startOfEncodedDate = moment(playsFilters?.encodedDate).startOf("days").toISOString()
        params.append(`relation_sonicKey.createdAt>`, `date(${startOfEncodedDate})`)
        params.append(`relation_sonicKey.createdAt<`, `date(${moment(playsFilters?.encodedDate).endOf("days").toISOString()})`)
    }

    return dispatch => {
        dispatch({
            type: actionTypes.SET_EXPORTDATA_LOADING
        })
        exportDashboardData(fileFormat, params)
            .then((response) => {
                log("export data", response)
                dispatch({
                    type: actionTypes.SET_EXPORTDATA_SUCCESS,
                    data: response
                })
                fileDownload(response, `Plays & Radio Plays Export-(${moment(startDate).format("YYYY_MM_DD")}-to-${moment(endDate).format("YYYY_MM_DD")})_${fileFormat}.zip`);

            }).catch(error => {
                log("data error", error)
                dispatch({

                    type: actionTypes.SET_EXPORTDATA_ERROR,
                    error: error?.message
                })
                cogoToast.error(error?.message)
            })
    }
};

export const getExportPlaysDataAction = (startDate, endDate, limit = 2000, sonicKey, fileFormat) => {
    let newEndDate = moment(endDate).endOf("days").toISOString()
    let params = new URLSearchParams(`detectedAt>=${moment(startDate).format("YYYY-MM-DD")}&detectedAt<=date(${newEndDate})`)
    params.append("limit", limit);
    return dispatch => {
        dispatch({
            type: actionTypes.SET_EXPORTPLAYSDATA_LOADING
        })
        exportPlaysData(sonicKey, fileFormat, params)
            .then((response) => {
                log("export data", response)
                dispatch({
                    type: actionTypes.SET_EXPORTPLAYSDATA_SUCCESS,
                    data: response
                })
                if (fileFormat === "xlsx") {
                    fileDownload(response, `Plays & Radio Plays Export-(${moment(startDate).format("YYYY_MM_DD")}-to-${moment(endDate).format("YYYY_MM_DD")})_${fileFormat}.xlsx`);
                } else {
                    fileDownload(response, `Plays & Radio Plays Export-(${moment(startDate).format("YYYY_MM_DD")}-to-${moment(endDate).format("YYYY_MM_DD")})_${fileFormat}.zip`);
                }


            }).catch(error => {
                log("data error", error)
                dispatch({

                    type: actionTypes.SET_EXPORTPLAYSDATA_ERROR,
                    error: error?.message
                })
                cogoToast.error(error?.message)
            })
    }
};
