import { userRoles } from "../../constants/constants";
import store from "../../stores";

export function getAccessToken() {
  const user_info = localStorage.getItem("user_info")
    ? JSON.parse(localStorage.getItem("user_info"))
    : null;
  if (user_info && user_info?.access_token) {
    return user_info?.access_token;
  }
  return null;
}

export function getUserId() {
  const user_info = localStorage.getItem("user_info")
    ? JSON.parse(localStorage.getItem("user_info"))
    : null;
  if (user_info && user_info?.user?._id) {
    return user_info?.user?._id;
  }
  return null;
}

export function getUserName() {
  const user_info = localStorage.getItem("user_info")
    ? JSON.parse(localStorage.getItem("user_info"))
    : null;
  if (user_info && user_info?.user?.username) {
    return user_info?.user?.username;
  }
  return "--";
}

export function getRoleWiseID() {
  let userRole = store.getState()?.user?.userProfile?.data?.userRole;
  let IDs = { partner: "", company: "", owner: "" };
  if (
    userRole === userRoles.COMPANY_ADMIN ||
    userRole === userRoles.COMPANY_USER
  ) {
    IDs.company = store.getState()?.user?.userProfile?.data?.company?._id;
    return IDs;
  } else if (
    userRole === userRoles.PARTNER_ADMIN ||
    userRole === userRoles.PARTNER_USER
  ) {
    IDs.partner = store.getState()?.user?.userProfile?.data?.partner?._id;
    return IDs;
  } else {
    IDs.owner = getUserId();
    return IDs;
  }
}

export function getAdmin() {
  const user_info = localStorage.getItem("user_info")
    ? JSON.parse(localStorage.getItem("user_info"))
    : null;
  if (
    user_info &&
    user_info?.signInUserSession?.idToken?.payload?.[
      "cognito:groups"
    ]?.includes("Admin")
  ) {
    return true;
  }
  return false;
}

export function isAuthenticated() {
  if (getAccessToken()) {
    return true;
  } else {
    return false;
  }
}

export function getRefreshToken() {
  const user_info = localStorage.getItem("user_info")
    ? JSON.parse(localStorage.getItem("user_info"))
    : null;
  if (user_info && user_info?.access_token) {
    return user_info?.access_token;
  }
  return null;
}
