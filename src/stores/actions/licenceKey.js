import * as actionType from './actionTypes';
import Communication from "../../services/https/Communication";


//LicenceKeys
export const fetchLicenceKeys = () =>{
    return dispatch =>{
        dispatch({
            type:actionType.LIC_KEY_LOADING
        })
        Communication.fetchLicenceKey()
        .then((data) => {
          console.log("key's data", data);
         dispatch({type:actionType.LIC_KEY_SUCCESS,
            data:data
        }) 
        }).catch(error =>{
            console.log(error);
            dispatch({
                type:actionType.LIC_KEY_FAIL,
                error:error
            })
        })
    }
    
};
