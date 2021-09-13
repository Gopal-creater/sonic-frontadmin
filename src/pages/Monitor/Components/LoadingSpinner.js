import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingSpinner = ({ title, multipleGrow, containerStyle }) => {
    return ( 
        <div 
        style={
            Object.assign(
                {
                    // height:window.innerHeight||'100%',
                    // width:'100%',
                    display: 'flex',
                    // textAlign:'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color:'black', 
                    // border:'1px solid red'
                },
                containerStyle)
            }>
            {multipleGrow ?
                <div>
                    <Spinner animation="grow" variant="primary" />
                    <Spinner animation="grow" variant="secondary" />
                    <Spinner animation="grow" variant="success" />
                    <Spinner animation="grow" variant="danger" />
                    <Spinner animation="grow" variant="warning" />
                </div> :
                <div style={{}}>
                    <Spinner animation="border" role="status"></Spinner>
                </div>}
            <p>{title ? title : ""}</p>
        </div>
     );
}
 
export default LoadingSpinner;