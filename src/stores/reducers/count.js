import * as actionTypes from '../actions/actionTypes';
import { cloneDeep } from 'lodash';

const initialState = {
    day:'0',
    week: '0',
    month: '0',
    totalListeningCount : '0',
    totalNotListeningCount : '0',
    totalErrorCount : '0',
    totalRadiostaionCount : '0',
    hits: '',
    hitsLoading : false,
    hitsError : false,
}

export default function countReducer(state = initialState, action) {
    switch(action.type) {
      case actionTypes.fetchDaySonicKeyCountSuccess:
                return {
                ...state,
                day: action.payload
                };
  
      case actionTypes.fetchWeekSonicKeyCountSuccess:
                return {
                    ...state,
                    week: action.payload
                    };
  
      case actionTypes.fetchMonthSonicKeyCountSuccess:
                return {
                    ...state,
                    month: action.payload
                    };

//for hits related
        case actionTypes.fetchRadiostationSonicKeyCountBegin:
            return {
                ...state,
                hitsLoading : true,
                hitsError: false,
                };

        case actionTypes.fetchRadiostationSonicKeyCountSuccess:
            return {
                ...state,
                hits: action.payload,
                hitsLoading : false,
                hitsError: false,
                };

        case actionTypes.fetchRadiostationSonicKeyCountFailure:
            return {
                ...state,
                hitsError: true,
                hitsLoading : false,
                };

        case actionTypes.fetchTotalRadiostationCountSuccess:
            return {
                ...state,
                totalRadiostaionCount : action.payload,
                };

        case actionTypes.fetchTotalListeningCountSuccess:
            return {
                ...state,
                totalListeningCount : action.payload,
                };

        case actionTypes.fetchTotalNotListeningCountSuccess:
            return {
                ...state,
                totalNotListeningCount : action.payload,
                };

        case actionTypes.fetchTotalErrorCountSuccess:
            return {
                ...state,
                totalErrorCount : action.payload,
                };
  
      default:
                return state;
    }
  }