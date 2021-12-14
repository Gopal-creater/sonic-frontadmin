import cogoToast from "cogo-toast"
import moment from "moment"
import { getMostPlayedStationsData, getTotalSonicKeysCount, getTotalSubscribedStation } from "../../services/https/resources/Dashboard.api"
import { log } from "../../utils/app.debug"
import * as actionTypes from "../actions/actionTypes"

export const getTotalSonicKeysCountAction = (startDate, endDate) => {
    // log("startDate", startDate)
    // log("endDate", endDate)
    let params = new URLSearchParams(`detectedAt>=${moment(startDate).format("YYYY-MM-DD")}&detectedAt<=${moment(endDate).format("YYYY-MM-DD")}`)
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
        getTotalSubscribedStation().then((response) => {
            log("TotalSubscribedStation response", response)
        }).catch((error) => {
            log("TotalSubscribedStation error", error)
        })
    }
}

export const getMostPlayedStationsDataAction = (startDate, endDate) => {
    let params = new URLSearchParams(`detectedAt>=${moment(startDate).format("YYYY-MM-DD")}&detectedAt<=${moment(endDate).format("YYYY-MM-DD")}`)
    return (dispatch) => {
        getMostPlayedStationsData(params).then((response) => {
            log("Most played station data success", response)
        }).catch((error) => {
            log("Most played station data error", error)
        })
    }
}