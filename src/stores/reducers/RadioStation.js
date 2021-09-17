import * as actionTypes from '../actions/actionTypes';
import { cloneDeep } from 'lodash';

const initialState = {
    radiostations: [],
    totalRadioStreams: 'na',
    loading: false,
    error: null
}

export default function radiostationsReducer(state = initialState, action) {
    switch(action.type) {
      case actionTypes.fetchAllRadioStationBegin:
                return {
                ...state,
                loading: true,
                error: null
                };
  
      case actionTypes.fetchAllRadioStationSuccess:
                return {
                ...state,
                loading: false,
                error : null,
                // sites: JSON.parse(JSON.stringify(action.payload)),
                radiostations : cloneDeep(action.payload),
                totalRadioStreams : cloneDeep(action.payload.totalDocs),
                };
  
      case actionTypes.fetchAllRadioStationFailure:
                return {
                ...state,
                loading: false,
                error: action.error
                };
  
      default:
                return state;
    }
  }