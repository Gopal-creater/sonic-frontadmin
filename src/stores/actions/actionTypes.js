// auth
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";
export const LOGOUT = "LOGOUT";

//profile
export const PROFILE_SUCCESS = "PROFILE_SUCCESS";
export const PROFILE_FAIL = "PROFILE_FAIL";
export const PROFILE_LOADING = "PROFILE_LOADING";

//sonicKeys
export const SONIC_KEY_SUCCESS = "SONIC_KEY_SUCCESS"
export const SONIC_KEY_FAIL = "SONIC_KEY_FAIL"
export const SONIC_KEY_LOADING = "SONIC_KEY_LOADING"
export const SORTING = "SORTING"

//licenseKeys
export const LIC_KEY_SUCCESS = "LIC_KEY_SUCCESS"
export const LIC_KEY_FAIL = "LIC_KEY_FAIL"
export const LIC_KEY_LOADING = "LIC_KEY_LOADING"

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
export const SET_TOTALSONICKEYS_COUNT_LOADING = "SET_TOTALSONICKEYS_COUNT_LOADING"
export const SET_TOTALSONICKEYS_COUNT_SUCCESS = "SET_TOTALSONICKEYS_COUNT_SUCCESS"
export const SET_TOTALSONICKEYS_COUNT_ERROR = "SET_TOTALSONICKEYS_COUNT_ERROR"

export const SET_TOTALSUBSCRIBEDSTATION_COUNT_LOADING = "SET_TOTALSUBSCRIBEDSTATION_COUNT_LOADING"
export const SET_TOTALSUBSCRIBEDSTATION_COUNT_SUCCESS = "SET_TOTALSUBSCRIBEDSTATION_COUNT_SUCCESS"
export const SET_TOTALSUBSCRIBEDSTATION_COUNT_ERROR = "SET_TOTALSUBSCRIBEDSTATION_COUNT_ERROR"

export const SET_MOSTPLAYEDSTATION_LOADING = "SET_MOSTPLAYEDSTATION_LOADING"
export const SET_MOSTPLAYEDSTATION_SUCCESS = "SET_MOSTPLAYEDSTATION_SUCCESS"
export const SET_MOSTPLAYEDSTATION_ERROR = "SET_MOSTPLAYEDSTATION_ERROR"

export const SET_DASHBOARDGRAPH_LOADING = 'SET_DASHBOARDGRAPH_LOADING';
export const SET_DASHBOARDGRAPH_SUCCESS = 'SET_DASHBOARDGRAPH_SUCCESS';
export const SET_DASHBOARDGRAPH_ERROR = 'SET_DASHBOARDGRAPH_ERROR';

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

export const SET_COUNTRIES_DATE = 'SET_COUNTRIES_DATE';
export const SET_COUNTRIES_FILTERS = 'SET_COUNTRIES_FILTERS';

//Monitor
export const SET_MONITOR_FILTERS = "SET_MONITOR_FILTERS"
export const SET_MONITOR_DATES = "SET_MONITOR_DATES"
