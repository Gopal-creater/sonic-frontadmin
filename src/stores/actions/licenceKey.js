import * as actionType from './actionTypes';
import { log } from '../../utils/app.debug';
import { addLicenceKey, getLicenceKey } from '../../services/https/resources/License.api';
import store from '..';
import moment from 'moment';
import cogoToast from 'cogo-toast';

export const addLicenseKeyAction = () => {
    return (dispatch) => {
        dispatch({ type: actionType.ADD_LIC_KEY_LOADING })
        addLicenceKey().then((data) => {
            dispatch({ type: actionType.ADD_LIC_KEY_SUCCESS, data: data });
            cogoToast.success("License key added successfully!");
        }).catch((err) => {
            dispatch({ type: actionType.ADD_LIC_KEY_FAIL, error: err?.message })
            cogoToast.success(err?.message);
        })
    }
}

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
