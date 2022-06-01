import * as actionType from './actionTypes';
import { addLicenceKey, getLicenceKey } from '../../services/https/resources/License.api';
import store from '..';
import moment from 'moment';
import cogoToast from 'cogo-toast';
import { userRoles } from '../../constants/constants';
import { getRoleWiseID } from '../../services/https/AuthHelper';

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
export const fetchLicenceKeys = (limit, page) => {
    let params = new URLSearchParams();
    params.append("limit", limit);
    params.append("page", page);
    params.append("skip", page > 1 ? (page - 1) * limit : 0)
    params.append("sort", "-createdAt");

    let licenseFilter = store.getState()?.licenceKey?.filters;

    let userRoleWiseId = getRoleWiseID()
    let additionalFilter = {

    }
    if (userRoleWiseId?.partner) {
        additionalFilter = { $or: [{ "company.partner": userRoleWiseId?.partner }, { "users.partner": userRoleWiseId?.partner }] }
        params.append("relation_filter", JSON.stringify(additionalFilter))
    }

    if (userRoleWiseId?.company) params.append("company", userRoleWiseId?.company)
    if (userRoleWiseId?.owner) params.append("users", userRoleWiseId?.owner)

    if (licenseFilter?.name) {
        params.append("name", `/${licenseFilter?.name}/i`)
    }

    if (licenseFilter?.key) {
        params.append("key", `/${licenseFilter?.key}/i`)
    }

    if (licenseFilter?.type) {
        if (licenseFilter?.type === "Partner") {
            params.append("userRole", [userRoles.PARTNER_ADMIN, userRoles.PARTNER_USER]);
        } else if (licenseFilter?.type === "Company") {
            params.append("userRole", [userRoles.COMPANY_ADMIN, userRoles.COMPANY_USER]);
        }
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

    return (dispatch) => {
        dispatch({ type: actionType.LIC_KEY_LOADING })
        getLicenceKey(params).then((data) => {
            dispatch({ type: actionType.LIC_KEY_SUCCESS, data: data })
        }).catch(error => {
            dispatch({ type: actionType.LIC_KEY_FAIL, error: error?.message })
            cogoToast.success(error?.message);
        })
    }

};
