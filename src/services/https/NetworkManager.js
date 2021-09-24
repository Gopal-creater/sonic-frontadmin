import axios from 'axios';
import httpUrl from './httpUrl';
import { getAccessToken } from './AuthHelper';
import cogoToast from 'cogo-toast';
import { logout } from '../../stores/actions';
import store from '../../stores';

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
    return new Promise((resolve, reject) => {
        const defaultConfig = {
            url: endUrl,
            method: method || "get",
            baseURL: httpUrl.API_URL
        };

        const finalConfig = Object.assign(defaultConfig, config || {});
        appAxiosInstance(finalConfig).then(response => {
            console.log("response", response);
            resolve(response.data);
        }).catch(error => {
            if (error.response) {
                if (error.response.status === 401) {

                    // case for refresh token
                    // cogoToast.error("Your session is invalid. Please log in again");
                    store.dispatch(logout());
                    localStorage.clear()
                    //    window.location.href = "/auth/login";
                }
                console.log("error", error.response);
                const err = error.response.data;
                reject(err)
            } else if (error.request) {
                const err = new Error("Request error!!!")
                reject(err)
            } else {
                error.message = "Unexpected error occured!!!"
                reject(error)
            }

        })
    })
}

