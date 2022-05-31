import { log } from "../../../../utils/app.debug";
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

export const getTracks = (param) => {
    return AppWebRequest("/tracks", "get", { params: param })
}

export const getEncodeSearchTracks = (params, title) => {
    return AppWebRequest("/tracks", "get", {
        params: { originalFileName: `/${title}/i` }
    });
}