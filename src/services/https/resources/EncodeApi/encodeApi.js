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

export const encodeFromTrack = (payload) => {
    return AppWebRequest("/sonic-keys/encode-from-track", "post", { data: payload });
}

export const getTracks = (param) => {
    return AppWebRequest("/tracks", "get", { params: param })
}

export const getEncodeSearchTracks = (title) => {
    return AppWebRequest("/tracks", "get", {
        params:
            // { "relation_sonicKey.originalFileName": `/${title}/i` }
            { "originalFileName": `/${title}/i` }
    });
}