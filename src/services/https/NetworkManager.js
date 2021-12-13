import axios from 'axios';
import httpUrl from './httpUrl';
import { getAccessToken } from './AuthHelper';
import cogoToast from 'cogo-toast';
import { logout } from '../../stores/actions';
import store from '../../stores';
import { log } from '../../utils/app.debug';

const appAxiosInstance = axios.create({
    baseURL: httpUrl.API_URL
})

//request interceptor that will add auth token to every request
appAxiosInstance.interceptors.request.use(function (config) {
    const token = getAccessToken();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

//Any Request to Server
export function AppWebRequest(endUrl, method, config) {
    var responseError = {}
    return new Promise((resolve, reject) => {
        const defaultConfig = {
            url: endUrl,
            method: method || "get",
            baseURL: httpUrl.API_URL
        };

        const finalConfig = Object.assign(defaultConfig, config || {});
        appAxiosInstance(finalConfig).then(response => {
            log("response", response);
            resolve(response.data);
        }).catch(error => {
            log("error", error);
            if (error?.response) {
                if (error.response.status === 401) {
                    // case for refresh token
                    store.dispatch(logout());
                    localStorage.clear()
                }
                responseError = {
                    ...error.response?.data,
                    ...getProperErrorMessageFromError(error.response?.data),
                    status: error.response.status,
                    headers: error.response.headers,
                };
            } else if (error?.request) {
                responseError = {
                    ...error,
                    message: "Can not made connection to the server"
                };
            } else {
                responseError = {
                    ...error,
                    message: "Unexpected error occured!"
                };
            }
            reject({
                ...responseError,
                data: responseError
            })
        })
    })
}

function getProperErrorMessageFromError(error) {
    const errorObj = {
        message: "",
        errorData: []
    }

    if (typeof (error?.message) == "string") {
        errorObj.message = error?.message
    } else if (Array.isArray(error?.message) && typeof (error?.message[0]) == "string") {
        errorObj.errorData = error?.message
        errorObj.message = error?.message[0]
    } else {
        errorObj.message = error?.error || "Unexpected error occured"
    }

    return errorObj
}