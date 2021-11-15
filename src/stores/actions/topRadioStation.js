import * as actionTypes from './actionTypes';
// import { getAccessToken, getUserId } from '../../RadioStreamMonitor/apiManager/AuthHelper';
// import apiUrl from '../../RadioStreamMonitor/apiManager/apiUrl';
import { getAccessToken, getUserId } from '../../services/https/AuthHelper';
import httpUrl from '../../services/https/httpUrl';
import axios from 'axios';
import { unauthorizedRedirection, padLeadingZeros } from '../../utils/HelperMethods';
import { log } from '../../utils/app.debug';

export const fetchTopRadioStationBegin = () => {
  return {
      type : actionTypes.fetchTopRadioStationBegin
  };
};

export const fetchTopRadioStationSuccess = (payload) => {
    return {
        type : actionTypes.fetchTopRadioStationSuccess,
        payload : payload
    };
};

export const fetchTopRadioStationFailure = (error) => {
  return {
      type : actionTypes.fetchTopRadioStationFailure,
      error : error
  };
};

export function fetchTopRadioStation(monthRange) {
  // log("today,month back",monthRange[0],monthRange[1]);
    const currentYear = new Date().getFullYear();
    const currentMonth = padLeadingZeros(new Date().getMonth()+1);
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
    const ownerId = getUserId();
    return dispatch => {
      dispatch(fetchTopRadioStationBegin());
      return  axios({
        method: 'get', 
        // url: `${httpUrl.API_URL}/radiostations`,
        // url: `${httpUrl.API_URL}/radiostations-sonickeys/owners/${ownerId}/dashboard/top-stations-with-top-sonickey?createdAt<${monthRange[0]}&createdAt>${monthRange[1]}`, 
        url: `${httpUrl.API_URL}/detections/owners/${ownerId}/radioStations/top-radiostations-with-top-sonickeys?detectedAt<${currentYear}-${currentMonth}-${daysInMonth}&detectedAt>${currentYear}-${currentMonth}-01&includeGraph=true&groupByTime=dayOfMonth`,
        headers: {
            "Authorization":`Bearer ${getAccessToken()}`
          }
      })
      .then(res => {
         dispatch(fetchTopRadioStationSuccess(res.data));
         log("fetch top radiostations with graphs response",res);
         console.log("fetch top radiostations with graphs response",res)
       })
       .catch(err=>{
                log("fetch top radiostations error",err);
                if (err.response) {
                  unauthorizedRedirection(err.response.status);
                  dispatch(fetchTopRadioStationFailure(err.response.data.message))
                } else if (err.request) {
                    dispatch(fetchTopRadioStationFailure("Request error for fetch top radiostations!!!"))                    
                } else {
                    dispatch(fetchTopRadioStationFailure("Unexpected error occured while fetching top radiostations!!!"))        
                }
            }
       );
    };
  }