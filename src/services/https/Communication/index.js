import { getUserId } from "../AuthHelper";
import { AppWebRequest } from "../NetworkManager";

class Communication {
  constructor() {}
  
  fetchMySonicKey(limit,index,value) {
    const axiosConfig={
      params: {
        filter: {
          $or: [
            { [`sonicKey`]: { "$regex": `${value?value:''}`, "$options": "i" }},
            { [`contentFileName`]: { "$regex": `${value ? value : ""}`, "$options": "i" }},
            { [`contentOwner`]: { "$regex": `${value ? value : ""}`, "$options": "i" }},
            { [`contentDescription`]: { "$regex": `${value ? value : ""}`, "$options": "i" }},
          ],
        },
    }, 
   }
    return AppWebRequest(`/sonic-keys/owners/${getUserId()}?limit=${limit}&sort=-createdAt&skip=${index}`,"get",axiosConfig)
  }
  fetchLicenceKey() {
    //Update for new endpoints
    //return AppWebRequest(`/auth/user/licenseKeysInfo`, "get");
    return AppWebRequest(`/users/${getUserId()}/licenses`, "get");
  }

  fetchThirdPartySonicKeys(limit,index) {
    return AppWebRequest(`/detections/owners/${getUserId()}/BINARY/data?limit=${limit}&sort=-createdAt&skip=${index}`,"get")
  }

  fetchThirdPartyDetectedDetails(sonicKey) {
    return AppWebRequest(`/detections/owners/${getUserId()}/BINARY/sonicKeys/${sonicKey}/detected-details?limit=500&sort=-createdAt&skip=0`,"get")
  }

  getSonicKeyById(sonic_key){
    return AppWebRequest(`sonic-keys/${sonic_key}`,"get")
  }
  
  /**
   * @param {string} key 
   */
  createLicenceKey(key) {
    return AppWebRequest(`/users/${getUserId()}/add-new-license`, "post",{
      data:{
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

  editSonicKey(formData,sonicKey) {
    console.log('Edit Data',formData);
    const axiosConfig = {
      data: formData,
      headers: {
        'Accept': 'application/json',
      },
    };
    return AppWebRequest(`/sonic-keys/${sonicKey}`, "patch", axiosConfig);
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

  guestDecode(formData){
    const axiosConfig={
        data:formData,
        headers: {
            "Content-type": "multipart/form-data",
          },

    }
   return AppWebRequest('/sonic-keys-guest/decode','post',axiosConfig)
}
  downloadFile(payload){
    const axiosConfig = {
      data: payload,
      responseType: 'blob'
    };
    
    return AppWebRequest(`/sonic-keys/download-file`, "post", axiosConfig)
  }

}

export default new Communication();
