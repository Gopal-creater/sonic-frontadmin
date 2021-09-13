import React from 'react'
import Constant from '../../../assets/Constant';
import '../../../css/customButton.css';

const CustomButton = (props) => {
    return (
        <button 
            className={[props.className, 'customButton'].join(' ')}
            style={Object.assign({opacity: props.disabled ?  0.5 : 1},styles.buttonStyle, props.style )}
            onClick={props.onClick}
            disabled = {props.disabled}
        >
            {props.buttonText}
        </button>
    )
};

const styles = {
    buttonStyle: {
        height: '30px',
        width: 80,
        color: 'white',
        border: 'none',
        borderRadius: '50px',
        backgroundColor: Constant.color.normalButtonColor,
    }
}

export default CustomButton;
