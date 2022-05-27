import * as actionTypes from "../../actions/actionTypes"
import produce from "immer";

const initialState = {
    loading: false,
    data: {},
    metaData: {
        owner: "",
        company: "",
        partner: "",
        contentName: "",
        contentFileType: "",
        contentOwner: "",
        version: "",
        isrcCode: "",
        iswcCode: "",
        tuneCode: "",
        contentType: "",
        contentDuration: "",
        contentSize: "",
        contentEncoding: "",
        contentSamplingFrequency: "",
        contentQuality: "",
        contentDescription: "",
        distributor: "",
        label: "",
        additionalMetadata: {
            message: ""
        },
        isRightsHolderForEncode: null,
        isAuthorizedForEncode: null
    },
    error: null,
    selectedFile: null,
    loadingPopUp: false,
    successPopUp: false,
    errorPopUp: false,
    encodeSearchTrack: {
        loading: false,
        data: [],
        error: null,
    },
    encodedTracks: {
        loading: false,
        data: {},
        error: null
    }
};
const encodeRed = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case actionTypes.SET_SELECTED_FILE:
                draft.selectedFile = action.data
                break;

            case actionTypes.CLEAR_SELECTED_FILE:
                draft.selectedFile = null
                draft.metaData = {
                    owner: "",
                    company: "",
                    partner: "",
                    contentName: "",
                    contentFileType: "",
                    contentOwner: "",
                    version: "",
                    isrcCode: "",
                    iswcCode: "",
                    tuneCode: "",
                    contentType: "",
                    contentDuration: "",
                    contentSize: "",
                    contentEncoding: "",
                    contentSamplingFrequency: "",
                    contentQuality: "",
                    contentDescription: "",
                    distributor: "",
                    label: "",
                    additionalMetadata: {
                        message: ""
                    },
                    isRightsHolderForEncode: null,
                    isAuthorizedForEncode: null
                }
                break;

            case actionTypes.CLEAR_METADATA:
                draft.metaData = {
                    owner: "",
                    company: "",
                    partner: "",
                    contentName: "",
                    contentFileType: "",
                    contentOwner: "",
                    version: "",
                    isrcCode: "",
                    iswcCode: "",
                    tuneCode: "",
                    contentType: "",
                    contentDuration: "",
                    contentSize: "",
                    contentEncoding: "",
                    contentSamplingFrequency: "",
                    contentQuality: "",
                    contentDescription: "",
                    distributor: "",
                    label: "",
                    additionalMetadata: {
                        message: ""
                    },
                    isRightsHolderForEncode: null,
                    isAuthorizedForEncode: null
                }
                break;

            case actionTypes.SET_ENCODE_LOADING:
                draft.loading = true;
                draft.error = null
                draft.loadingPopUp = true
                break;

            case actionTypes.SET_ENCODE_SUCCESS:
                draft.data = action.data
                draft.loading = false;
                draft.error = null
                draft.loadingPopUp = false
                draft.successPopUp = true
                break;

            case actionTypes.SET_ENCODE_ERROR:
                draft.data = {}
                draft.loading = false;
                draft.error = action.data
                draft.loadingPopUp = true
                draft.loadingPopUp = false
                draft.errorPopUp = true
                break;

            case actionTypes.CLOSE_SUCCESS_POPUP:
                draft.successPopUp = false
                break;

            case actionTypes.CLOSE_ERROR_POPUP:
                draft.errorPopUp = false
                break;

            case actionTypes.SET_METADATA:
                draft.metaData = action.data
                break;

            case actionTypes.SET_ENCODESEARCHTRACK_LOADING:
                draft.encodeSearchTrack.loading = true;
                draft.encodeSearchTrack.error = null;
                draft.encodeSearchTrack.data = [];
                break;

            case actionTypes.SET_ENCODESEARCHTRACK_ERROR:
                draft.encodeSearchTrack.loading = false;
                draft.encodeSearchTrack.error = action.data;
                draft.encodeSearchTrack.data = [];
                break;

            case actionTypes.SET_ENCODESEARCHTRACK_SUCCESS:
                draft.encodeSearchTrack.loading = false;
                draft.encodeSearchTrack.error = null;
                draft.encodeSearchTrack.data = action.data;
                break;

            default:
                break;
        }
    });
export default encodeRed;
