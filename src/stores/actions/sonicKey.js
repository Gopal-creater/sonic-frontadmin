import * as actionType from './actionTypes';
import Communication from "../../services/https/Communication";


//SonicKeys
// export const fetchSonicKeys = () =>{ change for pagination
export const fetchSonicKeys = (limit,index) =>{
    return dispatch =>{
        dispatch({
            type:actionType.SONIC_KEY_LOADING
        })
        // Communication.fetchMySonicKey() change for pagination
        Communication.fetchMySonicKey(limit,index)
        .then((data) => {
          console.log("key's data", data);
         dispatch({type:actionType.SONIC_KEY_SUCCESS,
            data:data
        }) 
        }).catch(error =>{
            console.log(error);
            dispatch({
                type:actionType.SONIC_KEY_FAIL,
                error:error
            })
        })
    }
    
};
