import { log } from "../../../../utils/app.debug";
import { getRoleWiseID } from "../../AuthHelper";
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
    return AppWebRequest("/sonic-keys/encode-from-track", "post", { data: data });
}

export const getTracks = (param) => {
    return AppWebRequest("/tracks", "get", { params: param })
}

export const getEncodeSearchTracks = (params) => {
    return AppWebRequest("/tracks", "get", {
        params: params
    });
}

export const exportTrack = (format, params) => {
    return AppWebRequest(`/tracks/export/${format}`, "get", { params: params })
}

export const downloadAnyFile = (key) => {
    let userRoleWiseId = getRoleWiseID()
    let params = new URLSearchParams()

    if (userRoleWiseId?.company) params.append("company", userRoleWiseId?.company)
    if (userRoleWiseId?.partner) params.append("partner", userRoleWiseId?.partner)
    if (userRoleWiseId?.owner) params.append("owner", userRoleWiseId?.owner)

    const axiosConfig = {
        headers: {
            'Accept': 'application/json',
        },
        params: params
    };
    return AppWebRequest(`/s3-file-uploads/signed-url/` + encodeURIComponent(key), "get", axiosConfig);
}