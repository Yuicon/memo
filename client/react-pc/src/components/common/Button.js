/**
 * Created by Yuicon
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Button extends Component {

    render() {

        const {other, onClick, type, value} = this.props;

        return (
            <button className='button' {...other} type={type} onClick={onClick}>
                <span>{value}</span>
            </button>
        );

    }

}

Button.propTypes = {
    type: PropTypes.string,
    onClick: PropTypes.func,
    other: PropTypes.object,
    value: PropTypes.string
};

Button.defaultProps = {
    type: 'button',
    value: '提交'
};

export default Button;