import produce from 'immer';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  data: [],
  error: null
}

const radiostationsReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case actionTypes.GET_ALL_RADIOSTATIONS_LOADING:
        draft.loading = true;
        break;

      case actionTypes.GET_ALL_RADIOSTATIONS_SUCCESS:
        draft.loading = false;
        draft.data = action?.data?.docs?.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        draft.error = null;
        break;

      case actionTypes.GET_ALL_RADIOSTATIONS_ERROR:
        draft.loading = false;
        draft.data = [];
        draft.error = action.data;
        break;

      default:
        break;
    }
  })

export default radiostationsReducer