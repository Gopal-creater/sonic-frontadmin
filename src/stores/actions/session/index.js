import Amplify from "aws-amplify";
import * as actionType from "./actionTypes";

//Profile
export const setSession = (user, authState = "") => {
  return (dispatch) => {
    dispatch({
      type: actionType.SET_USER,
      user: user,
      authState: authState
    });
  };
};

export const forgotPasword = (resetPassword) => {
  return (dispatch) => {
    dispatch({
      type: actionType.SET_RESET_PASSWORD,
      resetPassword: resetPassword
    })
  }
}

//LOGOUT SESSION
export const logout = () => {
  return async (dispatch) => {
    Amplify.Auth.signOut();
    dispatch({
      type: 'LOGOUT',
    });
  };
};
