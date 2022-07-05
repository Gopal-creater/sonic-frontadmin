import * as actionTypes from '../actions/actionTypes';
import produce from 'immer';

const initialState = {
       filters: {
              name: "",
              key: "",
              type: "",
              status: "",
              company: {},
              user: "",
              renewalStartDate: "",
              renewalEndDate: "",
       },
       addLicenseKey: {
              loading: false,
              data: {},
              error: null,
       },
       getLicenseKey: {
              loading: false,
              data: {},
              error: null,
       },
};

const licenceKeyRed = (state = initialState, action) =>
       produce(state, (draft) => {
              switch (action.type) {
                     //FILTER LICENSE KEY
                     case actionTypes.LIC_KEY_FILTER:
                            draft.filters = action.data;
                            break;

                     //ADD LICENSE KEY
                     case actionTypes.ADD_LIC_KEY_LOADING:
                            draft.addLicenseKey.loading = true;
                            draft.addLicenseKey.error = null;
                            break;
                     case actionTypes.ADD_LIC_KEY_SUCCESS:
                            draft.addLicenseKey.loading = false;
                            draft.addLicenseKey.data = action.data;
                            draft.addLicenseKey.error = null;
                            break;
                     case actionTypes.ADD_LIC_KEY_FAIL:
                            draft.addLicenseKey.loading = false;
                            draft.addLicenseKey.error = action.error;
                            break;

                     //FETCH ALL LICENSE KEY
                     case actionTypes.LIC_KEY_LOADING:
                            draft.getLicenseKey.loading = true;
                            draft.getLicenseKey.error = null;
                            break;
                     case actionTypes.LIC_KEY_SUCCESS:
                            draft.getLicenseKey.loading = false;
                            draft.getLicenseKey.data = action.data;
                            draft.getLicenseKey.error = null;
                            break;
                     case actionTypes.LIC_KEY_FAIL:
                            draft.getLicenseKey.loading = false;
                            draft.getLicenseKey.error = action.error;
                            break;

                     default:
                            break;
              }
       });

export default licenceKeyRed