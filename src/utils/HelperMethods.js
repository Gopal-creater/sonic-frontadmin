import cogoToast from "cogo-toast";
import FileSaver from "file-saver";
import Communication from "../services/https/Communication";

import store from "../stores";
import { cloneDeep } from "lodash";
import { compareAsc, format } from "date-fns";
import * as actionCreators from "../stores/actions/index";
import { log } from "./app.debug";
import fileDownload from "js-file-download";
import axios from "axios";
import moment from "moment";

export function extractFileName(url) {
  var filename = url.substring(url.lastIndexOf("-") + 1);
  return filename;
}

export async function downloadFile(
  filePath,
  fileType,
  setRestrict,
  s3MetaData
) {
  console.log("filePath filetype ", filePath, fileType, s3MetaData);
  const body = {
    fileURL: filePath,
    contentType: fileType,
  };
  if (s3MetaData !== undefined) {
    await Communication.downloadFileWithS3Key(s3MetaData)
      .then((response) => {
        // FileSaver.saveAs(response, extractFileName(filePath));
        axios
          .get(response, {
            responseType: "blob",
          })
          .then((res) => {
            fileDownload(res.data, extractFileName(filePath));
          });
      })
      .catch((error) => {
        cogoToast.error("Download Failed.");
        console.log("something went wrong", error);
      });
  } else {
    await Communication.downloadFile(body)
      .then((response) => {
        FileSaver.saveAs(response, extractFileName(filePath));
      })
      .catch((error) => {
        setRestrict(false);
        cogoToast.error("Download Failed.");
        console.log("something went wrong", error);
      });
  }
}
export function converstionOfKb(size) {
  //     let decimalPoint=2 Method for dynamic generate the KB or MB
  //     if(size == 0) return '0 Bytes';
  //    var k = 1000,
  //        dm = decimalPoint || 2,
  //        sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
  //        i = Math.floor(Math.log(size) / Math.log(k));
  //    return parseFloat((size / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  var n = 1024;
  var s = "";
  var kb = size;
  if (!isNaN(kb)) {
    s = kb.toFixed(2);
  }
  return s;
}

//====================================Radio stream portal helper methods=====================================
export function getAllRadioStations() {
  const state = cloneDeep(store.getState());
  const radiostaions = state.radiostations.radiostations;
  return radiostaions;
}

export function getUser() {
  const state = cloneDeep(store.getState());
  const user = state.session.user;
  return user;
}

export function unauthorizedRedirection(status, dispatch) {
  if (status == "401") {
    // dispatch(actionCreators.logout());
    // cogoToast.error("Your session is invalid. Please log in again");
    store.dispatch(actionCreators.logout());
  }
}

export function online() {
  log("window.navigator.onLine", window.navigator.onLine);
}

export function validURL(str) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
    "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}

export function isValidHttpUrl(string) {
  var res = string.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  return res !== null;
}

export function listeningCount(radiostations) {
  // log('radiostations',radiostations)
  if (radiostations.length == 0) {
    return "na";
  }
  const count = radiostations.filter(
    (radiostation) =>
      radiostation.error === null && radiostation.isStreamStarted === true
  ).length;
  // log("listening count",count)
  return count;
}

export function notListeningCount(radiostations) {
  if (radiostations.length == 0) {
    return "na";
  }
  const count = radiostations.filter(
    (radiostation) =>
      radiostation.error === null && radiostation.isStreamStarted === false
  ).length;
  // log("listening count",count)
  return count;
}

export function errorCount(radiostations) {
  if (radiostations.length == 0) {
    return "na";
  }
  const count = radiostations.filter(
    (radiostation) => radiostation.error !== null
  ).length;
  // log("listening count",count)
  return count;
}

export function sortByDate(arr) {
  arr.sort(function (a, b) {
    return Number(new Date(a.detectedAt)) - Number(new Date(b.detectedAt));
  });
  return arr;
}

export function todayRange() {
  let today = moment().format("YYYY-MM-DD")
  let yesterday = moment().subtract(1, 'days').format("YYYY-MM-DD")
  return `${yesterday},${today}`
}

export function weekRange() {
  let startOfWeek = moment().subtract(7, "days").format("YYYY-MM-DD")
  let today = moment().format("YYYY-MM-DD")
  return `${startOfWeek},${today}`
}

export function monthRange() {
  let today = moment().format("YYYY-MM-DD")
  let monthBack = moment().subtract(1, "months").format("YYYY-MM-DD")
  return `${monthBack},${today}`;
}

export function yearRange() {
  const d = new Date();

  var year = d.getFullYear();
  var month = d.getMonth();
  var day = d.getDate();
  var date = new Date(year - 1, month, day);

  const today = format(d, "yyyy-MM-dd");
  const yearBack = format(date, "yyyy-MM-dd");
  return `${today},${yearBack}`;
}

//creating array of hits by array of api calls
export function hitsDataArray(radioIdArray) {
  radioIdArray.map(async (radioId) => {
    await store.dispatch(
      actionCreators.fetchRadiostationSonicKeyCount(radioId.radioId)
    );
    radioId.hits = store.getState().count.hits;
    radioId.hitsError = store.getState().count.hitsError;
    return radioId;
  });
  log("radioIdArray", radioIdArray);
  return radioIdArray;
}

//padLeading zero
export function padLeadingZeros(num) {
  var s = num + "";
  while (s.length < 2) s = "0" + s;
  return s;
}

export function convertBytesTo(bytes, to = "MB") {
  if (!bytes) {
    return "--";
  }
  switch (to) {
    case "MB":
      const mbData = bytes / 1024;
      return mbData.toFixed(2);

    default:
      return "--";
  }
}
