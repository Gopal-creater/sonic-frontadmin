import * as actionTypes from "../../actions/actionTypes"
import produce from "immer";

const initialState = {
    companyProfile: {
        loading: false,
        error: null,
        data: {}
    },
    filters: {
        companyName: "",
        companyType: "",
        email: "",
        companyId: "",
        admin: "",
    },
    createCompany: {
        loading: false,
        data: {},
        error: null,
    },
    getAllCompanies: {
        loading: false,
        data: {},
        error: null,
    },
    companySearch: {
        loading: false,
        data: {},
        error: null,
    }
};

const companyReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case actionTypes.GET_COMPANY_PROFILE_LOADING:
                draft.companyProfile.loading = true;
                draft.companyProfile.error = null;
                draft.companyProfile.data = {};
                break;

            case actionTypes.GET_COMPANY_PROFILE_DATA:
                draft.companyProfile.loading = false;
                draft.companyProfile.error = null;
                draft.companyProfile.data = action.data;
                break

            case actionTypes.GET_COMPANY_PROFILE_ERROR:
                draft.companyProfile.loading = false;
                draft.companyProfile.error = action.data;
                draft.companyProfile.data = {};
                break

            //FILTERS
            case actionTypes.SET_COMPANIES_FILTERS:
                draft.filters = action.data;
                break;

            //CREATE Company
            case actionTypes.CREATE_COMPANY_LOADING:
                draft.createCompany.loading = true;
                draft.createCompany.error = null;
                break;
            case actionTypes.CREATE_COMPANY_SUCCESS:
                draft.createCompany.loading = false;
                draft.createCompany.data = action.data;
                draft.createCompany.error = null;
                break;
            case actionTypes.CREATE_COMPANY_ERROR:
                draft.createCompany.loading = false;
                draft.createCompany.error = action.data;
                break;

            //FETCHING COMPANIES
            case actionTypes.GET_COMPANIES_LOADING:
                draft.getAllCompanies.loading = true;
                draft.getAllCompanies.error = null;
                break;
            case actionTypes.GET_COMPANIES_SUCCESS:
                draft.getAllCompanies.loading = false;
                draft.getAllCompanies.data = action.data;
                draft.getAllCompanies.error = null;
                break;
            case actionTypes.GET_COMPANIES_ERROR:
                draft.getAllCompanies.loading = false;
                draft.getAllCompanies.error = action.data;
                break;

            //Searching company
            case actionTypes.SET_SEARCH_COMPANY_LOADING:
                draft.companySearch.loading = true;
                draft.companySearch.error = null;
                draft.companySearch.data = {};
                break;

            case actionTypes.SET_SEARCH_COMPANY_SUCCESS:
                draft.companySearch.loading = false;
                draft.companySearch.error = null;
                draft.companySearch.data = action.data;
                break;

            case actionTypes.SET_SEARCH_COMPANY_ERROR:
                draft.companySearch.loading = false;
                draft.companySearch.error = action.data;
                break;

            default:
                break;
        }
    })

export default companyReducer;
