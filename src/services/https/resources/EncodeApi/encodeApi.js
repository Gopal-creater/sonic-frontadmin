import { AppWebRequest } from "../../NetworkManager"

export const encodeFromFile = (formData) => {
    const axiosConfig = {
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
        },
    };
    return AppWebRequest("/sonic-keys/encode-from-file", "post", axiosConfig);
}

export const encodeFromTrack = (data) => {
    return AppWebRequest("/sonic-keys/encode-from-track", "post", data);
}

export const getEncodedTrack = () => {
    return AppWebRequest("/sonic-keys")
}