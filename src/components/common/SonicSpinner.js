import React from 'react'
import { Spinner } from 'react-bootstrap';
import { Typography } from '@material-ui/core';

const SonicSpinner = ({ title, glowType, containerStyle, overlay }) => {
    if (overlay) {
        return (
            <div style={Object.assign({
                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(52, 52, 52, 0.3)', position: 'fixed', bottom: 0,
                left: 0,
                right: 0,
                top: 0, zIndex: 1000000
            }, containerStyle)}>
                {glowType ?
                    <div>
                        <Spinner animation="grow" variant="primary" />
                        <Spinner animation="grow" variant="secondary" />
                        <Spinner animation="grow" variant="success" />
                        <Spinner animation="grow" variant="danger" />
                        <Spinner animation="grow" variant="warning" />
                    </div> :
                    <Spinner animation="border" role="status"></Spinner>}
                <Typography variant="h4" style={{ fontWeight: 'bold', fontSize: '130%', marginTop: 5 }}>{title || "Please wait..."}</Typography>
            </div>
        );
    }
    return (
        <div style={Object.assign({ height: window.innerHeight || '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }, containerStyle)}>
            {glowType ?
                <div>
                    <Spinner animation="grow" variant="primary" />
                    <Spinner animation="grow" variant="secondary" />
                    <Spinner animation="grow" variant="success" />
                    <Spinner animation="grow" variant="danger" />
                    <Spinner animation="grow" variant="warning" />
                </div> :
                <Spinner animation="border" role="status"></Spinner>}
            <Typography variant="h4" style={{ fontWeight: 'bold', fontSize: '130%', marginTop: 5 }}>{title || "Please wait..."}</Typography>
        </div>
    );
}

export default SonicSpinner;