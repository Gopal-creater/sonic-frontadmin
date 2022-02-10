import { combineReducers } from 'redux';

import sonicKeyRed from './sonicKeyRed';
import profileRed from './profileRed';
import licenceKeyRed from './licenceKeyRed';
import sessionRed from './sessionRed';
import thirdPartyRed from './thirdPartyRed';
import radiostationsReducer from './radioStationReducer';
import globalReducer from './global';
import countReducer from './count';
import cardRadiostationsReducer from './cardRadioStaion';
import topRadiostationReducer from './topRadioStation';
import dashboardReducer from './dashboard.reducers';
import playsListsReducer from './playsListsRed';
import streamReaderReducer from './streamReader.reducer';
import countriesReducer from './countries.reducers';
import monitorReducer from './monitor/monitorReducer';

const appReducer = combineReducers({
  session: sessionRed,
  sonicKeys: sonicKeyRed, //for access the data have same name
  profile: profileRed,
  licenceKey: licenceKeyRed,
  thirdPartyKeys: thirdPartyRed,
  radioStations: radiostationsReducer,
  radioPageNumber: globalReducer,
  count: countReducer,
  cardRadioStaions: cardRadiostationsReducer,
  topRadiostation: topRadiostationReducer,
  dashboard: dashboardReducer,
  playsList: playsListsReducer,
  streamReader: streamReaderReducer,
  country: countriesReducer,
  monitor: monitorReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    localStorage.removeItem('user_info')
    state = undefined
  }
  return appReducer(state, action)
};

export default rootReducer
