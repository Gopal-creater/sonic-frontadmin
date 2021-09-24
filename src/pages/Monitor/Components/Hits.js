import React, { useState, useEffect } from "react";
// import { connect } from 'react-redux';
// import * as actionCreators from '../store/Actions/index';
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from "@material-ui/icons/Info";
import ButtonSpinner from "./ButtonSpinner";
// import { getAccessToken, getUserId } from '../apiManager/AuthHelper';
// import apiUrl from '../apiManager/apiUrl';
import { getAccessToken, getUserId } from "../../../services/https/AuthHelper";
import httpUrl from "../../../services/https/httpUrl";
import axios from "axios";
import {
  monthRange,
  todayRange,
  unauthorizedRedirection,
  weekRange,
  yearRange,
} from "../../../utils/HelperMethods";
import { log } from "../../../utils/app.debug";
import { useDispatch, useSelector } from "react-redux";
import Communication from "../../../services/https/Communication";

function Hits(props) {
  
  const { radioId } = props;
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    setLoading(true);
    Communication.fetchRadioStationHits(radioId)
      .then((res) => {
        setLoading(false);
        setError(false);
        setCount(res);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);
  return (
    <div style={styles.mainContainer}>
      {loading ? (
        <ButtonSpinner />
      ) : error ? (
        <Tooltip title={error}>
          <p style={{ fontSize: 10, color: "red", cursor: "pointer" }}>
            Error
            <InfoIcon style={{ color: "red", marginRight: 4, fontSize: 12 }} />
          </p>
        </Tooltip>
      ) : (
        count
      )}
    </div>
  );
}

export default Hits;

const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
};
