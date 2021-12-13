import moment from "moment"
import { getTotalSonicKeysDetected, getTotalSubscribedStation } from "../../services/https/resources/Dashboard.api"
import { log } from "../../utils/app.debug"

export const getTotalSonicKeysDetectedAction = (startDate, endDate) => {
    log("startDate", startDate)
    log("endDate", endDate)
    let params = new URLSearchParams(`detectedAt>=${moment(startDate).format("YYYY-MM-DD")}&detectedAt<=${moment(endDate).format("YYYY-MM-DD")}`)
    return (dispatch) => {
        getTotalSonicKeysDetected(params).then((response) => {
            log("Total SonicKeys Detected response", response)
        }).catch((error) => {
            log("Total SonicKeys Detected Error", error)
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