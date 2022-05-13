import { log } from "../../../utils/app.debug";
import { getUserId } from "../AuthHelper";
import { AppWebRequest } from "../NetworkManager";


export const findTitle = (title) => {
    log("title", title)
    return AppWebRequest(`detections/owners/${getUserId()}/list-plays`, "get", {
        params:
            { "relation_sonicKey.contentFileName": `/${title}/i` }
    });
}
