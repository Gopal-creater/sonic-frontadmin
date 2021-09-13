import * as actionTypes from './actionTypes';

export const setSelectedRowsRadioStationTable = (rows) => {
    return {
        type : actionTypes.setSelectedRowsRadioStationTable,
        payload : rows
    };
};


export const setRadiostationPageNum = (page) => {
    return {
        type : actionTypes.setRadiostationPageNum,
        payload : page
    };
};

export const setRadiostationRowsperPage = (rowsPerPage) => {
    return {
        type : actionTypes.setRadiostationRowsperPage,
        payload : rowsPerPage
    };

};