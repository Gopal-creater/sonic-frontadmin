import * as actionTypes from './actionTypes';
// import { getAccessToken, getUserId } from '../../RadioStreamMonitor/apiManager/AuthHelper';
// import apiUrl from '../../RadioStreamMonitor/apiManager/apiUrl';
import { getAccessToken, getUserId } from '../../services/https/AuthHelper';
import httpUrl from '../../services/https/httpUrl';
import axios from 'axios';
import { unauthorizedRedirection } from '../../utils/HelperMethods';
import { log } from '../../utils/app.debug';
import { AppWebRequest } from '../../services/https/NetworkManager';
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
    const _skip=_offset > 1 ? (_offset - 1) * _limit : 0
    return dispatch => {
      dispatch(fetchRadioStationsBegin());
      return AppWebRequest(`/radiostations/owners/${ownerId}?skip=${_skip}&limit=${_limit}&sort=-createdAt`, 'get') 
      .then(res => {
          console.log('Radio Stations',res);
         dispatch(fetchRadioStationsSuccess(res));
         log("fetch radiostations response",res);
       })
       .catch(err=>{
                log("fetch radiostations error",err);
                if (err) {
                    unauthorizedRedirection(err.status);
                    dispatch(fetchRadioStationsFailure(err.message))
                } else if (err.request) {
                    dispatch(fetchRadioStationsFailure("Request error for fetch radiostations!!!"))                    
                } else {
                    dispatch(fetchRadioStationsFailure("Unexpected error occured while fetching radiostations!!!"))        
                }
            }
       );
    };
  }