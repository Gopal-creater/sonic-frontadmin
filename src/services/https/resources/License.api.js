import { getUserId } from "../AuthHelper";
import { AppWebRequest } from "../NetworkManager";

export const getLicenceKey = (params) => {
    return AppWebRequest(`/users/${getUserId()}/licenses`, "get", { params: params });
}