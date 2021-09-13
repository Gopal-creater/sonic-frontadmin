import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
// import { connect } from 'react-redux';

import Constant from '../../../assets/Constant';
import CustomButton from './CustomButton';
// import * as actionCreators from '../../store/Actions/index';

const ErrorModal = (props) => {
    const { errorData } = props;
    const [ show, setShow ] = useState('true');
    return(
        // put dismissible for close button
        <Alert 
            style={ Object.assign({ marginTop : 10, marginBottom: 0, display:'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign:'center', }, props.additionalStyle) } 
            show = {show}  
            variant="danger" 
            onClose = {() => setShow(false)}
        >
        <Alert.Heading style = {{textAlign:'center'}}>{errorData?errorData:"Oh snap! You got an error!"}</Alert.Heading>
            {errorData.data?errorData.data.map((item,key)=><p key = {key}>{item.msg}</p>):null}
            <CustomButton 
                onClick={() => {
                    props.onReload()
                }}
                buttonText="Reload"
                style = {{ width: 100, paddingTop : 3 }}
            />
        </Alert>
    );
}

const styles = {
    buttonStyle : {
        height: '30px',
        width: 80,
        color: 'white',
        border: 'none',
        borderRadius: '50px',
        backgroundColor: Constant.color.normalButtonColor,
        marginTop: 10
    }
}

// const mapStateToProps = (state) => {
//     return {
//         // loading : state.radiostations.loading,
//         // error : state.radiostations.error,
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         // onDeleteResult : (id) => dispatch(actionCreators.deleteResult(id))
//         fetchRadioStations : () => dispatch(actionCreators.fetchRadioStations())
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(ErrorModal);

export default ErrorModal;

