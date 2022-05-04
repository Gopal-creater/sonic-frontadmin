import { getUserId } from "../AuthHelper";
import { AppWebRequest } from "../NetworkManager";


export const findTitle = (title) => {
    return AppWebRequest(`detections/owners/${getUserId()}/list-plays`, "get", {
        params:
            { "relation_sonicKey.contentFileName": `/${title}/i` }
    });
}
