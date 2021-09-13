import * as actionType from './actionTypes';
import Communication from "../../services/https/Communication";
import { AppWebRequest } from '../../services/https/NetworkManager';


//Profile
export const fetchProfile = () =>{
    return dispatch =>{
        dispatch({
            type:actionType.PROFILE_LOADING
        })
          AppWebRequest('auth/user/profile', 'get').then(responseData=>{
            console.log(responseData);
            dispatch({
                type:actionType.PROFILE_SUCCESS,
                data:responseData
            })
        }).catch(error =>{
            console.log(error);
            dispatch({
                type:actionType.PROFILE_FAIL,
                error:error
            })
        })
    }
    
};
