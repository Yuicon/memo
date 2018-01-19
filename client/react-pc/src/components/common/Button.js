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
        value: PropTypes.string
    };

    static defaultProps = {
        type: 'button',
        value: '提交'
    };

    render() {

        const {other, onClick, type, value} = this.props;

        return (
            <button className='button' {...other} type={type} onClick={onClick}>
                <span>{value}</span>
            </button>
        );

    }

}

export default Button;