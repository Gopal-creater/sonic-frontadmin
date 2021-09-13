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

//LOGOUT SESSION
export const logout = () => {
  return async (dispatch) => {
    await Amplify.Auth.signOut();
    dispatch({
      type: 'LOGOUT',
    });
  };
};
