import * as actionTypes from '../actions/actionTypes';
import produce from 'immer';

const initialState = {
       loading: true,
       data: [],
       error: null,

       filters: {
              name: "",
              key: "",
              type: "",
              status: "",
              renewalStartDate: "",
              renewalEndDate: "",
       },
};

const licenceKeyRed = (state = initialState, action) =>
       produce(state, (draft) => {
              switch (action.type) {
                     case actionTypes.LIC_KEY_SUCCESS:
                            draft.data = action.data;
                            draft.loading = false;
                            break;

                     case actionTypes.LIC_KEY_FAIL:
                            draft.error = action.error;
                            draft.loading = false;
                            break;

                     case actionTypes.LIC_KEY_LOADING:
                            draft.loading = true;
                            draft.error = null;
                            break;
                     case actionTypes.LIC_KEY_FILTER:
                            draft.filters = action.data;
                            break;
                     default:
                            break;
              }
       });
export default licenceKeyRed