import * as actionType from './actionTypes';
import { log } from '../../utils/app.debug';
import { getLicenceKey } from '../../services/https/resources/License.api';
import store from '..';
import moment from 'moment';

//LicenceKeys
export const fetchLicenceKeys = () => {
    let params = new URLSearchParams();
    let licenseFilter = store.getState()?.licenceKey?.filters

    if (licenseFilter?.name) {
        params.append("name", `/${licenseFilter?.name}/i`)
    }

    if (licenseFilter?.key) {
        params.append("key", `/${licenseFilter?.key}/i`)
    }

    if (licenseFilter?.type) {
        params.append("type", licenseFilter?.type)
    }

    if (licenseFilter?.status) {
        params.append("suspended", licenseFilter?.status === "Active" ? false : true)
    }

    if (licenseFilter?.renewalStartDate) {
        params.append(`validity>`, `date(${moment(licenseFilter?.renewalStartDate).startOf("days").toISOString()})`)
        if (licenseFilter?.renewalEndDate) {
            params.append(`validity<`, `date(${moment(licenseFilter?.renewalEndDate).endOf("days").toISOString()})`)
        } else {
            params.append(`validity<`, `date(${moment(licenseFilter?.renewalStartDate).endOf("days").toISOString()})`)
        }
    }

    return dispatch => {
        dispatch({
            type: actionType.LIC_KEY_LOADING
        })
        getLicenceKey(params)
            .then((data) => {
                log("License Key", data);
                dispatch({ type: actionType.LIC_KEY_SUCCESS, data: data })
            }).catch(error => {
                log("License Key Error", error);
                dispatch({ type: actionType.LIC_KEY_FAIL, error: error })
            })
    }

};
