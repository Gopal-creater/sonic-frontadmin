import * as actionTypes from './actionTypes';
// import { getAccessToken, getUserId } from '../../RadioStreamMonitor/apiManager/AuthHelper';
// import apiUrl from '../../RadioStreamMonitor/apiManager/apiUrl';
import { getAccessToken, getUserId } from '../../services/https/AuthHelper';
import httpUrl from '../../services/https/httpUrl';
import axios from 'axios';
import { monthRange, todayRange, unauthorizedRedirection, weekRange } from '../../utils/HelperMethods';
import { log } from '../../utils/app.debug';
// import { calculateErrorMessageFromResponse } from '../../../utils/helperMethods';

//fetchDaySonicKeyCount
export const fetchDaySonicKeyCountSuccess = (payload) => {
    return {
        type : actionTypes.fetchDaySonicKeyCountSuccess,
        payload : payload
    };
};

//fetchWeekSonicKeyCount
export const fetchWeekSonicKeyCountSuccess = (payload) => {
    return {
        type : actionTypes.fetchWeekSonicKeyCountSuccess,
        payload : payload
    };
};


//fetchMonthSonicKeyCount
export const fetchMonthSonicKeyCountSuccess = (payload) => {
    return {
        type : actionTypes.fetchMonthSonicKeyCountSuccess,
        payload : payload
    };
};


//fetchRadiostationSonicKeyCount
export const fetchRadiostationSonicKeyCountBegin = () => {
    return {
        type : actionTypes.fetchRadiostationSonicKeyCountBegin
    };
};

export const fetchRadiostationSonicKeyCountSuccess = (payload) => {
    return {
        type : actionTypes.fetchRadiostationSonicKeyCountSuccess,
        payload : payload
    };
};

export const fetchRadiostationSonicKeyCountFailure = (error) => {
    return {
        type : actionTypes.fetchRadiostationSonicKeyCountFailure,
        error : error
    };
};



//fetchDaySonicKeyCount
export function fetchDaySonicKeyCount(todayRange) {
    // log("tommorrow,today",todayRange[0],todayRange[1]);
    const ownerId = getUserId();
    return dispatch => {
      return  axios({
        method: 'get',
        // url: `${httpUrl.API_URL}/radiostations-sonickeys/owners/${ownerId}/dashboard/count?detectedDetails.detectedAt<${todayRange[0]}&detectedDetails.detectedAt>${todayRange[1]}`,
        url: `${httpUrl.API_URL}/detections/owners/${ownerId}/STREAMREADER/count/?detectedAt<${todayRange[0]}&detectedAt>${todayRange[1]}`,
        headers: {
            "Authorization":`Bearer ${getAccessToken()}`
          }
      })
      .then(res => {
         dispatch(fetchDaySonicKeyCountSuccess(res.data));
        //  log("fetch DaySonicKeyCount response",res);
       })
       .catch(err=>{
                if (err.response) {
                  unauthorizedRedirection(err.response.status);
                }
                log("fetch DaySonicKeyCount error",err.response);
                // if (err.response) {
                //     dispatch(fetchRadioStationsFailure(err.response.data.message))
                // } else if (err.request) {
                //     dispatch(fetchRadioStationsFailure("Request error for fetch radiostations!!!"))                    
                // } else {
                //     dispatch(fetchRadioStationsFailure("Unexpected error occured while fetching radiostations!!!"))        
                // }
            }
       );
    };
  }


  //fetchWeekSonicKeyCount
  export function fetchWeekSonicKeyCount(weekRange) {
    // log("tommorrow,today",weekRange[0],weekRange[1]);
    const ownerId = getUserId();
    return dispatch => {
      return  axios({
        method: 'get',
        // url: `${httpUrl.API_URL}/radiostations-sonickeys/owners/${ownerId}/dashboard/count?detectedDetails.detectedAt<${weekRange[0]}&detectedDetails.detectedAt>${weekRange[1]}`, 
        url: `${httpUrl.API_URL}/detections/owners/${ownerId}/STREAMREADER/count/?detectedAt<${weekRange[0]}&detectedAt>${weekRange[1]}`,
        headers: {
            "Authorization":`Bearer ${getAccessToken()}`
          }
      })
      .then(res => {
         dispatch(fetchWeekSonicKeyCountSuccess(res.data));
        //  log("fetch WeekSonicKeyCount response",res);
       })
       .catch(err=>{
                if (err.response) {
                  unauthorizedRedirection(err.response.status);
                }
                log("fetch WeekSonicKeyCount error",err.response);
            }
       );
    };
  }


  //fetchMonthSonicKeyCount
  export function fetchMonthSonicKeyCount(monthRange) {
    // log("tommorrow,monthback",monthRange[0],monthRange[1]);
    const ownerId = getUserId();
    return dispatch => {
      return  axios({
        method: 'get',
        // url: `${httpUrl.API_URL}/radiostations-sonickeys/owners/${ownerId}/dashboard/count?detectedDetails.detectedAt<${monthRange[0]}&detectedDetails.detectedAt>${monthRange[1]}`, 
        url: `${httpUrl.API_URL}/detections/owners/${ownerId}/STREAMREADER/count/?detectedAt<${monthRange[0]}&detectedAt>${monthRange[1]}`,
        headers: {
            "Authorization":`Bearer ${getAccessToken()}`
          }
      })
      .then(res => {
         dispatch(fetchMonthSonicKeyCountSuccess(res.data));
        //  log("fetch MonthSonicKeyCount response",res);
       })
       .catch(err=>{
                if (err.response) {
                  unauthorizedRedirection(err.response.status);
                }
                log("fetch MonthSonicKeyCount error",err.response);
            }
       );
    };
  }


  //fetchRadiostationSonicKeyCount
  export function fetchRadiostationSonicKeyCount(radioId) {
    const ownerId = getUserId();
    return dispatch => {
        dispatch(fetchRadiostationSonicKeyCountBegin());
      return  axios({
        method: 'get',
        url: `${httpUrl.API_URL}/radiostations-sonickeys/owners/${ownerId}/dashboard/count/?detectedDetails.detectedAt<2021-06-30&detectedDetails.detectedAt>2021-06-01&radioStation=${radioId}`, 
        headers: {
            "Authorization":`Bearer ${getAccessToken()}`
          }
      })
      .then(res => {
         dispatch(fetchRadiostationSonicKeyCountSuccess(res.data));
         log("fetch Radiostation SonicKey Count response",res);
       })
       .catch(err=>{
                if (err.response) {
                  unauthorizedRedirection(err.response.status);
                }
                log("fetch Radiostation SonicKey Count error",err.response);
                dispatch(fetchRadiostationSonicKeyCountFailure());
            }
       );
    };
  }


//Fetching total radiostation count fo radiostations
  export const fetchTotalRadiostationCountSuccess = (payload) => {
    return {
        type : actionTypes.fetchTotalRadiostationCountSuccess,
        payload : payload
    };
};


export function fetchTotalRadiostationCount() {
  const ownerId = getUserId(); 
  return dispatch => {
    return  axios({
      method: 'get',
      url: `${httpUrl.API_URL}/radiomonitors/owners/
      ${ownerId}/subscriber-count`, 
      headers: {
          "Authorization":`Bearer ${getAccessToken()}`
        }
    })
    .then(res => {
       dispatch(fetchTotalRadiostationCountSuccess(res.data));
       log("fetch total radiostaions Count response",res);
     })
     .catch(err=>{
              if (err.response) {
                unauthorizedRedirection(err.response.status);
              }
              log("fetch total radiostaions Count error",err);
          }
     );
  };
}



//Fetching total listening count fo radiostations
  export const fetchTotalListeningCountSuccess = (payload) => {
    return {
        type : actionTypes.fetchTotalListeningCountSuccess,
        payload : payload
    };
};


export function fetchTotalListeningCount() {
  const ownerId = getUserId();
  return dispatch => {
    return  axios({
      method: 'get',
      url: `${httpUrl.API_URL}/radiomonitors/owners/${ownerId}/subscriber-count?isListeningStarted=true`, 
      headers: {
          "Authorization":`Bearer ${getAccessToken()}`
        }
    })
    .then(res => {
       dispatch(fetchTotalListeningCountSuccess(res.data));
       log("fetch total listening radiostaions Count response",res);
     })
     .catch(err=>{
              if (err.response) {
                unauthorizedRedirection(err.response.status);
              }
              log("fetch total listening radiostaions Count error",err);
          }
     );
  };
}


//Fetching total not listening count of radiostations
export const fetchTotalNotListeningCountSuccess = (payload) => {
  return {
      type : actionTypes.fetchTotalNotListeningCountSuccess,
      payload : payload
  };
};


export function fetchTotalNotListeningCount() {
const ownerId = getUserId();
return dispatch => {
  return  axios({
    method: 'get',
    url: `${httpUrl.API_URL}/radiomonitors/owners/${ownerId}/subscriber-count?isListeningStarted=false`, 
    headers: {
        "Authorization":`Bearer ${getAccessToken()}`
      }
  })
  .then(res => {
     dispatch(fetchTotalNotListeningCountSuccess(res.data));
     log("fetch total not listening radiostaions Count response",res);
   })
   .catch(err=>{
            if (err.response) {
              unauthorizedRedirection(err.response.status);
            }
            log("fetch total not listening radiostaions Count error",err);
        }
   );
};
}


//Fetching total error count of radiostations
export const fetchTotalErrorCountSuccess = (payload) => {
  return {
      type : actionTypes.fetchTotalErrorCountSuccess,
      payload : payload
  };
};


export function fetchTotalErrorCount() {
const ownerId = getUserId();
return dispatch => {
  return  axios({
    method: 'get',
    url: `${httpUrl.API_URL}/radiomonitors/owners/${ownerId}/subscriber-count?isError=true`, 
    headers: {
        "Authorization":`Bearer ${getAccessToken()}`
      }
  })
  .then(res => {
     dispatch(fetchTotalErrorCountSuccess(res.data));
     log("fetch total error radiostaions Count response",res);
   })
   .catch(err=>{
            if (err.response) {
              unauthorizedRedirection(err.response.status);
            }
            log("fetch total error radiostaions Count error",err);
        }
   );
};
}