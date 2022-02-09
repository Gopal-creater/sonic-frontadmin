import * as actionTypes from '../actions/actionTypes';
import { getCountries } from '../../services/https/resources/Countires.api';

export const getCountriesAction = () => {
    return (dispatch) => {
        dispatch({ type: actionTypes.SET_COUNTRIES_LOADING });
        getCountries().then(data => {
            dispatch({ type: actionTypes.SET_COUNTRIES_SUCCESS, data: data });
        })
            .catch(error => {
                dispatch({ type: actionTypes.SET_COUNTRIES_ERROR, data: error?.msg });
            })
    }
}