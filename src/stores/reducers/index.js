import { combineReducers } from 'redux';
import licenceKeyRed from './licenceKeyRed';
import sessionRed from './sessionRed';
import radiostationsReducer from './radioStationReducer';
import streamReaderReducer from './streamReader.reducer';
import monitorReducer from './monitor/monitorReducer';
import dashboardReducer from './dashboard.reducers';
import encodeRed from './EncodeReducer';
import pickersReducer from './picker/pickersReducer';
import userRed from './UserReducer';
import companyReducer from './CompanyReducer';
import sonickeyReducer from './SonicKeysReducer';

const appReducer = combineReducers({
  session: sessionRed,
  licenceKey: licenceKeyRed,
  radioStations: radiostationsReducer,
  streamReader: streamReaderReducer,
  monitor: monitorReducer,
  dashboard: dashboardReducer,
  encode: encodeRed,
  picker: pickersReducer,
  user: userRed,
  company: companyReducer,
  sonickey: sonickeyReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    localStorage.removeItem('user_info')
    state = undefined
  }
  return appReducer(state, action)
};

export default rootReducer
