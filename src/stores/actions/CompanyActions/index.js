import cogoToast from "cogo-toast";
import * as actionTypes from "../actionTypes";
import store from "../..";
import { log } from "../../../utils/app.debug";
import {
  createCompany,
  getAllCompanies,
  getCompanyEncodes,
  getCompanyEncodesExports,
  updateCompanyProfile,
} from "../../../services/https/resources/Companies/Companies.api";
import { getRoleWiseID } from "../../../services/https/AuthHelper";
import moment from "moment";
import fileDownload from "js-file-download";

export const createCompanyAction = (payload) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.CREATE_COMPANY_LOADING });
    createCompany(payload)
      .then((res) => {
        dispatch({ type: actionTypes.CREATE_COMPANY_SUCCESS, data: res });
        cogoToast.success("Company created successfully!");
      })
      .catch((err) => {
        log("Create Company Error", err);
        dispatch({
          type: actionTypes.CREATE_COMPANY_ERROR,
          data: err?.message,
        });
        cogoToast.error(err?.message);
      });
  };
};

export const updateCompanyProfileAction = (payload, id) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_COMPANY_LOADING });
    updateCompanyProfile(payload, id)
      .then((res) => {
        dispatch({ type: actionTypes.UPDATE_COMPANY_SUCCESS, data: res });
        cogoToast.success("Company updated successfully!");
      })
      .catch((err) => {
        log("update Company Error", err);
        dispatch({
          type: actionTypes.UPDATE_COMPANY_ERROR,
          data: err?.message,
        });
        cogoToast.error(err?.message);
      });
  };
};

export const getAllCompaniesAction = (limit, page) => {
  let params = new URLSearchParams();
  params.append("limit", limit);
  params.append("page", page);
  params.append("skip", page > 1 ? (page - 1) * limit : 0);

  let company = store.getState()?.company?.filters;

  let userRoleWiseId = getRoleWiseID();
  if (userRoleWiseId?.company)
    params.append("company", userRoleWiseId?.company);
  if (userRoleWiseId?.partner)
    params.append("partner", userRoleWiseId?.partner);
  if (userRoleWiseId?.owner) params.append("owner", userRoleWiseId?.owner);

  if (company?.companyName) {
    params.append("name", `/${company?.companyName}/i`);
  }

  if (company?.companyType) {
    params.append("companyType", `/${company?.companyType}/i`);
  }

  if (company?.email) {
    params.append("relation_owner.email", company?.email);
  }

  if (company?.companyId) {
    params.append("_id", company?.companyId);
  }

  if (company?.admin) {
    params.append("relation_owner._id", company?.admin);
  }

  return (dispatch) => {
    dispatch({ type: actionTypes.GET_COMPANIES_LOADING });
    getAllCompanies(params)
      .then((response) => {
        log("company details found", response);
        dispatch({ type: actionTypes.GET_COMPANIES_SUCCESS, data: response });
      })
      .catch((err) => {
        log("company details error", err);
        dispatch({ type: actionTypes.GET_COMPANIES_ERROR, data: err?.message });
        cogoToast.error(err?.message);
      });
  };
};

export const getCompanySearchAction = (companyName, limit = "50") => {
  let params = new URLSearchParams();
  params.append("limit", limit);

  params.append("name", `/${companyName}/i`);

  let userRoleWiseId = getRoleWiseID();
  if (userRoleWiseId?.company)
    params.append("company", userRoleWiseId?.company);
  if (userRoleWiseId?.partner)
    params.append("partner", userRoleWiseId?.partner);
  if (userRoleWiseId?.owner) params.append("owner", userRoleWiseId?.owner);

  return (dispatch) => {
    dispatch({ type: actionTypes.SET_SEARCH_COMPANY_LOADING });
    getAllCompanies(params)
      .then((response) => {
        log("company search found", response);
        dispatch({
          type: actionTypes.SET_SEARCH_COMPANY_SUCCESS,
          data: response,
        });
      })
      .catch((err) => {
        log("company search error", err);
        dispatch({
          type: actionTypes.SET_SEARCH_COMPANY_ERROR,
          data: err?.message,
        });
        cogoToast.error(err?.message);
      });
  };
};

export const getCompanyEncodesAction = (
  limit = 10,
  page = 1,
  sortBy,
  isAscending
) => {
  let companyEncodes = store.getState()?.company?.companyEncodes;
  let userRoleWiseId = getRoleWiseID();

  let newEndDate = moment(companyEncodes?.dates?.endDate)
    .endOf("days")
    .toISOString();
  let params = new URLSearchParams(
    `createdAt>=${moment(companyEncodes?.dates?.startDate).format(
      "YYYY-MM-DD"
    )}&createdAt<=date(${newEndDate})`
  );

  params.append("limit", limit);
  params.append("page", page);
  params.append("skip", page > 1 ? (page - 1) * limit : 0);

  if (userRoleWiseId?.company)
    params.append("company", userRoleWiseId?.company);
  if (userRoleWiseId?.partner)
    params.append("partner", userRoleWiseId?.partner);
  if (userRoleWiseId?.owner) params.append("owner", userRoleWiseId?.owner);

  if (companyEncodes?.filters?.company?._id)
    params.append("_id", companyEncodes?.filters?.company?._id);

  if (sortBy) {
    isAscending
      ? params.append("sort", sortBy)
      : params.append("sort", `-${sortBy}`);
  }

  return (dispatch) => {
    dispatch({ type: actionTypes.GET_COMPANY_ENCODES_LOADING });
    getCompanyEncodes(params)
      .then((res) => {
        dispatch({ type: actionTypes.GET_COMPANY_ENCODES_DATA, data: res });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.GET_COMPANY_ENCODES_ERROR,
          data: err?.message,
        });
      });
  };
};

export const getCompanyEncodesExportsAction = (
  format,
  limit = 10,
  page = 1,
  sortBy,
  isAscending
) => {
  let companyEncodes = store.getState()?.company?.companyEncodes;
  let userRoleWiseId = getRoleWiseID();

  let newEndDate = moment(companyEncodes?.dates?.endDate)
    .endOf("days")
    .toISOString();
  let params = new URLSearchParams(
    `createdAt>=${moment(companyEncodes?.dates?.startDate).format(
      "YYYY-MM-DD"
    )}&createdAt<=date(${newEndDate})`
  );

  params.append("limit", limit);
  params.append("page", page);
  params.append("skip", page > 1 ? (page - 1) * limit : 0);

  if (userRoleWiseId?.company)
    params.append("company", userRoleWiseId?.company);
  if (userRoleWiseId?.partner)
    params.append("partner", userRoleWiseId?.partner);
  if (userRoleWiseId?.owner) params.append("owner", userRoleWiseId?.owner);

  if (companyEncodes?.filters?.company?._id)
    params.append("_id", companyEncodes?.filters?.company?._id);

  if (sortBy) {
    isAscending
      ? params.append("sort", sortBy)
      : params.append("sort", `-${sortBy}`);
  }

  return (dispatch) => {
    getCompanyEncodesExports(format, params)
      .then((data) => {
        log("Company Encodes graphs", data);
        if (format === "xlsx") {
          fileDownload(
            data,
            `Encodes_By_Company_Export-xlsx-(${moment(
              companyEncodes?.dates?.startDate
            ).format("YYYY_MM_DD")}-to-${moment(
              companyEncodes?.dates?.endDate
            ).format("YYYY_MM_DD")})_${format}.xlsx`
          );
        } else {
          fileDownload(
            data,
            `Encodes_By_company_Export-csv-(${moment(
              companyEncodes?.dates?.startDate
            ).format("YYYY_MM_DD")}-to-${moment(
              companyEncodes?.dates?.endDate
            ).format("YYYY_MM_DD")})_${format}.csv`
          );
        }
      })
      .catch((error) => {
        log("Company Encodes graphs error", error);
        cogoToast.error(error?.message);
      });
  };
};
