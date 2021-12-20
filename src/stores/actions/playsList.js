import moment from 'moment';
import store from '../../stores';
import { getCountriesRadioStations, getPlaysLists } from '../../services/https/resources/Plays.api';
import { log } from '../../utils/app.debug';
import * as actionType from './actionTypes';
import cogoToast from 'cogo-toast';

export const getPlaysListsAction = (startDate, endDate, channel, page, limit, recentPlays = false) => {
    let params = new URLSearchParams(`detectedAt>=${moment(startDate).format("YYYY-MM-DD")}&detectedAt<=${moment(endDate).format("YYYY-MM-DD")}`)
    params.append("channel", channel)
    params.append("limit", limit);
    !recentPlays && params.append("page", page)
    !recentPlays && params.append("skip", page > 1 ? (page - 1) * limit : 0)
    params.append("recentPlays", recentPlays)

    // log("store", store.getState().playsList)
    let playsFilters = store.getState()?.playsList?.filters

    if (playsFilters?.sonicKey) {
        params.append("relation_sonicKey.sonicKey", playsFilters?.sonicKey);
    }
    if (playsFilters?.country) {
        params.append("relation_radioStation.country", playsFilters?.country);
    }
    if (playsFilters?.artist) {
        params.append("relation_sonicKey.contentOwner", playsFilters?.artist);
    }
    if (playsFilters?.radioStation) {
        params.append("relation_radioStation.name", playsFilters?.radioStation);
    }
    if (playsFilters?.song) {
        params.append("relation_sonicKey.originalFileName", playsFilters?.song);
    }
    if (playsFilters?.label) {
        params.append("relation_sonicKey.label", playsFilters?.label);
    }
    if (playsFilters?.distributor) {
        params.append("relation_sonicKey.distributor", playsFilters?.distributor);
    }
    if (playsFilters?.encodedDate) {
        params.append("relation_sonicKey.createdAt", playsFilters?.encodedDate);
    }

    return dispatch => {
        dispatch({
            type: actionType.FETCH_PLAYS_LISTS_LOADING
        })
        getPlaysLists(params)
            .then((data) => {
                // log("Plays detected", data);
                dispatch({
                    type: actionType.FETCH_PLAYS_LISTS_SUCCESS,
                    data: data
                })
            }).catch(error => {
                log("Plays detected error", error);
                dispatch({
                    type: actionType.FETCH_PLAYS_LISTS_ERROR,
                    error: error?.message
                })
                cogoToast.error(error?.message)
            })
    }
};

export const getCountriesRadioStationsAction = (country) => {
    let filters = store.getState()?.playsList?.filters;

    return dispatch => {
        dispatch({
            type: actionType.FETCH_COUNTRIES_RADIOSTATIONS_LOADING,
        })
        getCountriesRadioStations(country)
            .then((data) => {
                log("Coutries found", data);
                if (data?.docs?.length === 0 || filters?.country !== country) {
                    dispatch({
                        type: actionType.SET_PLAYS_FILTER,
                        data: {
                            ...filters,
                            radioStation: [],
                        }
                    })
                }
                dispatch({
                    type: actionType.FETCH_COUNTRIES_RADIOSTATIONS_SUCCESS,
                    data: data
                })
            }).catch(error => {
                log("Error finding countries", error);
                dispatch({
                    type: actionType.FETCH_COUNTRIES_RADIOSTATIONS_ERROR,
                    error: error?.message
                })
                cogoToast.error(error?.message)
            })
    }
}