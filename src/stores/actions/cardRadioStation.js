import * as actionTypes from './actionTypes';
import { getAccessToken, getUserId } from '../../services/https/AuthHelper';
// import apiUrl from '../../RadioStreamMonitor/apiManager/apiUrl';
import httpUrl from '../../services/https/httpUrl';
import axios from 'axios';
import { unauthorizedRedirection } from '../../utils/HelperMethods';
import { log } from '../../utils/app.debug';
// import { calculateErrorMessageFromResponse } from '../../../utils/helperMethods';


export const fetchAllCardRadioStationSuccess = (payload) => {
    return {
        type : actionTypes.fetchAllCardRadioStationSuccess,
        payload : payload
    };
};

export function fetchAllCardRadioStation(_offset=0, _limit=1000000) {
    const ownerId = getUserId();
    return dispatch => {
      return  axios({
        method: 'get', 
        // url: `${httpUrl.API_URL}/radiostations`,
        url: `${httpUrl.API_URL}/radiostations?country=France`, 
        headers: {
            "Authorization":`Bearer ${getAccessToken()}`
          }
      })
      .then(res => {
         dispatch(fetchAllCardRadioStationSuccess(res.data));
         log("fetch card radiostations response",res);
       })
       .catch(err=>{
                log("fetch card radiostations error",err.response);
                if (err.response) {
                    unauthorizedRedirection(err.response.status);
                }
            }
       );
    };
  }