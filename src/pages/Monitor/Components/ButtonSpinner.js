import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';

const ButtonSpinner = ({  grow, additionalStyle }) => {
    return ( 
        <div>
            {grow ?
            <Spinner as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
                style={Object.assign({},additionalStyle)}/>:
            <Spinner 
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                style={Object.assign({},additionalStyle)}/>
                }
        </div>
     );
}
 
export default ButtonSpinner;