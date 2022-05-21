import { AppWebRequest } from "../../NetworkManager"

export const getUserProfile = () => {
    return AppWebRequest("/users/@me")
}