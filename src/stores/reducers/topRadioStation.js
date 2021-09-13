import * as actionTypes from '../actions/actionTypes';
import { cloneDeep } from 'lodash';

const initialState = {
    topRadiostations: [],
    loading : false,
    error : null
}

export default function topRadiostationReducer(state = initialState, action) {
    switch(action.type) {

      case actionTypes.fetchTopRadioStationBegin:
                  return {
                  ...state,
                  loading: true,
                  error: null
                  };
    
      case actionTypes.fetchTopRadioStationSuccess:
                    return {
                    ...state,
                    loading : false,
                    error : null,
                    topRadiostations : cloneDeep(action.payload),
                    };
    
        case actionTypes.fetchTopRadioStationFailure:
                  return {
                  ...state,
                  loading: false,
                  error: action.error
                  };
  
      default:
                return state;
    }
  }