import * as actionTypes from '../actions/actionTypes';
import { cloneDeep } from 'lodash';

const initialState = {
    selectedRows: [],
    radiostationPageNum : 0,
    radiostationRowsperPage : 5,
}

export default function globalReducer(state = initialState, action) {
    switch(action.type) {
      case actionTypes.setSelectedRowsRadioStationTable:
                return {
                    ...state,
                    selectedRows : cloneDeep(action.payload)
                };

        case actionTypes.setRadiostationPageNum:
            return {
                ...state,
                radiostationPageNum : cloneDeep(action.payload)
            };
                
        case actionTypes.setRadiostationRowsperPage:
            return {
                ...state,
                radiostationRowsperPage : cloneDeep(action.payload)
            };
  
      default:
                return state;
    }
  }