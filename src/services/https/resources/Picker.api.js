import { getUserId } from "../AuthHelper";
import { AppWebRequest } from "../NetworkManager";

export const findTitle = (title) => {
    return AppWebRequest(`detections/owners/${getUserId()}/list-plays`, "get", {
        params:
            { "relation_sonicKey.contentFileName": `/${title}/i` }
    });
}

export const findCompany = (name) => {
    return AppWebRequest(`/companies`, "get", {
        params:
            { "name": `/${name}/i` }
    });
}

export const findUser = (name) => {
    return AppWebRequest(`/users`, "get", {
        params:
            { "name": `/${name}/i` }
    });
}
