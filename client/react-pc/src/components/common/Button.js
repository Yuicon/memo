/**
 * Created by Yuicon
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Button extends Component {

    static propTypes = {
        type: PropTypes.string,
        onClick: PropTypes.func,
        other: PropTypes.object,
        value: PropTypes.string,
        style: PropTypes.object,
    };

    static defaultProps = {
        type: 'button',
        value: '提交',
        style: {}
    };

    render() {

        const {other, onClick, type, value, style} = this.props;

        return (
            <button className='button' {...other} type={type} onClick={onClick} style={style}>
                <span>{value}</span>
            </button>
        );

    }

}

export default Button;