import { format } from "date-fns";
import { log } from "./app.debug";

import moment from "moment";

export function todayRange() {
  let today = moment().startOf("day").format("YYYY-MM-DD")
  log("todays date", today)
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

