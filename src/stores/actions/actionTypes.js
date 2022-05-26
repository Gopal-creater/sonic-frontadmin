// auth
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";
export const LOGOUT = "LOGOUT";

//user
export const GET_USERPROFILE_LOADING = "GET_USERPROFILE_LOADING"
export const GET_USERPROFILE_DATA = "GET_USERPROFILE_DATA"
export const GET_USERPROFILE_ERROR = "GET_USERPROFILE_ERROR"

export const SET_USERS_FILTERS = "SET_USERS_FILTERS";

export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const CREATE_USER_ERROR = "CREATE_USER_ERROR";
export const CREATE_USER_LOADING = "CREATE_USER_LOADING";

export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_ERROR = "GET_USERS_ERROR";
export const GET_USERS_LOADING = "GET_USERS_LOADING";

export const UPDATE_USERS_PROFILE = "UPDATE_USERS_PROFILE";

//company
export const GET_COMPANY_PROFILE_LOADING = "GET_COMPANY_PROFILE_LOADING"
export const GET_COMPANY_PROFILE_DATA = "GET_COMPANY_PROFILE_DATA"
export const GET_COMPANY_PROFILE_ERROR = "GET_COMPANY_PROFILE_ERROR"

export const SET_COMPANIES_FILTERS = "SET_COMPANIES_FILTERS";

export const CREATE_COMPANY_SUCCESS = "CREATE_COMPANY_SUCCESS";
export const CREATE_COMPANY_ERROR = "CREATE_COMPANY_ERROR";
export const CREATE_COMPANY_LOADING = "CREATE_COMPANY_LOADING";

export const GET_COMPANIES_SUCCESS = "GET_COMPANIES_SUCCESS";
export const GET_COMPANIES_ERROR = "GET_COMPANIES_ERROR";
export const GET_COMPANIES_LOADING = "GET_COMPANIES_LOADING";

//sonicKeys
export const SONIC_KEY_SUCCESS = "SONIC_KEY_SUCCESS"
export const SONIC_KEY_FAIL = "SONIC_KEY_FAIL"
export const SONIC_KEY_LOADING = "SONIC_KEY_LOADING"
export const SORTING = "SORTING"

//licenseKeys
export const LIC_KEY_SUCCESS = "LIC_KEY_SUCCESS"
export const LIC_KEY_FAIL = "LIC_KEY_FAIL"
export const LIC_KEY_LOADING = "LIC_KEY_LOADING"
export const LIC_KEY_FILTER = "LIC_KEY_FILTER"

//thirdPartySonicKeys
export const THIRDPARTY_SONIC_KEY_SUCCESS = "THIRDPARTY_SONIC_KEY_SUCCESS"
export const THIRDPARTY_SONIC_KEY_FAIL = "THIRDPARTY_SONIC_KEY_FAIL"
export const THIRDPARTY_SONIC_KEY_LOADING = "THIRDPARTY_SONIC_KEY_LOADING"


//============ Radio stream action types=================
//radiostations
export const fetchAllRadioStationBegin = 'FETCH_ALL_RADIOSTATION_BEGIN';
export const fetchAllRadioStationSuccess = 'FETCH_ALL_RADIOSTATION_SUCCESS';
export const fetchAllRadioStationFailure = 'FETCH_ALL_RADIOSTATION_FAILURE';

//cardRadiostations
export const fetchAllCardRadioStationSuccess = 'FETCH_ALL_CARDRADIOSTATION_SUCCESS';

//global
export const setSelectedRowsRadioStationTable = 'SET_SELECTED_ROWS_RADIOSTATION_TABLE';

export const setRadiostationPageNum = 'SET_RADIOSTATION_PAGENUM';
export const setRadiostationRowsperPage = 'SET_RADIOSTATION_ROWSPERPAGE';

//count
export const fetchDaySonicKeyCountSuccess = 'FETCH_DAY_SONICKEY_COUNT_SUCCESS';
export const fetchWeekSonicKeyCountSuccess = 'FETCH_WEEK_SONICKEY_COUNT_SUCCESS';
export const fetchMonthSonicKeyCountSuccess = 'FETCH_MONTH_SONICKEY_COUNT_SUCCESS';

export const fetchTotalListeningCountSuccess = 'FETCH_TOTAL_LISTENING_COUNT_SUCCESS';
export const fetchTotalNotListeningCountSuccess = 'FETCH_TOTAL_NOTLISTENING_COUNT_SUCCESS';
export const fetchTotalErrorCountSuccess = 'FETCH_TOTAL_ERROR_COUNT_SUCCESS';
export const fetchTotalRadiostationCountSuccess = 'FETCH_TOTAL_RADIOSTATION_COUNT_SUCCESS';

export const fetchRadiostationSonicKeyCountBegin = 'FETCH_RADIOSTATION_SONICKEY_COUNT_BEGIN';
export const fetchRadiostationSonicKeyCountSuccess = 'FETCH_RADIOSTATION_SONICKEY_COUNT_SUCCESS';
export const fetchRadiostationSonicKeyCountFailure = 'FETCH_RADIOSTATION_SONICKEY_COUNT_FAILURE';

//Top radiostation
export const fetchTopRadioStationBegin = 'FETCH_TOP_RADIOSTATION_BEGIN';
export const fetchTopRadioStationSuccess = 'FETCH_TOP_RADIOSTATION_SUCCESS';
export const fetchTopRadioStationFailure = 'FETCH_TOP_RADIOSTATION_FAILURE';

//Dashboard
export const SET_DASHBOARD_LOADING = 'SET_DASHBOARD_LOADING';
export const SET_DASHBOARD_SUCCESS = 'SET_DASHBOARD_SUCCESS';
export const SET_DASHBOARD_ERROR = 'SET_DASHBOARD_ERROR';

//Plays List
export const FETCH_PLAYS_LISTS_LOADING = 'FETCH_PLAYS_LISTS_LOADING';
export const FETCH_PLAYS_LISTS_SUCCESS = 'FETCH_PLAYS_LISTS_SUCCESS';
export const FETCH_PLAYS_LISTS_ERROR = 'FETCH_PLAYS_LISTS_ERROR';

export const SET_PLAYS_FILTER = 'SET_PLAYS_FILTER';
export const SET_PLAYS_DATES = 'SET_PLAYS_DATES';

export const GET_ALL_RADIOSTATIONS_LOADING = 'GET_ALL_RADIOSTATIONS_LOADING';
export const GET_ALL_RADIOSTATIONS_SUCCESS = 'GET_ALL_RADIOSTATIONS_SUCCESS';
export const GET_ALL_RADIOSTATIONS_ERROR = 'GET_ALL_RADIOSTATIONS_ERROR';

export const UPDATE_EDITED_PLAYSLIST = "UPDATE_EDITED_PLAYSLIST"

//SonicKey History Data
export const GET_SONICKEYHISTORYDATA_LOADING = 'GET_SONICKEYHISTORYDATA_LOADING';
export const GET_SONICKEYHISTORYDATA_SUCCESS = 'GET_SONICKEYHISTORYDATA_SUCCESS';
export const GET_SONICKEYHISTORYDATA_ERROR = 'GET_SONICKEYHISTORYDATA_ERROR';

//StreamReader
export const FETCH_RADIOSTATIONS_LOADING = 'FETCH_RADIOSTATIONS_LOADING';
export const FETCH_RADIOSTATIONS_SUCCESS = 'FETCH_RADIOSTATIONS_SUCCESS';
export const FETCH_RADIOSTATIONS_ERROR = 'FETCH_RADIOSTATIONS_ERROR';

export const TOTAL_SUBSCRIBED_STATION_COUNT_LOADING = 'TOTAL_SUBSCRIBED_STATION_COUNT_LOADING';
export const TOTAL_SUBSCRIBED_STATION_COUNT_SUCCESS = 'TOTAL_SUBSCRIBED_STATION_COUNT_SUCCESS';
export const TOTAL_SUBSCRIBED_STATION_COUNT_ERROR = 'TOTAL_SUBSCRIBED_STATION_COUNT_ERROR';

//ExportData
export const SET_EXPORTDATA_LOADING = 'SET_EXPORTDATA_LOADING';
export const SET_EXPORTDATA_SUCCESS = 'SET_EXPORTDATA_SUCCESS';
export const SET_EXPORTDATA_ERROR = 'SET_EXPORTDATA_ERROR';

//ExportPlays
export const SET_EXPORTPLAYSDATA_LOADING = 'SET_EXPORTPLAYSDATA_LOADING';
export const SET_EXPORTPLAYSDATA_SUCCESS = 'SET_EXPORTPLAYSDATA_SUCCESS';
export const SET_EXPORTPLAYSDATA_ERROR = 'SET_EXPORTPLAYSDATA_ERROR';

//Track
export const SET_TRACK_LOADING = "SET_TRACK_LOADING"
export const SET_TRACK_SUCCESS = "SET_TRACK_DATA"
export const SET_TRACK_ERROR = "SET_TRACK_ERROR"

//Artist
export const SET_ARTIST_LOADING = "SET_ARTIST_LOADING"
export const SET_ARTIST_SUCCESS = "SET_ARTIST_DATA"
export const SET_ARTIST_ERROR = "SET_ARTIST_ERROR"

// countries
export const SET_COUNTRIES_LOADING = 'SET_COUNTRIES_LOADING';
export const SET_COUNTRIES_SUCCESS = 'SET_COUNTRIES_SUCCESS';
export const SET_COUNTRIES_ERROR = 'SET_COUNTRIES_ERROR';

//Monitor
export const SET_MONITOR_FILTERS = "SET_MONITOR_FILTERS"
export const SET_MONITOR_DATES = "SET_MONITOR_DATES"
export const CHECKED_TABLE_COLUMN = "CHECKED_TABLE_COLUMN"
export const UNCHECKED_TABLE_COLUMN = "UNCHECKED_TABLE_COLUMN"
export const STORE_TABLE_COLUMN = "STORE_TABLE_COLUMN"
export const SEARCHED_TABLE_COLUMN = "SEARCHED_TABLE_COLUMN"

//Radio Station
export const SET_RADIOSTATION_LOADING = "SET_RADIOSTATION_LOADING"
export const SET_RADIOSTATION_SUCCESS = "SET_RADIOSTATION_DATA"
export const SET_RADIOSTATION_ERROR = "SET_RADIOSTATION_ERROR"

//Plays
export const SET_PLAYS_LOADING = 'SET_PLAYS_LOADING';
export const SET_PLAYS_SUCCESS = 'SET_PLAYS_SUCCESS';
export const SET_PLAYS_ERROR = 'SET_PLAYS_ERROR';

//encode
export const SET_SELECTED_FILE = "SET_SELECTED_FILE"
export const CLEAR_SELECTED_FILE = "CLEAR_SELECTED_FILE"

export const SET_ENCODE_LOADING = "SET_ENCODE_LOADING"
export const SET_ENCODE_SUCCESS = "SET_ENCODE_SUCCESS"
export const SET_ENCODE_ERROR = "SET_ENCODE_ERROR"

export const CLOSE_SUCCESS_POPUP = "CLOSE_SUCCESS_POPUP"
export const CLOSE_ERROR_POPUP = "CLOSE_ERROR_POPUP"
export const SET_METADATA = "SET_METADATA"

export const SET_ENCODESEARCHTRACK_LOADING = "SET_ENCODESEARCHTRACK_LOADING"
export const SET_ENCODESEARCHTRACK_ERROR = "SET_ENCODESEARCHTRACK_ERROR"
export const SET_ENCODESEARCHTRACK_SUCCESS = "SET_ENCODESEARCHTRACK_SUCCESS"

export const SET_ENCODEDTRACK_LOADING = "SET_ENCODEDTRACK_LOADING"
export const SET_ENCODEDTRACK_SUCCESS = "SET_ENCODEDTRACK_SUCCESS"
export const SET_ENCODEDTRACK_ERROR = "SET_ENCODEDTRACK_ERROR"

//pickers
export const FETCH_TITLE_LOADING = 'FETCH_TITLE_LOADING';
export const FETCH_TITLE_SUCCESS = 'FETCH_TITLE_SUCCESS';
export const FETCH_TITLE_ERROR = 'FETCH_TITLE_ERROR';


