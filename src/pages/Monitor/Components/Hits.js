import React, { useState, useEffect } from 'react';
// import { connect } from 'react-redux';
// import * as actionCreators from '../store/Actions/index';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';
import ButtonSpinner from './ButtonSpinner';
// import { getAccessToken, getUserId } from '../apiManager/AuthHelper';
// import apiUrl from '../apiManager/apiUrl';
import { getAccessToken, getUserId } from '../../../services/https/AuthHelper';
import httpUrl from '../../../services/https/httpUrl';
import axios from 'axios';
import { monthRange, todayRange, unauthorizedRedirection, weekRange, yearRange } from '../../../utils/HelperMethods';
import { log } from '../../../utils/app.debug';
import { useDispatch, useSelector } from "react-redux";
import Communication from '../../../services/https/Communication';

function Hits(props) {
    const dispatch = useDispatch();
    const { session } = useSelector((state) => ({
        session: state.session,
      }));
    const {radioId} = props;
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
     log("Session",session);
    useEffect(() => {
        setLoading(true);
        const ownerId = getUserId();
        console.log(ownerId);
        // const monthRang = monthRange().split(',');
        const yearRang = yearRange().split(',');
        Communication.fetchRadioStationHits(radioId)
        .then((data) => {
          console.log("Count For Radio Station", data);
          
        }).catch(error =>{
            console.log('Hit Error',error);
        })
        // axios({
        //         method: 'get',
        //         url: `${httpUrl.API_URL}/detections/owners/${ownerId}/RADIOSTATION/count?radioStation=${radioId}`,
        //         headers: {
        //             "Authorization":`Bearer ${getAccessToken()}`
        //         }
        //   })
        //   .then(res => {
        //         setLoading(false);
        //         setError(false);
        //         setCount(res.data);
        //         // log("radiohits response", res);
        //    })
        //    .catch(err=>{
        //             setLoading(false);
        //             log("fetch Radiostation table SonicKey Count/hits column error",err.response);
        //             if (err.response) {
        //                 unauthorizedRedirection(err.response.status);
        //                 setError(err.response.data.message);
        //             } else if (err.request) {
        //                 setError("Request error for fetch radiostations!!!");                  
        //             } else {
        //                 setError("Unexpected error occured while fetching radiostations!!!");       
        //             }
        //         }
        //    );
    },[]);
    return (
        <div style={styles.mainContainer}>
            {loading ? <ButtonSpinner /> : error ? 
            <Tooltip title={error}>
            <p style={{fontSize: 10, color : 'red', cursor: 'pointer'}}>Error
                <InfoIcon style={{ color: 'red', marginRight: 4, fontSize: 12 }} />
            </p>
            </Tooltip>
            :count }
        </div>
    )
}


export default Hits;

const styles = {
    mainContainer : {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
};
