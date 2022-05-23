import { log } from "../../../../utils/app.debug"
import { AppWebRequest } from "../../NetworkManager"

export const getUserProfile = (jwtToken) => {
    const config = {
        headers: { Authorization: `Bearer ${jwtToken}` }
    };
    return AppWebRequest("/users/@me", "get", config)
}