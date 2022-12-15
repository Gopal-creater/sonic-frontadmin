import { AppWebRequest } from "../../NetworkManager";

export const login = (payload) => {
  return AppWebRequest("/auth/local/login", "post", { data: payload });
};

export const registerUser = (payload) => {
  return AppWebRequest("/auth/local/register", "post", { data: payload });
};

export const forgotUserPassword = (payload) => {
  return AppWebRequest("/auth/forgot-password", "post", { data: payload });
};

export const resetPassword = (payload) => {
  return AppWebRequest("/auth/reset-password", "post", { data: payload });
};

export const sendEmailVerification = (payload) => {
  return AppWebRequest("/auth/send-email-verification", "post", {
    data: payload,
  });
};

export const emailVerification = (payload) => {
  return AppWebRequest("/auth/email-verification", "post", {
    data: payload,
  });
};
