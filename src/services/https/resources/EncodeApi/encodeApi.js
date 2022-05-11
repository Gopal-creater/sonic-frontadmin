import { AppWebRequest } from "../../NetworkManager"

export const encodeFile = (formData) => {
    const axiosConfig = {
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
        },
    };
    return AppWebRequest("/sonic-keys/encode", "post", axiosConfig);
}