import * as actionTypes from '../actions/actionTypes';
import { cloneDeep } from 'lodash';

const initialState = {
    cardRadiostations: [],
    totalStationsCount: 'na',
}

export default function cardRadiostationsReducer(state = initialState, action) {
    switch(action.type) {
  
      case actionTypes.fetchAllCardRadioStationSuccess:
                return {
                ...state,
                cardRadiostations : cloneDeep(action.payload.docs),
                totalStationsCount : cloneDeep(action.payload.totalDocs)
                };
  
      default:
                return state;
    }
  }