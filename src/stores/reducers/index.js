import { combineReducers } from 'redux';

import sonicKeyRed from './sonicKeyRed';
import licenceKeyRed from './licenceKeyRed';
import sessionRed from './sessionRed';
import radiostationsReducer from './radioStationReducer';
import streamReaderReducer from './streamReader.reducer';
import monitorReducer from './monitor/monitorReducer';
import dashboardReducer from './dashboard.reducers';
import encodeRed from './EncodeReducer';
import pickersReducer from './picker/pickersReducer';
import userRed from './UserReducer';

const appReducer = combineReducers({
  session: sessionRed,
  sonicKeys: sonicKeyRed, //for access the data have same name
  licenceKey: licenceKeyRed,
  radioStations: radiostationsReducer,
  streamReader: streamReaderReducer,
  monitor: monitorReducer,
  dashboard: dashboardReducer,
  encode: encodeRed,
  picker: pickersReducer,
  user: userRed
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    localStorage.removeItem('user_info')
    state = undefined
  }
  return appReducer(state, action)
};

export default rootReducer
