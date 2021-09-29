import * as actionType from './actionTypes';
import Communication from "../../services/https/Communication";


//ThirdPartySonicKeys
export const fetchThirdPartySonicKeys = (limit,index,channel) =>{
    return dispatch =>{
        dispatch({
            type:actionType.THIRDPARTY_SONIC_KEY_LOADING
        })
        Communication.fetchThirdPartySonicKeys(limit,index,channel)
        .then((data) => {
          console.log("3rd Party key's data", data);
         dispatch({type:actionType.THIRDPARTY_SONIC_KEY_SUCCESS,
            data:data
        }) 
        }).catch(error =>{
            console.log(error);
            dispatch({
                type:actionType.THIRDPARTY_SONIC_KEY_FAIL,
                error:error
            })
        })
    }
    
};