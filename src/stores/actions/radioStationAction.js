import cogoToast from 'cogo-toast';
import { getAllRadioStations } from '../../services/https/resources/Plays.api';
import { log } from '../../utils/app.debug';
import * as actionType from './actionTypes';

export const getAllRadioListAction = () => {
    return (dispatch) => {
        dispatch({ type: actionType.GET_ALL_RADIOSTATIONS_LOADING })

        getAllRadioStations().then((response) => {
            log("Radio Stations", response);
            dispatch({ type: actionType.GET_ALL_RADIOSTATIONS_SUCCESS, data: response })
        }).catch((error) => {
            log("Radio Stations Error", error);
            dispatch({ type: actionType.GET_ALL_RADIOSTATIONS_ERROR, data: error?.message })
            cogoToast.error(error?.message)
        })
    }
}