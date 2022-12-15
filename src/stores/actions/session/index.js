import Amplify from "aws-amplify";
import * as actionType from "./actionTypes";

//Profile
export const setSession = (user) => {
  return (dispatch) => {
    dispatch({
      type: actionType.SET_USER,
      user: user,
    });
  };
};

export const forgotPasword = (resetPassword) => {
  return (dispatch) => {
    dispatch({
      type: actionType.SET_RESET_PASSWORD,
      resetPassword: resetPassword,
    });
  };
};

export const emailConfirmation = (data) => {
  return (dispatch) => {
    dispatch({
      type: actionType.SET_EMAIL_CONFIRMATION,
      emailConfirmation: data,
    });
  };
};

//LOGOUT SESSION
export const logout = () => {
  return async (dispatch) => {
    Amplify.Auth.signOut();
    dispatch({
      type: "LOGOUT",
    });
  };
};
