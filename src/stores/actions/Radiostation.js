import * as actionTypes from './actionTypes';
// import { getAccessToken, getUserId } from '../../RadioStreamMonitor/apiManager/AuthHelper';
// import apiUrl from '../../RadioStreamMonitor/apiManager/apiUrl';
import { getAccessToken, getUserId } from '../../services/https/AuthHelper';
import httpUrl from '../../services/https/httpUrl';
import axios from 'axios';
import { unauthorizedRedirection } from '../../utils/HelperMethods';
import { log } from '../../utils/app.debug';
// import { calculateErrorMessageFromResponse } from '../../../utils/helperMethods';

export const fetchRadioStationsBegin = () => {
    return {
        type : actionTypes.fetchAllRadioStationBegin
    };
};

export const fetchRadioStationsSuccess = (payload) => {
    return {
        type : actionTypes.fetchAllRadioStationSuccess,
        payload : payload
    };
};

export const fetchRadioStationsFailure = (error) => {
    return {
        type : actionTypes.fetchAllRadioStationFailure,
        error : error
    };
};

export function fetchRadioStations(_offset=0, _limit=5) {
    const ownerId = getUserId();
    return dispatch => {
      dispatch(fetchRadioStationsBegin());
      return  axios({
        method: 'get', 
        // url: `${httpUrl.API_URL}/radiostations`,
        url: `${httpUrl.API_URL}/radiostations/owners/${ownerId}?skip=${_offset}&limit=${_limit}&sort=-createdAt`, 
        headers: {
            "Authorization":`Bearer ${getAccessToken()}`
          }
      })
      .then(res => {
         dispatch(fetchRadioStationsSuccess(res.data));
         log("fetch radiostations response",res);
       })
       .catch(err=>{
                log("fetch radiostations error",err.response);
                if (err.response) {
                    unauthorizedRedirection(err.response.status);
                    dispatch(fetchRadioStationsFailure(err.response.data.message))
                } else if (err.request) {
                    dispatch(fetchRadioStationsFailure("Request error for fetch radiostations!!!"))                    
                } else {
                    dispatch(fetchRadioStationsFailure("Unexpected error occured while fetching radiostations!!!"))        
                }
            }
       );
    };
  }