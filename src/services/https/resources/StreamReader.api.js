import { getUserId } from "../AuthHelper"
import { AppWebRequest } from "../NetworkManager"

// export const fetchRadioStations = (params) => {
//     return AppWebRequest(`/radiostations`, 'get', { params: params })
// }

export const fetchRadioStations = (params) => {
    // let index = page > 1 ? (page - 1) * limit : 0;
    // const axiosConfig = {
    //     params: {
    //         filter: {
    //             $or: [
    //                 { [`radioSearch.name`]: { "$regex": `${value ? value : ''}`, "$options": "i" } },
    //                 { [`radioSearch.country`]: { "$regex": `${value ? value : ""}`, "$options": "i" } },
    //             ]
    //         },
    //     },
    // }
    return AppWebRequest(`/radiomonitors/owners/${getUserId()}/subscribed-stations`, "get", { params: params })
}