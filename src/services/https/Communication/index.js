import { log } from "../../../utils/app.debug";
import { getUserId } from "../AuthHelper";
import { AppWebRequest } from "../NetworkManager";

class Communication {
  constructor() { }

  fetchMySonicKey(limit, index, value) {
    index = index > 1 ? (index - 1) * limit : 0
    const axiosConfig = {
      params: {
        filter: {
          $or: [
            { [`sonicKey`]: { "$regex": `${value ? value : ''}`, "$options": "i" } },
            { [`contentFileName`]: { "$regex": `${value ? value : ""}`, "$options": "i" } },
            { [`contentOwner`]: { "$regex": `${value ? value : ""}`, "$options": "i" } },
            { [`contentDescription`]: { "$regex": `${value ? value : ""}`, "$options": "i" } },
          ],
        },
      },
    }
    return AppWebRequest(`/sonic-keys/owners/${getUserId()}?limit=${limit}&sort=-createdAt&skip=${index}`, "get", axiosConfig)
  }

  searchRadioStation(limit=5, index=0, value='') {
    index = index > 1 ? (index - 1) * limit : 0
    const axiosConfig = {
      params: {
        filter: {
          // "$or": [ { "radioSearch.name": { "$regex": `${value ? value : ""}`, "$options": "i" } } ] 
          $or: [
            { [`radioSearch.name`]: { "$regex": `${value ? value : ''}`, "$options": "i" } },
            { [`radioSearch.country`]: { "$regex": `${value ? value : ""}`, "$options": "i" } },
            { [`radioSearch.streamingUrl`]: { "$regex": `${value ? value : ""}`, "$options": "i" } },
          ]
        },
      },
    }
    log('Index & Limit',index,limit)
    return AppWebRequest(`/radiomonitors/owners/${getUserId()}/subscribed-stations?skip=${index}&limit=${limit}`,
     "get",axiosConfig)
  }

  fetchLicenceKey() {
    return AppWebRequest(`/users/${getUserId()}/licenses`, "get");
  }

  fetchRadioStationHits(radioId) {
    return AppWebRequest(`/detections/owners/${getUserId()}/RADIOSTATION/count?radioStation=${radioId}`, "get");
  }

  fetchThirdPartySonicKeys(limit=10, index=0,channel='STREAMREADER') {
    log('Method Call')
    return AppWebRequest(`/detections/owners/${getUserId()}/${channel}/data?limit=${limit}&sort=-createdAt&skip=${index}`, "get")
  }

  fetchThirdPartyDetectedDetails(sonicKey) {
    return AppWebRequest(`/detections/owners/${getUserId()}/BINARY/sonicKeys/${sonicKey}/detected-details?limit=500&sort=-createdAt&skip=0`, "get")
  }

  getCount(param) {
    return AppWebRequest(
      param!==undefined?
      `/radiomonitors/owners/${getUserId()}/subscriber-count${param}`
      :`/radiomonitors/owners/${getUserId()}/subscriber-count`, "get")
  }

  getSonicKeyById(sonic_key) {
    return AppWebRequest(`sonic-keys/${sonic_key}`, "get")
  }

  fetchSKForSpecificRadioStation(radio_id, _offset = 0, _limit = 10) {
    log(radio_id.radioStationId)
    return AppWebRequest(`/detections/owners/${getUserId()}/RADIOSTATION/data?radioStation=${radio_id}&skip=${_offset}&limit=${_limit}&sort=-createdAt`, "get")
  }

  fetchRadioStationsAccToCountry(country, _offset = 0, _limit = 100) {
    log(country)
    return AppWebRequest(`/radiostations?country=${country}&skip=${_offset}&limit=${_limit}`, "get")
  }

  /**
   * @param {string} key 
   */
  createLicenceKey(key) {
    return AppWebRequest(`/users/${getUserId()}/add-new-license`, "post", {
      data: {
        licenseKey: key
      }
    });
  }
  encodeFile(formData) {
    const axiosConfig = {
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
      },
    };
    return AppWebRequest("/sonic-keys/encode", "post", axiosConfig);
  }

  editSonicKey(formData, sonicKey) {
    const axiosConfig = {
      data: formData,
      headers: {
        'Accept': 'application/json',
      },
    };
    return AppWebRequest(`/sonic-keys/${sonicKey}`, "patch", axiosConfig);
  }

  onStartRadioStations(formData) {
    log('On Start',formData)
    const axiosConfig = {
      data: formData,
      headers: {
        'Accept': 'application/json',
      },
    };
    return AppWebRequest(`/radiomonitors/owners/${getUserId()}/start-listening-stream-bulk`, "put", axiosConfig);
  }

  onStopRadioStations(formData) {
    log('On Stop',formData)
    const axiosConfig = {
      data: formData,
      headers: {
        'Accept': 'application/json',
      },
    };
    return AppWebRequest(`/radiomonitors/owners/${getUserId()}/stop-listening-stream-bulk`, "put", axiosConfig);
  }

  onDeleteRadioStations(formData) {
    log('On Delete',formData)
    const axiosConfig = {
      data: formData,
      headers: {
        'Accept': 'application/json',
      },
    };
    return AppWebRequest(`/radiomonitors/owners/${getUserId()}/unsubscribe-bulk`, "delete", axiosConfig);
  }

  removeSonicKey(sonicKey) {
    const axiosConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
      },
    };
    return AppWebRequest(`/sonic-keys/${sonicKey}`, "delete", axiosConfig);
  }

  decodeFile(formData) {
    const axiosConfig = {
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
      },
    };
    return AppWebRequest(`/sonic-keys/decode`, "post", axiosConfig);
  }

  decodeFileExternal(formData) {
    const axiosConfig = {
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
      },
    };
    return AppWebRequest(`/external/sonickeys/decode`, "post", axiosConfig);
  }

  guestDecode(formData) {
    const axiosConfig = {
      data: formData,
      headers: {
        "Content-type": "multipart/form-data",
      },

    }
    return AppWebRequest('/sonic-keys-guest/decode', 'post', axiosConfig)
  }
  downloadFile(payload) {
    const axiosConfig = {
      data: payload,
      responseType: 'blob'
    };

    return AppWebRequest(`/sonic-keys/download-file`, "post", axiosConfig)
  }
  downloadFileWithS3Key(key) {
    const axiosConfig = {
      headers: {
        'Accept': 'application/json',
      },
    };
    return AppWebRequest(`/s3-file-uploads/signed-url/` + encodeURIComponent(key), "get", axiosConfig);
  }


  radioStationSubscribed(formData) {
    log('From Data', formData)
    const axiosConfig = {
      data: formData,
      headers: {
        'Accept': 'application/json',
      },
    };
    //return 0;
    return AppWebRequest(`/radiomonitors/owners/${getUserId()}/subscribe-bulk`, "post", axiosConfig);
  }

}

export default new Communication();
