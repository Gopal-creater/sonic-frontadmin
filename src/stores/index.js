import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// // import gloablReducer from '../store/Reducers/Global';
// // import sessionRed from '../store/Reducers/sessionRed';
// import radiostationsReducer from '../stores/reducers/RadioStation';
// import globalReducer from '../stores/reducers/global';
// import countReducer from '../stores/reducers/count';
// import topRadiostationReducer from '../stores/reducers/topRadioStation';
// import cardRadiostationsReducer from '../stores/reducers/cardRadioStaion';
// //integrated from rishab's store
// import sonicKeyRed from '../stores/reducers/sonicKeyRed';
// import profileRed from '../stores/reducers/profileRed';
// import licenceKeyRed from '../stores/reducers/licenceKeyRed';
import sessionRed from '../stores/reducers/sessionRed';
// import thirdPartyRed from '../stores/reducers/thirdPartyRed';

const appReducer = combineReducers({
  // // global : gloablReducer
  // // session : sessionRed,
  // radiostations: radiostationsReducer,
  // global: globalReducer,
  // count: countReducer,
  // topRadiostation: topRadiostationReducer,
  // cardRadioStaions: cardRadiostationsReducer,

  session: sessionRed,
  // sonicKeys: sonicKeyRed, //for access the data have same name
  // profile: profileRed,
  // licenceKey: licenceKeyRed,
  // thirdPartyKeys: thirdPartyRed,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    localStorage.removeItem('user_info')
    state = undefined
  }
  return appReducer(state, action)
};

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;