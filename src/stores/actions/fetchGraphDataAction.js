import Communication from '../../services/https/Communication';
import { log } from '../../utils/app.debug';
import * as actionType from './actionTypes';

export const fetchGraphDataAction = () => {
    return dispatch => {
        dispatch({
            type: actionType.FETCH_GRAPH_DATA_LOADING
        })
        Communication.fetchGraphData()
            .then((data) => {
                dispatch({
                    type: actionType.FETCH_GRAPH_DATA_SUCCESS,
                    data: data
                })
            }).catch(error => {
                dispatch({
                    type: actionType.FETCH_GRAPH_DATA_ERROR,
                    error: error
                })
            })
    }

};